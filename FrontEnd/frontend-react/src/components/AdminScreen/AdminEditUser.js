import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import NavPane from '../Layout/NavPane'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import axios from "axios";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';






const DNS_URI = "http://localhost:8080"
// const DNS_URI = "http://ec2-34-204-47-86.compute-1.amazonaws.com:8080"


async function editUser(newUser, token, userType, userName) {

    const query = {
        userName: newUser.userName,
        password: newUser.password,
        address: newUser.address,
        phone: newUser.phone,
        userType: newUser.userType
    }

    console.log(JSON.stringify(query))





    return await axios.put(DNS_URI + '/api/user', {
        userName: newUser.userName,
        password: newUser.password,
        address: newUser.address,
        phone: newUser.phone,
        userType: newUser.userType
    }, {
        headers: {
            'Authorization': token
        }
    })
        .then(res => {
            console.log(`statusCode: ${res.status}`)
            console.log(res.data)
            return [true, res.status]
        })
        .catch(error => {
            console.log(error.message)
            return [false, error.response.status]
        })

}

// Return an array of all worker objects

async function getWorkers(token) {

    return await axios.get(DNS_URI + '/api/customer', {
        headers: {
            'Authorization': token
        }
    }).then(function (response) {
        console.log('Authenticated');
        return response.data
    }).catch(function (error) {
        console.error("getWorkers()", error)
        console.log(error.response.data)
    });

}

const capitalise = (string) => {
    if (typeof string !== 'string') return ''
    return string.charAt(0).toUpperCase() + string.slice(1)
}

// Return an array of all customer objects
// async function getUsers() {
//     return await axios.get(DNS_URI + '/api/customer/all').then(response => {
//         return response.data
//     })
// }




// Return relevant options depending on selection
// async function getUserOptions() {
//     const uers = await getUsers().then()
//     var userOptions = []





//     // Get all users names
//     for (let i = 0; i < uers.length; i++) {
//         userOptions.push({
//             value: { id: uers[i]["id"], userName: uers[i]["userName"] },
//             label: capitalise(uers[i]["userName"])
//         })
//     }
//     return userOptions
// }










class AdminEditUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: null,
            password: null,
            address: null,
            phone: null,
            response: null,
            errorMessage: "",
            successMessage: "",
            workerOptions: this.getWorkerOptions(),
            
            disableWorker: false,
        }

        this.getWorkerOptions = this.getWorkerOptions.bind(this)


        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    toggleDisableUser = () => this.setState(prevState => ({ disableUser: !prevState.disableUser }))


    // async loadUsers() {
    //     const options = await getUserOptions()
    //     this.setState({ optionsUser: options })
    // }

   


    // Return relevant options depending on selection

    async getWorkerOptions() {
        if (this.props.userName !== undefined && this.props.userType !== undefined) {
            const wks = await getWorkers(this.props.token, this.props.userType, this.props.userName).then()
            var workerOptions = []
            for (let i = 0; i < wks.length; i++) {
                workerOptions.push({
                    target: {
                        name: "userName",
                        value: wks[i].user.userName,
                        services: wks[i].services,
                        company: wks[i].companyName
                    },
                    label: wks[i].user.userName
                })
            }
            this.setState({ workerOptions: workerOptions })
            
        }
    }


    

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }



    async onSubmit(e) {
        e.preventDefault();

        if (this.state.userName == null) {
            alert("Please enter your new username.")
            return
        }
        if (this.state.password == null) {
            alert("Please enter your new password.")
            return
        }
        if (this.state.address == null) {
            alert("Please enter your new address.")
            return
        }
        if (this.state.phone == null) {
            alert("Please enter your new phone number.")
            return
        }

        const newUser = {

            userName: this.state.userName,
            password: this.state.password,
            address: this.state.address,
            phone: this.state.phone,
            userType: this.props.userType
        }

        const success = await editUser(newUser, this.props.token, this.props.userType, this.props.userName);
        this.setState({ response: success[1] })

        if (this.state.response >= 200 && this.state.response <= 302) {
            this.setState({ successMessage: "User successfully modified." })
            this.setState({ errorMessage: "" })
        } else {
            this.setState({ errorMessage: "User edit failed, please check your details and try again." })
            this.setState({ successMessage: "" })
        }
    }



    render() {


        const animatedComponents = makeAnimated();

        // Check user is logged in
        if (this.props.userName === undefined && this.props.userType === undefined) {
            return (
                <div className="profile_screen_editprofile" id="profile_screen_editprofile">
                <Header/>
                    <br/><br/><br/><br/>
                <b>Please <a href="/login">log in </a> to use the app.</b>
                <br/><br/>
                <Footer/>
                </div>
            )
        

        } else {
            return (

                <div className="container">

                    <Header id={this.props.id}
                        userName={this.props.userName}
                        address={this.props.address}
                        phone={this.props.phone}
                        userType={this.props.userType}
                        token={this.props.token} />
                    <br /><br /><br />

                    

                    <h2>Edit user details</h2>
                    <div className="row">
                        <div className="col-sm-3">
                            <NavPane
                                id={this.props.id}
                                userName={this.props.userName}
                                address={this.props.address}
                                phone={this.props.phone}
                                userType={this.props.userType}
                                token={this.props.token} />
                        </div>

                        <div className="col-sm-9">

                            <div className="admin_screen_editUser" id="admin_screen_editUser">

                                <br/>
                                <b>Edit Personal Profile</b>
                                <p>Please make sure to enter the correct user name to be modified, otherwise the user information will be modified by mistake</p>

                                <b><font color="red">{this.state.errorMessage}</font></b>
                                <b><font color="green">{this.state.successMessage}</font></b>
                                <br />


                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">

                                    </div>

                                    <div>
                                        {/* <div className="form-group">
                                            <label htmlFor="userName">Select a UserName:</label>
                                            <Select name={"userName"} value={this.state.value} options={this.state.optionsUser}
                                                onChange={this.onChange} components={animatedComponents} isDisabled={this.state.disableUser} />
                                        </div> */}
                                        <div className="form-group">
                                            <label htmlFor="worker">Select a worker:</label>
                                            {/* <Select name={"worker"} value={this.state.value} options={this.state.optionsWorker}
                                                onChange={this.onWorkerChange} components={animatedComponents} isDisabled={this.state.disableWorker} /> */}


                                            <Select name="userName"  components={animatedComponents}
                                                placeholder="User Name"
                                                value={this.state.value}
                                                options={this.state.workerOptions}
                                                onChange={this.onChange}
                                                isDisabled={this.state.disableWorker} />



                                        </div>



                                        <span color="red"> Note : This user information will be modified.</span>

                                    </div>
                                    <br></br>
                                    <div>
                                        <input type="text" className="form-control"
                                            placeholder="Password"
                                            name="password"
                                            value={this.state.value}
                                            onChange={this.onChange} />

                                    </div>
                                    <br></br>
                                    <div>
                                        <input type="text" className="form-control"
                                            placeholder="Address"
                                            name="address"
                                            value={this.state.value}
                                            onChange={this.onChange} />

                                    </div>
                                    <br></br>
                                    <div>
                                        <input type="phone"
                                            className="form-control"
                                            placeholder="Phone. Must be ten digits and start with 0"
                                            name="phone"
                                            value={this.state.value}
                                            onChange={this.onChange} />

                                    </div>
                                    <br></br>

                                    <div className="row">
                                        <div className="col-sm">
                                            <input type="submit" value="Save" className="btn btn-outline-dark" id="navButton"
                                            />
                                        </div>
                                        <div className="col-sm">
                                            <button className="btn btn-outline-dark" id="navButton" onClick={this.reset}
                                            >
                                                Cancel Edit
                                </button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                            <br /><br />


                        </div>


                    </div>
                    <Footer />
                </div>
            )
        }
    }
}

export default AdminEditUser;
