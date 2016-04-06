var Firebase = require('firebase');

var memberRef = new Firebase("https://brilliant-torch-4963.firebaseio.com/networkgroups/iungo/members")


memberRef.once("value", function(data) {
  var dat = data.val();
  var array = [];
  var count = 0;
  for (var value in data.val()) {
    console.log(value);
    array.push(value);
    var ref = new Firebase("https://brilliant-torch-4963.firebaseio.com/notifications");
      ref.push({
        from: "iungo",
        to: value,
        type: "reminder",
        reference: "/networkgroups/iungo/meetings/-KAakku0Sqpadyao6mnQ",
        read: false,
        title: "HUSK møde onsdag d. 24.",
        timestamp: 1456265254129,
        fromName: "IUNGO"
      });

    var userRef = new Firebase(("https://brilliant-torch-4963.firebaseio.com/users/" + value));
    userRef.once("value", function(data) {
      console.log("The ref from data: ");
      // console.log(data.key());
      var number = data.child('notifications').val();
      number++;
      const newUrl = "https://brilliant-torch-4963.firebaseio.com/users/" + data.key()
      console.log(newUrl);
      const thisUserRef = new Firebase(newUrl)
      thisUserRef.child('notifications').set(number);
    });
  }
});

function what(data) {
  console.log(data);
}
