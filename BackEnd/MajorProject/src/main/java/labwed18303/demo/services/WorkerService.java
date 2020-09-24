package labwed18303.demo.services;

import labwed18303.demo.Repositories.WorkerRepository;
import labwed18303.demo.model.Timeslot;
import labwed18303.demo.model.UserType;
import labwed18303.demo.model.Worker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkerService {
    @Autowired
    private WorkerRepository workerRepository;

    @Autowired
    private UserService userService;

    public Worker saveOrUpdateCustomer(Worker person) {
        userService.checkNullValue(person.getUser());

        userService.checkDuplicateUserName(person.getUser());

        person.setUserName(person.getUser().getUserName());

        person.getUser().setUserType(UserType.WORKER);
        return workerRepository.save(person);
    }

    public Worker findById(Long workerId){

        Worker worker = workerRepository.findByid(workerId);

        if(worker == null){
            //throw new TimeslotException("Timeslot ID '"+timeslotId+"' does not exist");
        }

        return worker;
    }

    public Iterable<Worker> findAllWorkers(){
        return workerRepository.findAll();
    }


    public void deleteWorkerByIdentifier(Long workerId){
        Worker worker = workerRepository.findByid(workerId);

        if(worker == null){
            //throw  new  WorkerException("Cannot Person with ID '"+workerId+"'. This person does not exist");
        }

        workerRepository.delete(worker);
    }


    public Worker findByUserName(String userName){
        Worker worker = workerRepository.findByUserName(userName);
        return worker;
    }
}
