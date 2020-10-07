package labwed18303.demo.web;

import  labwed18303.demo.model.Customer;
import labwed18303.demo.model.User;
import labwed18303.demo.payload.AuthorizationErrorResponse;
import labwed18303.demo.security.JwtTokenProvider;
import labwed18303.demo.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;

import static labwed18303.demo.security.SecurityConstants.HEADER_STRING;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/register")
    public ResponseEntity<Customer> createNewPerson(@RequestBody Customer customer){
        Customer customer1 = customerService.saveOrUpdateCustomer(customer);
        return new ResponseEntity<Customer>(customer1, HttpStatus.FOUND);
    }

    @GetMapping("")
    public ResponseEntity<Iterable<?>> findAllCustomers(@RequestHeader(HEADER_STRING) String auth){
        User user = tokenProvider.getUserFromHeader(auth);
        if(user == null || user.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) == false){
            List<AuthorizationErrorResponse> list = new ArrayList<AuthorizationErrorResponse>();
            list.add(new AuthorizationErrorResponse("Must be an admin"));
            Iterable<AuthorizationErrorResponse> error = list;
            return new ResponseEntity(error, HttpStatus.valueOf(401));
        }
        return new ResponseEntity(customerService.findAllCustomers(), HttpStatus.OK);
    }


    @GetMapping("/{userName}")
    public ResponseEntity<?> getCustomerById(@RequestHeader(HEADER_STRING) String auth, @PathVariable String userName){
        User user = tokenProvider.getUserFromHeader(auth);
        if(user == null || (user.getUserName().compareTo(userName) != 0 && user.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) == false)){
            AuthorizationErrorResponse error = new AuthorizationErrorResponse("Do not have permission");
            return new ResponseEntity(error, HttpStatus.valueOf(401));
        }
        Customer customer = customerService.findByUserName(userName);

        return new ResponseEntity<Customer>(customer, HttpStatus.OK);
    }



}
