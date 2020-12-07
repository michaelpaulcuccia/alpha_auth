import { FETCH_USER } from '../actions/types';

const authReducer = (state = null, action) => {

    //console.log(action)

    switch (action.type) {
        case FETCH_USER:
            //action.payload contains user model, either an object or empty string. empty string is a false value
            return action.payload || false
        default:
            return state;
    }
}

export default authReducer;