package labwed18303.demo.services;

import labwed18303.demo.Repositories.UserRepository;
import labwed18303.demo.exceptions.UserException;
import labwed18303.demo.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service

public class UserService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    public User addNewUser(User user){
        checkNullValue(user);
        checkDuplicateUserName(user);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        return user;
    }

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
        User user1 = userRepository.findByUserName(user.getUserName());

        if(user1 == null){
            throw new UserException("didn't find this user in database");
        }

        if(!(user.getUserName().equals(user1.getUserName()))){
            throw new UserException("user name can't be modify");
        }
        if(user.getPassword() != null) {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        }
        User newUser = user1.updateUser(user);

        return userRepository.save(newUser);
    }

    private User editProfile(User editUser, User preUser){
        preUser.setUserName(editUser.getUserName());
        preUser.setAddress(editUser.getAddress());
        preUser.setPhone(editUser.getPhone());
        preUser.setPassword(editUser.getPassword());

        return preUser;
    }

//NO LONGER USED AFTER AUTHENTICATION UPDATE.
    public User findByUserNameAndPassword(User user){
        if(user.getPassword() == null || user.getUserName() == null){
            throw new UserException("Invalid User Details");
        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        User user1 = userRepository.findByUserName(user.getUserName());

        if(user1.getPassword().equals(user.getPassword())== false){
            throw new UserException("Incorrect password");
        }

        return user1;
    }

    public User findByUserIdAndEdit(User user){
        User user1 = userRepository.findByid(user.getId());
        editProfile(user, user1);
        return user1;
    }

    public User findByUserName(String username){
        User user = userRepository.findByUserName(username);
        if(user == null){
            throw new UserException("User Not Found");
        }
        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        UserDetails user = userRepository.findByUserName(s);
        if(user == null){
            throw new UsernameNotFoundException("No user with given username");
        }
        return user;
    }
}
