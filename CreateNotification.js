var Firebase = require('firebase');

var memberRef = new Firebase("https://brilliant-torch-4963.firebaseio.com/networkgroups/forsam/members")

memberRef.once("value", function(data) {
  var dat = data.val();
  var array = [];
  var count = 0;
  for (var value in data.val()) {
    console.log(value);
    // array.push(value);
    var ref = new Firebase("https://brilliant-torch-4963.firebaseio.com/notifications");
      ref.push({
        from: "forsam",
        to: value,
        type: "reminder",
        reference: "/networkgroups/iungo/meetings/-JzQyc4p9UxcLVFkU5Pd",
        read: false,
        title: "TestNoti",
        timestamp: 1445872111519,
        fromName: "ForSam"
      });

    var userRef = new Firebase(("https://brilliant-torch-4963.firebaseio.com/users/" + value));
    userRef.once("value", function(data) {
      var number = data.child('notifications').val();
      number++;
      userRef.child('notifications').set(0);
    });
  }
});

function what(data) {
  console.log(data);
}
