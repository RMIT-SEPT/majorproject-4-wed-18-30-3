package labwed18303.demo.Repositories;

import labwed18303.demo.model.*;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

    @Repository
    public interface BookingRepository extends CrudRepository<Booking,Long> {
        @Override
        Iterable<Booking> findAllById(Iterable<Long> iterable);


        Booking findByid(Long bookingId);

        @Override
        Iterable<Booking> findAll();

        Iterable<Booking> findByCustomerIsNull();

        Booking findByTimeslotAndWorker(Timeslot timeslot, Worker worker);

    }

