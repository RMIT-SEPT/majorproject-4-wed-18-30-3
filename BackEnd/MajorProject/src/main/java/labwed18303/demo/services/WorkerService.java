package labwed18303.demo.services;

import labwed18303.demo.Repositories.WorkerRepository;
import labwed18303.demo.model.Worker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkerService {
    @Autowired
    private WorkerRepository workerRepository;

    public Worker saveOrUpdateCustomer(Worker person) {
        return workerRepository.save(person);
    }
}
