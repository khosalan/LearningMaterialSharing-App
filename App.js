import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import Root from './src/screens/Root';
import authReducer from './src/store/reducers/auth';
import postReducer from './src/store/reducers/post';
import commentReducer from './src/store/reducers/comment';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  comment: commentReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

export default App;
