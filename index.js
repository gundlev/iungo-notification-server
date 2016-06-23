/*
Uses ES6 syntax. (more swifty)
npm install -g babel

use babel-node to run or compile with 'babel index.js' to es5.
*/

import Firebase from 'firebase'
import GCM from 'node-gcm'
import apn from 'apn'
//var apn = require('apn');
process.env.NODE_ENV = 'production';

//Setup of APN options and create connection
var options = {
	passphrase: "1234"
};
var apnConnection = new apn.Connection(options);
console.log("got here");
// API-Key for GCM
let sender = new GCM.Sender('AIzaSyCJDC76GxOWcBFBwaEmhbfJ4Esa8Wpd5E4');
//let root = new Firebase("https://brilliant-torch-4963.firebaseio.com/");

// Get timestamp for start of server
var startTime = Date.now();

// Get a database reference firebase
var ref = new Firebase("https://brilliant-torch-4963.firebaseio.com/notifications");

ref.authWithCustomToken("jk6NH9Rgh0O0VbGfPuQHFkAz0ynONLpwu5oVC6I8", function(error, authData) {
	if (error) {
		console.log("Login Failed! ", error);
	} else {
		console.log("Login Succeeded! ", authData);
	}
})

ref.orderByChild('timestamp').startAt(startTime).on("child_added", function(snapshot, prevChildKey) {
  console.log("New Child added");

    	var userRef = new Firebase("https://brilliant-torch-4963.firebaseio.com/users/" + snapshot.child('to').val());
    	userRef.once("value", function(data) {
    		  // console.log(snapshot.val());
    			console.log("Sending natofication:");
          // console.log(data.val());
    			console.log(data.child('device_token').val());

              if (data.child('device_token').val() !== null || data.child('device_token').val() !== "") {
                  var note = new apn.Notification();

                  note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
                  note.badge = 1//data.child('notifications').val(); // makes the white number in red circle, maybe change to 1.
                  note.sound = "ping.aiff";
                  note.alert = snapshot.child('title').val();
                  note.payload = {'type': snapshot.child('type').val(),
                          'reference': snapshot.child('reference').val()};

                  apnConnection.pushNotification(note, data.child('device_token').val());
              }
  						if (data.child('device_token_android').val() !== null || data.child('device_token_android').val() !== "") {
                let key = snapshot.key();
                let token = data.child('device_token_android').val(),
                    //title = snapshot.child('title').val(),
                    type = snapshot.child('type').val(),
                    reference = snapshot.child('reference').val(),
										title = snapshot.child('title').val();

                if(key && token && type && reference && title){
                  //CORE: if has child 'device_token_android' then send()
                  pushAndroid({key, token, type, reference, title})
                  //console.log({token, title, icon, type, reference})
                }
              }
  		});
});

let pushAndroid = ({key, token, type, reference, title}) => {
  console.log({key, token, type, reference, title})

  let message = new GCM.Message();

  message.addData({ key, type, reference, title });

  sender.send(message, { registrationIds: [token] }, function (err, result) {
      if(err) console.error(err);
      else    console.log(result);
  });
}
