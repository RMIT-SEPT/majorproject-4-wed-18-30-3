package labwed18303.demo.services;

import labwed18303.demo.Repositories.AdminRepository;
import labwed18303.demo.model.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    public Admin saveOrUpdateAdmin(Admin person) {
        return adminRepository.save(person);
    }

}
