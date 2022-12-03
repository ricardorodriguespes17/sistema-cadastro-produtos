import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('products', function (table) {
    table.string('cod').primary();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.float('price').notNullable();
    table.float('discount').notNullable();
    table.integer('amount').notNullable();
    table.float('weight').notNullable();
    table.string('unitOfMeasurement').notNullable();
    table.datetime('createdAt').notNullable();
    table.dateTime('updatedAt');
    table.boolean('deleted').defaultTo(false).notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('products');
}

