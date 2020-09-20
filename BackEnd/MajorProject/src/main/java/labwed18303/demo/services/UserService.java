package labwed18303.demo.services;

import labwed18303.demo.Repositories.UserRepository;
import labwed18303.demo.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service

public class UserService {
    @Autowired
    UserRepository userRepository;

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

        return user1;
    }

    public User findByUserIdAndEdit(User user){
        User user1 = userRepository.findByid(user.getId());
        editProfile(user, user1);
        return user1;
    }
}
