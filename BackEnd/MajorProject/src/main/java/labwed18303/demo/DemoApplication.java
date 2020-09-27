package labwed18303.demo;

import labwed18303.demo.model.User;
import labwed18303.demo.model.UserType;
import labwed18303.demo.web.UserController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args); }
        BCryptPasswordEncoder bCryptPasswordEncoder() {return new BCryptPasswordEncoder();}

}
