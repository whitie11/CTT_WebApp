import { errorAction, ErrorActionTypes } from '@app/store/actions/errors.action';


export interface ErrorState {
    error: any;
}

const initialState: ErrorState = {
    error: null
};

export const errorReducer: (state: ErrorState, action: errorAction ) => ErrorState = (
    state = initialState,
    action: errorAction
) => {
   // console.log('in switch ' + action.type);
    switch (action.type){
        case ErrorActionTypes.ADD_ERROR:
            return {...state, error: action.payload};
         case ErrorActionTypes.REMOVE_ERROR:
             return {...state, error: null};
        default: return {...state, error: null};
    }
};

