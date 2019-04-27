import React, {Component} from 'react';
import {Text, TextInput, View, StyleSheet, Dimensions, FlatList, AsyncStorage,TouchableOpacity
} from 'react-native';
import Button from './Button';
import Icon from 'react-native-vector-icons/FontAwesome';



const {width, height} = Dimensions.get('window');


class Main extends Component{
    state = {   
        title: '',
        description: '',
        tasks:[],
        isUpdate:false,
        index:0
        
    }

    componentDidMount() {
        this.retrieveData()

    }

    retrieveData = async () => {
        const myStorage = await AsyncStorage.getItem('storageTasks');
        const myArray = JSON.parse(myStorage)
    
        if (myArray !== null && myArray.length>0) { 
            this.setState({tasks:myArray})
            
        }
       
    };


    saveToList = async () =>{ 
        if(this.state.isUpdate) {
            let updateTasks = [ ...this.state.tasks ]
            updateTasks[this.state.index] = {title: this.state.title, desc: this.state.description};       
            this.setState(() => ({ 
                tasks: updateTasks,
                title:'', 
                description:'',
                isUpdate: false 
            }), async () => {
                try {
                    console.warn(this.state.tasks)
                    await AsyncStorage.setItem('storageTasks', JSON.stringify(this.state.tasks));
                    
                } catch (error) {
                    // Error saving data
                }; 
            })
        }
        else {
            this.setState(prevState => ({
            tasks: [...prevState.tasks,{title:this.state.title, desc: this.state.description}],
            title: '',
            description:''
        }), async () => {
            try {
                await AsyncStorage.setItem('storageTasks', JSON.stringify(this.state.tasks));
                
                
            } catch (error) {
                // Error saving data
            }
        })
        }
    

        
        
        
    }

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
            

        // 3
        this.setState(prevState => ({
            tasks:prevState.tasks.slice(0, index).concat(prevState.tasks.slice(index + 1, prevState.tasks.length))

        }), async () => {
            try {
                await AsyncStorage.setItem('storageTasks', JSON.stringify(this.state.tasks));
                
            } catch (error) {
                // Error saving data
            }
        })

    }
    updateListItem =  async (index) => {
        this.setState({
            title:this.state.tasks[index].title,
            description:this.state.tasks[index].desc,
            isUpdate:true,
            index:index
        })
        
        
        
        


    }


    render() {
        return(
            <View style = {styles.container}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(title) => this.setState({title})}
                    placeholder={'Başlık'}
                    value = {this.state.title}

                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={(description) => this.setState({description})}
                    placeholder={'Açıklama'}
                    value={this.state.description}
                    
                />
                <Button onClick = {() => this.saveToList()}/>

        

                <View style={styles.card}>
                    <FlatList
                        data={this.state.tasks}
                        renderItem={({item,index}) => 
                        <View style={styles.cardItem}>
                            <View>
                                <Text style={styles.hr}>{item.title}</Text>
                                <Text>{item.desc}</Text>
                                <Text>{item.id}</Text>
                                
                                
                            </View> 
                            <View style={styles.icons}>
                                <TouchableOpacity onPress={() => this.deleteListItem(index)}>
                                    <Icon
                                    name="close"
                                    size={20} 
                                    
                                />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.updateListItem(index)}>
                                    <Icon
                                    name="edit"
                                    size ={20}
                                    
                                />
                                </TouchableOpacity>
                                
                            </View>
            
                            
                            
                            

                        </View>}
                    />
                </View>


            </View>

        )
    }
}

const styles = StyleSheet.create( {
    container: {
        flex: 9,
        justifyContent: "center", 
        alignItems: "center",
        width,
    },
    textInput: {
        height: 40,
        borderColor: 'gray', 
        borderWidth: 1, 
        width: width*0.9,
        marginBottom: 10

    },
    card: {
        backgroundColor: '#fff',
        flex:1,
        width: width - 25,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowColor: 'rgb(50,50,50)',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        alignItems:'center'
    },
    cardItem: {
        marginTop: 20,
        padding: 10,
        height:52,
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#fff',
        justifyContent: 'space-between',
        width: width - 40,
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

export default Main;
