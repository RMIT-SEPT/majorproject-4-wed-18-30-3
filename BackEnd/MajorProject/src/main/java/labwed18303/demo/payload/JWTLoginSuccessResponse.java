package labwed18303.demo.payload;

import labwed18303.demo.model.UserType;
import labwed18303.demo.security.JwtAuthenticationFilter;

public class JWTLoginSuccessResponse {
    private boolean success;
    private String token;
    private UserType userType;

    public JWTLoginSuccessResponse(boolean success, String token, UserType userType) {
        this.success = success;
        this.token = token;
        this.userType = userType;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    @Override
    public String toString() {
        return "JWTLoginSucessReponse{" +
                "success=" + success +
                "userType=" + userType +
                ", token='" + token + '\'' +
                '}';
    }
}
