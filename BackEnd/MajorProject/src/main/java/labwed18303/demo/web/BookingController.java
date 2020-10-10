package labwed18303.demo.web;

import labwed18303.demo.model.Booking;
import labwed18303.demo.model.CancelBooking;
import labwed18303.demo.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    //    Must have a valid timeslot.
//    Must have a valid worker.
//    Can add a booking with no Customer or Service. I.e. A worker availability.
//    If the booking has a customer, it must have a valid service. -> The service must exist and be a service the associated worker provides.
//    The booking's timeslot date must be in the future.
    @PostMapping("")
    public ResponseEntity<Booking> createNewBooking(@RequestBody Booking booking) {
        Booking booking1 = bookingService.saveOrUpdateBooking(booking);
        return new ResponseEntity<Booking>(booking1, HttpStatus.CREATED);
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<?> getBookingById(@PathVariable Long bookingId) {

        Booking booking = bookingService.findByBookingIdentifier(bookingId);

        return new ResponseEntity<Booking>(booking, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<?> getBookingByTimeslotWorker(@RequestBody Booking booking) {

        Booking foundBooking = bookingService.findByTimeslotWorker(booking);

        return new ResponseEntity<Booking>(foundBooking, HttpStatus.OK);
    }

    @GetMapping("")
    public Iterable<Booking> getAllBookings() {
        return bookingService.findAllBookings();
    }

    //    If the booking has no customer, it can be removed.
//    If it has a customer, i.e. "Cancelling", it cannot be removed if it is less than 48 hours from the booking date.
    @DeleteMapping("/{bookingId}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long bookingId) {
        bookingService.deleteBookingByIdentifier(bookingId);

        return new ResponseEntity<String>("Booking with ID: '" + bookingId + "' was deleted", HttpStatus.OK);
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteBooking(@RequestBody CancelBooking cancelBooking) {
        CancelBooking cb1 = bookingService.deleteBookingWithCancelBooking(cancelBooking);
        
        return new ResponseEntity<CancelBooking>(cb1, HttpStatus.OK);
    }
}