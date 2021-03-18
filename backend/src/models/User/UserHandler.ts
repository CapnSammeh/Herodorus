/*
    Object that interfaces with the Data Controller
    Wraps Controller functions in with Express Request parameters so we can actually use the functions in our app.
*/

import { Request } from 'express';
import createHttpError from 'http-errors';


import { DataClient } from 'src/DataProvider';
import UserController, {Controller} from "../User/UserController";
import { CreateInput, User } from '../User/UserData';

export interface Handler {
    get: ReturnType<typeof getCurrentUser>;
    create: ReturnType<typeof createUser>;
}

//Funciton to enable getting the current user
export const getCurrentUser = (users: Controller) => async (req: Request): Promise<User> => {
    const user: User | undefined = (req.user as unknown) as User;
    if(!user) throw createHttpError(400, 'An event ID is required');
    return users.get({ user_id: user.user_id });
}

//Function to create a new user
export const createUser = (users: Controller) => async (req: Request): Promise<User> => {
    //Create an Input (without the UserID)
    const user: CreateInput | undefined = (req.params.user as unknown) as CreateInput;
    //If we're unable to creat the user, throw an error.
    if (!user) throw createHttpError(400, 'User input is required');
    //Else, create the user
    return(users.create(user));
}

export async function create(data: DataClient): Promise<Handler> {
    const users = await UserController.create(data);
    return {
        get: getCurrentUser(users),
        create: createUser(users)
    };
}

export default { create };

