import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import { whileStatement } from '@babel/types';

const {width, height} = Dimensions.get('window');
class Button extends Component {

    render() {
        return (
            <TouchableOpacity style = {styles.btn} onPress = { this.props.onClick }>
                <Text style ={styles.text} >{this.props.text}</Text>
            </TouchableOpacity>

            
        )
    }

}

const styles = StyleSheet.create( {
    btn : {
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: "#c0b3c2",
        padding: 10,
        borderRadius: 20,
        width: width*0.4,
        marginBottom: 20
    
    },

    text: {
        color:"white"

    }

});

export default Button;