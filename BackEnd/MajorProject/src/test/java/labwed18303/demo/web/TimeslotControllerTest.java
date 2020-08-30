package labwed18303.demo.web;

import labwed18303.demo.model.Timeslot;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cassandra.CassandraProperties;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TimeslotControllerTest {
    @Autowired
    private TimeslotController controller;

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;


    @Test
    public void contextLoads() throws Exception {
        assertThat(controller).isNotNull();
    }

    @Test
    public void addTimeslotShouldReturnTimeslot() throws Exception {
        Timeslot timeslot = new Timeslot(1, 30, null, null, null);
        controller.createNewTimeslot(timeslot);
        assertTrue(this.restTemplate.getForObject("http://localhost:" + port + "/api/timeslot/1",
                Timeslot.class).equals(timeslot));
    }
}
