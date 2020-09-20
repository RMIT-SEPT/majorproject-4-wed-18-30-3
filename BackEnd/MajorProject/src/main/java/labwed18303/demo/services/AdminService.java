package labwed18303.demo.services;

import labwed18303.demo.Repositories.AdminRepository;
import labwed18303.demo.exceptions.BookingException;
import labwed18303.demo.model.Admin;
import labwed18303.demo.model.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    public Admin saveOrUpdateAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public Admin findByid(Long id){

        Admin admin = adminRepository.findByid(id);

        return admin;
    }


}
