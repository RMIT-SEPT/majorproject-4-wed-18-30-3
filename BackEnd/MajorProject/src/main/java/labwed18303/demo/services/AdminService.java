package labwed18303.demo.services;

import labwed18303.demo.Repositories.AdminRepository;
import labwed18303.demo.exceptions.BookingException;
import labwed18303.demo.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private UserService userService;

    public Admin saveOrUpdateAdmin(Admin admin){
        admin.setUser(userService.addNewUser(admin.getUser()));

        admin.getUser().setUserType(UserType.ADMIN);
        return adminRepository.save(admin);
    }

    public Iterable<Admin> findAllAdmins(){
        return adminRepository.findAll();
    }

    public Admin findByUserName(String userName){

        User user = userService.findByUserName(userName);
        Admin admin = adminRepository.findByUser(user);

        return admin;
    }


}
