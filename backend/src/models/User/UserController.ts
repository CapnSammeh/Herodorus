/* 
    Data Controller that interfaces with the model
    Surfaces methods that enable viewing and modifying data from the db
*/

import { DataClient } from "src/DataProvider";
import UserData, { Data, GetInput, CreateInput } from "../User/UserData"; 


export interface Controller {
    get: ReturnType<typeof getUser>;
    create: ReturnType<typeof createUser>;
}

//Get a user given an input
export const getUser = (users: Data) => async (input: GetInput) => {
    return users.get(input);
}

//Create a new User
export const createUser = (users: Data) => async (input: CreateInput) => {
    return users.create(input);
}

//Expose a Create Function that acts as the initialisation for the object
export async function create (data: DataClient): Promise<Controller> {
    const users = await UserData.create(data);

    return {
        get: getUser(users),
        create: createUser(users),
    }
}

export default { create };