import { GET_TODO_LIST, 
        ADD_TODO_LIST , 
        UPDATE_TODO_LIST, 
        DELETE_TODO_LİST
      } from '../actions/types';


const INITIAL_STATE = {
    tasks : [],
    isCreate: false,
    isUpdate: false
  
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TODO_LIST:
        return { ...state, tasks: action.payload };
    
    case ADD_TODO_LIST:
        return {...state, tasks: [...state.tasks, action.payload], isCreate:true, isUpdate:false };
    
    case  UPDATE_TODO_LIST:
        const {index,title,desc} = action.payload;
        return {...state, tasks:[
            ...state.tasks.slice(0, index), // everything before current post
            {
               ...state.tasks[index],
               title: title,
               desc: desc,
            },
            ...state.tasks.slice(index + 1), // everything after current post
        ],
        isCreate:false, 
        isUpdate:true
    } 
    
    case DELETE_TODO_LİST:
        return {...state, tasks: action.payload, isCreate:false, isUpdate:false};
    
  default:
      return state;

  }
};