
exports.up = function(knex, Promise) {
	return knex.schema.createTable('immunization_records', function (tbl) {
		tbl.increments()
		
		tbl.date('received_date')
		.notNullable()
	
		tbl.string('note', 512)
		
		tbl.integer('patient_id')
		.unsigned()
		.notNullable()
		.references('id')
		.inTable('patients')
		.onDelete('RESTRICT')
		.onUpdate('CASCADE')
		
		tbl.integer('clinic_id')
		.unsigned()
		.notNullable()
		.references('id')
		.inTable('clinics')
		.onDelete('RESTRICT')
		.onUpdate('CASCADE')
		
		
		tbl.integer('vaccine_dose_id')
		.unsigned()
		.notNullable()
		.references('id')
		.inTable('vaccine_doses_schedules')
		.onDelete('RESTRICT')
		.onUpdate('CASCADE')
		
		// tbl.timestamp('created_at').defaultTo(knex.fn.now())
		
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('immunization_records')
};
