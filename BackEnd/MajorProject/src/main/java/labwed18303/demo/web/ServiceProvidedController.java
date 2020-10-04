package labwed18303.demo.web;

        import labwed18303.demo.model.ServiceProvided;
        import labwed18303.demo.model.User;
        import labwed18303.demo.payload.AuthorizationErrorResponse;
        import labwed18303.demo.security.JwtTokenProvider;
        import labwed18303.demo.services.ServiceProvidedService;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;
        import org.springframework.security.core.authority.SimpleGrantedAuthority;
        import org.springframework.web.bind.annotation.*;

        import static labwed18303.demo.security.SecurityConstants.HEADER_STRING;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/serviceProvided")
public class ServiceProvidedController {

    @Autowired
    private ServiceProvidedService serviceProvidedService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("")
    public ResponseEntity<?> createNewServiceProvided(@RequestHeader(HEADER_STRING) String auth, @RequestBody ServiceProvided serviceProvided){
        ResponseEntity<?> toReturn = null;
        User authUser = tokenProvider.getUserFromHeader(auth);
        if(authUser == null || authUser.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) == false){
            AuthorizationErrorResponse error = new AuthorizationErrorResponse("Do not have permission");
            toReturn = new ResponseEntity(error, HttpStatus.valueOf(401));
        }
        else{
            ServiceProvided serviceProvided1 = serviceProvidedService.saveOrUpdateServiceProvided(serviceProvided);
            toReturn = new ResponseEntity<>(serviceProvided1, HttpStatus.CREATED);
        }
        return toReturn;
    }

    @GetMapping("/{serviceProvidedName}")
    public ResponseEntity<?> getServiceProvidedByName(@PathVariable String serviceName){

        ServiceProvided serviceProvided = serviceProvidedService.findByName(serviceName);

        return new ResponseEntity<ServiceProvided>(serviceProvided, HttpStatus.OK);
    }

    @GetMapping("")
    public Iterable<ServiceProvided> getAllServiceProvided(){return serviceProvidedService.findAllServiceProvided();}

    @DeleteMapping("/{serviceProvidedId}")
    public ResponseEntity<?> deleteServiceProvided(@RequestHeader(HEADER_STRING) String auth, @PathVariable long serviceProvidedId){
        ResponseEntity<?> toReturn = null;
        User authUser = tokenProvider.getUserFromHeader(auth);
        if(authUser == null || authUser.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) == false){
            AuthorizationErrorResponse error = new AuthorizationErrorResponse("Do not have permission");
            toReturn = new ResponseEntity(error, HttpStatus.valueOf(401));
        }
        else{
            serviceProvidedService.deleteServiceProvidedByIdentifier(serviceProvidedId);
            toReturn = new ResponseEntity<String>("Service with ID: '"+serviceProvidedId+"' was deleted", HttpStatus.OK);
        }
        return toReturn;
    }
}
