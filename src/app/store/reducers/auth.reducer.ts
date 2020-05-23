
import { AuthActionTypes, authAction } from '@app/store/actions/auth.action';
import { User } from '@app/models/user';

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    waiting: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: {
        id: null,
        token: '',
        username: 'Not defined',
        firstName: 'Not defined',
        lastName: 'Not defined',
        role: ''
    },
    waiting: false,
};

export function authReducer(state = initialState, action: authAction): AuthState {
    switch (action.type) {
        case AuthActionTypes.LOGIN: {
            return {
                ...state,
                waiting: true
            };
        }
        case AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    token: action.payload.token,
                    username: action.payload.username,
                    id: action.payload.id,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    role: action.payload.role
                },
                waiting: false
            };
        }
        case AuthActionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                isAuthenticated: false,
                waiting: false
            };
        }
        case AuthActionTypes.LOGOUT: {
            return {
                ...state,
                isAuthenticated: false,
                user: {
                    id: null,
                    token: '',
                    username: 'Not defined',
                    firstName: 'Not defined',
                    lastName: 'Not defined',
                    role: ''
                },
                waiting: false,
            };
        }
        default: {
            return state;
        }
    }
}





