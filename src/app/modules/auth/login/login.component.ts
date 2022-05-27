import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import {MessageService} from 'primeng/api';
import { SubSink } from 'subsink';

import { Subscription } from 'rxjs';
import { AuthService, UserCredentials } from '../services/auth.service';
import { Provider, Session } from '@supabase/supabase-js';
import  UnSubscribe  from 'src/app/common/shared/utils/unsubscribe';
import { get, has } from 'lodash';

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
export class LoginComponent extends UnSubscribe implements OnInit {
  loginForm: FormGroup;
  isLoading : boolean = false;
  loginError = "";
  subSink = new SubSink();
  redirectUrl;
  sttcFiles:any[];
  urlBackImg:string =  `assets/custom/images/fondo_logo.png`;

  subscriptions: Subscription[] = [];
  accountName = "";
  isLoggedIn = false;
  session = null as Session;

  constructor(private fb: FormBuilder, private authService: AuthService,
                private router: Router, private toastService: MessageService) {
          super();
        // route.paramMap.subscribe(
        //   params => (this.redirectUrl = params.get('redirectUrl'))
        // );
      }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", EmailValidation],
      password: ["", PasswordValidation],
    });
    this.subSink.sink = this.authService.stateWithPropertyChanges.subscribe(
      (state) => {
        if (!!state && state.stateChanges.hasOwnProperty("authStateChanges")) {
          this.session = get(state.stateChanges.authStateChanges,['session'], null);
          if(!!this.session && has(this.session,['user', 'app_metadata', 'provider']))
            this.router.navigateByUrl('/inicio');
        }
      });
  }

  handleOAuthLogin(provider: Provider) {
    this.authService.signInWithProvider(provider)
    .then((dt)=> {
      const { user, session, error } = dt;
      if (user && !error ) {
        this.initForm();
        this.router.navigateByUrl('/inicio');
      } else if (error) {
        this.informUserError(error.message);
      }else {
        this.informUserError('Error: Something went wrong!');
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

}

