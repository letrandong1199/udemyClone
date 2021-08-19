const feedbacks = require('./json/feedbacks');

exports.seed = function (knex) {
	// Deletes ALL existing entries
	console.log("seed feedbacks");
	return createFeedbacks(knex);
};

function createFeedbacks(knex) {
	return knex("Feedbacks")
		.del()
		.then(function () {
			return (
				knex("Feedbacks")
					//.returning("Id")
					.insert(feedbacks)
			);
		});
}