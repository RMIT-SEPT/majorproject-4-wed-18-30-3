package labwed18303.demo.services;

import labwed18303.demo.Repositories.BookingRepository;
import labwed18303.demo.model.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    public Booking saveOrUpdateBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public Booking findByBookingIdentifier(Long bookingId){

        Booking booking = bookingRepository.findByid(bookingId);

        if(booking == null){
            //throw new BookingException("Booking ID '"+bookingId+"' does not exist");
        }

        return booking;
    }

    public Iterable<Booking> findAllBookings(){
        return bookingRepository.findAll();
    }


    public void deleteBookingByIdentifier(Long bookingId){
        Booking booking = bookingRepository.findByid(bookingId);

        if(booking == null){
            //throw  new  BookingException("Cannot find Booking with ID '"+bookingId+"'. This booking does not exist");
        }

        bookingRepository.delete(booking);
    }
}

