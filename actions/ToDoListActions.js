import {AsyncStorage} from 'react-native'
import { GET_TODO_LIST, 
         ADD_TODO_LIST,
         UPDATE_TODO_LIST,
         DELETE_TODO_LİST
        } from './types'

export const getToDoList = () => {
    return (dispatch) => {
        AsyncStorage.getItem('key', (err, result) => {
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

export const updateToDo = (params, index) => {
    return(dispatch) => {
        dispatch({
            type:UPDATE_TODO_LIST,
            payload: {params,index}
        })
    }
}

export const deleteToDo = (array) => { 
    return(dispatch) => {
        dispatch({
            type: DELETE_TODO_LİST,
            payload: array
        });
        AsyncStorage.setItem('key',JSON.stringify(array))
            
        
        
       
    }
}