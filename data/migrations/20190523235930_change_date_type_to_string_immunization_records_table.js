
exports.up = function(knex, Promise) {
	return knex.schema.table('immunization_records', function (tbl) {
		tbl.renameColumn('isChild', 'is_child')
		tbl.timestamp('created_at').defaultTo(knex.fn.now())
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.table('immunization_records')
};
