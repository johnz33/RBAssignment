import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/pages/HomeScreen';
import NavigationScreen from './src/Navigation';

export default function App() {
  return (
      <NavigationScreen/>
  );
}

