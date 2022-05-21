import { Component, OnInit, Optional } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { EMPTY, from, Observable } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface INotificationPayload {
  title?: string;
  body?: string;
}
export interface MessagePayload {
  notification: INotificationPayload;
  data?: {[key:string]:string};
}

@Component({
  selector: 'app-messaging',
  template: `
    <p>
      Messaging!
      <code>{{ token$ | async | slice:0:12 }}
          <ng-container *ngIf="(token$ | async) !== null">&hellip;</ng-container>
      </code>
      <br><code>{{ message$ | async | json }}</code>
      <button  class="button block primary" (click)="request()" *ngIf="showRequest">Request FCM token</button>
    </p>
  `,
  styles: []
})
export class PushNtfComponent implements OnInit {

  token$: Observable<any> = EMPTY;
  message$: Observable<any> = EMPTY;
  showRequest = false;

  constructor(@Optional() messaging: Messaging) {
    console.log('messaging injected', messaging);
    if (messaging) {
      this.token$ = from(
        navigator.serviceWorker
          .register('firebase-messaging-sw.js', { type: 'module', scope: '__' }).
          then(serviceWorkerRegistration =>
            getToken(messaging, {
              serviceWorkerRegistration,
              vapidKey: environment.vapidKey,
            })
          )).pipe(
            tap(token => console.log('FCM registration', {token})),
            share(),
          );
      this.message$ = new Observable(sub =>
        onMessage(messaging, it => sub.next(it.notification)))
        .pipe( tap(token => {
            console.log('FCM messaging', { token })
           }),);
    }
  }

  ngOnInit(): void {
    if (Notification.permission === "denied") {
      alert("Notifications blocked. Please enable them in your browser.");
    }
    if ('permissions' in navigator) {
      navigator.permissions.query({name:'notifications'})
        .then((permission) => {
          permission.onchange = (dt) => {
            console.log("permissions ***", dt );

              // currentTarget: PermissionStatus -- currentTarget: PermissionStatus {name: 'notifications', state: 'granted', onchange: ƒ}
              // name: "notifications"
              // state: "denied" "granted"

          };
        });
    }
   }

  request() {
      Notification.requestPermission()
        .then(dt => console.log(' Notification ***', dt));
  }

}
// cUOnjrrR2H1ZEgOaRGEoE6:APA91bEK6VdK4fHZEt7TQNVDEVBW4aodexKoQbJTtNrfSQ0NdCwO_xAwSgaRMExnxSQKsIC-RiKafnI2h6gFZ1QxeMh1BowlE0IXeqGYxbFed_jUeR3y3kFMdKeQ_p-cFJs3qINvtod7

// import { Component, OnInit } from '@angular/core';
// import { AngularFireMessaging } from '@angular/fire/compat/messaging';
// import { trace } from '@angular/fire/compat/performance';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import * as firebase from 'firebase/app'

// @Component({
//   selector: 'app-messaging',
//   template: `
//     <p>
//       Messaging!
//       {{ token$ | async | json }}
//       {{ message$ | async | json }}
//       <button (click)="request()" *ngIf="showRequest">Request FCM token</button>
//     </p>
//   `,
//   styles: []
// })
// export class MessagingComponent implements OnInit {
//   token$: Observable<any>;
//   message$: Observable<any>;
//   showRequest = false;

//   constructor(public readonly messaging: AngularFireMessaging) {
//     this.message$ = messaging.messages;
//     this.token$ = messaging.tokenChanges.pipe(
//       trace('token'),
//       tap(token => this.showRequest = !token)
//     );
//   }

//   ngOnInit(): void {
//   }

//   request() {
//     this.messaging.requestPermission.subscribe({
//         next: () => {console.log, console.error }

//       });
//   }

// }
