'use strict';

const e = React.createElement;

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return ' ';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

// const domContainer = document.querySelector('#calendar');
// ReactDOM.render(e(Calendar), domContainer);