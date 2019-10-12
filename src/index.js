import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore ,applyMiddleware, compose ,combineReducers} from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from '../src/store/reducers/order'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  burgerBuilder:burgerBuilderReducer,
  order: orderReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,composeEnhancers(
  applyMiddleware(thunk)
));


const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
