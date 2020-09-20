package labwed18303.demo.Repositories;


import labwed18303.demo.model.Timeslot;
import labwed18303.demo.model.Worker;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface WorkerRepository extends CrudRepository<Worker,Long> {
    @Override
    Iterable<Worker> findAllById(Iterable<Long> iterable);

   // Worker findByUserName(String userName);

    Worker findByid(Long id);

    @Override
    Iterable<Worker> findAll();
}
