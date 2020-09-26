package labwed18303.demo.services;

import labwed18303.demo.Repositories.ServiceProvidedRepository;
import labwed18303.demo.exceptions.ServiceProvidedException;
import labwed18303.demo.model.ServiceProvided;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ServiceProvidedService {
    @Autowired
    private ServiceProvidedRepository serviceProvidedRepository;

    public ServiceProvided saveOrUpdateServiceProvided(ServiceProvided serviceProvided) {
        if(serviceProvidedRepository.findByName(serviceProvided.getName())!= null){
            throw new ServiceProvidedException("Service with this name already exists");
        }
        return serviceProvidedRepository.save(serviceProvided);
    }

    public ServiceProvided findByID(Long serviceId){

        ServiceProvided serviceProvided = serviceProvidedRepository.findByid(serviceId);

        if(serviceProvided == null){
            throw new ServiceProvidedException("Timeslot ID '"+serviceId+"' does not exist");
        }

        return serviceProvided;
    }

    public Iterable<ServiceProvided> findAllServiceProvided(){
        return serviceProvidedRepository.findAll();
    }
    public ServiceProvided findByName(String name){return serviceProvidedRepository.findByName(name);}

    public void deleteServiceProvidedByIdentifier(Long serviceId){
        ServiceProvided serviceProvided = serviceProvidedRepository.findByid(serviceId);

        if(serviceProvided == null){
            throw  new  ServiceProvidedException("Cannot Person with ID '"+serviceId+"'. This person does not exist");
        }

        serviceProvidedRepository.delete(serviceProvided);
    }
}
