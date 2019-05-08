/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import AddList from './components/AddList';
import List from './components/List';
import {Router, Scene, Stack, Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger'

import reducers from './reducers';





export default class App extends Component {

  renderRight() {
    return(
      <Icon onPress={() => Actions.AddList()} name= "ios-add" size={40} style={{color:'white', paddingRight: 16}} />
    )
  }
  render() {
    const store = createStore(reducers,{},applyMiddleware(ReduxThunk,logger))
    return (
      <Provider store={store}>
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
        renderRightButton={this.renderRight()}
        >
        </Scene>

        <Scene
        key="AddList"
        component={AddList}

        >
        </Scene>

        


        </Stack>

      </Router>
     </Provider>
     );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: 'white'
  },
  navBar: {
    width: '100%',
    backgroundColor: '#c0b3c2'
  
  }
    

});
