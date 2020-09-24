package labwed18303.demo.web;

import  labwed18303.demo.model.Customer;
import labwed18303.demo.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping("")
    public ResponseEntity<Customer> createNewPerson(@RequestBody Customer customer){

        Customer customer1 = customerService.saveOrUpdateCustomer(customer);
        return new ResponseEntity<Customer>(customer1, HttpStatus.FOUND);
    }



    @GetMapping("/{userName}")
    public ResponseEntity<?> getCustomerById(@PathVariable String userName){

        Customer customer = customerService.findByUserName(userName);

        return new ResponseEntity<Customer>(customer, HttpStatus.OK);
    }

}
