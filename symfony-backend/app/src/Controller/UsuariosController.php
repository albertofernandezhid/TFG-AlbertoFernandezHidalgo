<?php

namespace App\Controller;

use App\Entity\Usuarios;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UsuariosController extends AbstractController
{
    #[Route('/usuarios', name: 'crear_usuarios', methods: ['POST'])]
    public function crearUsuario(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (
            !$data || 
            !isset(
                $data['usuario'], $data['user_pass'], $data['nombre'],
                $data['apellidos'], $data['dni'], $data['telefono_personal']
            )
        ) {
            return new JsonResponse(['error' => 'Faltan campos obligatorios'], 400);
        }

        $usuario = new Usuarios();
        $usuario->setNombre($data['nombre']);
        $usuario->setApellidos($data['apellidos']);
        $usuario->setDni($data['dni']);
        $usuario->setTelefonoPersonal($data['telefono_personal']);
        $usuario->setEmail($data['email'] ?? null);
        $usuario->setProvincia($data['provincia'] ?? null);
        $usuario->setMunicipio($data['municipio'] ?? null);
        $usuario->setCalle($data['calle'] ?? null);
        $usuario->setCodigoPostal($data['codigo_postal'] ?? null);
        $usuario->setUsuario($data['usuario']);
        $usuario->setUserPass($data['user_pass']);
        $usuario->setActivo(true);
        $usuario->setRol($data['rol'] ?? 'empleado');
        $usuario->setCreatedAt(new \DateTimeImmutable());
        $usuario->setEmpresaId($data['empresa_id'] ?? 1);

        $em->persist($usuario);
        $em->flush();

        return new JsonResponse(['message' => 'Usuario creado correctamente'], 201);
    }

    #[Route('/usuarios', name: 'listar_usuarios', methods: ['GET'])]
    public function listarUsuarios(EntityManagerInterface $em): JsonResponse
    {
        $usuarios = $em->getRepository(Usuarios::class)->findAll();

        $datos = array_map(function (Usuarios $usuario) {
            return [
                'id' => $usuario->getId(),
                'nombre' => $usuario->getNombre(),
                'apellidos' => $usuario->getApellidos(),
                'dni' => $usuario->getDni(),
                'telefono_personal' => $usuario->getTelefonoPersonal(),
                'email' => $usuario->getEmail(),
                'provincia' => $usuario->getProvincia(),
                'municipio' => $usuario->getMunicipio(),
                'calle' => $usuario->getCalle(),
                'codigo_postal' => $usuario->getCodigoPostal(),
                'usuario' => $usuario->getUsuario(),
                'rol' => $usuario->getRol(),
                'activo' => $usuario->isActivo(),
                'created_at' => $usuario->getCreatedAt() ? $usuario->getCreatedAt()->format('c') : null,
                'empresa_id' => $usuario->getEmpresaId(),
            ];
        }, $usuarios);

        return new JsonResponse($datos, 200, [
            'Access-Control-Allow-Origin' => '*'
        ]);
    }

    #[Route('/usuarios/{id}/activo', name: 'cambiar_estado_activo', methods: ['PATCH', 'OPTIONS'])]
    public function cambiarEstadoActivo(int $id, Request $request, EntityManagerInterface $em): JsonResponse
    {
        // Para manejar preflight OPTIONS
        if ($request->getMethod() === 'OPTIONS') {
            return new JsonResponse(null, 204, [
                'Access-Control-Allow-Origin' => '*',
                'Access-Control-Allow-Methods' => 'PATCH, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type',
            ]);
        }

        $usuario = $em->getRepository(Usuarios::class)->find($id);
        if (!$usuario) {
            return new JsonResponse(['error' => 'Usuario no encontrado'], 404, [
                'Access-Control-Allow-Origin' => '*'
            ]);
        }

        $data = json_decode($request->getContent(), true);
        if (!isset($data['activo'])) {
            return new JsonResponse(['error' => 'Campo activo requerido'], 400, [
                'Access-Control-Allow-Origin' => '*'
            ]);
        }

        $usuario->setActivo((bool) $data['activo']);
        $em->flush();

        return new JsonResponse(['message' => 'Estado activo actualizado correctamente'], 200, [
            'Access-Control-Allow-Origin' => '*'
        ]);
    }
}
