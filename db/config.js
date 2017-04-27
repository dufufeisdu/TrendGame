var serverUrl = '127.0.0.1';
var connection = {
  host: serverUrl,
  user: 'root',
  password: ''
};
var knex = require('knex')({
  client: 'mysql',
  connection: connection,
  useNullAsDefault: true
});
knex.raw('CREATE DATABASE IF NOT EXISTS trendNewsDB')
  .then(function() {});
connection.database = 'trendNewsDB';
knex = require('knex')({
  client: 'mysql',
  connection: connection,
  useNullAsDefault: true
});
var db = require('bookshelf')(knex);
db.knex.schema.hasTable('trends').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('trends', function(trend) {
      trend.increments('id').primary();
      trend.string('name');
      trend.timestamps();
    }).then(function(table) {
      console.log('created Table trends');
    });
  }
});
db.knex.schema.hasTable('trends').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('weeks', function(week) {
      week.increments('id').primary();
      week.string('startDate');
      week.integer('intensity');
      week.integer('trendId').unsigned();
      week.foreign('trendId').references('trends.id');
    }).then(function(table) {
      console.log('created Table weeks');
    });
  }
});
db.knex.schema.hasTable('trends').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('stories', function(story) {
      story.increments('id').primary();
      story.string('articleName', 500);
      story.string('mediaUrl', 200);
      story.string('url', 500);
      story.string('previewText', 1000);
      story.integer('weekId').unsigned();
      story.foreign('weekId').references('weeks.id');
    }).then(function(table) {
      console.log('created Table stories');
    });
  }
});
module.exports = db;