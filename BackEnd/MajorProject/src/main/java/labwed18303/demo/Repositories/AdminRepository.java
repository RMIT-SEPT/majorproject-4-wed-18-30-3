package labwed18303.demo.Repositories;

import labwed18303.demo.model.Admin;
import labwed18303.demo.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends CrudRepository<Admin,Long> {
    @Override
    Iterable<Admin> findAllById(Iterable<Long> iterable);

    @Override
    Iterable<Admin> findAll();

    Admin findByid(Long id);

    Admin findByUser(User user);


}
