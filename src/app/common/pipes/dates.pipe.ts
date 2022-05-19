import { Pipe, PipeTransform } from '@angular/core';
import { getDate } from 'date-fns';

@Pipe({ name: 'momentPipe' })
export class DatesPipe implements PipeTransform {
    transform(value: Date, dateFormat: string, invalid ?: boolean): any {
        return value;
    }
}
