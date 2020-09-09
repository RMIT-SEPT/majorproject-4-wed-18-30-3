import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"

class EditProfile extends Component {

    constructor(){
        super();

        this.state= {
            id : "",
            userName : "",
            password : "",
            address : "",
            phone : ""
        }
        
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){

        console.log(this.value.name.value);
        e.preventDefault();
        const editPerson = {
            id : this.state.id,
            userName : this.state.userName,
            password : this.state.password,
            address : this.state.address,
            phone : this.state.phone

        }

        console.log(editPerson);
        

    }

 



    render() {
        return (
            <div className="profile_screen_editprofile" id="profile_screen_editprofile">
                
              <form onSubmit = {this.onSubmit}>
              <b>Edit Personal Profile</b>
              <div className="form-group">
                  <input type="text" className="form-control" placeholder="Unique Person ID" name="id" value={this.state.id} onChange = {this.onChange}/>

                 

              </div>
              
              <div>
              <input type="text" className="form-control" placeholder="Name" name="userName" value={this.state.userName} onChange = {this.onChange}/>

              </div>
              <br></br>
              <div>
              <input type="text" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange = {this.onChange}/>

              </div>
              <br></br>
              <div>
              <input type="text" className="form-control" placeholder="Address" name="address" value={this.state.address} onChange = {this.onChange}/>

              </div>
              <br></br>
              <div>
              <input type="phone" className="form-control" placeholder="Phone" name="phone" value={this.state.phone} onChange = {this.onChange}/>

              </div>
              <br></br>
              <div>
              <input type="submit" className="form-control" placeholder="Submit" name="" />

              </div>
            </form>
            </div>
        )
    }
}

export default EditProfile;
