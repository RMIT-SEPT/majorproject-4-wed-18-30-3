package labwed18303.demo.web;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertTrue;

import labwed18303.demo.model.Booking;
import labwed18303.demo.model.Timeslot;
import labwed18303.demo.model.Worker;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

import java.util.Date;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class BookingControllerTest {
    @Autowired
    private BookingController bookingController;

    @Autowired
    private workerController wController;

    @Autowired
    private TimeslotController timeslotController;

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;


    @Test
    public void contextLoads() throws Exception {
        assertThat(bookingController).isNotNull();
    }

    @Test
    public void addBookingShouldMatchGetBooking() throws Exception {
        Worker worker = new Worker(1, "Jims Mowing", "password", "Round the Corner", 0400000000);
        wController.createNewPerson(worker);

        Timeslot timeslot = new Timeslot(1, 30, null, null, null);
        timeslotController.createNewTimeslot(timeslot);
        Booking booking = new Booking(1, null, null, worker, timeslot);
        bookingController.createNewBooking(booking);
        assertTrue(this.restTemplate.getForObject("http://localhost:" + port + "/api/booking/1",
                Booking.class).equals(booking));
    }
}
