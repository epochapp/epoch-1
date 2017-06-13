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
            creatorName: creatorName,
            responseCount: 0
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
   *  - Adds a Response to /requests-open/<REQUEST>/responses-open
   *  - Increment Response Counter in /requests-open/<REQUEST>/responseCount
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
        var requestResponseCountRef = Firebase.database().ref(organization + "/requests-open/"+ requestId + "/responseCount");
        var requestUserResponseCountRef = Firebase.database().ref(organization + "/users/"+ currentUser.uid + "/requests-open/" + requestId + "/responseCount");

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
            //const newKey = snapshot.key;
            //var userNewOpenResponseRef = Firebase.database().ref(organization + "/users/"+ currentUser.uid + "/responses-open/" + newKey);
            //userNewOpenResponseRef.set(newResponse);
            incrementResponseCount(requestResponseCountRef);
            incrementResponseCount(requestUserResponseCountRef);
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
  confirmResponseToOpenRequest( responseId: string, requestId: string ) {
    var currentUser = Firebase.auth().currentUser;
    var d = new Date();
    var responderName: String;
    var requestResponsesList: FirebaseListObservable<any[]>;

    if (currentUser != null) {
      // Get organization
      var userOrgMapRef  = Firebase.database().ref("/user-org-map/" + currentUser.uid);
      var organization : string;
      userOrgMapRef.once("value", function(org) {
        organization = org.val();
      }, function (error) {
        console.log("Couldn't get organization: " + error.code);
      }).then( () => {
        // Get response data
        var responseRef = Firebase.database().ref(organization + "/requests-open/" + requestId + "/responses-open/" + responseId);
        responseRef.once('value', (snapshot) => {
          var response = snapshot.val();
          var newUserRequestRef = Firebase.database().ref(organization + "/users/"+ currentUser.uid + "/requests-confirmed/" + requestId);
          var oldUserRequestRef = Firebase.database().ref(organization + "/users/"+ currentUser.uid + "/requests-open/" + requestId);
          moveAndConfirmRequest(oldUserRequestRef, newUserRequestRef, response.responderName, response.responderId);

          var newRequestRef = Firebase.database().ref(organization + "/requests-confirmed/" + requestId);
          var oldRequestRef = Firebase.database().ref(organization + "/requests-open/" + requestId);
          moveAndConfirmRequest(oldRequestRef, newRequestRef, response.responderName, response.responderId);
        });
        
      });
    }
  }
}


function incrementResponseCount(responseCountRef) {    
  responseCountRef.once('value', (snapshot) =>  {
    responseCountRef.set( snapshot.val() + 1, (error) => {
      if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
    });
  });
}

function moveAndConfirmRequest(oldRef, newRef, responderName: string, responderId: string) {
  oldRef.once('value', (snapshot) =>  {
    var request = snapshot.val();
    var newRequest = {
      title: request.title,
      description: request.description,
      starttime: request.starttime,
      duration: request.duration,
      creatorUid: request.creatorUid,
      creatorName: request.creatorName,
      responseCount: request.responseCount,
      confirmedResponder: responderName,
      confirmedResponderId: responderId
    };
    newRef.set(newRequest, (error) => {
      if( !error ) {  oldRef.remove(); }
      else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
    });
  });
}

function moveFirebaseRecord(oldRef, newRef) {    
  oldRef.once('value', (snapshot) =>  {
    newRef.set( snapshot.val(), (error) => {
      if( !error ) {  oldRef.remove(); }
      else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
    });
  });
}
