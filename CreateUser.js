var Firebase = require('firebase');
var NGRef = new Firebase("https://brilliant-torch-4963.firebaseio.com/networkgroups/iungo/members");
var m1Ref = new Firebase("https://brilliant-torch-4963.firebaseio.com/networkgroups/iungo/meetings/-JzQIGVzlOuVHy2yA13u/participants");
var m2Ref = new Firebase("https://brilliant-torch-4963.firebaseio.com/networkgroups/iungo/meetings/-JzQL6xkh7fn4ym31AMu/participants");
var m3Ref = new Firebase("https://brilliant-torch-4963.firebaseio.com/networkgroups/iungo/meetings/-JzQy6l9bis5PfPVO-5G/participants");
var m4Ref = new Firebase("https://brilliant-torch-4963.firebaseio.com/networkgroups/iungo/meetings/-JzQyc4p9UxcLVFkU5Pd/participants");
var userRef = new Firebase("https://brilliant-torch-4963.firebaseio.com/users");
var ref = new Firebase("https://brilliant-torch-4963.firebaseio.com");

var arr = [""];

ref.createUser({
  email    : "bitten@seize.dk",
  password : "1234"
}, function(error, userData) {
  if (error) {
    console.log("Error creating user:", error);
    } else {
      console.log("Successfully created user account with uid:", userData.uid);
      console.log(userData.uid);
        var uidString = userData.uid;
        var urlString = "/networkgroups/iungo/members/" + uidString + "/status";
        userRef.child(userData.uid).set({
            address: "",
            company: "Seize",
            description: "",
            email: "bitten@seize.dk",
            title: "Bogholder",
            phoneNo: "",
            mobilNo: "91942222",
            name: "Bitten Hartmann",
            notifications: 0,
            picture: "",
            website: "",
            ngroup: {
                iungo: {
                      status: urlString
                }
            }
        });

        NGRef.child(userData.uid).set({
          status: 'aktiv'
        });

        m1Ref.child(userData.uid).set({
          status: 0
        });

        m2Ref.child(userData.uid).set({
          status: 0
        });

        m3Ref.child(userData.uid).set({
          status: 0
        });

        m4Ref.child(userData.uid).set({
          status: 0
        });
    }
});

