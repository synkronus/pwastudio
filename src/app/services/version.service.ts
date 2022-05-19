import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { VersionActions, VersionStoreState } from '../modules/store-states';
import { DateFnsService } from './date-fns.service';

@Injectable({
    providedIn: 'root'
})
export class VersionService extends ObservableStore<VersionStoreState> {

    constructor(private dateFns:DateFnsService) {
        super({
                stateSliceSelector: state => {
                    return {
                        currentVersion: (state !== null) ? state.currentVersion : '',
                        upToDate: (state !== null) ? state.upToDate : '',
                        date: (state !== null) ? state.date : '',
                    };
                }
            });
    }

    getDateVersion(): String {
        return this.getState().date;
    }
    getCurrentVersion(): String {
        return this.getState().currentVersion;
    }
    getUpToDate(): Boolean {
        return this.getState().upToDate;
    }
    setCurrentVersion(vrsn) {
        this.setState({ currentVersion: vrsn }, VersionActions.SetVersion);
    }
    setVersionDate(date) {
        this.setState({ date }, VersionActions.SetVersion);
    }
    setupToUpDate(upToDate) {
        this.setState({ upToDate }, VersionActions.SetVersion);
    }
    initStore(vrsn): any {
        this.setState({ currentVersion: vrsn }, VersionActions.SetVersion);
        this.setState({ upToDate: true }, VersionActions.SetVersion);
        this.setVersionDate(this.dateFns.getUtcNow());
    }

}
