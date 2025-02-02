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
        serviceProvided.setId(-1);
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

    public void deleteServiceProvidedByName(String serviceName){
        ServiceProvided serviceProvided = serviceProvidedRepository.findByName(serviceName);

        if(serviceProvided == null){
            throw  new  ServiceProvidedException("Cannot Person with ID '" + serviceName + "'. This person does not exist");
        }

        serviceProvidedRepository.delete(serviceProvided);
    }
}
