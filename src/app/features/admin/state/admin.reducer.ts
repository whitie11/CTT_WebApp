import { User } from '@app/models/user';
import { AdminAction, AdminActions } from './admin.actions';

export interface AdminState {
    users: User[];
    selectedUser: User;
    loading: boolean;
    uloaded: boolean;
}

const initialState: AdminState = {
    uloaded: false,
    loading: false,
    users: [],
    selectedUser: null,
    // {
    //     id: null,
    //     token: '',
    //     username: 'initial',
    //     firstName: 'initial',
    //     lastName: 'initial',
    //     role: ''
    // }
};

export function adminReducer(state = initialState, action: AdminAction): AdminState {
    switch (action.type) {
        case AdminActions.LOAD_USERS:
            return { ...state, uloaded: false, loading: true };
        case AdminActions.LOAD_USERS_SUCCESS:
            return { ...state, users: action.payload, uloaded: true, loading: false };
        case AdminActions.LOAD_USERS_FAIL:
            return { ...state, uloaded: false, loading: false };
        case AdminActions.LOAD_USER:
            return { ...state, uloaded: false, loading: true };
        case AdminActions.LOAD_USER_SUCCESS:
            return { ...state, selectedUser: action.payload, uloaded: true, loading: false };
        case AdminActions.LOAD_USER_FAIL:
            return { ...state, uloaded: false, loading: false };
        case AdminActions.SET_SELECTED_USER:
            return { ...state, selectedUser: action.payload, uloaded: true };
        case AdminActions.REG_USER:
            return { ...state, loading: true };
        case AdminActions.REG_USER_SUCCESS:
            return { ...state, loading: false };
        case AdminActions.REG_USER_FAIL:
            return { ...state, loading: false };
            case AdminActions.UPDATE_USER:
            return { ...state, loading: true };
        case AdminActions.UPDATE_USER_SUCCESS:
            return { ...state, loading: false };
        case AdminActions.UPDATE_USER_FAIL:
            return { ...state, loading: false };
        default:
            return state;
    }
}
