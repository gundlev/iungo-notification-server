//Converter Class
//var Converter = require("csvtojson").Converter;
//var converter = new Converter({});

//Firebase refs
var Firebase = require('firebase');
var NGRef = new Firebase("https://iungo-staging.firebaseio.com/networkgroups/iungo/members");
//var BoostRef = new Firebase("https://iungo-staging.firebaseio.com/networkgroups/boost/members");
 var m1Ref = new Firebase("https://brilliant-torch-4963.firebaseio.com/networkgroups/iungo/meetings/-K8BCoTa7i1_-b6Ia1Yp/participants");
// var m2Ref = new Firebase("https://brilliant-torch-4963.firebaseio.com/networkgroups/iungo/meetings/-JzQL6xkh7fn4ym31AMu/participants");
// var m3Ref = new Firebase("https://brilliant-torch-4963.firebaseio.com/networkgroups/iungo/meetings/-JzQy6l9bis5PfPVO-5G/participants");
// var m4Ref = new Firebase("https://brilliant-torch-4963.firebaseio.com/networkgroups/iungo/meetings/-JzQyc4p9UxcLVFkU5Pd/participants");
var userRef = new Firebase("https://brilliant-torch-4963.firebaseio.com/users");
var ref = new Firebase("https://brilliant-torch-4963.firebaseio.com");

// var arr = [""];
//
// //end_parsed will be emitted once parsing finished
// converter.on("end_parsed", function (jsonArray) {

  // for (var i in jsonArray){
//       var data = jsonArray[i];
      //console.log(jsonArray);
      // console.log(jsonArray[i]["Whole name"]);
      // var user = jsonArray[i]
       ref.createUser({
         email    : "kca@mediamedic.agency",
         password : "1234"
       }, function(error, userData) {
         if (error) {
           console.log("Error creating user: ", error);
        //   console.log("Tried to create user: ", user["Whole name"]);
           } else {

             console.log("Successfully created user account with uid:", userData.uid);
             console.log(userData["Whole name"]);
               var uidString = userData.uid;
               var urlString = "/networkgroups/boost/members/" + uidString + "/status";
               var iungoString = "/networkgroups/iungo/members/" + uidString + "/status";
               userRef.child(userData.uid).set({
                   address: "",
                   company: "MediaMedic",
                   description: "",
                   email: "kca@mediamedic.agency",
                   title: "Creative Director",
                   phoneNo: "",
                   mobilNo: "30529209",
                   name: "Kim Carstens",
                   notifications: 0,
                   picture: "",
                   website: "",
                   ngroup: {
                       boost: urlString,
                       iungo: iungoString
                   }
               });

               NGRef.child(userData.uid).set({
                 status: 'aktiv'
               });
              //  BoostRef.child(userData.uid).set({
              //    status: 'aktiv'
              //  });

               m1Ref.child(userData.uid).set({
                 status: 0
               });
               //
               // m2Ref.child(userData.uid).set({
               //   status: 0
               // });
               //
               // m3Ref.child(userData.uid).set({
               //   status: 0
               // });
               //
               // m4Ref.child(userData.uid).set({
               //   status: 0
               // });
           }
       });

//  }

// });
//require("fs").createReadStream("./BoostPartWinShort.csv").pipe(converter);
