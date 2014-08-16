var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/




  // This function should do a sql query such that:
  // SELECT Users.username,
  //        Messages.msgtext,
  //        Messages.roomname
  // FROM   Messages
  // INNER JOIN Users
  // ON Messages.username_id = Users.ID
exports.findAllMessages = function(cb){
  dbConnection.query('SELECT users.username, messages.text, messages.roomname FROM messages INNER JOIN users ON messages.username_id = users.ID', function(err, results) {
    console.log("find all messages found these messages: ", results);
    if (err) {console.log(err);}
    cb(err, results);
  });
};

// exports.findAllMessages(function(err, results) {console.log(err, results)});

exports.findUser = function(username, cb){
  dbConnection.query("SELECT * FROM users WHERE username = ?", [username], function(err, results) {
    console.log("find user found these results: ", results);
    if (err) {console.log(err);}
    cb(err, results);
  });
};

// console.log("finding user... ");
// exports.findUser('Collin', function(err, results) {
//   console.log(results);
// });

exports.saveUser = function(username, cb){
  dbConnection.query("INSERT into users (username) values (?)", [username] , function (err) {
    console.log(username, + " was saved")
    if (err) { console.log(err); };
    exports.findUser(username, cb);
  });
};
// 'collin\'s favorite movie is inception'

// exports.saveUser('DanJr', function(err, results) {
//   console.log(results);
// });

exports.saveMessage = function(message, userid, roomname, cb){
  dbConnection.query("INSERT into messages (username_id, text, roomname) values (?, ?, ?)", [userid, message, roomname], function(err) {
    if (err) { console.log(err); };
    cb();
  });
};

// exports.saveMessage('In mercy\'s name, three days is all I need.', 2, 'lobby', function() {
//   console.log("saved! maybe..");
// });


