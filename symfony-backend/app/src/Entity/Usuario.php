<?php

namespace App\Entity;

use App\Repository\UsuarioRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=UsuarioRepository::class)
 * @ORM\Table(name="usuarios")
 */
class Usuario implements UserInterface, PasswordAuthenticatedUserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     * @Assert\NotBlank(message="El nombre es obligatorio")
     */
    private $nombre;

    /**
     * @ORM\Column(type="string", length=100)
     * @Assert\NotBlank(message="Los apellidos son obligatorios")
     */
    private $apellidos;

    /**
     * @ORM\Column(type="string", length=9, unique=true)
     * @Assert\NotBlank(message="El DNI es obligatorio")
     * @Assert\Regex(
     *     pattern="/^[0-9]{8}[A-Z]$/",
     *     message="Formato de DNI inválido. Debe ser 8 números seguidos de una letra mayúscula."
     * )
     */
    private $dni;

    /**
     * @ORM\Column(type="date")
     * @Assert\NotBlank(message="La fecha de nacimiento es obligatoria")
     */
    private $fechaNacimiento;

    /**
     * @ORM\Column(type="string", length=1)
     * @Assert\NotBlank(message="El sexo es obligatorio")
     * @Assert\Choice(choices={"M", "F", "O"}, message="Valor no válido para sexo")
     */
    private $sexo;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Assert\NotBlank(message="El email es obligatorio")
     * @Assert\Email(message="El email {{ value }} no es válido")
     */
    private $emailPersonal;

    /**
     * @ORM\Column(type="string", length=9)
     * @Assert\NotBlank(message="El teléfono es obligatorio")
     * @Assert\Regex(
     *     pattern="/^[0-9]{9}$/",
     *     message="El teléfono debe contener 9 dígitos"
     * )
     */
    private $telefonoPersonal;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $calle;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     */
    private $ciudad;

    /**
     * @ORM\Column(type="string", length=5, nullable=true)
     * @Assert\Regex(
     *     pattern="/^[0-9]{5}$/",
     *     message="El código postal debe contener 5 dígitos"
     * )
     */
    private $codigoPostal;

    /**
     * @ORM\Column(type="string", length=50, unique=true)
     * @Assert\NotBlank(message="El nombre de usuario es obligatorio")
     */
    private $username;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $password;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @ORM\Column(type="boolean")
     */
    private $activo = true;

    /**
     * @ORM\Column(type="boolean")
     */
    private $emailVerificado = false;

    /**
     * @ORM\Column(type="datetime")
     */
    private $fechaCreacion;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $fechaUltimoAcceso;

    public function __construct()
    {
        $this->fechaCreacion = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre): self
    {
        $this->nombre = $nombre;
        return $this;
    }

    public function getApellidos(): ?string
    {
        return $this->apellidos;
    }

    public function setApellidos(string $apellidos): self
    {
        $this->apellidos = $apellidos;
        return $this;
    }

    public function getDni(): ?string
    {
        return $this->dni;
    }

    public function setDni(string $dni): self
    {
        $this->dni = $dni;
        return $this;
    }

    public function getFechaNacimiento(): ?\DateTimeInterface
    {
        return $this->fechaNacimiento;
    }

    public function setFechaNacimiento($fechaNacimiento): self
    {
        if (is_string($fechaNacimiento)) {
            $this->fechaNacimiento = new \DateTime($fechaNacimiento);
        } else {
            $this->fechaNacimiento = $fechaNacimiento;
        }
        return $this;
    }

    public function getSexo(): ?string
    {
        return $this->sexo;
    }

    public function setSexo(string $sexo): self
    {
        $this->sexo = $sexo;
        return $this;
    }

    public function getEmailPersonal(): ?string
    {
        return $this->emailPersonal;
    }

    public function setEmailPersonal(string $emailPersonal): self
    {
        $this->emailPersonal = $emailPersonal;
        return $this;
    }

    public function getTelefonoPersonal(): ?string
    {
        return $this->telefonoPersonal;
    }

    public function setTelefonoPersonal(string $telefonoPersonal): self
    {
        $this->telefonoPersonal = $telefonoPersonal;
        return $this;
    }

    public function getCalle(): ?string
    {
        return $this->calle;
    }

    public function setCalle(?string $calle): self
    {
        $this->calle = $calle;
        return $this;
    }

    public function getCiudad(): ?string
    {
        return $this->ciudad;
    }

    public function setCiudad(?string $ciudad): self
    {
        $this->ciudad = $ciudad;
        return $this;
    }

    public function getCodigoPostal(): ?string
    {
        return $this->codigoPostal;
    }

    public function setCodigoPostal(?string $codigoPostal): self
    {
        $this->codigoPostal = $codigoPostal;
        return $this;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;
        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // Garantizar que todos los usuarios tengan al menos ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;
        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;
        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        // No necesitamos salt con los algoritmos modernos de Symfony
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // Si almacena credenciales temporales, límpielas aquí
    }

    public function isActivo(): ?bool
    {
        return $this->activo;
    }

    public function setActivo(bool $activo): self
    {
        $this->activo = $activo;
        return $this;
    }

    public function isEmailVerificado(): ?bool
    {
        return $this->emailVerificado;
    }

    public function setEmailVerificado(bool $emailVerificado): self
    {
        $this->emailVerificado = $emailVerificado;
        return $this;
    }

    public function getFechaCreacion(): ?\DateTimeInterface
    {
        return $this->fechaCreacion;
    }

    public function setFechaCreacion(\DateTimeInterface $fechaCreacion): self
    {
        $this->fechaCreacion = $fechaCreacion;
        return $this;
    }

    public function getFechaUltimoAcceso(): ?\DateTimeInterface
    {
        return $this->fechaUltimoAcceso;
    }

    public function setFechaUltimoAcceso(?\DateTimeInterface $fechaUltimoAcceso): self
    {
        $this->fechaUltimoAcceso = $fechaUltimoAcceso;
        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->username;
    }
}