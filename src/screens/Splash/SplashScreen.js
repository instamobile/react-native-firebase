import React, { Component } from 'react';
 
import PaperOnboarding from 'react-native-paper-onboarding';
 
import Screen1 from './screens/screen1';
import Screen2 from './screens/screen2';
import Screen3 from './screens/screen3';
 
const screens = [Screen1, Screen2, Screen3];
 
export default class App extends Component {
  render() {
    return (
      <PaperOnboarding
        screens={screens}
      />
    );
  }
}