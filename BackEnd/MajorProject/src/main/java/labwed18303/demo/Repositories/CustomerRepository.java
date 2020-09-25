package labwed18303.demo.Repositories;

import labwed18303.demo.model.Admin;
import labwed18303.demo.model.Booking;
import labwed18303.demo.model.Customer;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends CrudRepository<Customer,Long>{
    @Override
    Iterable<Customer> findAllById(Iterable<Long> iterable);

    Customer findByid(Long id);

    Customer findByUserName(String UserName);

    @Override
    Iterable<Customer> findAll();

}
