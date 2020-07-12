
const initState = [];

export default function reducer(state,action) {
    if(action.type == 'add'){
        return action.payload
    }
    return state
};