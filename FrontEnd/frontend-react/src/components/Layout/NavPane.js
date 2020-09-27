import React, { Component } from 'react'
import ContextualButtonPane from './ContextualButtonPane';

class NavPane extends Component {
    render() {
        return (
            <div className="nav_pane" id="nav_pane">
                <br/>
                <b>Navigation</b>
                <br/><br/>
                <ContextualButtonPane
                    id={this.props.id}
                    userName={this.props.userName}
                    address={this.props.address}
                    phone={this.props.phone}
                    userType={this.props.userType}
                    token={this.props.token}/>
            </div>
        )
    }
}

export default NavPane;
