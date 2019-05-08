import {AsyncStorage} from 'react-native'
import { GET_TODO_LIST, 
         ADD_TODO_LIST,
         UPDATE_TODO_LIST,
         DELETE_TODO_LİST
        } from './types'

export const getToDoList = () => {
    return (dispatch) => {
        AsyncStorage.getItem('key7', (err, result) => {
            if(result != null) {
                const array = JSON.parse(result)
                dispatch({
                    type: GET_TODO_LIST,
                    payload: array
                });
            }
          });
      
    };
};

export const addToDoList = (params) => {
    return(dispatch) => {
        dispatch({
            type:ADD_TODO_LIST,
            payload: params
        })

    }
}

export const updateToDo = (updateTasks) => {
    return(dispatch) => {
        dispatch({
            type:UPDATE_TODO_LIST,
            payload: updateTasks
        })
    }
}

export const deleteToDo = (array) => { 
    return(dispatch) => {
        dispatch({
            type: DELETE_TODO_LİST,
            payload: array
        });
        AsyncStorage.setItem('key7',JSON.stringify(array))
            
        
        
       
    }
}