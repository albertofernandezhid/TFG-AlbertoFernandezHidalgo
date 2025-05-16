<?php

namespace App\Service;

use App\Entity\Usuario;
use App\Repository\UsuarioRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Exception\UserNotFoundException;

class UsuarioService
{
    private $usuarioRepository;
    private $entityManager;
    private $passwordHasher;

    public function __construct(
        UsuarioRepository $usuarioRepository,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher
    ) {
        $this->usuarioRepository = $usuarioRepository;
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
    }

    /**
     * Crear un nuevo usuario
     */
    public function crearUsuario(array $data): Usuario
    {
        // Verificar si el usuario ya existe
        $existingUsername = $this->usuarioRepository->findOneBy(['username' => $data['username']]);
        if ($existingUsername) {
            throw new \Exception('El nombre de usuario ya está en uso.');
        }

        $existingEmail = $this->usuarioRepository->findOneBy(['emailPersonal' => $data['emailPersonal']]);
        if ($existingEmail) {
            throw new \Exception('El email ya está registrado.');
        }

        $existingDni = $this->usuarioRepository->findOneBy(['dni' => $data['dni']]);
        if ($existingDni) {
            throw new \Exception('El DNI ya está registrado.');
        }

        // Crear nuevo usuario
        $usuario = new Usuario();
        $usuario->setNombre($data['nombre']);
        $usuario->setApellidos($data['apellidos']);
        $usuario->setDni($data['dni']);
        $usuario->setFechaNacimiento(new \DateTime($data['fechaNacimiento']));
        $usuario->setSexo($data['sexo']);
        $usuario->setEmailPersonal($data['emailPersonal']);
        $usuario->setTelefonoPersonal($data['telefonoPersonal']);
        
        // Campos opcionales
        if (isset($data['calle'])) {
            $usuario->setCalle($data['calle']);
        }
        if (isset($data['ciudad'])) {
            $usuario->setCiudad($data['ciudad']);
        }
        if (isset($data['codigoPostal'])) {
            $usuario->setCodigoPostal($data['codigoPostal']);
        }
        
        $usuario->setUsername($data['username']);
        
        // Encriptar la contraseña
        $hashedPassword = $this->passwordHasher->hashPassword($usuario, $data['password']);
        $usuario->setPassword($hashedPassword);
        
        // Asignar rol (por defecto empleado si no se especifica)
        $rol = isset($data['rol']) ? 'ROLE_' . strtoupper($data['rol']) : 'ROLE_EMPLEADO';
        $usuario->setRoles([$rol]);
        
        // Valores por defecto
        $activo = isset($data['activo']) ? (bool)$data['activo'] : true;
        $usuario->setActivo($activo);
        
        $emailVerificado = isset($data['emailVerificado']) ? (bool)$data['emailVerificado'] : false;
        $usuario->setEmailVerificado($emailVerificado);
        
        // Persistir en la base de datos
        $this->entityManager->persist($usuario);
        $this->entityManager->flush();
        
        return $usuario;
    }

    /**
     * Obtener todos los usuarios
     */
    public function obtenerUsuarios(): array
    {
        return $this->usuarioRepository->findAll();
    }

    /**
     * Obtener usuario por ID
     */
    public function obtenerUsuarioPorId(int $id): Usuario
    {
        $usuario = $this->usuarioRepository->find($id);
        if (!$usuario) {
            throw new UserNotFoundException('Usuario no encontrado');
        }
        return $usuario;
    }

    /**
     * Actualizar usuario
     */
    public function actualizarUsuario(int $id, array $data): Usuario
    {
        $usuario = $this->obtenerUsuarioPorId($id);
        
        // Comprobar si el email ya está en uso por otro usuario
        if (isset($data['emailPersonal']) && $data['emailPersonal'] !== $usuario->getEmailPersonal()) {
            $existingEmail = $this->usuarioRepository->findOneBy(['emailPersonal' => $data['emailPersonal']]);
            if ($existingEmail && $existingEmail->getId() !== $id) {
                throw new \Exception('El email ya está registrado por otro usuario.');
            }
            $usuario->setEmailPersonal($data['emailPersonal']);
        }
        
        // Comprobar si el username ya está en uso por otro usuario
        if (isset($data['username']) && $data['username'] !== $usuario->getUsername()) {
            $existingUsername = $this->usuarioRepository->findOneBy(['username' => $data['username']]);
            if ($existingUsername && $existingUsername->getId() !== $id) {
                throw new \Exception('El nombre de usuario ya está en uso por otro usuario.');
            }
            $usuario->setUsername($data['username']);
        }
        
        // Actualizar contraseña si se proporciona
        if (isset($data['password']) && !empty($data['password'])) {
            $hashedPassword = $this->passwordHasher->hashPassword($usuario, $data['password']);
            $usuario->setPassword($hashedPassword);
        }
        
        // Actualizar campos básicos
        if (isset($data['nombre'])) $usuario->setNombre($data['nombre']);
        if (isset($data['apellidos'])) $usuario->setApellidos($data['apellidos']);
        if (isset($data['fechaNacimiento'])) $usuario->setFechaNacimiento(new \DateTime($data['fechaNacimiento']));
        if (isset($data['sexo'])) $usuario->setSexo($data['sexo']);
        if (isset($data['telefonoPersonal'])) $usuario->setTelefonoPersonal($data['telefonoPersonal']);
        
        // Campos opcionales
        if (array_key_exists('calle', $data)) $usuario->setCalle($data['calle']);
        if (array_key_exists('ciudad', $data)) $usuario->setCiudad($data['ciudad']);
        if (array_key_exists('codigoPostal', $data)) $usuario->setCodigoPostal($data['codigoPostal']);
        
        // Campos de estado
        if (isset($data['activo'])) $usuario->setActivo((bool)$data['activo']);
        if (isset($data['emailVerificado'])) $usuario->setEmailVerificado((bool)$data['emailVerificado']);
        
        // Actualizar roles si se proporcionan
        if (isset($data['rol'])) {
            $rol = 'ROLE_' . strtoupper($data['rol']);
            $usuario->setRoles([$rol]);
        }
        
        $this->entityManager->flush();
        
        return $usuario;
    }

    /**
     * Eliminar usuario
     */
    public function eliminarUsuario(int $id): void
    {
        $usuario = $this->obtenerUsuarioPorId($id);
        $this->entityManager->remove($usuario);
        $this->entityManager->flush();
    }

    /**
     * Buscar usuarios por filtros
     */
    public function buscarUsuarios(array $filters): array
    {
        return $this->usuarioRepository->findByFilters($filters);
    }
}