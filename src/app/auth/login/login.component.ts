import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

import {MessageService} from 'primeng/api';
import { SubSink } from 'subsink';
import { debounceTime, map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';


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
        private router: Router, private toastService: MessageService,
          private http: HttpClient) {
        // route.paramMap.subscribe(
        //   params => (this.redirectUrl = params.get('redirectUrl'))
        // );
      }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ["", EmailValidation],
      password: ["", PasswordValidation],
    });

  }

  SignInUser(subForm: FormGroup) {
    let xUsrCrd = {
      username: (subForm.value.username).trim(),
      password: subForm.value.password,
    };
    this.isLoading = true;
    this.prfrdSignIn(false, xUsrCrd);
  }

  prfrdSignIn(argMode: boolean, xUsrCrd: { username: any; password: any; } | any) {
    this.subSink.sink = this.authService
      .SignInProxy(argMode,xUsrCrd)
      .pipe(
        debounceTime(5000)
      ).subscribe( dt => {
        if (!dt) return;
          this.loginForm.reset();
          this.isLoading = false;
          this.router.navigateByUrl('/inicio');
        },
        (err) => {
          this.isLoading = false;
          this.toastService.add({key:"tst-lgn",severity: "warn",summary: "Service Message",detail: err,life: 5000,});
        }
      );
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

}

