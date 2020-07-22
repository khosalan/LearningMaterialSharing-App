import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {MyPosts, screenOptions as myPostScreenOptions} from '../MyPosts';
import {
  PostDescription,
  screenOptions as postScreenOptions,
} from '../PostDescription';
import {AddPost, screenOptions as addPostScreenOptions} from '../AddPost';
import Comments from '../Comments';

import {Colors} from '../../utils/constant';

const MyPostsNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.blue,
        },
        headerTintColor: Colors.white,
      }}>
      <Stack.Screen
        name="MyPosts"
        component={MyPosts}
        options={myPostScreenOptions}
      />
      <Stack.Screen
        name="Description"
        component={PostDescription}
        options={postScreenOptions}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPost}
        options={addPostScreenOptions}
      />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
};

export default MyPostsNavigation;
