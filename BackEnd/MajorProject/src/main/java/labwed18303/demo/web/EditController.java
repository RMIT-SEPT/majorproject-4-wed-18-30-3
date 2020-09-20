package labwed18303.demo.web;


import labwed18303.demo.model.*;
import labwed18303.demo.services.CustomerService;
import labwed18303.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/edit")
@CrossOrigin

public class EditController {
    @Autowired
    UserService userService;

    @PostMapping("")
    public ResponseEntity<User> editUserProfile(@RequestBody User user){

        User user1 = userService.findByUserIdAndEdit(user);

        return new ResponseEntity<User>(user1, HttpStatus.CREATED);
    }


}
