package labwed18303.demo.web;


import  labwed18303.demo.model.Admin;
import labwed18303.demo.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class adminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("")
    public ResponseEntity<Admin> createNewPerson(@RequestBody Admin admin){

        Admin admin1 = adminService.saveOrUpdateAdmin(admin);
        return new ResponseEntity<Admin>(admin, HttpStatus.CREATED);
    }

}