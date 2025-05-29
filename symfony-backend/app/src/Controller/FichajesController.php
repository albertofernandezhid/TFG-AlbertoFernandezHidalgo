<?php

namespace App\Controller;

use App\Entity\Fichajes;
use DateTime;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/fichajes')]
class FichajesController extends AbstractController
{
    #[Route('', name: 'registrar_fichaje', methods: ['POST'])]
    public function registrarFichaje(Request $request, EntityManagerInterface $em): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            // Debug: Log de datos recibidos
            error_log('Datos recibidos: ' . json_encode($data));

            if (!$data || !isset($data['usuario_id'], $data['tipo'])) {
                error_log('Error: Faltan datos obligatorios');
                return new JsonResponse(['error' => 'Faltan datos obligatorios: usuario_id y tipo son requeridos.'], 400);
            }

            $tipo = $data['tipo']; // entrada o salida
            $usarFechaHoraActual = $data['usarFechaHoraActual'] ?? false;
            $usarHoraSalidaActual = $data['usarHoraSalidaActual'] ?? false;

            $fichaje = new Fichajes();
            $fichaje->setUsuarioId((int) $data['usuario_id']);
            $fichaje->setTipo($tipo);
            $fichaje->setFechaHora(new DateTimeImmutable());
            $fichaje->setCreatedAt(new DateTimeImmutable());

            // Manejo de ENTRADA
            if ($tipo === 'entrada') {
                if ($usarFechaHoraActual) {
                    $now = new DateTime('now', new \DateTimeZone('Europe/Madrid'));
                    $fichaje->setFecha($now);
                    $fichaje->setHoraEntrada($now);
                } else {
                    if (!isset($data['fecha']) || !isset($data['hora_entrada'])) {
                        error_log('Error entrada: Faltan fecha u hora_entrada');
                        return new JsonResponse(['error' => 'Para entrada manual se requieren fecha y hora_entrada.'], 400);
                    }

                    try {
                        $fechaEntrada = new DateTime($data['fecha']);
                        $horaEntrada = DateTime::createFromFormat('H:i', $data['hora_entrada']);

                        if (!$horaEntrada) {
                            return new JsonResponse(['error' => 'Formato de hora_entrada inválido. Use HH:MM'], 400);
                        }

                        $fichaje->setFecha($fechaEntrada);
                        $fichaje->setHoraEntrada($horaEntrada);
                    } catch (\Exception $e) {
                        error_log('Error parseando fecha/hora entrada: ' . $e->getMessage());
                        return new JsonResponse(['error' => 'Formato de fecha u hora inválido.'], 400);
                    }
                }

                // Para entrada, el lugar es opcional
                if (!empty($data['lugar'])) {
                    $fichaje->setLugar($data['lugar']);
                }
            }

            // Manejo de SALIDA
            if ($tipo === 'salida') {
                // Validar campos obligatorios para salida
                if (!isset($data['fecha']) || !isset($data['hora_entrada']) || !isset($data['lugar'])) {
                    error_log('Error salida: Faltan campos obligatorios');
                    return new JsonResponse(['error' => 'Para salida se requieren: fecha, hora_entrada y lugar.'], 400);
                }

                try {
                    // Establecer fecha y hora de entrada (desde el registro de entrada)
                    $fechaSalida = new DateTime($data['fecha']);
                    $horaEntrada = DateTime::createFromFormat('H:i', $data['hora_entrada']);

                    if (!$horaEntrada) {
                        return new JsonResponse(['error' => 'Formato de hora_entrada inválido. Use HH:MM'], 400);
                    }

                    $fichaje->setFecha($fechaSalida);
                    $fichaje->setHoraEntrada($horaEntrada);

                    // Establecer hora de salida
                    if ($usarHoraSalidaActual) {
                        $horaSalida = new DateTime('now', new \DateTimeZone('Europe/Madrid'));
                    } else {
                        if (empty($data['hora_salida'])) {
                            return new JsonResponse(['error' => 'Se requiere hora_salida cuando no se usa la hora actual.'], 400);
                        }

                        $horaSalida = DateTime::createFromFormat('H:i', $data['hora_salida'], new \DateTimeZone('Europe/Madrid'));
                        if (!$horaSalida) {
                            return new JsonResponse(['error' => 'Formato de hora_salida inválido. Use HH:MM'], 400);
                        }

                        $fichaje->setHoraSalida($horaSalida);
                    }

                } catch (\Exception $e) {
                    error_log('Error parseando fecha/hora salida: ' . $e->getMessage());
                    return new JsonResponse(['error' => 'Formato de fecha u hora inválido.'], 400);
                }

                // Campos obligatorios y opcionales para salida
                $fichaje->setLugar($data['lugar']);

                if (!empty($data['evento'])) {
                    $fichaje->setEvento($data['evento']);
                }

                if (!empty($data['comentarios'])) {
                    $fichaje->setComentario($data['comentarios']);
                }

                if (isset($data['gastos']) && is_numeric($data['gastos'])) {
                    $fichaje->setGastos((float) $data['gastos']);
                }

                if (!empty($data['imagen_url'])) {
                    $fichaje->setImagenUrl($data['imagen_url']);
                }
            }

            $em->persist($fichaje);
            $em->flush();

            error_log('Fichaje registrado correctamente para usuario: ' . $data['usuario_id']);
            return new JsonResponse([
                'message' => 'Fichaje registrado correctamente.',
                'tipo' => $tipo,
                'id' => $fichaje->getId()
            ], 201);

        } catch (\Exception $e) {
            error_log('Error general en registrarFichaje: ' . $e->getMessage());
            return new JsonResponse(['error' => 'Error interno del servidor.'], 500);
        }
    }

    #[Route('/listar', name: 'listar_fichajes', methods: ['GET'])]
    public function listarFichajes(EntityManagerInterface $em): JsonResponse
    {
        $fichajes = $em->getRepository(Fichajes::class)->findAll();

        $data = array_map(function (Fichajes $fichaje) {
            return [
                'id' => $fichaje->getId(),
                'usuario_id' => $fichaje->getUsuarioId(),
                'fecha' => $fichaje->getFecha()?->format('Y-m-d'),
                'horaEntrada' => $fichaje->getHoraEntrada()?->format('H:i'),
                'horaSalida' => $fichaje->getHoraSalida()?->format('H:i'),
                'tipo' => $fichaje->getTipo(),
                'lugar' => $fichaje->getLugar(),
                'evento' => $fichaje->getEvento(),
                'comentarios' => $fichaje->getComentario(),
                'gastos' => $fichaje->getGastos(),
                'archivos' => $fichaje->getImagenUrl(),
                'created_at' => $fichaje->getCreatedAt()?->format('c'),
            ];
        }, $fichajes);

        return new JsonResponse($data, 200, [
            'Access-Control-Allow-Origin' => '*'
        ]);
    }

}