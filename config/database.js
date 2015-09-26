var odm = require('mongoose'),
    //credentials = require('../../private/credentials.js'),
    dbAddress = 'mongodb://bert:adminpassword@ds051943.mongolab.com:51943/rtc-practice',
    ctudb = 'jwt-auth',
    localDb = 'mongodb://localhost/jwt-auth';

odm.connection.on('connected', function () {
    console.log('EVENT: Connected to: ' + localDb);
});

odm.connection.on('error', function () {
    console.log('EVENT: ERROR: Cannot connect to database.');
});

odm.connection.on('disconnected', function () {
    console.log('EVENT: Disconnected from: ' + localDb);
});

odm.connection.on('SIGINT', function () {
    odm.connection.close(function () {
        console.log('EVENT: Database connection terminated because application was closed.');
        process.exit(0);
    });
});

module.exports = {
    connect: function (url, dbName) {
        var dbUri = url || dbAddress;
        var name = dbName || ctudb;
        dbUri += name;

        odm.connect(dbAddress);

        // alternate syntax when connecting to multiple dbs and passing optional options (json object)
        // var studentsDb = odm.createConnection(dbUri, credentials.s3db);
        odm.connection.once('open', function () {
            console.log('All your data are belong to us!. Connected to: ' + dbUri);
        });
    },
    close: function (db) {
        // use this if using default connection (mongoose.connect())
        // alternative a callback function can be passed like so odm.connection.close(callback)
        odm.connection.close();

        // when using named connections use this. An optional callback is also permitted
        // db.close(function() {}). db is the parameter passed in (database connection name)
    }
};