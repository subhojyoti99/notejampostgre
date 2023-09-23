// var settings = {
//     development: {
//       db: {
//         client: 'mysql',
//         connection: {
//           host: '127.0.0.1',
//           user: 'subhojyoti',
//           password: 'subhojyoti',
//           database: 'notejam_dev'
//         }
//       },
//       dsn: "mysql://subhojyoti:" + "singha12" + "@" + "127.0.0.1" + ":" + "3000" + "/notejam_dev"
//     },
//     test: {
//       db: {
//         client: 'mysql',
//         connection: {
//           host: '127.0.0.1',
//           user: 'subhojyoti',
//           password: 'subhojyoti',
//           database: 'notejam_test'
//         }
//       },
//       dsn: "mysql://subhojyoti:" + "singha12" + "@" + "127.0.0.1" + ":" + "3000" + "/notejam_test"
//     }
//   };

var settings = {
    development: {
        db: 'postgres://myuser:mypassword@127.0.0.1:5433/data_note',
        
        dsn: 'postgres://myuser:mypassword@127.0.0.1:5433/data_note',
    },
      // Add any development specific settings here
    test: {
        db: 'postgres://myuser:mypassword@127.0.0.1:5433/data_note',
        dsn: 'postgres://myuser:mypassword@127.0.0.1:5433/data_note'
  }};

var env = process.env.NODE_ENV
if (!env) {
  env = 'development'
};
module.exports = settings[env];