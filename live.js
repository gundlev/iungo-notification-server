'use strict';

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _nodeGcm = require('node-gcm');

var _nodeGcm2 = _interopRequireDefault(_nodeGcm);

var _apn = require('apn');

var _apn2 = _interopRequireDefault(_apn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//var apn = require('apn');
process.env.NODE_ENV = 'production';

//Setup of APN options and create connection
/*
Uses ES6 syntax. (more swifty)
npm install -g babel

use babel-node to run or compile with 'babel index.js' to es5.
*/

var options = {
  passphrase: "1234"
};
var apnConnection = new _apn2.default.Connection(options);
console.log("got here");
// API-Key for GCM
var sender = new _nodeGcm2.default.Sender('AIzaSyCJDC76GxOWcBFBwaEmhbfJ4Esa8Wpd5E4');
//let root = new Firebase("https://brilliant-torch-4963.firebaseio.com/");

// Get timestamp for start of server
var startTime = Date.now();

// Get a database reference firebase
var ref = new _firebase2.default("https://brilliant-torch-4963.firebaseio.com/notifications");

ref.authWithCustomToken("jk6NH9Rgh0O0VbGfPuQHFkAz0ynONLpwu5oVC6I8", function (error, authData) {
  if (error) {
    console.log("Login Failed! ", error);
  } else {
    console.log("Login Succeeded! ", authData);
  }
});

ref.orderByChild('timestamp').startAt(startTime).on("child_added", function (snapshot, prevChildKey) {
  console.log("New Child added");

  var userRef = new _firebase2.default("https://brilliant-torch-4963.firebaseio.com/users/" + snapshot.child('to').val());
  userRef.once("value", function (data) {
    // console.log(snapshot.val());
    console.log("Sending natofication:");
    // console.log(data.val());
    console.log(data.child('device_token').val());

    if (data.child('device_token').val() !== null || data.child('device_token').val() !== "") {
      var note = new _apn2.default.Notification();

      note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
      note.badge = 1; //data.child('notifications').val(); // makes the white number in red circle, maybe change to 1.
      note.sound = "ping.aiff";
      note.alert = snapshot.child('title').val();
      note.payload = { 'type': snapshot.child('type').val(),
        'reference': snapshot.child('reference').val() };

      apnConnection.pushNotification(note, data.child('device_token').val());
    }
    if (data.child('device_token_android').val() !== null || data.child('device_token_android').val() !== "") {
      var key = snapshot.key();
      var token = data.child('device_token_android').val(),

      //title = snapshot.child('title').val(),
      type = snapshot.child('type').val(),
          reference = snapshot.child('reference').val();

      if (key && token && type && reference) {
        //CORE: if has child 'device_token_android' then send()
        pushAndroid({ key: key, token: token, type: type, reference: reference });
        //console.log({token, title, icon, type, reference})
      }
    }
  });
});

var pushAndroid = function pushAndroid(_ref) {
  var key = _ref.key;
  var token = _ref.token;
  var type = _ref.type;
  var reference = _ref.reference;

  console.log({ key: key, token: token, type: type, reference: reference });

  var message = new _nodeGcm2.default.Message();

  message.addData({ key: key, type: type, reference: reference });

  sender.send(message, { registrationIds: [token] }, function (err, result) {
    if (err) console.error(err);else console.log(result);
  });
};
