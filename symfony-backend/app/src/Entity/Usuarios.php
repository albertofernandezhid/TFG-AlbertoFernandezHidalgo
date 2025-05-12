<?php
namespace App\Entity;

use App\Repository\UsuariosRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UsuariosRepository::class)]
class Usuarios
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private string $nombre;

    #[ORM\Column(length: 255)]
    private string $apellidos;

    #[ORM\Column(length: 20)]
    private string $dni;

    #[ORM\Column(type: 'date')]
    private \DateTimeInterface $fechaNacimiento;

    #[ORM\Column(length: 1, nullable: true)]
    private ?string $sexo = null;

    #[ORM\Column(length: 180)]
    private string $emailPersonal;

    #[ORM\Column(length: 20)]
    private string $telefonoPersonal;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $calle = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $ciudad = null;

    #[ORM\Column(length: 20, nullable: true)]
    private ?string $codigoPostal = null;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $pais = null;

    #[ORM\Column(length: 100)]
    private string $username;

    #[ORM\Column(length: 255)]
    private string $password;

    #[ORM\Column(length: 50)]
    private string $rol;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\Column(type: 'boolean', nullable: true)]
    private ?bool $activo = null;

    #[ORM\Column(type: 'boolean', nullable: true)]
    private ?bool $emailVerificado = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $resetToken = null;

    // Getters y Setters

    public function getId(): ?int { return $this->id; }

    public function getNombre(): string { return $this->nombre; }
    public function setNombre(string $nombre): self { $this->nombre = $nombre; return $this; }

    public function getApellidos(): string { return $this->apellidos; }
    public function setApellidos(string $apellidos): self { $this->apellidos = $apellidos; return $this; }

    public function getDni(): string { return $this->dni; }
    public function setDni(string $dni): self { $this->dni = $dni; return $this; }

    public function getFechaNacimiento(): \DateTimeInterface { return $this->fechaNacimiento; }
    public function setFechaNacimiento(\DateTimeInterface $fechaNacimiento): self { $this->fechaNacimiento = $fechaNacimiento; return $this; }

    public function getSexo(): ?string { return $this->sexo; }
    public function setSexo(?string $sexo): self { $this->sexo = $sexo; return $this; }

    public function getEmailPersonal(): string { return $this->emailPersonal; }
    public function setEmailPersonal(string $emailPersonal): self { $this->emailPersonal = $emailPersonal; return $this; }

    public function getTelefonoPersonal(): string { return $this->telefonoPersonal; }
    public function setTelefonoPersonal(string $telefonoPersonal): self { $this->telefonoPersonal = $telefonoPersonal; return $this; }

    public function getCalle(): ?string { return $this->calle; }
    public function setCalle(?string $calle): self { $this->calle = $calle; return $this; }

    public function getCiudad(): ?string { return $this->ciudad; }
    public function setCiudad(?string $ciudad): self { $this->ciudad = $ciudad; return $this; }

    public function getCodigoPostal(): ?string { return $this->codigoPostal; }
    public function setCodigoPostal(?string $codigoPostal): self { $this->codigoPostal = $codigoPostal; return $this; }

    public function getPais(): ?string { return $this->pais; }
    public function setPais(?string $pais): self { $this->pais = $pais; return $this; }

    public function getUsername(): string { return $this->username; }
    public function setUsername(string $username): self { $this->username = $username; return $this; }

    public function getPassword(): string { return $this->password; }
    public function setPassword(string $password): self { $this->password = $password; return $this; }

    public function getRol(): string { return $this->rol; }
    public function setRol(string $rol): self { $this->rol = $rol; return $this; }

    public function getCreatedAt(): ?\DateTimeImmutable { return $this->createdAt; }
    public function setCreatedAt(?\DateTimeImmutable $createdAt): self { $this->createdAt = $createdAt; return $this; }

    public function getUpdatedAt(): ?\DateTimeImmutable { return $this->updatedAt; }
    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): self { $this->updatedAt = $updatedAt; return $this; }

    public function isActivo(): ?bool { return $this->activo; }
    public function setActivo(?bool $activo): self { $this->activo = $activo; return $this; }

    public function isEmailVerificado(): ?bool { return $this->emailVerificado; }
    public function setEmailVerificado(?bool $emailVerificado): self { $this->emailVerificado = $emailVerificado; return $this; }

    public function getResetToken(): ?string { return $this->resetToken; }
    public function setResetToken(?string $resetToken): self { $this->resetToken = $resetToken; return $this; }
}
