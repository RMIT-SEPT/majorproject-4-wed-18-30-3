package labwed18303.demo.services;

import labwed18303.demo.exceptions.TimeslotException;
import labwed18303.demo.model.Timeslot;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class TimeslotServiceTest {
    @Autowired
    private TimeslotService timeslotService;

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
        timeslotService.saveOrUpdateTimeslot(timeslot);
    }


    @Test
    public void contextLoads() throws Exception {
        assertThat(timeslotService).isNotNull();
    }

    @Test
    public void addTimeslotShouldNotError(){
        Timeslot otherTimeslot = new Timeslot(2, 30, otherDate, current, current);
        assertDoesNotThrow(()-> {
            timeslotService.saveOrUpdateTimeslot(otherTimeslot);
        });
    }

    @Test
    public void addTimeslotShouldReturnTimeslot() throws Exception {
        assertTrue(timeslotService.findByDate(timeslot.getDate()).equals(timeslot));
    }

    @Test
    public void wrongDateShouldNotMatch() throws Exception {
        Timeslot wrongDateTimeslot = new Timeslot(1, 30, wrongDate, current, current);
        assertFalse(timeslotService.findByDate(timeslot.getDate()).equals(wrongDateTimeslot));
    }

    @Test
    public void noDateShouldThrowError() throws Exception {
        Timeslot noDate = new Timeslot(1, 30, null, new Date(), new Date());
        assertThrows(TimeslotException.class, () -> {
            timeslotService.saveOrUpdateTimeslot(noDate);
        });
    }

    @Test
    public void noDurationShouldThrowError() throws Exception {
        Timeslot noDuration = new Timeslot(1, 0, new Date(), new Date(), new Date());
        assertThrows(TimeslotException.class, () -> {
            timeslotService.saveOrUpdateTimeslot(noDuration);
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
