package labwed18303.demo.Repositories;

import labwed18303.demo.model.*;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;



@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    List<User> findByUserName(String userName);

    User findByid(long id);

}
