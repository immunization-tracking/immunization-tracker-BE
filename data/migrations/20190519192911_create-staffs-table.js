
exports.up = function(knex, Promise) {
	return knex.schema.createTable('staffs', function (tbl) {
		tbl.increments()
		tbl.string('username', 50)
		.notNullable()
		.unique()
		
		tbl.string('password')
		.notNullable()
		
		tbl.string('email')
		.notNullable()
		
		tbl.string('first_name', 125)
		tbl.string('last_name',125)
		tbl.string('avatar')
		
		tbl.integer('clinic_id')
		.unsigned()
		.notNullable()
		.references('id')
		.inTable('clinics')
		.onDelete('RESTRICT')
		.onUpdate('CASCADE')
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('staffs')
};
