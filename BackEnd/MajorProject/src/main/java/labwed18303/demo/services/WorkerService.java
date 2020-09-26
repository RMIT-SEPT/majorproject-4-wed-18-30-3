package labwed18303.demo.services;

import labwed18303.demo.Repositories.WorkerRepository;
import labwed18303.demo.exceptions.WorkerException;
import labwed18303.demo.model.ServiceProvided;
import labwed18303.demo.model.Timeslot;
import labwed18303.demo.model.UserType;
import labwed18303.demo.model.Worker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class WorkerService {
    @Autowired
    private WorkerRepository workerRepository;

    @Autowired
    private UserService userService;

    @Autowired ServiceProvidedService serviceService;

    public Worker saveOrUpdateWorker(Worker person) {
        userService.checkNullValue(person.getUser());

        userService.checkDuplicateUserName(person.getUser());

        person.setUserName(person.getUser().getUserName());
        if(person.getCompanyName() == null || person.getCompanyName().isEmpty()){
            throw new WorkerException("Worker must have a company");
        }

        person.getUser().setUserType(UserType.WORKER);
        if(person.getServices() != null) {
            Set<ServiceProvided> services = new HashSet<>();
            ServiceProvided savedService;
            for (ServiceProvided service : person.getServices()) {
                savedService = serviceService.findByName(service.getName());
                if (savedService != null) {
                    services.add(savedService);
                }
            }
            if(workerRepository.findByUserName(person.getUser().getUserName())!= null) {
                for (ServiceProvided service : workerRepository.findByUserName(person.getUser().getUserName()).getServices()) {
                    services.add(service);
                }
            }
            person.setServices(services);
        }
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
            throw  new  WorkerException("Cannot Person with ID '"+workerId+"'. This person does not exist");
        }

        workerRepository.delete(worker);
    }


    public Worker findByUserName(String userName){
        Worker worker = workerRepository.findByUserName(userName);
        return worker;
    }
}
