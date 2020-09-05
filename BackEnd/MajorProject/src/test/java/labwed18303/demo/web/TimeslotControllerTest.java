package labwed18303.demo.web;

import labwed18303.demo.exceptions.TimeslotException;
import labwed18303.demo.model.Timeslot;
import org.junit.jupiter.api.BeforeAll;
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

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    Timeslot timeslot;
    Date current;
    Date wrongDate;

    @BeforeAll
    public void setup(){
        current = new Date();
        wrongDate = new Date(2019, 12,12);
        timeslot = new Timeslot(1, 30, current, current, current);
    }

    @Test
    public void contextLoads() throws Exception {
        assertThat(controller).isNotNull();
    }

    @Test
    public void addTimeslotShouldNotError(){
        assertDoesNotThrow(()-> {
            controller.createNewTimeslot(timeslot);
        });
    }

    @Test
    public void addTimeslotShouldReturnTimeslot() throws Exception {
        controller.createNewTimeslot(timeslot);
        assertTrue(this.restTemplate.getForObject("http://localhost:" + port + "/api/timeslot/1",
                Timeslot.class).equals(timeslot));
    }

    @Test
    public void wrongDateShouldNotMatch() throws Exception {
        controller.createNewTimeslot(timeslot);
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
    public void durationCannotBeChanged() throws Exception{
        Timeslot toChange = new Timeslot(1, 10, current, current, current);
        controller.createNewTimeslot(timeslot);
        controller.createNewTimeslot(toChange);
        assertTrue(this.restTemplate.getForObject("http://localhost:" + port + "/api/timeslot/1",
                Timeslot.class).equals(timeslot));
    }
}
