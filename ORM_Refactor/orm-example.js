/* You'll need to
 * npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "", {
  dialect: "mysql",
});
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var user = sequelize.define('user', {
  username: Sequelize.STRING
});

var message = sequelize.define('message', {
  // username_id: Sequelize.INTEGER,
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
});

user.hasMany(message, {foreignKey: 'username_id'});
message.belongsTo(user, {foreignKey: 'username_id'});

/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
user.sync({force: true}).success(function() {
  /* This callback function is called once sync succeeds. */
  console.log("users created");

  // now instantiate an object and save it:
  var newUser = user.build({username: "Jean Valjean"});
  newUser.save().success(function() {

    /* This callback function is called once saving succeeds. */

    // Retrieve objects from the database:
    user.findAll({ where: {username: "Jean Valjean"} }).success(function(usrs) {
      // This function is called back with an array of matches.
      for (var i = 0; i < usrs.length; i++) {
        console.log(usrs[i].username + " exists");
      }
    });
  });
});

message.sync({force: true}).success(function(){
  var newMessages = [message.build({text: "hello", roomname: "lobby", username_id: 1}),
                    message.build({text: "hello2", roomname: "lobby", username_id: 1}),
                    message.build({text: "hello3", roomname: "main", username_id: 1}),
                    message.build({text: "hello4", roomname: "notlobby", username_id: 1})]

  newMessages.forEach(function(message, messageIndex) {
    message.save().success(function(){
      console.log("New message added!");
      if (messageIndex === newMessages.length - 1) {
        exports.findAllMessages(function(){});
      }
    });


  });
});

exports.findAllMessages = function(cb){
  message.findAll({
    // attributes: ['text', 'roomname', 'username_id']
    include: [user]
  }).success(function(messages) {
    console.log(JSON.stringify(messages), "this is messages.dataValues");
  });

  // dbConnection.query('SELECT users.username, messages.text, messages.roomname FROM messages INNER JOIN users ON messages.username_id = users.ID', function(err, results) {
  //   console.log("find all messages found these messages: ", results);
  //   if (err) {console.log(err);}
  //   cb(err, results);
  // });
};







