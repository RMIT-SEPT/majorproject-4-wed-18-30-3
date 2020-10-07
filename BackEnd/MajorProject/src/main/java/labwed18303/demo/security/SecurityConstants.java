package labwed18303.demo.security;

public class SecurityConstants {
    public static final String CUST_SIGN_UP_URLS = "/api/customer/register";
    public static final String WORK_SIGN_UP_URLS = "/api/worker/register";
    public static final String ADMIN_SIGN_UP_URLS = "/api/admin/register";
    public static final String LOGIN_URLS = "/api/user/login";
    public static final String ALL_APIS = "/api/**";
    public static final String H2_URL = "/h2-console/**";
    public static final String SECRET ="SecretKeyToGenJWTs";
    public static final String TOKEN_PREFIX= "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 300_000; //300 seconds - 5 minutes

}
