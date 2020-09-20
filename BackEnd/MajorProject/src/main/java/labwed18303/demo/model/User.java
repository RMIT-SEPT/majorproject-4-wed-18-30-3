package labwed18303.demo.model;

import javax.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    protected String userName;
    protected String password;
    protected String address;
    protected int phone;

    @OneToOne
    private Customer customer;
    @OneToOne
    private Admin admin;
    @OneToOne
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


    public String getUserName() {
        return userName;
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

    public UserType getUserType(){

        return userType; }
}