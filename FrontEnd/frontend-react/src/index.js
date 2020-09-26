import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import { store, persistor} from './store/index'
import { PersistGate } from 'redux-persist/integration/react'

window.store = store

ReactDOM.render(
    <Provider store={store}>

            <PersistGate persistor = {persistor}>
                <App/>, 
           </PersistGate> 
       
    </Provider>,
    document.getElementById('root'),
);

serviceWorker.unregister();
