package labwed18303.demo.Repositories;

import labwed18303.demo.model.ServiceProvided;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ServiceProvidedRepository extends CrudRepository<ServiceProvided,Long> {
    @Override
    Iterable<ServiceProvided> findAllById(Iterable<Long> iterable);

    ServiceProvided findByid(Long id);


    @Override
    Iterable<ServiceProvided> findAll();
}

