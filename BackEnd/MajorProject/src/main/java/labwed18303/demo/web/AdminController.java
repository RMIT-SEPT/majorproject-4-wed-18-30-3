package labwed18303.demo.web;


import  labwed18303.demo.model.Admin;
import labwed18303.demo.model.Booking;
import labwed18303.demo.model.User;
import labwed18303.demo.payload.AuthorizationErrorResponse;
import labwed18303.demo.security.JwtTokenProvider;
import labwed18303.demo.services.AdminService;
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
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/register")
    public ResponseEntity<?> createAdminUser(@RequestBody Admin admin)
    {
        Admin admin1 =  adminService.saveOrUpdateAdmin(admin);

        return new ResponseEntity<Admin>(admin1, HttpStatus.CREATED);
    }
    
    @GetMapping("")
    public ResponseEntity<?> getAllAdmins(@RequestHeader(HEADER_STRING) String auth){
        User user = tokenProvider.getUserFromHeader(auth);
        if(user == null || user.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) == false){
            List<AuthorizationErrorResponse> list = new ArrayList<AuthorizationErrorResponse>();
            list.add(new AuthorizationErrorResponse("Must be an admin"));
            Iterable<AuthorizationErrorResponse> error = list;
            return new ResponseEntity(error, HttpStatus.valueOf(401));
        }

        return new ResponseEntity(adminService.findAllAdmins(), HttpStatus.OK);
    }

    @GetMapping("/{userName}")
    public ResponseEntity<?> getAdminById(@RequestHeader(HEADER_STRING) String auth, @PathVariable String userName){
        User user = tokenProvider.getUserFromHeader(auth);
        if(user == null || user.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) == false){
            AuthorizationErrorResponse error = new AuthorizationErrorResponse("Do not have permission");
            return new ResponseEntity(error, HttpStatus.valueOf(401));
        }
        Admin admin1 =  adminService.findByUserName(userName);


        return new ResponseEntity<Admin>(admin1, HttpStatus.OK);
    }
}