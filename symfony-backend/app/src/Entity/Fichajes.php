<?php

namespace App\Entity;

use App\Repository\FichajesRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FichajesRepository::class)]
class Fichajes
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $usuario_id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $fecha_hora = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $fecha = null;

    #[ORM\Column(type: Types::TIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $hora_entrada = null;

    #[ORM\Column(type: Types::TIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $hora_salida = null;

    #[ORM\Column(length: 20, nullable: true)]
    private ?string $tipo = null;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $lugar = null;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $evento = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $comentario = null;

    #[ORM\Column(nullable: true)]
    private ?float $gastos = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $imagen_url = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getUsuarioId(): ?int
    {
        return $this->usuario_id;
    }

    public function setUsuarioId(int $usuario_id): static
    {
        $this->usuario_id = $usuario_id;

        return $this;
    }

    public function getFechaHora(): ?\DateTimeInterface
    {
        return $this->fecha_hora;
    }

    public function setFechaHora(\DateTimeInterface $fecha_hora): static
    {
        $this->fecha_hora = $fecha_hora;

        return $this;
    }

    public function getFecha(): ?\DateTimeInterface
    {
        return $this->fecha;
    }

    public function setFecha(\DateTimeInterface $fecha): static
    {
        $this->fecha = $fecha;

        return $this;
    }

    public function getHoraEntrada(): ?\DateTimeInterface
    {
        return $this->hora_entrada;
    }

    public function setHoraEntrada(\DateTimeInterface $hora_entrada): static
    {
        $this->hora_entrada = $hora_entrada;

        return $this;
    }

    public function getHoraSalida(): ?\DateTimeInterface
    {
        return $this->hora_salida;
    }

    public function setHoraSalida(\DateTimeInterface $hora_salida): static
    {
        $this->hora_salida = $hora_salida;

        return $this;
    }

    public function getTipo(): ?string
    {
        return $this->tipo;
    }

    public function setTipo(?string $tipo): static
    {
        $this->tipo = $tipo;

        return $this;
    }

    public function getLugar(): ?string
    {
        return $this->lugar;
    }

    public function setLugar(?string $lugar): static
    {
        $this->lugar = $lugar;

        return $this;
    }

    public function getEvento(): ?string
    {
        return $this->evento;
    }

    public function setEvento(?string $evento): static
    {
        $this->evento = $evento;

        return $this;
    }

    public function getComentario(): ?string
    {
        return $this->comentario;
    }

    public function setComentario(?string $comentario): static
    {
        $this->comentario = $comentario;

        return $this;
    }

    public function getGastos(): ?float
    {
        return $this->gastos;
    }

    public function setGastos(?float $gastos): static
    {
        $this->gastos = $gastos;

        return $this;
    }

    public function getImagenUrl(): ?string
    {
        return $this->imagen_url;
    }

    public function setImagenUrl(?string $imagen_url): static
    {
        $this->imagen_url = $imagen_url;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }
}
