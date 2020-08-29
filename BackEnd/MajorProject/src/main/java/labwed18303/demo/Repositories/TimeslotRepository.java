package labwed18303.demo.Repositories;

import labwed18303.demo.model.Timeslot;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


    @Repository
    public interface TimeslotRepository extends CrudRepository<Timeslot,Long> {
        @Override
        Iterable<Timeslot> findAllById(Iterable<Long> iterable);

        Timeslot findByid(Long id);

        //Timeslot findByDate(String date);

        @Override
        Iterable<Timeslot> findAll();
    }

