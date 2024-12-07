import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './pages/LoginScreen';
import SignUpScreen from './pages/SignUpScreen';
import HomeScreen from './pages/HomeScreen';
import DescriptionScreen from './pages/DescriptionScreen';
import { Provider } from 'react-redux';
import store from './redux/store';
import FilterPage from './pages/FilterScreen';

const Stack =createStackNavigator();

const NavigationScreen = () => {
  return (
    <Provider store={store}>
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
           <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} /> 
           <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false}}/>
           <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
           <Stack.Screen name="Desc" component={DescriptionScreen} options={{headerShown:false}}/>
           <Stack.Screen name="Filter" component={FilterPage} options={{headerShown:false}}/>
        </Stack.Navigator>
        </NavigationContainer>
     </Provider>   
    
  )
}

export default NavigationScreen;