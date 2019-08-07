
exports.up = function(knex, Promise) {
	return knex.schema.createTable('vaccine_doses_schedules', function (tbl) {
		tbl.increments()
		
		tbl.date('due_month')
		.notNullable()
		
		tbl.integer('dose_number',15)
		.notNullable()
		
		tbl.integer('vaccine_id')
		.unsigned()
		.notNullable()
		.references('id')
		.inTable('vaccines')
		.onDelete('RESTRICT')
		.onUpdate('CASCADE')
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('vaccine_doses_schedules')
};
