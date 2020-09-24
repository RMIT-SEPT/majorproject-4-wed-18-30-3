package labwed18303.demo.web;


import labwed18303.demo.model.*;
import labwed18303.demo.services.CustomerService;
import labwed18303.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin

public class UserController {
    @Autowired
    UserService userService;

    @PutMapping("")
    public ResponseEntity<User> editUser(@RequestBody User user){

        User user1 = userService.saveOrUpdateCustomer(user);

        return new ResponseEntity<User>(user1, HttpStatus.CREATED);
    }

    @PostMapping("")
    public ResponseEntity<User> loginAsUser(@RequestBody User user){

        User user1 = userService.findByUserNameAndPassword(user);

        return new ResponseEntity<User>(user1, HttpStatus.CREATED);
    }






}
