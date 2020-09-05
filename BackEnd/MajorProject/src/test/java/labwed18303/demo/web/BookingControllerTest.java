package labwed18303.demo.web;
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

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class BookingControllerTest {
    @Autowired
    private BookingController bookingController;

    @Autowired
    private workerController wController;

    @Autowired
    private TimeslotController timeslotController;

    @Autowired
    private customerController custController;

    @Autowired
    private ServiceProvidedController serviceController;

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    Date current;
    Date future;

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



    @BeforeAll
    public void setUp(){
        current = new Date();
        future = new Date(2020,11,21);


        serviceHasBooking = new ServiceProvided(1, "Plow", 30);
        serviceController.createNewServiceProvided(serviceHasBooking);
        services.add(serviceHasBooking);

        workerHasBooking = new Worker(1, "Jims Mowing", "password", "Round the Corner", 140000000, services);
        wController.createNewPerson(workerHasBooking);

        custHasBooking = new Customer(1, "John", "password", "On the Corner", 1234567890);
        custController.createNewPerson(custHasBooking);

        timeslotHasBooking = new Timeslot(1, 30, future, current, current);
        timeslotController.createNewTimeslot(timeslotHasBooking);

        completeBooking = new Booking(1, current, current, workerHasBooking, timeslotHasBooking, custHasBooking, serviceHasBooking);
        bookingController.createNewBooking(completeBooking);
    }

    //Sanity Check
    @Test
    public void contextLoads() throws Exception {
        assertThat(bookingController).isNotNull();
    }

    //Successfully Create Check:
    @Test
    public void addBookingNoError() throws Exception {
        assertDoesNotThrow(()-> {
            bookingController.createNewBooking(completeBooking);
        });
    }

    @Test
    public void addBookingShouldMatchGetBooking() throws Exception {
        assertTrue(this.restTemplate.getForObject("http://localhost:" + port + "/api/booking/1",
                Booking.class).equals(completeBooking));
    }

    //Checks to ensure objects being stored correctly:

    @Test
    public void noWorkerShouldNotMatchBooking() throws Exception {
        noWorker = new Booking(1, current, current, null, timeslotHasBooking, custHasBooking, serviceHasBooking);
        assertFalse(this.restTemplate.getForObject("http://localhost:" + port + "/api/booking/1",
                Booking.class).equals(noWorker));
    }

    @Test
    public void wrongWorkerShouldNotMatchBooking() throws Exception {
        workerNoBooking = new Worker(2, "Mr Plow", "password", "742 Evergreen Terrace", 123456789);
        wrongWorker = new Booking(1, current, current,  workerNoBooking, timeslotHasBooking, custHasBooking, serviceHasBooking);
        assertFalse(this.restTemplate.getForObject("http://localhost:" + port + "/api/booking/1",
                Booking.class).equals(wrongWorker));
    }

    @Test
    public void noCustomerShouldNotMatchBooking() throws Exception {
        noCustomer = new Booking(1, current, current, workerHasBooking, timeslotHasBooking, null, serviceHasBooking);
        assertFalse(this.restTemplate.getForObject("http://localhost:" + port + "/api/booking/1",
                Booking.class).equals(noCustomer));
    }

    @Test
    public void wrongCustomerShouldNotMatchBooking() throws Exception {
        custNoBooking = new Customer(2, "Moe Sizlach", "password", "Beside the Church?", 123456789);
        wrongCustomer = new Booking(1, current, current,  workerHasBooking, timeslotHasBooking, custNoBooking, serviceHasBooking);
        assertFalse(this.restTemplate.getForObject("http://localhost:" + port + "/api/booking/1",
                Booking.class).equals(wrongCustomer));
    }

    @Test
    public void noTimeslotShouldNotMatchBooking() throws Exception {
        bookingController.createNewBooking(completeBooking);
        noTimeslot = new Booking(1, current, current,  workerHasBooking, null, custHasBooking, serviceHasBooking);
        assertFalse(this.restTemplate.getForObject("http://localhost:" + port + "/api/booking/1",
                Booking.class).equals(noTimeslot));
    }


    @Test
    public void wrongTimeslotShouldNotMatchBooking() throws Exception {
        timeslotNoBooking = new Timeslot(2, 30, future, current, current);
        wrongTimeslot = new Booking(1, current, current, workerHasBooking, timeslotNoBooking, custHasBooking, serviceHasBooking);
        assertFalse(this.restTemplate.getForObject("http://localhost:" + port + "/api/booking/1",
                Booking.class).equals(wrongTimeslot));
    }

    @Test
    public void noServiceShouldNotMatchBooking() throws Exception {
        noService = new Booking(1, current, current, workerHasBooking, timeslotHasBooking, custHasBooking, null);
        assertFalse(this.restTemplate.getForObject("http://localhost:" + port + "/api/booking/1",
                Booking.class).equals(noService));
    }

    @Test
    public void wrongServiceShouldNotMatchBooking() throws Exception {
        serviceNoBooking = new ServiceProvided(2, "Hedge Trim", 30);
        wrongTimeslot = new Booking(1, current, current, workerHasBooking, timeslotHasBooking, custHasBooking, serviceNoBooking);
        assertFalse(this.restTemplate.getForObject("http://localhost:" + port + "/api/booking/1",
                Booking.class).equals(wrongService));
    }

    //Business Logic Tests:
    @Test
    public void noTimeslotShouldThrowError() throws Exception {
        noTimeslot = new Booking(1, current, current,  workerHasBooking, null, custHasBooking, serviceHasBooking);
        assertThrows(BookingException.class,() -> {
            bookingController.createNewBooking(noTimeslot);
        });
    }

    @Test
    public void noWorkerShouldThrowError() throws Exception {
        noWorker = new Booking(1, current, current, null, timeslotHasBooking, custHasBooking, serviceHasBooking);
        assertThrows(BookingException.class, () -> {
            bookingController.createNewBooking(noWorker);
        });
    }

    @Test
    public void availabilityShouldNotThrow() throws Exception {
        Booking availability = new Booking(2, current, current, workerHasBooking, timeslotHasBooking);
        assertDoesNotThrow(()-> {
            bookingController.createNewBooking(availability);
        });
    }

    @Test
    public void noServiceShouldThrowError() throws Exception {
        noWorker = new Booking(1, current, current, workerHasBooking, timeslotHasBooking, custHasBooking, null);
        assertThrows(BookingException.class, () -> {
            bookingController.createNewBooking(noWorker);
        });
    }

    @Test
    public void wrongServiceShouldThrowError() throws Exception {
        ServiceProvided wrongService = new ServiceProvided(2, "Trim", 30);
        serviceController.createNewServiceProvided(wrongService);
        noWorker = new Booking(1, current, current, workerHasBooking, timeslotHasBooking, custHasBooking, wrongService);
        assertThrows(BookingException.class, () -> {
            bookingController.createNewBooking(noWorker);
        });
    }

    @Test
    public void makePastBookingThrowsError() throws Exception {
        Date past = new Date(2020, 8, 31);
        timeslotInPast = new Timeslot(3, 30, past, current, current);
        timeslotController.createNewTimeslot(timeslotInPast);
        Booking booking = new Booking(1, current, current, workerHasBooking, timeslotInPast, custHasBooking, serviceHasBooking);
        assertThrows(BookingException.class,() -> {
            bookingController.createNewBooking(booking);
        });
    }





}
