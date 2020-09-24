package labwed18303.demo.web;


import labwed18303.demo.model.Customer;
import labwed18303.demo.model.Worker;
import labwed18303.demo.services.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/worker")
public class WorkerController {
    @Autowired
    private WorkerService workerService;

    @PostMapping("")
    public ResponseEntity<Worker> createAdminUser(@RequestBody Worker worker)
    {
        Worker worker1 = workerService.saveOrUpdateCustomer(worker);

        return new ResponseEntity<Worker>(worker1, HttpStatus.CREATED);
    }

    @GetMapping("/{userName}")
    public ResponseEntity<?> getCustomerByUsername(@PathVariable String userName){

        Worker worker = workerService.findByUserName(userName);

        return new ResponseEntity<Worker>(worker, HttpStatus.OK);
    }



}