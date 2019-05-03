import React, {Component} from 'react';
import {
    TextInput, 
    View, 
    StyleSheet, 
    Dimensions, 
    AsyncStorage,
} from 'react-native';
import Button from './Button';
import { Actions } from 'react-native-router-flux';
import data from './const';


const {width, height} = Dimensions.get('window');


class AddList extends Component{
    
    state = {   
        title: '',
        description: '',
        tasks:[],
        isUpdate:false,
        index:0
    }
    componentWillMount() {
        this.setState({
            tasks: data.tasks,
            title: data.title,
            description:data.description,
            isUpdate: data.isUpdate,
            index: data.index
        })
    }

    saveToList = async () => {  

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
                
                    await AsyncStorage.setItem('storageTasks', JSON.stringify(this.state.tasks));
                    data.tasks = this.state.tasks
                    data.title = "",
                    data.description = "",
                    data.isUpdate = false
                    Actions.pop()
                    Actions.refresh({ key: Math.random() })
                    
                    
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
                data.tasks = this.state.tasks
                Actions.pop()
                Actions.refresh({ key: Math.random() })
                
            } catch (error) {
                // Error saving data
            }
        })
        }
        
        
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

    }    

});

export default AddList;
