package labwed18303.demo.web;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import labwed18303.demo.exceptions.BookingException;
import labwed18303.demo.exceptions.CustomerException;
import labwed18303.demo.model.*;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)


public class CustomerControllerTest {
    Customer normalCustomer, missingNameCustomer;
    CustomerController customerController;


    @BeforeAll
    public void setUp(){
//        normalCustomer = new Customer(1, "name", "password","address", 13456);
//        missingNameCustomer = new Customer(2, "", "password", "address", 123444);
    }

    @Test
    public void addNewCustomerTest() throws Exception {
        //assertTrue(customerController.createNewPerson(normalCustomer).equals(normalCustomer));
        assertEquals(customerController.createNewPerson(normalCustomer),normalCustomer);
    }









}
