package labwed18303.demo;

import labwed18303.demo.Repositories.TimeslotRepository;
import labwed18303.demo.model.*;
import labwed18303.demo.services.*;
import labwed18303.demo.web.UserController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootApplication
public class DemoApplication {
public static int MIN_DURATION = 30;

    public static void main(String[] args) {
        ConfigurableApplicationContext app = SpringApplication.run(DemoApplication.class, args);

        Date now = new Date();
        TimeslotService timeslotService = app.getBean(TimeslotService.class);
        ServiceProvidedService serviceProvidedService = app.getBean(ServiceProvidedService.class);
        CustomerService customerService = app.getBean(CustomerService.class);
        WorkerService workerService = app.getBean(WorkerService.class);
        AdminService adminService = app.getBean(AdminService.class);
        BookingService bookingService = app.getBean(BookingService.class);

       long minDurationMillis = 1000 * 60 * MIN_DURATION;
       long trimmed = now.getTime() / minDurationMillis;
       long rounded = trimmed * minDurationMillis;
       for(int i = 0; i < 1440; ++i){
           timeslotService.saveOrUpdateTimeslot(new Timeslot(i, 30, new Date(rounded + minDurationMillis * i), now, now));
       }

       List<ServiceProvided> services = new ArrayList<>();
        services.add(new ServiceProvided(1, "Mowing", 30));
        services.add(new ServiceProvided(1, "Pool Cleaning", 30));
        services.add(new ServiceProvided(1, "Massage", 30));
        services.add(new ServiceProvided(1, "Hedging", 30));
        services.add(new ServiceProvided(1, "Manicure", 30));
        services.add(new ServiceProvided(1, "Pedicure", 30));

       for(ServiceProvided service : services){
           serviceProvidedService.saveOrUpdateServiceProvided(service);
       }


        List<Worker> workers = new ArrayList<>();
        workers.add(new Worker("Jim", "password", "Jim Jamie Jameson", "Round the Corner", 1234567890, services.get(0), "Jim's Mowing"));
        workers.add(new Worker("Wendy", "password", "Wendy Williams", "On the Corner", 1234567890, services.get(1), "Wendy's Masseur"));
        workers.add(new Worker("Dave", "password", "Dave Dilbert", "Round the Corner", 1234567890, services.get(2), "Deep-end Dave's Diligent Deep-Cleans"));
        for(Worker worker : workers){
            workerService.saveOrUpdateWorker(worker);
        }

        List<Admin> admins = new ArrayList<>();
        admins.add(new Admin("Admin", "password", "Trevor Biggs", "Big T's Place", 1234567890));
       for(Admin admin : admins) {
           adminService.saveOrUpdateAdmin(admin);
       }

        List<Customer> customers = new ArrayList<>();
        customerService.saveOrUpdateCustomer(new Customer("Custy", "password", "Colin Cus", "Round the Corner", 1234567890));
        customerService.saveOrUpdateCustomer(new Customer("Customer", "password", "Colonel Custard", "Round the Corner", 1234567890));
        customerService.saveOrUpdateCustomer(new Customer("Kyle", "password", "Kyle Klobuchard", "Round the Corner", 1234567890));
        for(Customer customer : customers){
            customerService.saveOrUpdateCustomer(customer);
        }


        List<Booking> bookings = new ArrayList<>();
        int bookingCounter = 0;
        for(int i = 0; i<100; ++i){
            Date itDate = new Date(rounded + bookingCounter * minDurationMillis);
            while(itDate.getHours() > 16 || itDate.getHours() < 9){
                ++bookingCounter;
                itDate = new Date(rounded + bookingCounter * minDurationMillis);
            }
            for(int j = 0; j < 3; ++j) {
                bookingService.saveOrUpdateBooking(new Booking(i, new Date(), new Date(), workers.get(j), new Timeslot(i, MIN_DURATION, itDate, new Date(), new Date())));
            }
            ++bookingCounter;
        }
        Date finish = new Date();
        System.out.println("Default build took " + Long.toString(finish.getTime() - now.getTime()) + " milliseconds");


    }
    @Bean
    BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

}
