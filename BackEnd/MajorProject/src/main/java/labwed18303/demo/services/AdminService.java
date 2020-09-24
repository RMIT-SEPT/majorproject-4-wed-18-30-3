package labwed18303.demo.services;

import labwed18303.demo.Repositories.AdminRepository;
import labwed18303.demo.exceptions.BookingException;
import labwed18303.demo.model.Admin;
import labwed18303.demo.model.Booking;
import labwed18303.demo.model.UserType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private UserService userService;

    public Admin saveOrUpdateAdmin(Admin admin){
        userService.checkNullValue(admin.getUser());
        userService.checkDuplicateUserName(admin.getUser());

        admin.setUserName(admin.getUser().getUserName());

        admin.getUser().setUserType(UserType.ADMIN);
        return adminRepository.save(admin);
    }

    public Admin findByUserName(String userName){

        Admin admin = adminRepository.findByUserName(userName);

        return admin;
    }


}
