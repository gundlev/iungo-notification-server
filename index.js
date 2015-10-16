/*
Uses ES6 syntax. (more swifty)
npm install -g babel

use babel-node to run or compile with 'babel index.js' to es5.
*/

import Firebase from 'firebase'
import GCM from 'node-gcm'

let sender = new GCM.Sender('AIzaSyCJDC76GxOWcBFBwaEmhbfJ4Esa8Wpd5E4');
let root = new Firebase("https://brilliant-torch-4963.firebaseio.com/");

root.child('notifications')
.orderByChild('timestamp')
.equalTo(1444141972798) // for testing purposes... (single notification)
.on("child_added", function(snapshot, prevChildKey) {

  let to = snapshot.child('to').val()
  let key = snapshot.key()
  if(to === "00591a2d-49a1-4a6c-a569-4dad284b8f23"){
    var userRef = root.child('users').child(snapshot.child('to').val());
    	userRef.once("value", function(data) {
        let token = data.child('device_token_android').val(),
            //title = snapshot.child('title').val(),
            type = snapshot.child('type').val(),
            reference = snapshot.child('reference').val();

        if(key && token && type && reference){
          //CORE: if has child 'device_token_android' then send()
          pushAndroid({key, token, type, reference})
          //console.log({token, title, icon, type, reference})
        }
      })
  }

});


let pushAndroid = ({key, token, type, reference}) => {
  console.log({key, token, type, reference})

  let message = new GCM.Message();
  /*
  message.addNotification({
    title: "IUNGO: " + type,
    body: title,
    icon: typeToIcon(type),
    'click_action': typeToAction(type),
    data: {
      type, reference
    }
  });
  */

  message.addData({ key, type, reference });

  sender.send(message, { registrationIds: [token] }, function (err, result) {
      if(err) console.error(err);
      else    console.log(result);
  });
}
