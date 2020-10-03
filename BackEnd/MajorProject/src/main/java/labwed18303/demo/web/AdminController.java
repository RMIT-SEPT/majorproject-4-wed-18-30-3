package labwed18303.demo.web;


import  labwed18303.demo.model.Admin;
import labwed18303.demo.model.Booking;
import labwed18303.demo.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @PostMapping("/register")
    public ResponseEntity<Admin> createAdminUser(@RequestBody Admin admin)
    {
        Admin admin1 =  adminService.saveOrUpdateAdmin(admin);

        return new ResponseEntity<Admin>(admin1, HttpStatus.CREATED);
    }
    
    @GetMapping("")
    public Iterable<Admin> getAllAdmins(){
        return adminService.findAllAdmins();
    }

    @GetMapping("/{userName}")
    public ResponseEntity<?> getAdminById(@PathVariable String userName){

        Admin admin1 =  adminService.findByUserName(userName);


        return new ResponseEntity<Admin>(admin1, HttpStatus.OK);
    }
}