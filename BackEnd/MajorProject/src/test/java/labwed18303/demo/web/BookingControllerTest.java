package labwed18303.demo.web;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import labwed18303.demo.model.*;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

import java.util.Date;

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

    Worker workerHasBooking;
    Worker workerNoBooking;

    Customer custHasBooking;
    Customer custNoBooking;

    Timeslot timeslotHasBooking;
    Timeslot timeslotNoBooking;

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

        serviceHasBooking = new ServiceProvided(1, "Plow", 30);
        serviceController.createNewServiceProvided(serviceHasBooking);

        workerHasBooking = new Worker(1, "Jims Mowing", "password", "Round the Corner", 140000000);
        wController.createNewPerson(workerHasBooking);

        custHasBooking = new Customer(1, "John", "password", "On the Corner", 1234567890);
        custController.createNewPerson(custHasBooking);

        timeslotHasBooking = new Timeslot(1, 30, current, current, current);
        timeslotController.createNewTimeslot(timeslotHasBooking);

        completeBooking = new Booking(1, current, current, workerHasBooking, timeslotHasBooking, custHasBooking, serviceHasBooking);
        bookingController.createNewBooking(completeBooking);
    }

    @Test
    public void contextLoads() throws Exception {
        assertThat(bookingController).isNotNull();
    }

    @Test
    public void addBookingShouldMatchGetBooking() throws Exception {
        assertTrue(this.restTemplate.getForObject("http://localhost:" + port + "/api/booking/1",
                Booking.class).equals(completeBooking));
    }

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
        noTimeslot = new Booking(1, current, current,  workerHasBooking, null, custHasBooking, serviceHasBooking);
        assertFalse(this.restTemplate.getForObject("http://localhost:" + port + "/api/booking/1",
                Booking.class).equals(noTimeslot));
    }

    @Test
    public void wrongTimeslotShouldNotMatchBooking() throws Exception {
        timeslotNoBooking = new Timeslot(2, 30, current, current, current);
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

}
