<?php

namespace App\Repository;

use App\Entity\Usuario;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;

/**
 * @extends ServiceEntityRepository<Usuario>
 */
class UsuarioRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Usuario::class);
    }

    /**
     * Guarda un usuario en la base de datos
     */
    public function save(Usuario $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * Elimina un usuario de la base de datos
     */
    public function remove(Usuario $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * Actualiza el hash de contraseña si el codificador ha cambiado
     */
    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void
    {
        if (!$user instanceof Usuario) {
            throw new UnsupportedUserException(sprintf('Las instancias de "%s" no son soportadas.', \get_class($user)));
        }

        $user->setPassword($newHashedPassword);
        $this->save($user, true);
    }

    /**
     * Busca usuarios por criterios específicos
     */
    public function findByFilters(array $filters): array
    {
        $qb = $this->createQueryBuilder('u');

        if (isset($filters['nombre']) && $filters['nombre']) {
            $qb->andWhere('u.nombre LIKE :nombre')
               ->setParameter('nombre', '%' . $filters['nombre'] . '%');
        }

        if (isset($filters['apellidos']) && $filters['apellidos']) {
            $qb->andWhere('u.apellidos LIKE :apellidos')
               ->setParameter('apellidos', '%' . $filters['apellidos'] . '%');
        }

        if (isset($filters['dni']) && $filters['dni']) {
            $qb->andWhere('u.dni LIKE :dni')
               ->setParameter('dni', '%' . $filters['dni'] . '%');
        }

        if (isset($filters['email']) && $filters['email']) {
            $qb->andWhere('u.emailPersonal LIKE :email')
               ->setParameter('email', '%' . $filters['email'] . '%');
        }

        if (isset($filters['activo']) && $filters['activo'] !== null) {
            $qb->andWhere('u.activo = :activo')
               ->setParameter('activo', $filters['activo']);
        }

        return $qb->orderBy('u.apellidos', 'ASC')
                 ->addOrderBy('u.nombre', 'ASC')
                 ->getQuery()
                 ->getResult();
    }
}