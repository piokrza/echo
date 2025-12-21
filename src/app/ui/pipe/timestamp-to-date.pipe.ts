import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({ name: 'timestampToDate' })
export class TimestampToDatePipe implements PipeTransform {
  transform(timestamp: Timestamp): Date {
    return timestamp.toDate();
  }
}
