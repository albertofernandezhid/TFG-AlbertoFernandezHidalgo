<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250511131717 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE usuarios_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE usuarios (id INT NOT NULL, nombre VARCHAR(255) NOT NULL, apellidos VARCHAR(255) NOT NULL, dni VARCHAR(20) NOT NULL, fecha_nacimiento DATE NOT NULL, sexo VARCHAR(1) DEFAULT NULL, email_personal VARCHAR(180) NOT NULL, telefono_personal VARCHAR(20) NOT NULL, calle VARCHAR(255) DEFAULT NULL, ciudad VARCHAR(255) DEFAULT NULL, codigo_postal VARCHAR(20) DEFAULT NULL, pais VARCHAR(100) DEFAULT NULL, username VARCHAR(100) NOT NULL, password VARCHAR(255) NOT NULL, rol VARCHAR(50) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, activo BOOLEAN DEFAULT NULL, email_verificado BOOLEAN DEFAULT NULL, reset_token VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN usuarios.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN usuarios.updated_at IS \'(DC2Type:datetime_immutable)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE usuarios_id_seq CASCADE');
        $this->addSql('DROP TABLE usuarios');
    }
}
