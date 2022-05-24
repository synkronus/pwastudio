import { Session } from '@supabase/supabase-js';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldsCfg, Profile } from '../models/account.models';
import { AccountService } from '../services/account.service';
import { MessagingService } from 'src/app/common/shared/services/message.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import  UnSubscribe from 'src/app/common/shared/utils/unsubscribe';
import { get, omit } from 'lodash';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class UserConfigComponent extends UnSubscribe implements OnInit  {

  urlResource = 'user/config';
  componentTitle:  'Configuration';
  loading = false;

  objCfg: {[s:string]: any} = {
    fields: new Array<FormlyFieldConfig>(),
    form: new FormGroup({}),
    model: {
      id: 0,
      firstName:'',
      lastName:'',
      username:'',
      website:''
    },
  };

  objAccount = {
    profile: null as Profile,
    session: null as Session
  }

  constructor(private readonly accountSvc: AccountService,
                private toastService: MessagingService,
                    private readonly authService: AuthService) { super();}

  ngOnInit() {
    this.objCfg.fields = [...FieldsCfg];
    this.getProfile();
    this.subSink.sink = this.authService.stateWithPropertyChanges.subscribe(
      (state) => {
        if (!!state && state.stateChanges.hasOwnProperty("authStateChanges")) {
          this.objAccount.session = get(state.stateChanges.authStateChanges,['session'], null);
        }
      });
   }

  async updateProfile(avatar_url: string = '') {
    try {
      this.loading = true;
      const objUpdate = {...omit(this.objCfg.model,['email']), avatar_url} as Profile;
      await this.accountSvc.updateProfile(objUpdate);
    } catch (error:any) {
      this.informUserError(error.message);
    } finally {
      this.loading = false;
    }
  }


  async getProfile() {
      this.loading = true;
      let { data: profile, error, status } = await this.accountSvc.profile;
      console.log('profile ***',profile, error, status, get(this.authService.user,['email'], null), this.objAccount.session );

      if (profile && !error) {
        this.objCfg.model = {
          id: 0,
          firstName: profile?.firstName,
          lastName: profile?.lastName,
          username: profile?.username,
          email: get(this.authService.user,['email'], null),
          website: profile?.website,
        };
        this.objAccount.profile = profile;

      } else {
        this.informUserError(error.message);
      }

  }


  private resetForm() {
    this.objCfg.form.reset();
  }


  onSubmit() {
    if (this.objCfg.form.valid) {
      this.updateProfile(this.objAccount.profile?.avatar_url);
    }
  }


  informUserError(err:string) {
    this.loading = false;
    this.toastService.add('warn','Service Message',err);
  }

}




