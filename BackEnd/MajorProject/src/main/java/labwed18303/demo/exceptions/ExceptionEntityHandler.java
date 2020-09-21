package labwed18303.demo.exceptions;

        import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;
        import org.springframework.web.bind.annotation.ControllerAdvice;
        import org.springframework.web.bind.annotation.ExceptionHandler;
        import org.springframework.web.bind.annotation.RestController;
        import org.springframework.web.context.request.WebRequest;
        import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class ExceptionEntityHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<Object> handleProjectIdException(WorkerException ex, WebRequest request){
        WorkerIDExceptionResponse exceptionResponse = new WorkerIDExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

//    @ExceptionHandler
//    public final ResponseEntity<Object> handleBookingIdException(WorkerException ex, WebRequest request){
//        WorkerIDExceptionResponse exceptionResponse = new WorkerIDExceptionResponse(ex.getMessage());
//        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
//    }

}