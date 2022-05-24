import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-avatar',
  templateUrl:'./avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  _avatarUrl: SafeResourceUrl = 'assets/custom/images/user_default.png';
  uploading = false;
  inlineUserMenuActive = false;

  @Input()
  set avatarUrl(url: string | undefined) {
    if (url) {
      this.downloadImage(url);
    }
  }

  @Output() upload = new EventEmitter<string>();

  constructor(private readonly accountSvc: AccountService, private readonly dom: DomSanitizer) {}

  async downloadImage(path: string) {
    try {
      const result = await this.accountSvc.downLoadImage(path);
        this._avatarUrl = (result !== null)
                    ? this.dom.bypassSecurityTrustResourceUrl(URL.createObjectURL(result?.data as Blob))
                    : 'assets/custom/images/user_default.png';
    } catch (error:any) {
      console.error('Error downloading image: ', error.message);
    }
  }

  async uploadAvatar(event: any) {
    try {
      this.uploading = true;
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      await this.accountSvc.uploadAvatar(filePath, file);
      this.upload.emit(filePath);
    } catch (error:any) {
      alert(error.message);
    } finally {
      this.uploading = false;
    }
  }
}
