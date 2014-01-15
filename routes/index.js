var AboutController = require('./about_controller');
var HomeController = require('./home_controller');
var MentorController = require('./mentor_controller');
var ScheduleController = require('./schedule_controller');
var SubteamController = require('./subteam_controller');

module.exports = exports = function(app, db) {
  var homeController = new HomeController(db);
  var mentorController = new MentorController(db);
  var scheduleController = new ScheduleController(db);
  var aboutController = new AboutController(db);
  var subteamController = new SubteamController(db);

  app.get('/', homeController.index);

  app.get('/about', aboutController.index);

  // Mentor routes.
  app.get('/mentors.:format?', mentorController.index);
  //app.get('/mentors/:mentor.:format?', mentorController.show);
  app.post('/mentors', mentorController.create);
  app.get('/mentors/new', mentorController.new);
  app.get('/mentors/:mentor/edit', mentorController.edit);
  app.put('/mentors/:mentor', mentorController.update);
  app.delete('/mentors/:mentor', mentorController.destroy);

  // Schedule routes.
  app.get('/schedules.:format?', scheduleController.index);
  app.get('/schedules/:subteam.:format?', scheduleController.show);

  app.get('/subteams.:format?', subteamController.index);
}
