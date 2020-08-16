'use strict';

const e = React.createElement;

class SubmitButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { clicked: false };
    }

    render() {
        if (this.state.clicked) {
            return 'Logging in...';
        }

        return e(
            'button',
            { onClick: () => this.setState({ clicked: true }) },
            /*TO DO edit onClick to send to homepage with required info*/
            'Submit'
        );
    }
}
const domContainer = document.querySelector('#login_submit_button_container');
ReactDOM.render(e(SubmitButton), domContainer);