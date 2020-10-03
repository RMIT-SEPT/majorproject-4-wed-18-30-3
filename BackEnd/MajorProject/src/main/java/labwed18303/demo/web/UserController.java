package labwed18303.demo.web;


import labwed18303.demo.model.*;
import labwed18303.demo.payload.JWTLoginSuccessResponse;
import labwed18303.demo.security.JwtTokenProvider;
import labwed18303.demo.services.MapValidationErrorService;
import labwed18303.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

import static labwed18303.demo.security.SecurityConstants.TOKEN_PREFIX;


@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    MapValidationErrorService mapValidationErrorService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PutMapping("")
    public ResponseEntity<User> editUser(@RequestBody User user){

        User user1 = userService.saveOrUpdateCustomer(user);

        return new ResponseEntity<User>(user1, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginAsUser(@Valid @RequestBody User user, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX +  tokenProvider.generateToken(authentication);
        UserType userType = userService.findByUserName(tokenProvider.getUserNameFromJWT(jwt.substring(7))).getUserType();

        return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt, userType));
    }






}
