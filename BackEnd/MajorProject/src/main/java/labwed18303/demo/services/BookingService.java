package labwed18303.demo.services;

import labwed18303.demo.Repositories.BookingRepository;
import labwed18303.demo.exceptions.BookingException;
import labwed18303.demo.exceptions.TimeslotException;
import labwed18303.demo.model.Booking;
import labwed18303.demo.model.Timeslot;
import labwed18303.demo.model.Worker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private TimeslotService timeslotService;
    @Autowired
    private WorkerService workerService;
    @Autowired
    private ServiceProvidedService serviceService;

    public Booking saveOrUpdateBooking(Booking booking) {
        if(booking.getTimeslot()==null ) {
                throw new BookingException("Booking must have a valid timeslot");
        }
        try{
            Timeslot timeslot = timeslotService.findByID(booking.getTimeslot().getId());
            if(timeslot.equals(booking.getTimeslot())==false){
                throw new BookingException("Booking must have a valid timeslot");
            }
        }
        catch(TimeslotException e){
            throw new BookingException(e.getMessage());
        }
        if(booking.getWorker()==null){
            throw new BookingException("Booking must have a valid worker");
        }
        if(booking.getCustomer() != null){
            if(booking.getService() == null) {
                throw new BookingException("Booking must have a service");
            }
            Worker worker = workerService.findById(booking.getWorker().getId());
            if(worker.getServices().isEmpty() == true
                    || worker.getServices().contains(serviceService.findByID(booking.getService().getId()))==false){
                throw new BookingException("Worker does not provide this service");
            }
            Date now = new Date();
            Timeslot relatedTimeslot = timeslotService.findByID(booking.getTimeslot().getId());
                if(relatedTimeslot.getDate() == null){
                    throw new BookingException("Booking must have a valid timeslot");
                }
                else if(relatedTimeslot.getDate().before(now)){
                    throw new BookingException("Booking must be in the future");
                }
            }
        return bookingRepository.save(booking);
    }

    public Booking findByBookingIdentifier(Long bookingId){

        Booking booking = bookingRepository.findByid(bookingId);

        if(booking == null){
            throw new BookingException("Booking ID '"+bookingId+"' does not exist");
        }

        return booking;
    }

    public Iterable<Booking> findAllBookings(){
        return bookingRepository.findAll();
    }


    public void deleteBookingByIdentifier(Long bookingId){
        Booking booking = bookingRepository.findByid(bookingId);

        if(booking == null){
            throw  new  BookingException("Cannot find Booking with ID '"+bookingId+"'. This booking does not exist");
        }

        bookingRepository.delete(booking);
    }
}

