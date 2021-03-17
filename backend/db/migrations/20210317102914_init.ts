import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    /* Setup the UserDetail Table
        This table includes a self-incrementing UserID PK, 
        a Username String and Password String value.
    */
    return knex.schema.createTable('UserDetail', function (table) {
        table.increments('userID');
        table.string('username');
        table.string('password');
    })
}


export async function down(knex: Knex): Promise<void> {
    /* Tears down the UserDetail Table */
    return knex.schema.dropTableIfExists('UserDetail');
}

