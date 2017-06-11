import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import {AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';
import * as Firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class RequestsProvider {

  constructor(public db: AngularFireDatabase) {

  }

  /* 
   * Posts an open request created by the current user
   *  - Adds Request to requests-open
   *  - Adds Request to users/<CURRENTUSER>/requests-open
   */
  postOpenRequest(data, openRequests: FirebaseListObservable<any[]>) {
    var d = new Date();
    var currentUser = Firebase.auth().currentUser;
    var creatorName: String;
    
    if (currentUser != null) {
      var t = d.getTime();
      var duration = 2;

      // Get organization
      var userOrgMapRef  = Firebase.database().ref("/user-org-map/" + currentUser.uid);
      var organization : string;
      userOrgMapRef.once("value", function(org) {
        organization = org.val();
      }, function (error) {
        console.log("Couldn't get organization: " + error.code);
      }).then( () => {
        var userMetadataRef = Firebase.database().ref(organization + "/users/"+ currentUser.uid + "/metadata/displayName");
        userMetadataRef.once('value', function(snapshot)  {
          creatorName = snapshot.val();
        }).then( () => {

          // !!! This is a REQUEST
          var newRequest = {
            title: data.title,
            description: data.description,
            starttime: t,
            duration: duration,
            creatorUid: currentUser.uid,
            creatorName: creatorName
          };

          openRequests.push(newRequest).then( (snapshot) => {
            const newKey = snapshot.key;
            var userNewOpenRequestRef = Firebase.database().ref(organization + "/users/"+ currentUser.uid + "/requests-open/" + newKey);
            userNewOpenRequestRef.set(newRequest);
          });
        });
      });
    } else {
      console.log("Failed to create request - couldn't access current user.")
      return;
    }
  }

  /*
   * Adds a response to an open request from the current user
   *  - Adds a Response to /requests-open/<REQUEST>/responses
   *  - Adds a Response to users/<CURRENTUSER>/responses-open
   */
   submitResponseToOpenRequest(requestId: string) {
    var currentUser = Firebase.auth().currentUser;
    var d = new Date();
    var responderName: String;
    var requestResponsesList: FirebaseListObservable<any[]>;

    if (currentUser != null) {
      var t = d.getTime();

      // Get organization
      var userOrgMapRef  = Firebase.database().ref("/user-org-map/" + currentUser.uid);
      var organization : string;
      userOrgMapRef.once("value", function(org) {
        organization = org.val();
      }, function (error) {
        console.log("Couldn't get organization: " + error.code);
      }).then( () => {
        // Update current responses list
        requestResponsesList = this.db.list(organization + '/requests-open/' + requestId + '/responses-open');

        var userMetadataRef = Firebase.database().ref(organization + "/users/"+ currentUser.uid + "/metadata/displayName");
        userMetadataRef.once('value', function(snapshot)  {
          responderName = snapshot.val();
        }).then( () => {
          // !!! This is a RESPONSE
          var newResponse = {
            requestId: requestId,
            responderName: responderName,
            responderId: currentUser.uid,
            responseTime: t
          };

          requestResponsesList.push(newResponse).then( (snapshot) => {
            const newKey = snapshot.key;
            var userNewOpenResponseRef = Firebase.database().ref(organization + "/users/"+ currentUser.uid + "/responses-open/" + newKey);
            userNewOpenResponseRef.set(newResponse);
          });
        });



      });
    }
   }

  /*
   * Moves an open request to 'confirmed' status where the connected user
   *  - Moves a Request from /requests-open to /requests-confirmed
   *  - Adds the confirmed Response to /requests-confirmed/<REQUEST>/confirmed-response from /requests-confirmed/<REQUEST>/responses
   *  - Moves the same Request from users/<CURRENTUSER>/requests-open to users/<CURRENTUSER>/requests-confirmed
   *  - Exchanges credits (from requestor to responder)
   */
   confirmResponseToOpenRequest(requestId: string, ) {

   }
}

function moveFirebaseRecord(oldRef, newRef, oldUserRef) {    
     oldRef.once('value', function(snapshot)  {
          newRef.set( snapshot.val(), function(error) {
               if( !error ) {  oldRef.remove(); oldUserRef.remove(); }
               else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
          });
     });
}