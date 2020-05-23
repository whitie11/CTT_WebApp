import { RegisterDTO} from '@app/models/registerDTO';

export interface UpdateUserDTO{
    id: number;
    user: RegisterDTO;
}

