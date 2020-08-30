package labwed18303.demo.web;

import labwed18303.demo.model.Booking;
import labwed18303.demo.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;


@RestController
@RequestMapping("/api/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("")
    public ResponseEntity<Booking> createNewBooking(@RequestBody Booking booking)
    {
        Booking booking1 = bookingService.saveOrUpdateBooking(booking);
        return new ResponseEntity<Booking>(booking1, HttpStatus.CREATED);
    }
    @GetMapping("/{bookingId}")
    public ResponseEntity<?> getBookingById(@PathVariable Long bookingId){

        Booking booking = bookingService.findByBookingIdentifier(bookingId);

        return new ResponseEntity<Booking>(booking, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Booking> getAllBookings(){return bookingService.findAllBookings();}

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long bookingId){
        bookingService.deleteBookingByIdentifier(bookingId);

        return new ResponseEntity<String>("Booking with ID: '"+bookingId+"' was deleted", HttpStatus.OK);
    }
}