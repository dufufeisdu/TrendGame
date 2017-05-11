var knex = require('./setupDatabase.js');
//data fromat:
//var data =  [{'name':'one'},{'name':'another'}]
let insert = function (data) {
    knex('trends').insert(data).then();
}
module.exports = insert;
