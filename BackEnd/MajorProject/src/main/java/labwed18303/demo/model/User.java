package labwed18303.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    protected String userName;
    protected String password;
    protected String address;
    protected int phone;

    @OneToOne(
            mappedBy = "user"
    )
    @JsonIgnoreProperties("user")
    private Customer customer;
    @OneToOne(
            mappedBy = "user"
    )
    @JsonIgnoreProperties("user")
    private Admin admin;
    @OneToOne(
            mappedBy = "user"
    )
    @JsonIgnoreProperties("user")
    private Worker worker;

    private UserType userType;

    public User(){

    }

    public User(String userName, String password, String address, int phone, UserType userType) {
        this.userName = userName;
        this.password = password;
        this.address = address;
        this.phone = phone;
        this.userType = userType;
    }

    public long getId(){
        return this.id;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public String getUserName() {
        return userName;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    public String getPassword() {
        return password;
    }

    public String getAddress() {
        return address;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    public int getPhone() {
        return phone;
    }

    public UserType getUserType(){ return userType; }

    public User updateUser(User user){
        if(this.password != user.getPassword()){
            if(user.getPassword() != null) {
                this.password = user.getPassword();
            }
        }

        if(this.address != user.getAddress()){
            if(user.getAddress() != null) {
                this.address = user.getAddress();
            }
        }

        if(this.phone != user.getPhone()){
            if(user.getPhone() != 0) {
                this.phone = user.getPhone();
            }
        }
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        User user = (User) o;
        return id == user.getId() &&
                phone == user.getPhone() &&
                userName.equals(user.getUserName()) &&
                password.equals(user.getPassword()) &&
                address.equals(user.getAddress()) &&
                userType == user.getUserType();
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userName, password, address, phone, userType);
    }

    @Override
    public String getUsername() {
        return this.userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}