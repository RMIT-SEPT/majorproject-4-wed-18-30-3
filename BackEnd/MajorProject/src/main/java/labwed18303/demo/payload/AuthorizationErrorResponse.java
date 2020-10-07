package labwed18303.demo.payload;

public class AuthorizationErrorResponse {
    String message;

    public AuthorizationErrorResponse(String message){
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
