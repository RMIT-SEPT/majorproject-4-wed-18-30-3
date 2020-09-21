import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios";


 // Header config for REST requests
 const axiosConfig = {headers: {'Content-Type': 'application/json'}}



function refresh() {window.location.reload(false)}


// Return the specified user
async function getUser(userId) {
    return await axios.get('http://localhost:8080/api/'+userId ).then(response => {
        return response.data;
    })
}

// Return  user id
async function getUserID(userId) {
    const response = await getUser(userId).then();

}





async function editProfile(newProfile) {

    console.log(newProfile)
    return await axios.post('http://localhost:8080/api/edit', {
        id: newProfile.id,
        userName: newProfile.userName,
        password: newProfile.password,
        address: newProfile.address,
        phone: newProfile.phone
    }, axiosConfig)
    .then(res => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log(res)
        return true
    })
    .catch(error => {
        console.error(error)
        return false
    })
}







class EditProfile extends Component {

    constructor(props){
        super(props);

        this.state= {

            userData: this.loadUserData()

        }


        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.loadUserData = this.loadUserData.bind(this);
    }




     // Load user data 
     async loadUserData() {
        console.log(this.props.userId)

        const data = await getUserID(this.props.userId);
        this.setState({userData: data})
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





async

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

        else{



      


        // Get this from React state/component props after login is done

       


        // Send the POST request
        

        const newProfile = {
            id: this.props.userId,
            userName: this.state.userName,
            password: this.state.password,
            address: this.state.address,
            phone: this.state.phone
        }
        console.log(newProfile);

        editProfile(newProfile);
    }
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
