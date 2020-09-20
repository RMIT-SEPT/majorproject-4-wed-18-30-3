package labwed18303.demo.web;


import  labwed18303.demo.model.Admin;
import labwed18303.demo.model.Booking;
import labwed18303.demo.services.AdminService;
import labwed18303.demo.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class adminController {
    @Autowired
    private AdminService adminService;

    @PostMapping("")
    public ResponseEntity<Admin> createAdminUser(@RequestBody Admin admin)
    {
        Admin admin1 =  adminService.saveOrUpdateAdmin(admin);

        return new ResponseEntity<Admin>(admin1, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAdminById(@PathVariable Long id){

        Admin admin1 =  adminService.findByid(id);


        return new ResponseEntity<Admin>(admin1, HttpStatus.OK);
    }
}