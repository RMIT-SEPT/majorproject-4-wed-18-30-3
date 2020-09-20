package labwed18303.demo.web;


import labwed18303.demo.model.*;
import labwed18303.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/User")
@CrossOrigin

public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("")
    public ResponseEntity<User> loginAsUser(@RequestBody User user){

        User user1 = userService.findByUserNameAndPassword(user);

        return new ResponseEntity<User>(user1, HttpStatus.CREATED);
    }


}
