
exports.up = function(knex, Promise) {
	return knex.schema.table('patients', function (tbl) {
		tbl.renameColumn('isChild', 'is_child')
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.table('patients')
};
