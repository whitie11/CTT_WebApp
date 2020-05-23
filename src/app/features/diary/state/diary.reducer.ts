import { DiaryRow, DiaryListItem } from '@app/models/diaryListItem';
import { DiaryAction, DiaryActions } from './diary.actions';
import { Clinic } from '@app/models/clinic';
import { DiaryControls } from '@app/models/diaryControls';


export interface DiaryState {
    diaryRows: DiaryRow[];
    diaryLoading: boolean;
    selectedAppt: DiaryListItem;
    selectedClinic: Clinic;
    selectedDate: Date;
    diaryControls: DiaryControls;
}

const initialState: DiaryState = {
    diaryRows: [],
    diaryLoading: false,
    selectedAppt: null,
    selectedClinic: null,
    selectedDate: null,
    diaryControls: null
};

export function diaryReducer(state = initialState, action: DiaryAction): DiaryState {
    switch (action.type) {
        case DiaryActions.LOAD_DIARY:
            return { ...state, diaryLoading: true };
        case DiaryActions.LOAD_DIARY_SUCCESS:
            return { ...state, diaryLoading: false, diaryRows: action.payload };
        case DiaryActions.LOAD_DIARY_FAIL:
            return { ...state, diaryLoading: false };
        case DiaryActions.SAVE_SELECTED_CLINIC:
            return { ...state, selectedClinic: action.payload };
        case DiaryActions.SAVE_SELECTED_DATE:
            return { ...state, selectedDate: action.payload };
        case DiaryActions.SAVE_DIARYCONTROLS:
            return { ...state, diaryControls: action.payload };
        default:
            return state;
    }
}
