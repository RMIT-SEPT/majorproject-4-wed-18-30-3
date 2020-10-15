package labwed18303.demo.services;

import labwed18303.demo.exceptions.TimeslotException;
import labwed18303.demo.exceptions.UserException;
import labwed18303.demo.model.Customer;
import labwed18303.demo.model.Timeslot;
import labwed18303.demo.model.User;
import labwed18303.demo.model.UserType;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class UserTest {
    @Autowired
    private AdminService adminService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private UserService userService;

    Customer customer;
    Customer customer2;

    User user;
    User user2;

    @BeforeAll
    public void setup() {
        user = new User("userName", "password", "fullName", "address", 123, UserType.CUSTOMER);
        user2 = new User("1", "2", "3", "address", 123, UserType.CUSTOMER);

        customer = new Customer(user);
        customer2 = new Customer(user2);


    }

    @Test
    public void signup_addNewCustomer_true() throws Exception {
        assertTrue(userService.addNewUser(user).equals(customer.getUser()));
    }

    @Test
    public void singup_addnullDupilicateCustomer_true() throws Exception {
        assertDoesNotThrow(() -> {
            userService.checkDuplicateUserName(user);
        });
    }

    @Test
    public void edit_nullUser_false() throws Exception {
        assertThrows(UserException.class, () -> {
            userService.saveOrUpdateCustomer(user);
        });
    }


    @Test
    public void add_newCustomer_true() throws Exception {
        assertDoesNotThrow(() -> {
            customerService.saveOrUpdateCustomer(customer2);
        });
    }
}
