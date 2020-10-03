package labwed18303.demo.services;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import labwed18303.demo.exceptions.BookingException;
import labwed18303.demo.model.*;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class BookingServiceTest {

    @Autowired
    private WorkerService workerService;

    @Autowired
    private TimeslotService timeslotService;

    @Autowired
    private CustomerService custService;

    @Autowired
    private ServiceProvidedService serviceService;

    @Autowired
    private BookingService bookingService;

    Date current;
    Date future;
    Date wrong;

    Worker workerHasBooking;
    Worker workerNoBooking;

    Customer custHasBooking;
    Customer custNoBooking;

    Timeslot timeslotHasBooking;
    Timeslot timeslotNoBooking;

    Timeslot timeslotInPast;

    Set<ServiceProvided> services = new HashSet<>();
    ServiceProvided serviceHasBooking;
    ServiceProvided serviceNoBooking;

    Booking completeBooking;
    Booking noWorker;
    Booking wrongWorker;
    Booking wrongCustomer;
    Booking noCustomer;
    Booking wrongTimeslot;
    Booking noTimeslot;
    Booking noService;
    Booking wrongService;

    @Bean
    BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @BeforeAll
    public void setUp(){
        current = new Date();
        future = new Date(current.getYear()+1, 1, 1);
        wrong = new Date(current.getYear()+1, 2, 1);


        serviceHasBooking = new ServiceProvided(1, "Plow", 30);
        serviceService.saveOrUpdateServiceProvided(serviceHasBooking);
        services.add(serviceHasBooking);
        workerHasBooking = new Worker("Test Worker", "password", "Olivia Testosterone", "Round the Corner", 140000000, services, "Jim's Mowing");
        workerService.saveOrUpdateWorker(workerHasBooking);

        custHasBooking = new Customer("Test Customer", "password", "Test Testington", "On the Corner", 1234567890);
        custService.saveOrUpdateCustomer(custHasBooking);

        timeslotHasBooking = new Timeslot(1, 30, future, current, current);
        timeslotService.saveOrUpdateTimeslot(timeslotHasBooking);

        completeBooking = new Booking(1, current, current, workerHasBooking, timeslotHasBooking, custHasBooking, serviceHasBooking);
        bookingService.saveOrUpdateBooking(completeBooking);
    }

    //Sanity Check
    @Test
    public void contextLoads() throws Exception {
        assertThat(bookingService).isNotNull();
    }

    //Successfully Create Check:
    @Test
    public void addBookingNoError() throws Exception {
        assertDoesNotThrow(()-> {
            bookingService.saveOrUpdateBooking(completeBooking);
        });
    }

    @Test
    public void addBookingShouldMatchGetBooking() throws Exception {
        bookingService.saveOrUpdateBooking(completeBooking);
        assertTrue(bookingService.findByTimeslotWorker(completeBooking).equals(completeBooking));
    }

    //Checks to ensure objects being stored correctly:

    @Test
    public void noWorkerShouldNotMatchBooking() throws Exception {
        noWorker = new Booking(1, current, current, null, timeslotHasBooking, custHasBooking, serviceHasBooking);
        assertFalse(this.bookingService.findByTimeslotWorker(completeBooking).equals(noWorker));
    }

    @Test
    public void wrongWorkerShouldNotMatchBooking() throws Exception {
        workerNoBooking = new Worker("Mr Plow", "password", "Test Testington", "742 Evergreen Terrace", 123456789, "Jim's Mowing");
        wrongWorker = new Booking(1, current, current,  workerNoBooking, timeslotHasBooking, custHasBooking, serviceHasBooking);
        assertFalse(bookingService.findByTimeslotWorker(completeBooking).equals(wrongWorker));
    }

    @Test
    public void noCustomerShouldNotMatchBooking() throws Exception {
        noCustomer = new Booking(1, current, current, workerHasBooking, timeslotHasBooking, null, serviceHasBooking);
        assertFalse(bookingService.findByTimeslotWorker(completeBooking).equals(noCustomer));
    }

    @Test
    public void wrongCustomerShouldNotMatchBooking() throws Exception {
        //custNoBooking = new Customer(2, "Moe Sizlach", "password", "Beside the Church?", 123456789);
        wrongCustomer = new Booking(1, current, current,  workerHasBooking, timeslotHasBooking, custNoBooking, serviceHasBooking);
        assertFalse(bookingService.findByTimeslotWorker(completeBooking).equals(wrongCustomer));
    }

    @Test
    public void noTimeslotShouldNotMatchBooking() throws Exception {
        bookingService.saveOrUpdateBooking(completeBooking);
        noTimeslot = new Booking(1, current, current,  workerHasBooking, null, custHasBooking, serviceHasBooking);
        assertFalse(bookingService.findByTimeslotWorker(completeBooking).equals(noTimeslot));
    }


    @Test
    public void wrongTimeslotShouldNotMatchBooking() throws Exception {
        timeslotNoBooking = new Timeslot(2, 30, wrong, current, current);
        wrongTimeslot = new Booking(1, current, current, workerHasBooking, timeslotNoBooking, custHasBooking, serviceHasBooking);
        assertFalse(bookingService.findByTimeslotWorker(completeBooking).equals(wrongTimeslot));
    }

    @Test
    public void noServiceShouldNotMatchBooking() throws Exception {
        noService = new Booking(1, current, current, workerHasBooking, timeslotHasBooking, custHasBooking, null);
        assertFalse(bookingService.findByTimeslotWorker(completeBooking).equals(noService));
    }

    @Test
    public void wrongServiceShouldNotMatchBooking() throws Exception {
        serviceNoBooking = new ServiceProvided(2, "Hedge Trim", 30);
        wrongTimeslot = new Booking(1, current, current, workerHasBooking, timeslotHasBooking, custHasBooking, serviceNoBooking);
        assertFalse(bookingService.findByTimeslotWorker(completeBooking).equals(wrongService));
    }

    //Business Logic Tests:
    @Test
    public void noTimeslotShouldThrowError() throws Exception {
        noTimeslot = new Booking(1, current, current,  workerHasBooking, null, custHasBooking, serviceHasBooking);
        assertThrows(BookingException.class,() -> {
            bookingService.saveOrUpdateBooking(noTimeslot);
        });
    }

    @Test
    public void noWorkerShouldThrowError() throws Exception {
        noWorker = new Booking(1, current, current, null, timeslotHasBooking, custHasBooking, serviceHasBooking);
        assertThrows(BookingException.class, () -> {
            bookingService.saveOrUpdateBooking(noWorker);
        });
    }

    @Test
    public void availabilityShouldNotThrow() throws Exception {
        Booking availability = new Booking(2, current, current, workerHasBooking, timeslotHasBooking);
        assertDoesNotThrow(()-> {
            bookingService.saveOrUpdateBooking(availability);
        });
    }

    @Test
    public void noServiceShouldThrowError() throws Exception {
        noWorker = new Booking(1, current, current, workerHasBooking, timeslotHasBooking, custHasBooking, null);
        assertThrows(BookingException.class, () -> {
            bookingService.saveOrUpdateBooking(noWorker);
        });
    }

    @Test
    public void wrongServiceShouldThrowError() throws Exception {
        ServiceProvided wrongService = new ServiceProvided(2, "Trim", 30);
        serviceService.saveOrUpdateServiceProvided(wrongService);
        noWorker = new Booking(1, current, current, workerHasBooking, timeslotHasBooking, custHasBooking, wrongService);
        assertThrows(BookingException.class, () -> {
            bookingService.saveOrUpdateBooking(noWorker);
        });
    }

    @Test
    public void makePastBookingThrowsError() throws Exception {
        Date current = new Date();
        Date past = new Date(current.getYear(), current.getMonth(), current.getDate(), current.getHours()-1, current.getMinutes());
        timeslotInPast = new Timeslot(9457, 30, past, current, current);
        timeslotService.saveOrUpdateTimeslot(timeslotInPast);
        Booking booking = new Booking(1, current, current, workerHasBooking, timeslotInPast, custHasBooking, serviceHasBooking);
        assertThrows(BookingException.class,() -> {
            bookingService.saveOrUpdateBooking(booking);
        });
    }

    @Test
    public void deleteBookingBefore48ThrowsError(){
        Date current = new Date();
        long fortySevenHours = 47*60*60*1000;
        Date under48 = new Date(current.getTime() + fortySevenHours);
        Timeslot timeslot = new Timeslot(48, 30, under48, current, current);
        timeslotService.saveOrUpdateTimeslot(timeslot);
        Booking booking = new Booking(48, current, current, workerHasBooking, timeslot, custHasBooking, serviceHasBooking);
        bookingService.saveOrUpdateBooking(booking);
        assertThrows(BookingException.class,() -> {
            bookingService.deleteBookingByIdentifier(bookingService.findByTimeslotWorker(booking).getId());
        });
    }

    @Test
    public void deleteBookingAfter48DoesNotThrowError(){
        Date current = new Date();
        long fortyNineHours = 49*60*60*1000;
        Date over48 = new Date(current.getTime()+fortyNineHours);
        Timeslot timeslot = new Timeslot(49, 30, over48, current, current);
        timeslotService.saveOrUpdateTimeslot(timeslot);
        Timeslot upcoming = timeslotService.findByDate(timeslot.getDate());
        Booking booking = new Booking(49, current, current, workerHasBooking, upcoming, custHasBooking, serviceHasBooking);
        Booking repoBooking = bookingService.saveOrUpdateBooking(booking);
        assertDoesNotThrow(() -> {
            bookingService.deleteBookingByIdentifier(bookingService.findByTimeslotWorker(repoBooking).getId());
        });
    }


}
