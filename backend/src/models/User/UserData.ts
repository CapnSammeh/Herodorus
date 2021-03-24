/*
    Data Controller that inerfaces directly with the DB
    Enables the creation/modification of User Records.
*/

import { QueryBuilder } from 'knex';
import { DataClient } from 'src/DataProvider';

export interface User {
    user_id: string,
    username: string,
    access_token: string,
    refresh_token: string
}

export interface Data {
    get: ReturnType<typeof getUser>;
    create: ReturnType<typeof createUser>;
    setRefreshToken: ReturnType<typeof setRefreshToken>;
    setAccessToken: ReturnType<typeof setAccessToken>;

}

// ** READ FROM DB ** //
//Interface that enables the gathering of a pk from the object
export interface GetInput {
    user_id: string
}
//Funciton that returns a user object from an input user_id
export const getUser = (user: () => QueryBuilder) => async (input: GetInput): Promise<User> => {
    return (
        (await
            user()
                .select()
                .where(
                    { user_id: input.user_id }
                )
        ) as User[]
    )[0];
}

// ** CREATE A NEW USER ** //
//Create an object that omits the self-generating record in the db (userid)
export type CreateInput = Omit<User, 'userid'>;
//Create a new user using the input previously created
export const createUser = (user: () => QueryBuilder) => async (input: CreateInput): Promise<User> => {
    //Declare the result var as the returned new user-id field
    const result = (
        (await
            user()
                .insert(input, ['user_id'])
        ) as [{ user_id: string }]
    )[0];
    //Return the full user object based on that input
    return (
        (await
            user()
                .select()
                .where({ user_id: result.user_id })
        ) as User[]
    )[0];
}

// ** SETTING TOKEN FIELDS ** //
//Create a type that accepts a user_id and a token of any type (we can then use this for both the access token, and the refresh token)
export type setTokenInput = { userIDToUpdate: string; newToken: string };
//Add a new refresh token to an existing user 
export const setRefreshToken = (user: () => QueryBuilder) => async (input: setTokenInput): Promise<User> => {
    //Make the query and await for the User promise to be resolved
    (
        (await
            user()
                .where({ user_id: input.userIDToUpdate })
                .update({ refresh_token: input.newToken })
        ) as User[]
    )[0];
    //Return the now updated User Object
    return (
        (await
            user()
                .where({ user_id: input.userIDToUpdate })
        ) as User[]
    )[0];
}

export const setAccessToken = (user: () => QueryBuilder) => async (input: setTokenInput): Promise<User> => {
    //Make the query and wait for the User promise to be resolved
    (
        (
            await
                user()
                    .where({ user_id: input.userIDToUpdate })
                    .update({ access_token: input.newToken })
        ) as User[]
    )[0];
    //Return the now updated User Object
    return (
        (
            await
                user()
                    .where({ user_id: input.userIDToUpdate })
        ) as User[]
    )[0]
}

//Expose a Create Function that acts as the initialisation for the object
export async function create(data: DataClient): Promise<Data> {
    const users = () => data.postgres.table('UserDetail');
    return {
        get: getUser(users),
        create: createUser(users),
        setAccessToken: setAccessToken(users), 
        setRefreshToken: setAccessToken(users),
    };
}

export default { create };