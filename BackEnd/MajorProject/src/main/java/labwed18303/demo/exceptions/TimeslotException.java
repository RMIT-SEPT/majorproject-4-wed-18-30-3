package labwed18303.demo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TimeslotException extends RuntimeException{

    public TimeslotException(String message){
        super(message);
    }

}