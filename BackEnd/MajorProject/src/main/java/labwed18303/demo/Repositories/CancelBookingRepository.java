package labwed18303.demo.Repositories;

import labwed18303.demo.model.CancelBooking;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CancelBookingRepository extends CrudRepository<CancelBooking,Long> {
    CancelBooking findByid(Long id);
}
