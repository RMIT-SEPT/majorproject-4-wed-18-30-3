package labwed18303.demo.services;

import labwed18303.demo.Repositories.CustomerRepository;
import labwed18303.demo.Repositories.UserRepository;
import labwed18303.demo.exceptions.UserException;
import labwed18303.demo.model.Booking;
import labwed18303.demo.model.Customer;
import labwed18303.demo.model.User;
import labwed18303.demo.model.UserType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private UserService userService;

    public Customer saveOrUpdateCustomer(Customer customer) {
        customer.setUser(userService.addNewUser(customer.getUser()));
        customer.getUser().setUserType(UserType.CUSTOMER);

        return customerRepository.save(customer);
    }

    public Iterable<Customer> findAllCustomers(){
        return customerRepository.findAll();
    }


    public Customer findByUserName(String userName){

        User user = userService.findByUserName(userName);
        Customer customer = customerRepository.findByUser(user);

        return customer;
    }
}
