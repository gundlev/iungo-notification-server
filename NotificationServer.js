// Require
var Firebase = require('firebase');
var apn = require('apn');
process.env.NODE_ENV = 'production';

// Get timestamp for start of server
var startTime = Date.now();

// Get connection to APN
var options = {
	passphrase: "1234"
};
var apnConnection = new apn.Connection(options);

//var myDevice = new apn.Device('1572c863 1c7af14e a0d8e91a d7610b3e d9c5a3df 76451901 45104954 d06b9962');

// Get a database reference firebase
var ref = new Firebase("https://brilliant-torch-4963.firebaseio.com/notifications");



// Attach an asynchronous callback to read the data at our posts reference
ref.on("child_added", function(snapshot, prevChildKey) {

		var snap = snapshot.val();
		//console.log("https://brilliant-torch-4963.firebaseio.com/users/" + snap.to);
  	
  	var userRef = new Firebase("https://brilliant-torch-4963.firebaseio.com/users/" + snapshot.child('to').val());
  	userRef.once("value", function(data) {
  		  console.log(snapshot.val());
  			console.log("Sending natofication");
  			console.log(data.child('device_token').val());

				if (snapshot.child('timestamp').val() > startTime) {
						var note = new apn.Notification();

						note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
						note.badge = data.child('notifications').val(); // makes the white number in red circle, maybe change to 1.
						note.sound = "ping.aiff";
						note.alert = snapshot.child('title').val();
						note.payload = {'type': snapshot.child('type').val(),
										'reference': snapshot.child('reference').val()};

						apnConnection.pushNotification(note, data.child('device_token').val());
				}
		});


});