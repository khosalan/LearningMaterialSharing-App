import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {NavigationContainer} from '@react-navigation/native';

import Root from './src/screens/Root';
import authReducer from './src/store/reducers/auth';
import postReducer from './src/store/reducers/post';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
