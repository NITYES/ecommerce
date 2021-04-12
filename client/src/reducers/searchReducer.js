
const initialState={
    text:"",
}

export const searchReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'SEARCH_QUERY':
            return {...state,text:action.payload.text};
       default:
        return state       
    }
}