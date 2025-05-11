// src/Controller/EmpleadosController.php
namespace App\Controller;

use App\Entity\Empleado;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class EmpleadosController extends AbstractController
{
    #[Route('/api/empleados', name: 'get_empleados', methods: ['GET'])]
    public function getEmpleados(EntityManagerInterface $em): JsonResponse
    {
        $empleados = $em->getRepository(Empleado::class)->findAll();
        $data = [];

        foreach ($empleados as $empleado) {
            $data[] = [
                'nombre' => $empleado->getNombre(),
                'apellidos' => $empleado->getApellidos(),
                'estado' => $empleado->getEstado(),
                // Puedes agregar más campos aquí si es necesario
            ];
        }

        return new JsonResponse($data);
    }
}
