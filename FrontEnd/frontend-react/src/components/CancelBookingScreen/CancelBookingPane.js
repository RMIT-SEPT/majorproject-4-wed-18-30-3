import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"




class CancelBookingPane extends Component {

    constructor(){
        super();

        this.state= {
            bookingid : "",
            reason :""
        }
        
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        e.preventDfault();
        const cancelbooking = {
            bookingid : this.state.id,
            reason : this.state.reason
        }

        console.log(cancelbooking);
        

    }




   

   
    
    render() {
        return (
            <div className="cancel_booking_screen_Cancel_bookingpane" id="cancel_booking_screen_Cancel_bookingpane">
                <br/>    
                <b>Please Enter Your Booking ID</b>
                <div className="form-group">
                <form>
                <div><input type="text" className="form-control" placeholder="Unique Person ID" name="bookingid" value={this.state.bookingid} onChange = {this.onChange}/>

                </div>
                <br/>
                <div>
                <label for="cancel-reason">Select Cancel Reason:</label>
                        <select className="form-control" value={this.state.reason} onChange={this.onChange}>
                            <option value="Time Conflict5">Time Conflict</option>
                            <option value="No time available for worker">No time available for worker</option>
                            <option value="weather reason">weather reason</option>
                            <option value="60" >1 hour</option>
                            <option value="75">1 hr 15 min</option>
                            
                        </select>
                </div>
                </form>

                </div>


                <br/>   

                
            </div>
        )
    }
}

export default CancelBookingPane;
