const enrollments = require('./json/enrollments');

exports.seed = function (knex) {
	// Deletes ALL existing entries
	console.log("seed enrollments");
	return createEnrollments(knex);
};

function createEnrollments(knex) {
	return knex("Enrolled_Courses")
		.del()
		.then(function () {
			return (
				knex("Enrolled_Courses")
					//.returning("Id")
					.insert(enrollments)
			);
		});
}