var Firebase = require('firebase');
var ref = new Firebase("https://brilliant-torch-4963.firebaseio.com/networkgroups/forsam/meetings");

ref.push().set({
  address: "Parkvej 78, 2630 Taastrup",
  endTimestamp: 1446654600,
  startTimestamp: 1446647400,
  text: "Agenda er ikke fastlagt endnu",
  title: "Møde",
  participants: {
    'e2ac2896-0d74-4720-9b4a-25da4a251ff4': {
      status: 0
    }
  }
});
