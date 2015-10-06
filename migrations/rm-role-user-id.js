module.exports = {
  up: function(migration, DataTypes) {
    migration.removeColumn('Roles', 'user_id')
  },
  down: function(migration, DataTypes) {
    migration.addColumn('Roles', 'user_id', DataTypes.STRING)
  }
}
