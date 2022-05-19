import { Injectable } from '@angular/core';
import  {AES, enc} from 'crypto-js';

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {

  //TODO: hit this ke from vaul
  private keyEnc:string='@#&hashed/Code&#$';

  getItem(key: string) {
    const val = localStorage.getItem(key);
    const valEnc = ((!!val && val!=='undefined') && JSON.parse(val)) || null;
    if(!valEnc) {return null;}
    const deDt = this.decryptData(valEnc);
    return ((!!deDt && deDt!=='undefined') && JSON.parse(deDt)) || null;
  }

  setItem(key: string, data: object | string) {
    let enDt = this.encryptData((typeof(data) === "string")?data:JSON.stringify(data));
    localStorage.setItem(key, JSON.stringify(enDt));
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }

  encryptData(data) {
    try {
      return AES.encrypt(JSON.stringify(data), this.keyEnc).toString();
    } catch (e) {
      this.clearStorage();
    }
  }

  decryptData(data) {
    try {
      const bytes = AES.decrypt(data, this.keyEnc);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(enc.Utf8));
      }
      return data;
    } catch (e) {
      this.clearStorage();
    }
  }

  clearStorage () {
    localStorage.clear();
  }
}
