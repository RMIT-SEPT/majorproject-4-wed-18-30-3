import React, { Component } from 'react'

import SimpleReactCalendar from 'simple-react-calendar'

class MyApp extends Component {
  render() {
    return <SimpleReactCalendar activeMonth={new Date()} />
  }
}

const container = document.querySelector('#calendar');
ReactDOM.render(e(SubmitButton), container);