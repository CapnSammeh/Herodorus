import { EntityRepository, Repository, } from "typeorm";
import { UserDetail } from "./UserDetail";

@EntityRepository(UserDetail)
export class UserRepository extends Repository<UserDetail> {
    //Declare our UserDetail functions here
    // Inserts a user object into the database provided that there isn't an existing user.
    async stampPassport(user: UserDetail) {
        const currentUser = await this.createQueryBuilder()
            //Check if there's already a user in the db
            .select("user_detail")
            .from(UserDetail, "user_detail")
            .where("user_detail.email = :userEmail", { userEmail: user.email })
            .getOne();
        if (!currentUser) {
            console.log("No Current User");
            //If there's no current user in the db, insert the current user
            return this.save(user);
        } else {
            //If the user is in the DB, update their accesstoken and refreshtoken
            this.updateRefreshToken(user.user_id, user.refresh_token);
            this.updateAccessToken(user.user_id, user.access_token);
            console.log("User in DB");
            return currentUser;
        }
    }

    //Describes a User Object
    async createUser(user: Omit<UserDetail, 'user_id'>) {
        return user
    }

    //TODO: Regnerate the AccessToken with the RefreshToken
    /*
        A new function here (?) should use the RefreshToken against the user in the Database to generate a new AccessToken
        If the refresh token doesn't work, then we have to re-auth the user, as it's been too long since the token was generated.

        https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow
        Number 4:
        POST Request to https://accounts.spotify.com/api/token as 'application/x-www-form-urlencoded'
        with request body that looks like:
            {
                grant_type: "refresh_token",
                refresh_token: user_refresh_token
            }
        and a header that is a b64 encoded string that contains teh client ID and client secret key (jesus christ) following the below format:
            Authorization: Basic <base64 encoded client_id:client_secret>

        Then we'll get a new accessToken that we apply to the user in the DB; provided everything uses the DB access token (AND IT SHOULD), this will work just swell. 

        You would think the Passport Strat would handle this, but I can't seem to find anything that implies it does. Hmmm. 

    */

    //Function for updating the user's refresh token
    async updateRefreshToken(user_id: number, refresh_token: string) {
        const user = await this.createQueryBuilder()
            .select("user_detail")
            .from(UserDetail, "user_detail")
            .where("user_detail.user_id = :user_id", { user_id: user_id })
            .getOne()
        if (user && user.refresh_token != refresh_token) {
            const updateUser = this.createQueryBuilder()
                .update(UserDetail)
                .set({ refresh_token: refresh_token })
                .where("user_id = :user_id", { user_id: user_id })
                .execute()
            if (!updateUser) {
                console.log("Wasn't able to update user")
                return null
            }
            console.log("Updated User's Refresh Token")
            return updateUser;
        } else {
            console.log("No need to update Refresh Token")
            return null
        }
    }

    //TODO: Include a section here for remove the access token and refresh token from a user when they logout.

    //Function for updating the user's access token
    async updateAccessToken(user_id: number, access_token: string) {
        const user = await this.createQueryBuilder()
            .select("user_detail")
            .from(UserDetail, "user_detail")
            .where("user_detail.user_id = :user_id", { user_id: user_id })
            .getOne()
        if (user && user.access_token != access_token) {
            const updateUser = this.createQueryBuilder()
                .update(UserDetail)
                .set({ access_token: access_token })
                .where("user_id = :user_id", { user_id: user_id })
                .execute()
            if (!updateUser) {
                console.log("Wasn't able to update user")
                return null
            }
            console.log("Updated User's Access Token")
            return updateUser;
        } else {
            console.log("No need to update Access Token");
            return null
        }
    }
}