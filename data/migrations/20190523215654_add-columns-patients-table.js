
exports.up = function(knex, Promise) {
	return knex.schema.table('patients', function (tbl) {
		tbl.date('birthday')
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.table('patients')
};
