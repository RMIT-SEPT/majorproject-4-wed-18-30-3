import React, { Component } from 'react'
import {Link} from "react-router-dom";

class ContextualButtonPane extends Component {
    
    render() {
        return (
            <React.Fragment>
            <Link to="/dashboard" className="btn btn-sm btn-dark" id="navButton">
            Todo: contextual links
            </Link>
            <br/><br/>
            <Link to="/dashboard" className="btn btn-sm btn-dark" id="navButton">
            Todo: contextual links
            </Link>
            <br/><br/>
            <Link to="/dashboard" className="btn btn-sm btn-dark" id="navButton">
            Todo: contextual links
            </Link>
            <br/><br/>
            </React.Fragment>
        )
    }
}

export default ContextualButtonPane;
