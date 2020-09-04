package labwed18303.demo.web;




import labwed18303.demo.model.Worker;
import labwed18303.demo.services.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{workerId}")
    public ResponseEntity<?> getWorkerById(@PathVariable Long workerId){

        Worker worker = workerService.findById(workerId);

        return new ResponseEntity<Worker>(worker, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Worker> getAllWorker(){return workerService.findAllWorkers();}

    @DeleteMapping("/{timeslotId}")
    public ResponseEntity<?> deleteWorker(@PathVariable long workerId){
        workerService.deleteWorkerByIdentifier(workerId);

        return new ResponseEntity<String>("Timeslot with ID: '"+workerId+"' was deleted", HttpStatus.OK);
    }
}
