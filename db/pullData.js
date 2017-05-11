var knex = require('./setupDatabase.js');
var pullData = function (mostRecentTrends) {
	mostRecentTrends = mostRecentTrends || 20;
	knex('trends').max('id').then(function (maxId) {
		//maxId formate is [ { 'max(`id`)': 17 } ]
		let id = maxId[0]['max(`id`)'];
		//in case there is less than 20 records in table
		let startId = id > mostRecentTrends ? (id - mostRecentTrends) : 1;
		knex('trends').whereBetween('id', [startId, id]).then(function (result) {
			module.exports = result.reverse();
		});
	});
};
pullData();
