package labwed18303.demo.web;

import labwed18303.demo.exceptions.TimeslotException;
import labwed18303.demo.model.Timeslot;
import labwed18303.demo.services.TimeslotService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cassandra.CassandraProperties;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class TimeslotControllerTest {
    @Autowired
    private TimeslotController controller;

    @Autowired
    private TimeslotService timeslotService;

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    Timeslot timeslot;
    Date current;
    Date otherDate;
    Date wrongDate;

    @BeforeAll
    public void setup(){
        current = new Date();
        otherDate = new Date(current.getYear()+1, 1, 1);
        wrongDate = new Date(2019, 12,12);
        timeslot = new Timeslot(1, 30, current, current, current);
        controller.createNewTimeslot(timeslot);
    }


    @Test
    public void contextLoads() throws Exception {
        assertThat(controller).isNotNull();
    }

    @Test
    public void addTimeslotShouldNotError(){
        Timeslot otherTimeslot = new Timeslot(2, 30, otherDate, current, current);
        assertDoesNotThrow(()-> {
            controller.createNewTimeslot(otherTimeslot);
        });
    }

    @Test
    public void addTimeslotShouldReturnTimeslot() throws Exception {
        assertTrue(this.restTemplate.getForObject("http://localhost:" + port + "/api/timeslot/1",
                Timeslot.class).equals(timeslot));
    }

    @Test
    public void wrongDateShouldNotMatch() throws Exception {
        Timeslot wrongDateTimeslot = new Timeslot(1, 30, wrongDate, current, current);
        assertFalse(this.restTemplate.getForObject("http://localhost:" + port + "/api/timeslot/1",
                Timeslot.class).equals(wrongDateTimeslot));
    }

    @Test
    public void noDateShouldThrowError() throws Exception {
        Timeslot noDate = new Timeslot(1, 30, null, new Date(), new Date());
        assertThrows(TimeslotException.class, () -> {
            controller.createNewTimeslot(noDate);
        });
    }

    @Test
    public void noDurationShouldThrowError() throws Exception {
        Timeslot noDuration = new Timeslot(1, 0, new Date(), new Date(), new Date());
        assertThrows(TimeslotException.class, () -> {
            controller.createNewTimeslot(noDuration);
        });
    }

    @Test
    public void addingExistingDateShouldNotChange() throws Exception{
        Timeslot toChange = new Timeslot(999999, 10, current, current, current);
        Timeslot duplicate = new Timeslot(999999, 10, current, current, current);
        assertFalse(
                timeslotService.saveOrUpdateTimeslot(toChange).equals(duplicate)
        );
    }
}
