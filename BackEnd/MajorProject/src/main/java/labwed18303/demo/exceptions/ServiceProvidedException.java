package labwed18303.demo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ServiceProvidedException extends RuntimeException{

    public ServiceProvidedException(String message){
        super(message);
    }

}
