import { Clinic } from '@app/models/clinic';
import { ListAction, ListActionTypes } from '../actions/list.actions';
import { Locality } from '@app/models/locality';


export interface ListState {
    clinicList: Clinic[];
    listLoading: boolean;
    localityList: Locality[];
    locListLoading: boolean;
    apptTypeList: Locality[];
    apptTypeLoading: boolean;
}

const initialState: ListState = {
    clinicList: null,
    listLoading: false,
    localityList: null,
    locListLoading: false,
    apptTypeList: null,
    apptTypeLoading: false
};

export function listReducer(state = initialState, action: ListAction): ListState {
    switch (action.type) {
        case ListActionTypes.LOAD_CLINIC_LIST:
            return { ...state, listLoading: true };
        case ListActionTypes.LOAD_CLINIC_LIST_SUCCESS:
            return { ...state, listLoading: false, clinicList: action.payload };
        case ListActionTypes.LOAD_CLINIC_LIST_FAIL:
            return { ...state, listLoading: false };
        case ListActionTypes.LOAD_LOCALITY_LIST:
            return { ...state, locListLoading: true };
        case ListActionTypes.LOAD_LOCALITY_LIST_SUCCESS:
            return { ...state, locListLoading: false, localityList: action.payload };
        case ListActionTypes.LOAD_LOCALITY_LIST_FAIL:
            return { ...state, locListLoading: false };
        case ListActionTypes.LOAD_APPT_TYPE:
            return { ...state, apptTypeLoading: true };
        case ListActionTypes.LOAD_APPT_TYPE_SUCCESS:
            return { ...state, apptTypeLoading: false, apptTypeList: action.payload };
        case ListActionTypes.LOAD_APPT_TYPE_FAIL:
            return { ...state, apptTypeLoading: false };
        default:
            return state;
    }
}

