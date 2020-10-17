import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import axios from "axios";
import { connect } from 'react-redux'



const DNS_URI = "http://localhost:8080"
// const DNS_URI = "http://ec2-34-204-47-86.compute-1.amazonaws.com:8080"
// const axiosConfig = {headers: {'Content-Type': 'application/json'}}

// Return all availability objects
async function getBookings(token, userType, userName) {

    if (userType === "ADMIN") {
        return await axios.get(DNS_URI + '/api/booking', {
            headers: {
                'Authorization': token
            }
        }).then(function (response) {
            console.log('Authenticated');
            return response.data
        }).catch(function (error) {
            console.error("getBookings()", error)
            console.log(error.response.data)
        });
    } else if (userType === "CUSTOMER") {
        return await axios.get(DNS_URI + '/api/customer/' + userName, {
            headers: {
                'Authorization': token
            }
        }).then(function (response) {
            console.log('Authenticated');
            return response.data.bookings
        }).catch(function (error) {
            console.error("getBookings()", error)
            console.log(error.response)
            console.log(error.response.data)
        });
    }
}

function refresh() {window.location.reload(false)}




//  --------delete axios method here -------
async function deleteB(reasonInfo, bkgInfo, token, userType, userName) {

    // ------use this correct api/booking/delete for post log reason ------
     return await axios.delete(DNS_URI + '/api/booking', {
        timeslot: {date: bkgInfo.date },
        worker: {user: {userName: bkgInfo.userName}}
    },  { headers: { 
        'Authorization': token }
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


async function logReason(reasonInfo, token) {

     console.log(logReason)

//  ------use this correct api/booking/delete for post log reason and backend will delete bookings in database ------

    return await axios.post(DNS_URI + '/api/booking/delete', {

        bookingReference: reasonInfo.bookingReference,
        reason: reasonInfo.reason
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


// async function deleteBooking2() {

//     console.log(id)
//     return await axios.put(DNS_URI + '/api/booking'+id)
//     .then(res => {
//         console.log(`statusCode: ${res.status}`)
//         console.log(res.data)
//         return [true, res.status]
//     })
//     .catch(error => {
//         console.log(error.message)
//         return [false, error.response.status]
//     })
// }


const capitalise = (string) => {
    if (typeof string !== 'string') return null
    return string.charAt(0).toUpperCase() + string.slice(1)
}

// Create date object from "YYYY-MM-DD-hh-mm-ss" string
function parseDateString(dStr) {
    var date = new Date()
    date.setUTCFullYear(dStr.slice(0, 4))
    date.setUTCMonth(parseInt((dStr.slice(5, 7)) - 1, 10))
    date.setUTCDate(dStr.slice(8, 10))
    date.setUTCHours(dStr.slice(11, 13))
    date.setUTCMinutes(dStr.slice(14, 16))
    date.setUTCSeconds(dStr.slice(17, 19))
    return date
}

class CancelBookingPane extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bookingReference: '',
            userName: null,
            userType: null,
            bookings: this.getUserBookings(),
            bookingMsg: null,
            reason: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        this.storeLoginToken = this.storeLoginToken.bind(this)
        this.storeLoginToken()
    }

    // Store session token and login details in Redux state
    storeLoginToken() {
        this.props.dispatch({
            type: "LOGIN",
            payload: {
                'id': this.props.id,
                'userName': this.props.userName,
                'address': this.props.address,
                'phone': this.props.phone,
                'userType': this.props.userType,
                'token': this.props.token
            }
        })
        // TODO: persist state between refreshes
    }

    async getUserBookings() {
        // Only load bookings if a customer is logged in 
        if (this.props.userType !== null && this.props.userType !== "ADMIN" && this.props.userType !== undefined) {

            const bkgs = await getBookings(this.props.token, this.props.userType, this.props.userName).then()
            var userBkgs = []

            console.log(bkgs)
            var msgString = "Booking History Is Empty!!!"

            if (bkgs !== undefined) {
                // Only add bookings if theyre in the future
                if (Array.isArray(bkgs)) {
                    for (let i = 0; i < bkgs.length; i++) {
                        if (parseDateString(bkgs[i]["timeslot"]["date"]) > new Date()) {
                            userBkgs.push(bkgs[i])
                        }
                    }
                } else if (bkgs.constructor === Object) {
                    if (parseDateString(bkgs["timeslot"]["date"]) > new Date()) {
                        userBkgs = bkgs
                    }
                }
                if (userBkgs.length > 1)
                    msgString = "You have " + userBkgs.length + " uncompeleted bookings for now."
                else if (userBkgs.length === 1)
                    msgString = "You have " + userBkgs.length + " uncompeleted booking for now."

                this.setState({ bookingMsg: msgString })
                this.setState({ bookings: userBkgs })
            }
        }
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    //delete booking by click the red "Button"(line223) in each booking

    // deleteBook =(id) =>  {
    //     return  axios.get(DNS_URI + '/api/booking'+'id').then(response => {
    //         if (response.data !== null){
    //             alert("booking delete successfully");
    //         }      
    //         return response.data
    //     })
    // }


    // submit booking id and  cancel reason   only send bookingReference and reason is enough

    async onSubmit(e) {
        e.preventDefault();
        if (this.state.bookingReference == null) {
            alert("Please enter a bookingId.")
            return
        }
        if (this.state.reason == null) {
            alert("Please enter a reason.")
            return
        }

        const reasonInfo = {
            bookingReference: this.state.bookingReference,
            reason: this.state.reason
        }

        const bkgInfo = {
            date: [this.state.bookings.date],
            worker: { userName: [this.state.bookings.userName] }
        }

        logReason(reasonInfo, this.props.token);
        console.log(reasonInfo,this.props.token)
    }

    async deleteBooking(e) {
        e.preventDefault();
       
        const reasonInfo = {
            bookingReference: this.state.bookingReference,
            reason: this.state.reason
        }

        const bkgInfo = {
            date: [this.state.bookings.date],
            worker: { userName: [this.state.bookings.userName] }
        }

        deleteB(bkgInfo, this.props.token);
        console.log(bkgInfo,this.props.token)
    }



   //just test post and see what will be send (bookingReference and reason)
    onSubmit1 = (e) =>{
        e.preventDefault();
        const reasonInfo = {
            bookingReference: this.state.bookingReference,
            reason: this.state.reason
        }
        logReason(reasonInfo, this.props.token);
        console.log(reasonInfo,this.props.token)

    }





    render() {

        // Use the most recent element in state history
        const index = this.props.user.length - 1

        var headerText = "AGME Booking App"
        if (this.props.userType === "CUSTOMER")
            headerText = "AGME Booking App - Customer portal"
        else if (this.props.userType === "WORKER")
            headerText = "AGME Booking App - Worker portal"
        else if (this.props.userType === "ADMIN")
            headerText = "AGME Booking App - Admin portal"

        // Check user is logged in
        if (this.props.userName === undefined && this.props.userType === undefined) {
            return (
                <div className="profile_screen_editprofile" id="profile_screen_editprofile">
                    <Header
                        id={this.props.user[index]["id"]}
                        userName={this.props.user[index]["userName"]}
                        address={this.props.user[index]["address"]}
                        phone={this.props.user[index]["phone"]}
                        userType={this.props.user[index]["userType"]}
                        token={this.props.user[index]["token"]} />
                    <br /><br /><br /><br />
                    <b>Please log in first.</b>
                    <br /><br />
                    <Footer />
                </div>
            )

        } else {

            const bookings = this.state.bookings
            var bookingDisplay

            // Wait for promise fulfillment
            if (Array.isArray(bookings)) {

                // Customer
                var count = 0
                if (this.props.userType === "CUSTOMER") {
                    bookingDisplay = bookings.map((bkg) => {
                        return (
                            <div key={count++}>
                                <br />

                                <div className="list-group-item d-flex justify-content-between align-items-center" >

                                    <table width="2000%" border="2">
                                        <thead>
                                            <tr>
                                                <th>Booking ID </th>
                                                <th>ServiceName</th>
                                                <th>WorkerName</th>
                                                <th>Duration</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{bkg["id"]}</td>
                                                <td>{capitalise(bkg["service"]["name"])}</td>
                                                <td>{bkg["worker"]["user"]["userName"]}</td>
                                                <td>{bkg["service"]["minDuration"]}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    })
                }
            }

            // Check user is logged in
            if (this.props.userName === undefined && this.props.userType === undefined) {
                return (
                    <div className="cancel_pane" id="cancel_pane">
                        <br />
                        <b>Please log in to view availabilites</b>
                        <br /><br />
                    </div>
                )
            }
            // design for successful cancel page
            // if (!this.state.hasSuccess && !this.state.hasFail) { 

            //    post booking id & reason to api/delete
            return (
                <div className="container" id="cancelbooking_container">

                    <br /><br /><br />

                    <div className="row">

                        <div className="col-sm-9">

                            <b>User- {this.props.user[index]["userName"]} - Booking History</b> &nbsp; {this.state.bookingMsg}
                            <br /> <br />

                            <div className="cancelpane">



                                <form onSubmit={this.onSubmit}>
                                    <br></br>
                                    <span>Please enter the ID of the reservation you need to cancel and tell us your reason</span><br></br>

                                    <br></br>
                                    <div>
                                        <input type="text" className="form-control"
                                            placeholder="booking ID"
                                            name="bookingReference"
                                            value={this.state.value}
                                            onChange={this.onChange} />

                                    </div>
                                    <br></br>
                                    <div>
                                        <input type="text"
                                            className="form-control"
                                            placeholder="Cancel Reason"
                                            name="reason"
                                            value={this.state.value}
                                            onChange={this.onChange} />

                                    </div>
                                    <br></br>

                                    <div className="form1">
                                        <div className="col-sm">
                                            <input type="submit" value="Cancel" className="btn btn-outline-dark" id="navButton" 
                                            />
                                        </div>
                                        <br/>
                                        <div className="col-sm">
                                        <button className="btn btn-outline-dark" id="navButton" onClick={refresh}>
                                            Reset form
                                        </button>    
                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="history-part-col">
                                


                                <div className="list-group list-group-flush" id="scrollable">
                                    {bookingDisplay}
                                    {/* <button oonClick={this.deleteBooking}>  cancel  </button> */}
                                </div>
                            </div>



                        </div>
                    </div>

                </div>
            )
        // ------for successful cancel page--------

        // }if (this.state.hasSuccess) {
        //     return (
        //         <div className="booking_screen_bookingpane" id="booking_screen_bookingpane">
        //             <br/>    
        //             <b>CancelBooking successfully.</b>
        //             <br/><br/>   
    
        //             <div className="row">
        //                 <div className="col-sm">
        //                     <button className="btn btn-sm btn-dark" id="navButton" onClick={refresh}>
        //                         Cancel another booking
        //                     </button> 
        //                 </div>
        //                 <div className="col-sm">
        //                     <CancelButton/>
        //                 </div>
        //             </div>
        //         </div>   
        //     )
    
        // // Failed booking
        // } else if (this.state.hasFail) {
        //     return (
        //         <div className="booking_screen_bookingpane" id="booking_screen_bookingpane">
        //             <br/>    
        //             <b>CancelBooking failed. Please try again.</b>
        //             <br/><br/>   
                
        //         <div className="row">
        //             <div className="col-sm">
        //                 <button className="btn btn-sm btn-dark" id="navButton" onClick={refresh}>
        //                     Cancel another booking
        //                 </button> 
        //             </div>
        //             <div className="col-sm">
        //                 <CancelButton/>
        //             </div>
        //         </div>
        //     </div>  
        //     )
        // }




        
        }
    }
}


    
       









const mapStateToProps = state => {
    return { user: state.user }
}

const mapDispatchToProps = dispatch => {
    return { dispatch }
}




export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CancelBookingPane)
