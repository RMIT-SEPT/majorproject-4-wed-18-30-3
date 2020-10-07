package labwed18303.demo.services;

import labwed18303.demo.Repositories.WorkerRepository;
import labwed18303.demo.exceptions.UserException;
import labwed18303.demo.exceptions.WorkerException;
import labwed18303.demo.model.*;
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

    public Worker saveOrUpdateWorker(Worker worker) {
        worker.setUser(userService.addNewUser(worker.getUser()));

        if(worker.getCompanyName() == null || worker.getCompanyName().isEmpty()){
            throw new WorkerException("Worker must have a company");
        }

        worker.getUser().setUserType(UserType.WORKER);
        if(worker.getServices() != null) {
            Set<ServiceProvided> services = new HashSet<>();
            ServiceProvided savedService;
            for (ServiceProvided service : worker.getServices()) {
                savedService = serviceService.findByName(service.getName());
                if (savedService != null) {
                    services.add(savedService);
                }
            }
            if(findByUserName(worker.getUser().getUserName())!= null) {
                for (ServiceProvided service : findByUserName(worker.getUser().getUserName()).getServices()) {
                    services.add(service);
                }
            }
            worker.setServices(services);
        }
        return workerRepository.save(worker);
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
        Worker worker = null;
        try {
            User user = userService.findByUserName(userName);
            worker = workerRepository.findByUser(user);
        }
        catch(UserException e){

        }
        return worker;
    }
}
