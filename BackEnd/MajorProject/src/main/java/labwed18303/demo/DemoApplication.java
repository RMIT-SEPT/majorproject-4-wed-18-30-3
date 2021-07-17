package labwed18303.demo;


import labwed18303.demo.model.*;
import labwed18303.demo.services.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.text.DateFormat;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@SpringBootApplication
public class DemoApplication {
public static int MIN_DURATION = 30;
public static int NUM_STARTING_TIMESLOTS = 2880;
public static int NUM_STARTING_AVAILABILITIES = 744;

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
        ParsePosition pos = null;
        DateFormat localformatter = new SimpleDateFormat("dd MMM yyyy HH:mm:ss z");
        localformatter.setTimeZone(TimeZone.getDefault());
        DateFormat ausformatter = new SimpleDateFormat("dd MMM yyyy HH:mm:ss z");
        ausformatter.setTimeZone(TimeZone.getTimeZone("AEDT"));
       for(int i = 0; i < NUM_STARTING_TIMESLOTS; ++i){
           pos = new ParsePosition(0);
           String localDate = localformatter.format(new Date(rounded + minDurationMillis * i));
           Date convertedDate = ausformatter.parse(localDate, pos);
           timeslotService.saveOrUpdateTimeslot(new Timeslot(i, 30, convertedDate, now, now));
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
        Date itDate = null;
        int bookingCounter = 0;
        for(int i = 0; i<NUM_STARTING_AVAILABILITIES; ++i){
            pos = new ParsePosition(0);
            itDate = new Date(rounded + (bookingCounter * minDurationMillis));
            String localDate = localformatter.format(itDate);
            itDate = ausformatter.parse(localDate, pos);
            while(itDate.getHours() > 16 || itDate.getHours() < 9){
                ++bookingCounter;
                itDate = new Date(rounded + (bookingCounter * minDurationMillis));
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
