import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios";



class CancelBookingPane extends Component {

    constructor(){
        super();

        this.state= {
            bookings: []
            
        }
        
        //this.onChange = this.onChange.bind(this);
        //this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount(){
        this.getBookings();

    }


    getBookings(){
        axios.get(`http://localhost:8080/api/bookings`)
        .then(response => {
            this.setState({bookings: response.data},()=> {
                //console.log(this.state);

            }) 
        })

    }


    onDelete(){
        let bookingId=this.state.bookings.id;
        axios.delete(`http://localhost:8080/api/bookings/${bookingId}`)
        .then(response =>{
            this.props.history.push('/');
        })
    }

    




   

   
    
    render() {

       


        return (
            <div className="cancel_booking_screen_Cancel_bookingpane" id="cancel_booking_screen_Cancel_bookingpane">
                <b>timeslot --- service --- worker ---customer</b>


                
            </div>
        )

        const bookingItems = this.state.bookings.map((booking, i) => {
            return(
            <div>
                <b>timeslot -- service -- worker --customer</b>
            <li>{booking.timeslot},{booking.service},{booking.worker},{booking.customer}</li>
            <button onClick={this.onDelete.bind(this)} className="btn red right">DELETE</button>
            </div>

            
            )
        })
    }
}

export default CancelBookingPane;
