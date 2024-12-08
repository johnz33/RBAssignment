import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../pages/LoginScreen';
import SignUpScreen from '../pages/SignUpScreen';
import HomeScreen from '../pages/HomeScreen';
import DescriptionScreen from '../pages/DescriptionScreen';
import FilterPage from '../pages/FilterScreen';
import { Provider } from 'react-redux';
import store from '../redux/store';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false}} />
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
        <Stack.Screen name="Desc" component={DescriptionScreen} options={{headerShown:false}} />
        <Stack.Screen name="Filter" component={FilterPage} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default AppNavigator;
