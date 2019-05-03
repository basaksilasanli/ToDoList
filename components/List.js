import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet, TouchableOpacity,FlatList, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import data from './const';
import { Actions } from 'react-native-router-flux';



const {width, height} = Dimensions.get('window');



class List extends Component {

    state = {   
        tasks:[]   
    }

    componentDidMount() {
        this.retrieveData()   

    }

    
    
    retrieveData = async () => {
        const myStorage = await AsyncStorage.getItem('storageTasks');
        const myArray = JSON.parse(myStorage)
        data.tasks = myArray
        
        
        if (myArray !== null && myArray.length>0) { 
            this.setState({tasks: myArray})
            
        }       
    };

    deleteListItem = async (index) => {
        // 1
        // console.log(index)
        // let data = await AsyncStorage.getItem('storageTasks')
        // console.log(data)
        // console.log(JSON.parse(data))
        // let dataArray = JSON.parse(data)
        // dataArray.splice(index, 1);
        // AsyncStorage.setItem('storageTasks', JSON.stringify(dataArray))
        // this.setState({tasks: dataArray})


        // 2
        // let testtask = this.state.tasks
        // testtask.splice(index,1)
        // this.setState({tasks:testtask})
        // await AsyncStorage.setItem('storageTasks', JSON.stringify(this.state.tasks));
            

        //3
        this.setState(prevState => ({
            tasks:prevState.tasks.slice(0, index).concat(prevState.tasks.slice(index + 1, prevState.tasks.length))

        }), async () => {
            try {
                await AsyncStorage.setItem('storageTasks', JSON.stringify(this.state.tasks));
                data.tasks = this.state.tasks

                
            } catch (error) {
                //Error saving data
            }
        })

    }

    updateListItem =  async (index) => {
        // this.setState({
        //     title:this.state.tasks[index].title,
        //     description:this.state.tasks[index].desc,
        //     isUpdate:true,
        //     index:index
        // })

        data.isUpdate=true,
        data.index=index,
        data.title=this.state.tasks[index].title,
        data.description=this.state.tasks[index].desc,

        Actions.AddList()

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                        <FlatList
                            data={this.state.tasks}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item,index}) => 
                            <View style={styles.cardItem}>
                                <View>
                                    <Text style={styles.hr}>{item.title}</Text>
                                    <Text>{item.desc}</Text>
                    
                    
                                    
                                </View> 
                                <View style={styles.icons}>
                                    <TouchableOpacity onPress={() => this.deleteListItem(index)}>
                                        <Icon
                                        name="close"
                                        size={20}
                                        style ={{color: '#c0b3c2', padding:4 }}
                                        
                                    />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.updateListItem(index) }>
                                        <Icon
                                        name="edit"
                                        size ={20}
                                        style ={{color: '#c0b3c2', padding:4  }}
                                        
                                    />
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
export default List