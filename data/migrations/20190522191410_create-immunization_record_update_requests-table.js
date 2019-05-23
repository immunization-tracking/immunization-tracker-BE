
exports.up = function(knex, Promise) {
	return knex.schema.createTable('immunization_record_update_requests', function (tbl) {
		tbl.increments()
		
		tbl.date('note')
		
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
		.onDelete('CASCADE')
		.onUpdate('CASCADE')
		
		
		tbl.integer('patient_id')
		.unsigned()
		.notNullable()
		.references('id')
		.inTable('patients')
		.onDelete('CASCADE')
		.onUpdate('CASCADE')
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('immunization_record_update_requests')
};
