package labwed18303.demo.services;

import labwed18303.demo.Repositories.UserRepository;
import labwed18303.demo.exceptions.UserException;
import labwed18303.demo.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service

public class UserService {
    @Autowired
    UserRepository userRepository;


    public void checkNullValue(User user){
        if(user == null){
            throw new UserException("Invalid user");
        }
        if(user.getUserName() == null){
            throw new UserException("username can't be null");
        }else if(user.getPassword() == null){
            throw new UserException("password can't be null");
        }
    }
    public void checkDuplicateUserName(User user){
        Iterable<User> allUser= userRepository.findAll();

        for(User s:allUser){
            if(s.getUserName().equals(user.getUserName())){
                throw new UserException("user already exist");
            }
        }
    }

    public User saveOrUpdateCustomer(User user) {
        List<User> userList = userRepository.findByUserName(user.getUserName());
        User user1 = userList.get(0);

        if(user1 == null){
            throw new UserException("didn't find this user in database");
        }

        if(!(user.getUserName().equals(user1.getUserName()))){
            throw new UserException("user name can't be modify");
        }

        User newUser = user1.updateUser(user);

        return userRepository.save(newUser);
    }

    private User matchNameAndPassword(List<User> users, String password){

        for(User s:users){
            if(s.getPassword().equals(password)){
                return s;
            }
        }


        return null;
    }

    private User editProfile(User editUser, User preUser){
        preUser.setUserName(editUser.getUserName());
        preUser.setAddress(editUser.getAddress());
        preUser.setPhone(editUser.getPhone());
        preUser.setPassword(editUser.getPassword());

        return preUser;
    }


    public User findByUserNameAndPassword(User user){

        List userList = userRepository.findByUserName(user.getUserName());

        User user1 = matchNameAndPassword(userList, user.getPassword());

        if(user1== null){
            throw new UserException("password not match");
        }
        return user1;
    }

    public User findByUserIdAndEdit(User user){
        User user1 = userRepository.findByid(user.getId());
        editProfile(user, user1);
        return user1;
    }
}
