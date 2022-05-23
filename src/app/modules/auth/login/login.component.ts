import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import {MessageService} from 'primeng/api';
import { SubSink } from 'subsink';
import { environment } from 'src/environments/environment';

import { Subscription, Observable } from 'rxjs';
import { AuthService, UserCredentials } from '../services/auth.service';
import { Provider } from '@supabase/supabase-js';

export const EmailValidation = [
  Validators.required,
  Validators.maxLength(50),
];
export const PasswordValidation = [
  Validators.required,
  Validators.minLength(8),
  Validators.maxLength(50),
];
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [MessageService],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading : boolean = false;
  loginError = "";
  subSink = new SubSink();
  redirectUrl;
  sttcFiles:any[];
  urlImg: string = `${environment.url_files}`;
  urlBackImg:string =  `assets/custom/images/fondo_logo.png`;

  subscriptions: Subscription[] = [];
  accountName = "";
  isLoggedIn = false;

  constructor(private fb: FormBuilder, private authService: AuthService,
        private router: Router, private toastService: MessageService) {
        // route.paramMap.subscribe(
        //   params => (this.redirectUrl = params.get('redirectUrl'))
        // );
      }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", EmailValidation],
      password: ["", PasswordValidation],
    });
  }


  handleOAuthLogin(provider: Provider) {
    this.authService.signInWithProvider(provider)
    .then((dt)=> {
      const { user, session, error } = dt;
      console.error('handleOAuthLogin: ', user, session, error);
      if (user && !error ) {
        console.error('Success login: ', user, session);
      } else if (error) {
        // this.helperText = { error: true, text: error.message };
        console.error('Error: ', error.message);
      }else {
        console.error('Error: Something went wrong!');
      }
    })
    .catch((err) => {
      this.informUserError(err);
    });
  }

  SignInUser(subForm: FormGroup) {
    let xUsrCrd = {
      email: (subForm.value.email).trim(),
      password: subForm.value.password,
    };
    this.isLoading = true;
    this.profileSignIn(false, xUsrCrd);
  }

  profileSignIn(argMode: boolean, xUsrCrd: UserCredentials ) {
    this.authService.SignInProxy(argMode, xUsrCrd)
      .then((dt) => {
        const { user, error, session } = dt;
        this.initForm();
        if (user && session && !error) {
          this.router.navigateByUrl('/inicio');
        }
      })
      .catch((err) => {
        this.informUserError(err);
      });
  }

  informUserError(err:string) {
    this.isLoading = false;
        this.toastService.add({key:"tst-lgn",severity: "warn",summary: "Service Message",detail: err,life: 5000,});
  }

  initForm() {
    this.isLoading = false;
    this.loginForm.reset();
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

}

