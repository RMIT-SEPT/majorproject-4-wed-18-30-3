package labwed18303.demo.web;

        import labwed18303.demo.model.ServiceProvided;
        import labwed18303.demo.services.ServiceProvidedService;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;
        import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/serviceProvided")
public class ServiceProvidedController {

    @Autowired
    private ServiceProvidedService serviceProvidedService;

    @PostMapping("")
    public ResponseEntity<ServiceProvided> createNewServiceProvided(@RequestBody ServiceProvided serviceProvided){

        ServiceProvided serviceProvided1 = serviceProvidedService.saveOrUpdateServiceProvided(serviceProvided);
        return new ResponseEntity<ServiceProvided>(serviceProvided1, HttpStatus.CREATED);
    }

    @GetMapping("/{serviceProvidedId}")
    public ResponseEntity<?> getServiceProvidedById(@PathVariable Long serviceProvidedId){

        ServiceProvided serviceProvided = serviceProvidedService.findByID(serviceProvidedId);

        return new ResponseEntity<ServiceProvided>(serviceProvided, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<ServiceProvided> getAllServiceProvided(){return serviceProvidedService.findAllServiceProvided();}

    @DeleteMapping("/{serviceProvidedId}")
    public ResponseEntity<?> deleteServiceProvided(@PathVariable long serviceProvidedId){
        serviceProvidedService.deleteServiceProvidedByIdentifier(serviceProvidedId);

        return new ResponseEntity<String>("Service with ID: '"+serviceProvidedId+"' was deleted", HttpStatus.OK);
    }
}
