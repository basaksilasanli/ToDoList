/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SafeAreaView, AsyncStorage} from 'react-native';
import AddList from './components/AddList';
import List from './components/List';
import {Router, Scene, Stack, Actions} from 'react-native-router-flux';




export default class App extends Component {
 
  render() {
    return (

      <Router>

        <Stack 
        key='root'
        titleStyle={styles.title}
        navigationBarStyle={styles.navBar}
        title='To Do List'
        >

        <Scene
        key="List"
        component={List}
        initial
        renderRightButton={<Text onPress={ () => Actions.AddList()} >Add</Text>}
        >
        </Scene>

        <Scene
        key="AddList"
        component={AddList}
        >
        </Scene>

        


        </Stack>

      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3e5f5',
  },
  title: {
    fontSize: 30,
    color: 'white'
  },
  navBar: {
    width: '100%',
    backgroundColor: '#c0b3c2'
  
  }
    

});
