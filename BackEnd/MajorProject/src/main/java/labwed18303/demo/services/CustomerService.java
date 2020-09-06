package labwed18303.demo.services;

import labwed18303.demo.Repositories.CustomerRepository;
import labwed18303.demo.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public Customer saveOrUpdateCustomer(Customer person) {
            return customerRepository.save(person);
    }
}
