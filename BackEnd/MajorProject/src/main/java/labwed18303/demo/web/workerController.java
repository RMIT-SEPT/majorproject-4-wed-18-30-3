package labwed18303.demo.web;



import labwed18303.demo.model.Customer;
import labwed18303.demo.model.Worker;
import labwed18303.demo.services.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/worker")
public class workerController {

    @Autowired
    private WorkerService workerService;
    @PostMapping("")
    public ResponseEntity<Worker> createNewPerson(@RequestBody Worker worker){

        Worker worker1 = workerService.saveOrUpdateCustomer(worker);
        return new ResponseEntity<Worker>(worker, HttpStatus.CREATED);
    }

}
