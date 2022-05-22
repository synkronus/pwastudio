import { Injectable } from '@angular/core';
import  { format } from  'date-fns';

const localeCFG = 'America/Bogota';

@Injectable({
    providedIn: 'root'
})
export class DateFnsService {

    getUtcNow(dateFormat?:any): any {
        return format(new Date(2016, 0, 1), dateFormat ?? "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    }

    getUtcFormated(value: Date | string, dateFormat?: string): any { 
        return format(new Date(value), dateFormat ?? "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
    }

    getSubFormated(value: any, mode: boolean): any { 
        return mode ? value.substring(0,10) : 
            `${value.getFullYear().toString()}-${(value.getMonth() + 1).toString()}-${value.getDate().toString()}`;
    }
}
