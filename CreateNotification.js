var Firebase = require('firebase');
var userRef = new Firebase(("https://brilliant-torch-4963.firebaseio.com/users/" + "9b00302e-5eb4-42e9-a5da-e2bcabfdab80"));
userRef.once("value", function(data) {

  var number = data.child('notifications').val();
  number++;
  userRef.child('notifications').set(number);
  var ref = new Firebase("https://brilliant-torch-4963.firebaseio.com/notifications");

  ref.child("n044").set({
    from: "g4s",
    to: "e2ac2896-0d74-4720-9b4a-25da4a251ff4",
    type: "newMeeting",
    reference: "/networkgroups/g4s/meetings/m001",
    read: false,
    title: "Production noti 21",
    timestamp: 1444141972798,
    fromName: "G4S"
  });
});
