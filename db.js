// var pgp = require('pg-promise')
var { Pool } = require('pg');
// var mysql = require('mysql');
var async = require('async');
const settings = require('./settings');
// const db = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "subhojyoti",
//   password: "singha12",
//   database: "notejam_dev"
// });
// var db = pgp('postgres://myuser:mypassword@localhost:5432/mydatabase');
// var db = pgp(
//   {
//     user: "postgres",
//     password: "postgres",
//     host: "localhost",
//     port: 5432,
//     database: "database_note"
//   }
// )
var db = new Pool({
  connectionString: 'postgres://myuser:mypassword@127.0.0.1:5433/data_note',
});



var functions = {
  createTables: function(next) {
    async.series({
      createUsers: function(callback) {
        db.run("CREATE TABLE IF NOT EXISTS users (" +
            "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
            "email VARCHAR(75) NOT NULL," +
            "password VARCHAR(128) NOT NULL);", [],
            function() { callback(null); });
      },
      createPads: function(callback) {
        db.run("CREATE TABLE IF NOT EXISTS pads (" +
            "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
            "name VARCHAR(100) NOT NULL," +
            "user_id INTEGER NOT NULL REFERENCES users(id));", [],
            function() { callback(null); })
      },
      createNotes: function(callback) {
        db.run("CREATE TABLE IF NOT EXISTS notes (" +
            "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
            "pad_id INTEGER REFERENCES pads(id)," +
            "user_id INTEGER NOT NULL REFERENCES users(id)," +
            "name VARCHAR(100) NOT NULL," +
            "text text NOT NULL," +
            "created_at default current_timestamp," +
            "updated_at default current_timestamp);", [],
            function() { callback(null); });
      }
    },
    function(err, results) {
      next();
    });
  },

  applyFixtures: function(next) {
    this.truncateTables(function() {
      async.series([
        function(callback) {
          db.run("INSERT INTO users VALUES (1, 'user1@example.com', " +
                 "'$2a$10$mhkqpUvPPs.zoRSTiGAEKODOJMljkOY96zludIIw.Pop1UvQCTx8u')", [],
                function() { callback(null) });
        },
        function(callback) {
          db.run("INSERT INTO users VALUES (2, 'user2@example.com', " +
                 "'$2a$10$mhkqpUvPPs.zoRSTiGAEKODOJMljkOY96zludIIw.Pop1UvQCTx8u')", [],
                function() { callback(null) });

        },
        function(callback) {
          db.run("INSERT INTO pads VALUES (1, 'Pad 1', 1)", [],
                function() { callback(null) });
        },
        function(callback) {
          db.run("INSERT INTO pads VALUES (2, 'Pad 2', 1)", [],
                function() { callback(null) });
        },
        function(callback) {
          db.run("INSERT INTO notes VALUES (1, 1, 1, 'Note 1', 'Text', 1, 1)", [],
                function() { callback(null) });
        },
        function(callback) {
          db.run("INSERT INTO notes VALUES (2, 1, 1, 'Note 2', 'Text', 1, 1)", [],
                function() { callback(null) });
        }
      ], function(err, results) {
        next();
      })
    });
  },

  truncateTables: function(next) {
    async.series([
      function(callback) {
        db.run("DELETE FROM users;", [],
              function() { callback(null) });
      },
      function(callback) {
        db.run("DELETE FROM notes;", [],
              function() { callback(null) });

      },
      function(callback) {
        db.run("DELETE FROM pads;", [],
              function(result) { callback(null); });
      }
    ], function(err, results) {
      next();
    })
  }
}


if (require.main === module) {
  functions.createTables(function() {
    console.log("DB successfully initialized");
  });
}

module.exports = functions;
