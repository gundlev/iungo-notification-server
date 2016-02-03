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
        reference: "/networkgroups/iungo/meetings/-K8BCoTa7i1_-b6Ia1Yp",
        read: false,
        title: "HUSK at mødet d.27/1 afholdes på ny adresse.",
        timestamp: 1453450491458,
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
