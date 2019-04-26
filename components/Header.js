import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

class Header extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>ToDo List</Text>
            </View>

        )
    }
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: "center", 
        alignItems: "center",
        width,
        backgroundColor: '#c0b3c2'
    },
    title: {
        fontSize:30,
        color: 'white'
    }

});

export default Header;


