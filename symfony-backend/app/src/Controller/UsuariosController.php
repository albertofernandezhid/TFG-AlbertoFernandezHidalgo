// src/Controller/UsuariosController.php

namespace App\Controller;

use App\Entity\Usuarios;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class UsuariosController extends AbstractController
{
    #[Route('/api/usuarios', name: 'crear_usuario', methods: ['POST'])]
    public function crearUsuario(Request $request, EntityManagerInterface $em, SerializerInterface $serializer): Response
    {
        $data = json_decode($request->getContent(), true);

        $usuario = new Usuarios();
        $usuario->setNombre($data['nombre'] ?? '');
        $usuario->setApellidos($data['apellidos'] ?? '');
        $usuario->setDni($data['dni'] ?? '');
        $usuario->setFechaNacimiento(new \DateTime($data['fechaNacimiento']));
        $usuario->setSexo($data['sexo'] ?? null);
        $usuario->setEmailPersonal($data['emailPersonal'] ?? '');
        $usuario->setTelefonoPersonal($data['telefonoPersonal'] ?? '');
        $usuario->setCalle($data['calle'] ?? null);
        $usuario->setCiudad($data['ciudad'] ?? null);
        $usuario->setCodigoPostal($data['codigoPostal'] ?? null);
        $usuario->setPais($data['pais'] ?? null);
        $usuario->setUsername($data['username'] ?? '');
        $usuario->setPassword($data['password'] ?? '');
        $usuario->setRol($data['rol'] ?? '');
        $usuario->setActivo($data['activo'] ?? true);
        $usuario->setEmailVerificado($data['emailVerificado'] ?? false);
        $usuario->setCreatedAt(new \DateTimeImmutable());
        $usuario->setUpdatedAt(new \DateTimeImmutable());

        $em->persist($usuario);
        $em->flush();

        return new JsonResponse(['message' => 'Usuario creado con éxito'], 201);
    }
}
