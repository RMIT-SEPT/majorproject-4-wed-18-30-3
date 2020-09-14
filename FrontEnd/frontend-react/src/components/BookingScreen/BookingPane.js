import React, { Component } from 'react'
import axios from "axios";
import CancelButton from './CancelButton';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

    // Round a date object to its nearest minimum increment
    function roundTo(date) {
        
        // Change to match min booking duration
        const minDuration = 15;

        if (date != null) {
            var mins = 1000 * 60 * minDuration;
            return new Date(Math.round(date.getTime() / mins) * mins)
        } else 
            return date

    }

    // Header config for REST requests
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Send a create booking request to bookings endpoint
    function createBooking(newBooking) {

        console.log(newBooking)

        axios.post('http://localhost:8080/api/booking', {
            
            timeslot: newBooking.timeslot,
            duration: newBooking.duration,
            service: newBooking.service,
            worker: newBooking.worker,
            customer: newBooking.customer

        }, axiosConfig)
        .then(res => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
        })
        .catch(error => {
            console.error(error)
        })
    }

    // Return an array of all timeslot objects
    async function getTimeslots() {
        return await axios.get('http://localhost:8080/api/timeslot/all').then(response => {
            return response.data
        })
    }

    // Return an array of all booking objects
    async function getBookings() {
        return await axios.get('http://localhost:8080/api/booking/all').then(response => {
            return response.data
        })
    }

    // Return an array of all worker objects
    async function getWorkers() {
        return await axios.get('http://localhost:8080/api/worker/all').then(response => {
            return response.data
        })
    }

    // Return relevant options depending on selectbox type
    async function getOptions(selectType) {
        const avs = await getBookings().then()
        var serviceOptions = []
        var workerOptions = []
        var availOptions = []

        // Get service offered by selected worker
        if (selectType == "worker") {
            for (let i = 0; i < avs.length; i++) {               
                if (avs[i]["customer"] == null) {
                    var services = []
                    if (!services.includes(avs[i]["worker"]["services"]["name"])) {
                        // Capitalise label string
                        var nameString = avs[i]["worker"]["userName"]
                        var capitalised = nameString.charAt(0).toUpperCase() + nameString.slice(1)
                        serviceOptions.push({value: nameString, label: capitalised})
                    }
                }
            }
        }

    }
    
class BookingPane extends Component {

    constructor() {
        super()
        this.state = {
            date: roundTo(new Date()),
            duration: null,
            service: null,
            worker: null,
            customer: null,
            customerId: null,
            optionsWorker: [
                    {value: "jim", label: "Jim"},
                    {value: "wendy", label: "Wendy"},
                    {value: "hector", label: "Hector"}],
            optionsService: [{value: "none", label: "First select a worker"}],
            optionsAvailability: [{value: "none", label: "First select a worker"}]
        }

        this.onWorkerChange = this.onWorkerChange.bind(this);
        this.onServiceChange = this.onServiceChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // TODO:
    // 1. User chooses desired start time, 
    // 2. GET available timeslots and populate service selection with services available at timeslot
    // 3. User chooses a worker who is available at timeslot
    // 4. Populate duration seleection based on 
    
    onWorkerChange(worker) {
        this.setState({ worker })
        
        // Populate services with services the worker offers
        this.setState({options: getOptions("worker")})
        


    }   

    onServiceChange(service) {
        this.setState({ service })
    } 

    onTimeslotChange = service => this.setState({ service })

    onSubmit(e){
        e.preventDefault();

        if (this.state.date == null) {
            alert("Please select a start time and date.")
            return
        }
        if (this.state.duration == null) {
            alert("Please select a duration.")
            return
        }
        if (this.state.service == null) {
            alert("Please select a service.")
            return
        }
        if (this.state.worker == null) {
            alert("Please select a worker.")
            return
        }            

        // Need to match this with Cams backend format
        const timeslot = roundTo(this.state.date)

        // Get this from local React state after login is done
        const customer = null;

        var newBooking = {
            timeslot: timeslot,
            duration: this.state.duration.value,
            service: this.state.service.value,
            worker: this.state.worker.value,
            customer: customer
        }

        // Do formatting for newBooking here before invoking createBooking()

        // Send the POST request
        createBooking(newBooking);
    }

    render() {

        const animatedComponents = makeAnimated();
        
        return (
            <div className="booking_screen_bookingpane" id="booking_screen_bookingpane">
                <br/>    
                <b>Bookings</b>
                <br/>   <br/>   
                <form onSubmit={this.onSubmit}>

                    
                    <div className="form-group">
                    <label htmlFor="worker">Select a worker:</label>
                    <Select name={"worker"} value={this.state.value} options={this.state.optionsWorker}
                        onChange={this.onWorkerChange} components={animatedComponents}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="service">Select a service:</label>
                        <Select name={"service"} value={this.state.value} options={this.state.optionsService}
                            onChange={this.onServiceChange} components={animatedComponents}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="service">Select an available timeslot:</label>
                        <Select name={"service"} value={this.state.value} options={this.state.optionsAvailability}
                            onChange={this.onServiceChange} components={animatedComponents}/>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                           <input type="submit" className="btn btn-sm btn-dark" id="navButton"/>

                        </div>
                        <div className="col-sm">
                            <CancelButton/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default BookingPane;
