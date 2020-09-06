package labwed18303.demo.exceptions;

        import org.springframework.http.HttpStatus;
        import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class WorkerException extends RuntimeException {

    public WorkerException(String message) {
        super(message);
    }
}