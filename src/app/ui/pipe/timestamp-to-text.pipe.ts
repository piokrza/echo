import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({ name: 'timestampToText' })
export class TimestampToTextPipe implements PipeTransform {
  transform(timestamp: Timestamp) {
    const now = new Date();
    const date = timestamp.toDate();

    const diffMs = now.getTime() - date.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days === 0) {
      return 'Today';
    }

    if (days === 1) {
      return 'Yesterday';
    }

    if (days >= 2 && days <= 6) {
      return `${days} days ago`;
    }

    const weeks = Math.floor(days / 7);
    if (weeks === 1) {
      return '1 week ago';
    }

    if (weeks < 5) {
      return `${weeks} weeks ago`;
    }

    const months = Math.floor(days / 30);
    if (months === 1) {
      return '1 month ago';
    }

    if (months < 12) {
      return `${months} months ago`;
    }

    const years = Math.floor(days / 365);
    if (years === 1) {
      return '1 year ago';
    }

    return `${years} years ago`;
  }
}
