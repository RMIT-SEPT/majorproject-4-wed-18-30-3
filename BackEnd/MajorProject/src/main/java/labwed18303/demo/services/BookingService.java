package labwed18303.demo.services;

import labwed18303.demo.Repositories.BookingRepository;
import labwed18303.demo.Repositories.CancelBookingRepository;
import labwed18303.demo.exceptions.BookingException;
import labwed18303.demo.exceptions.TimeslotException;
import labwed18303.demo.model.*;
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
    @Autowired
    private CustomerService customerService;
    @Autowired
    private CancelBookingRepository cancelBookingRepository;

//    Must have a valid timeslot.
//    Must have a valid worker.
//    Can add a booking with no Customer or Service. I.e. A worker availability.
//    If the booking has a customer:
//    Tou cannot change the customer.
//    It must have a valid service. -> The service must exist and be a service the associated worker provides.
//    The booking's timeslot date must be in the future.
    public Booking saveOrUpdateBooking(Booking booking) {
        booking.setId(-1);
        Timeslot relatedTimeslot = booking.getTimeslot();
        if(booking.getTimeslot()==null || booking.getTimeslot().getDate() == null) {
                throw new BookingException("Booking must have a valid timeslot");
        }
        try {
            relatedTimeslot = timeslotService.findByDate(booking.getTimeslot().getDate());
            booking.setTimeslot(relatedTimeslot);
        }
        catch(TimeslotException e){
            throw new BookingException(e.getMessage());
        }
        Worker savedWorker = null;
        if(booking.getWorker()!=null && booking.getWorker().getUser()!=null && booking.getWorker().getUser().getUserName() != null){
            savedWorker = workerService.findByUserName(booking.getWorker().getUser().getUserName());
            if(savedWorker != null){
                booking.setWorker(savedWorker);
            }
            else{
                throw new BookingException("Booking must have a valid worker");
            }
        }
        else{
            throw new BookingException("Booking must have a valid worker");
        }
        Booking savedBooking = findByTimeslotWorker(booking);
        if(savedBooking!= null){
            booking.setId(savedBooking.getId());
        }
        if(booking.getCustomer() != null){
            Customer savedCustomer = null;
            if(booking.getCustomer().getUser() != null ||
                booking.getCustomer().getUser().getUserName() != null){
                    savedCustomer = customerService.findByUserName(booking.getCustomer().getUser().getUserName());
                    if(savedBooking != null && savedBooking.getCustomer() != null){
                        if(booking.getCustomer().equals(savedBooking.getCustomer())==false){
                            throw new BookingException("Booking already taken");
                        }
                    }
                    if(savedCustomer != null) {
                        booking.setCustomer(savedCustomer);
                    }
                    else{
                        throw new BookingException("Customer not valid");
                    }
                }
                else{
                    throw new BookingException("Customer not valid");
                }
                if(booking.getService() != null && booking.getService().getName() != null ) {
                    ServiceProvided savedService = serviceService.findByName(booking.getService().getName());
                    if(savedService != null) {
                        booking.setService(savedService);
                    }
                    else{
                        throw new BookingException("Booking must have a service");
                    }
                }
                else{
                    throw new BookingException("Booking must have a service");
                }
                if(booking.getWorker().getServices() == null || booking.getWorker().getServices().isEmpty() == true
                        || booking.getWorker().getServices().contains(booking.getService())==false){
                    throw new BookingException("Worker does not provide this service");
                }
                Date now = new Date();
                    if(relatedTimeslot.getDate().before(now)){
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
        return bookingRepository.findAllByOrderByTimeslot();
    }
    public Iterable<Booking> findAllBookingsWithoutCustomers(){
        return bookingRepository.findByCustomerIsNullOrderByTimeslot();
    }

//    If the booking has no customer, it can be removed.
//    If it has a customer, i.e. "Cancelling", it cannot be removed if it is less than 48 hours from the booking date.
    public void deleteBookingByIdentifier(Long bookingId){
        Booking booking = bookingRepository.findByid(bookingId);

        if(booking == null){
            throw  new  BookingException("Cannot find Booking with ID '"+bookingId+"'. This booking does not exist");
        }
        if(booking.getTimeslot() == null || booking.getTimeslot().getDate()==null){
            throw new BookingException("Booking has no valid with ID '"+bookingId+"'. This booking does not exist");
        }
        if(booking.getCustomer() != null){
            long fortyEightHours = 48*60*60*1000;
            Date bookingDate = booking.getTimeslot().getDate();
            if (booking.getTimeslot().getDate().getTime() - new Date().getTime() < fortyEightHours) {
                throw new BookingException("Cannot remove Booking within 48 hours");
            }
        }
        bookingRepository.delete(booking);
    }

    public CancelBooking deleteBookingWithCancelBooking(CancelBooking cancelBooking){

        Booking originBooking = bookingRepository.findByid(cancelBooking.getBookingReference());

        CancelBooking cancelBooking1 = new CancelBooking();

        cancelBooking1.setCustomerName(originBooking.getCustomer().getUser().getUserName());

        cancelBooking1.setWorkerName(originBooking.getWorker().getUser().getUserName());

        cancelBooking1.setReason(cancelBooking.getReason());

        cancelBookingRepository.save(cancelBooking1);

        this.deleteBookingByIdentifier(originBooking.getId());

        return cancelBooking1;
    }


    public Booking findByTimeslotWorker(Booking booking) {
        if(booking.getTimeslot() == null  || booking.getTimeslot().getDate() == null
                || booking.getWorker() == null || booking.getWorker().getUser() == null || booking.getWorker().getUser().getUserName() == null){
            throw new BookingException("Provided Booking does not contain either Timeslot or valid Worker");
        }

        Timeslot timeslot = timeslotService.findByDate(booking.getTimeslot().getDate());
        Worker worker = workerService.findByUserName(booking.getWorker().getUser().getUserName());

        return bookingRepository.findByTimeslotAndWorker(timeslot, worker);
    }
}

