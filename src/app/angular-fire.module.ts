import { NgModule } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { SERVICE_WORKER, VAPID_KEY } from '@angular/fire/compat/messaging';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { environment } from 'src/environments/environment';

let resolvePersistenceEnabled: (enabled: boolean) => void;
export const persistenceEnabled = new Promise<boolean>((resolve) => {
  resolvePersistenceEnabled = resolve;
});

@NgModule({
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideMessaging(() => getMessaging()),
  ],
  providers: [
    { provide: VAPID_KEY, useValue: environment.vapidKey },
    { provide: SERVICE_WORKER, useFactory:
          () => typeof navigator !== 'undefined'
                  && navigator.serviceWorker?.register(
                        'firebase-messaging-sw.js', { scope: '__' }) || undefined
    },
  ],
})
export class AngularFireModule {}
