import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    /* Setup the UserDetail Table
        This table includes a self-incrementing UserID PK, 
        a Username String and Password String value.
    */
    return knex.schema.createTable('UserDetail', function (table) {
        table.increments('user_id');
        table.string('spotify_id');
        table.string('email');
        table.string('display_name');
        table.string('access_token');
        table.string('refresh_token');
    })
}


export async function down(knex: Knex): Promise<void> {
    /* Tears down the UserDetail Table */
    return knex.schema.dropTableIfExists('UserDetail');
}

