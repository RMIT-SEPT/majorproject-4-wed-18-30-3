import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios";


function refresh() {window.location.reload(false)}
var config = {
    headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin:': '*'
    }
}

function editProfile(newProfile) {

    console.log(newProfile)

    // this is Sam's postman address
    //axios.post('https://ae5b398a-4768-4d8f-b24a-0f5aa15a09a0.mock.pstmn.io/bookings', {

        // should have a users class in BackEnd that store all users(customer,admin,worker) .
         axios.post('http://localhost:8080/api/users', {

        
        userName: newProfile.userName,
        password: newProfile.password,
        address: newProfile.address,
        phone: newProfile.phone

    }, config)
    .then(res => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log(res)
    })
    .catch(error => {
        console.error(error)
    })
}







class EditProfile extends Component {

    constructor(){
        super();

        this.state= {

            userName : "",
            password : "",
            address : "",
            phone : ""
        }


        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onUserNameChange = userName => this.setState({ userName })
    onPasswordChange = password => this.setState({ password })
    onAddressChange = address => this.setState({ address })
    onPhoneChange = phone => this.setState({ phone })

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }



    onSubmit(e){
        e.preventDefault();

        if (this.state.userName == null) {
            alert("Please enter your new username.")
        }
        if (this.state.password == null) {
            alert("Please enter your new password.")
        }
        if (this.state.address == null) {
            alert("Please enter your new address.")
        }
        if (this.state.phone == null) {
            alert("Please enter your new phone number.")
        }            


        // Get this from local React state once login is done
        

        const newProfile = {
            userName: this.state.userName,
            password: this.state.password,
            address: this.state.address,
            phone: this.state.phone
        }
        console.log(newProfile);

        editProfile(newProfile);
    }

 



    render() {
        return (
            <div className="profile_screen_editprofile" id="profile_screen_editprofile">
                
              <form onSubmit = {this.onSubmit}>
              <b>Edit Personal Profile</b>
              <div className="form-group">
                  
                 

              </div>
              
              <div>
              <input type="text" className="form-control" placeholder="Name" name="userName" value={this.state.userName} onChange = {this.handleInputChange.bind(this)}/>

              </div>
              <br></br>
              <div>
              <input type="text" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange = {this.handleInputChange.bind(this)}/>

              </div>
              <br></br>
              <div>
              <input type="text" className="form-control" placeholder="Address" name="address" value={this.state.address} onChange = {this.handleInputChange.bind(this)}/>

              </div>
              <br></br>
              <div>
              <input type="phone" className="form-control" placeholder="Phone" name="phone" value={this.state.phone} onChange = {this.handleInputChange.bind(this)}/>

              </div>
              <br></br>
              
              <div className="row">
                            <div className="col-sm">
                                <input type="submit" value="Save" className="btn btn-sm btn-dark" id="navButton"
                                        />
                            </div>
                            <div className="col-sm">
                            <button className="btn btn-sm btn-dark" id="navButton" onClick={refresh}
                                    >
                                Cancel Edit
                            </button>   
                            </div>
                        </div>
            </form>
            </div>
        )
    }
}

export default EditProfile;
