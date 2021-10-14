import { User } from '../models/user';
import { createAction, props } from '@ngrx/store';




export const buildUserSession = createAction('[Users] Bulid User Session');




export const buildUserSessionSuccess = createAction('[Users] Bulid User Session Success', props<{ user: User  }>());

export const buildUserSessionFailed = createAction('[Users] Bulid User Session Failed');
