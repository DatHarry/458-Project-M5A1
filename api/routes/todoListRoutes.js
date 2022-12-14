'use strict'


module.exports = function(app) {
	var todoList = require('../controllers/todoListController'),
		userController = require('../controllers/userController')

	// todoList Routes
	app.route('/tasks')
		.get(todoList.list_all_tasks)
		.post(todoList.loginRequired, todoList.create_a_task);

	app.route('/tasks/:taskId')
		.get(todoList.read_a_task)
		.put(todoList.update_a_task)
		.delete(todoList.delete_a_task);

    // user Routes
	app.route('/auth/register')
		.post(userController.register)

	app.route('/auth/sign_in')
		.post(userController.sign_in)
};
