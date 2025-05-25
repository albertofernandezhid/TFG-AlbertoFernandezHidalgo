<?php

namespace App\Controller;

use App\Entity\Empresa;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

final class EmpresaController extends AbstractController
{

     #[Route('/empresa', name: 'crear_empresa', methods: ['POST'])]
    public function crear(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $empresa = new Empresa();
        $empresa->setNombre($data['nombreEmpresa']);
        $empresa->setCif($data['cif']);
        $empresa->setEmailAdmin($data['email']);
        $empresa->setTelefono($data['telefono']);
        $empresa->setPassAdmin($data['contrasenaAdmin']);
        $empresa->setCreatedAt(new \DateTimeImmutable());

        $em->persist($empresa);
        $em->flush();

        return $this->json(['message' => 'Empresa creada con éxito'], 201);
    }
}
