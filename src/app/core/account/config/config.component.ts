import { SubSink } from 'subsink';
import { Session } from '@supabase/supabase-js';
import { Profile } from './../../../common/shared/services/supa/supabase.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldsCfg } from '../models/account.models';
import { AccountService } from '../services/account.service';
import { MessagingService } from 'src/app/common/shared/services/message.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import  UnSubscribe from 'src/app/common/shared/utils/unsubscribe';
import { get } from 'lodash';

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
    model: {},
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
      const username = `${this.objCfg.model.firstName} ${this.objCfg.model.lastName}`;
      const website = `${this.objCfg.model.website}`;
      await this.accountSvc.updateProfile({ username, website, avatar_url });
    } catch (error:any) {
      this.informUserError(error.message);
    } finally {
      this.loading = false;
    }
  }


  async getProfile() {
    try {
      this.loading = true;
      let { data: profile, error, status } = await this.accountSvc.profile;
      console.log('profile ***',profile, error, status, get(this.authService.user,['email'], null), this.objAccount.session );

      this.objCfg.model = {
        id: 0,
        firstName: profile?.username,
        lastName: '',
        email: get(this.authService.user,['email'], null),
        website: profile?.website,
      };

      if (error && status !== 406) {
        throw error;
      }
      if (profile) {
        this.objAccount.profile = profile;
      }
    } catch (error:any) {
      this.informUserError(error.message);
    } finally {
      this.loading = false;
    }
  }


  private resetForm() {
    this.objCfg.form.reset();
  }


  onSubmit() {
    if (this.objCfg.form.valid) {
      console.log(this.objCfg);
    }
  }


  informUserError(err:string) {
    this.loading = false;
    this.toastService.add('warn','Service Message',err);
  }

}




