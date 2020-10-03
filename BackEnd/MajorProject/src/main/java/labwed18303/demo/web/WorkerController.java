package labwed18303.demo.web;


import labwed18303.demo.Repositories.WorkerRepository;
import labwed18303.demo.model.Customer;
import labwed18303.demo.model.Worker;
import labwed18303.demo.services.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/worker")
public class WorkerController {
    @Autowired
    private WorkerService workerService;

    @PostMapping("/register")
    public ResponseEntity<Worker> createWorker(@RequestBody Worker worker)
    {
        Worker worker1 = workerService.saveOrUpdateWorker(worker);

        return new ResponseEntity<Worker>(worker1, HttpStatus.CREATED);
    }

    @GetMapping("")
    public Iterable<Worker> getAllWorkers(){

        return workerService.findAllWorkers();
    }


    @GetMapping("/{userName}")
    public ResponseEntity<?> getWorkerByUsername(@PathVariable String userName){

        Worker worker = workerService.findByUserName(userName);

        return new ResponseEntity<Worker>(worker, HttpStatus.OK);
    }



}