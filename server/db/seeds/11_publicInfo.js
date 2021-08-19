const public_infos = require('./json/publicInfos');

exports.seed = function (knex) {
	// Deletes ALL existing entries
	console.log("seed info");
	return createPublics(knex);
};

function createPublics(knex) {
	return knex("Public_Information")
		.del()
		.then(function () {
			return (
				knex("Public_Information")
					//.returning("Id")
					.insert(public_infos)
			);
		});
}