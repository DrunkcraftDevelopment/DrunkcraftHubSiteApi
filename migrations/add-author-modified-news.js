module.exports = {
  up: function(migration, DataTypes) {
    migration.renameColumn('News', 'news_author', 'created_by')
    migration.addColumn('News', 'updated_by', DataTypes.STRING)
  },
  down: function(migration, DataTypes) {
    migration.renameColumn('News', 'created_by', 'news_author')
    migration.removeColumn('News', 'updated_by')
  }
}
