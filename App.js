import React from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import Root from './src/screens/Root';
import postReducer from './src/store/reducers/post';

const rootReducer = combineReducers({
  posts: postReducer,
});

const store = createStore(rootReducer);

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
