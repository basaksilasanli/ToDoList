import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet, TouchableOpacity,FlatList, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import {getToDoList, updateToDo, deleteToDo} from '../actions'



const {width, height} = Dimensions.get('window');

class List extends Component {

    state = {   
        title:"",
        description:"",
        
    }

    async componentWillMount() {
        this.props.getToDoList()
    }

    deleteListItem = async (i) => {
        const array = this.props.tasks.filter((item, index) => index !== i);
        this.props.deleteToDo(array)
    }

    updateListItem(index) {
        Actions.push('AddList', { index })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                        <FlatList
                            data={this.props.tasks}
                            keyExtractor={(index) => index.toString()}
                            renderItem={({item,index}) => 
                                
                                    <View style={styles.cardItem}>
                                        <View>
                                            <Text style={styles.hr}>{item.title}</Text>
                                            <Text>{item.desc}</Text>
                                        
                                        </View> 
                                        <View style={styles.icons}>
                                            
                                            <TouchableOpacity onPress={() => this.deleteListItem(index)}>
                                                <Icon name="close" size={20} style ={{color: '#c0b3c2', padding:4 }}/>
                                            </TouchableOpacity>
                                            
                                            <TouchableOpacity onPress={() => this.updateListItem(index)}>
                                                <Icon name="edit" size ={20} style ={{color: '#c0b3c2', padding:4  }}/>
                                            </TouchableOpacity>
                                       
                                        </View>    
                                
                                        
                                    </View>   
                            
                                
                            }
                       
                        
                        />
                </View>
            </View>
           
            
        )
    }
    

}
const styles = StyleSheet.create( {
        container: {
            flex:1,
            justifyContent: "center", 
            alignItems: "center",
            width,
            backgroundColor:"#f3e5f5"
      
        },
        card: {
            backgroundColor: '#fff',
            flex:1,
            width: width * 0.9,
            borderRadius: 10,
            shadowColor: 'rgb(50,50,50)',
            shadowOpacity: 0.3,
            shadowRadius: 5,
            alignItems:'center',
            marginTop: 20,
            marginBottom:20
        },
        cardItem: {
            padding:10,
            flex: 1, 
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor:'#fff',
            justifyContent: 'space-between',
            width: width*0.9,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            shadowColor: 'rgb(50,50,50)',
            shadowOpacity: 0.1,
            shadowRadius: 2,
        
        },
        hr: {
            fontSize:16
    
        },
        icons : {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'center'
    
        }
    
        
        
    
    });

const mapStateToProps = ({ ToDoListResponse }) => {
    console.log('Global todoListResponse: ', ToDoListResponse);
    return { tasks: ToDoListResponse.tasks, isCreate: ToDoListResponse.isCreate, isUpdate: ToDoListResponse.isUpdate  }
};

export default connect(mapStateToProps, { getToDoList, updateToDo, deleteToDo })(List);