// httpcancel.service.ts
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpDropService {
  private pendingHTTPRequests$ = new Subject<void>();

  constructor() {}
  
  public cancelPendingRequests() { // Cancel Pending HTTP calls
    this.pendingHTTPRequests$.next();
  }

  public onCancelPendingRequests() {
    return this.pendingHTTPRequests$.asObservable();
  }
}
