<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250521161840 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE fichajes_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE usuarios_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE fichajes (id INT NOT NULL, usuario_id INT NOT NULL, fecha_hora TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, fecha DATE DEFAULT NULL, hora_entrada TIME(0) WITHOUT TIME ZONE DEFAULT NULL, hora_salida TIME(0) WITHOUT TIME ZONE DEFAULT NULL, tipo VARCHAR(20) DEFAULT NULL, lugar VARCHAR(100) DEFAULT NULL, evento VARCHAR(100) DEFAULT NULL, comentario VARCHAR(255) DEFAULT NULL, gastos DOUBLE PRECISION DEFAULT NULL, imagen_url VARCHAR(255) DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN fichajes.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE usuarios (id INT NOT NULL, empresa_id INT DEFAULT NULL, nombre VARCHAR(50) NOT NULL, apellidos VARCHAR(100) NOT NULL, dni VARCHAR(20) NOT NULL, telefono_personal VARCHAR(20) NOT NULL, email VARCHAR(100) DEFAULT NULL, provincia VARCHAR(100) DEFAULT NULL, municipio VARCHAR(100) DEFAULT NULL, calle VARCHAR(255) DEFAULT NULL, codigo_postal VARCHAR(10) DEFAULT NULL, usuario VARCHAR(50) NOT NULL, user_pass VARCHAR(255) NOT NULL, rol VARCHAR(20) DEFAULT NULL, activo BOOLEAN DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN usuarios.created_at IS \'(DC2Type:datetime_immutable)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE fichajes_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE usuarios_id_seq CASCADE');
        $this->addSql('DROP TABLE fichajes');
        $this->addSql('DROP TABLE usuarios');
    }
}
