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
}

