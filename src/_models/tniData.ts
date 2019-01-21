import { Menu } from './menu';
import { Profile } from './profile';
import { UserData } from './user_data';

export interface tniData {
    menu : Menu[];
    profile: Profile;
    user_data: UserData;
  }