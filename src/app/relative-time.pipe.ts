import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'relativeTime',
})
export class RelativeTime implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string,) {
    if (!value) return 'no date';
    return this.timeDifference(new Date(), new Date(value));
  }

  /**
   * 
   * @param  {date} current  
   * @param  {date} previous 
   * @return {string}        
   */
  timeDifference(current, previous): string {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute && elapsed > 0) {
      if (Math.round(elapsed / 1000) < 3 && Math.round(elapsed / 1000) > 3) return 'At the l';
      console.log('test', Math.round(elapsed / 1000) + ' s ago');
      return Math.round(elapsed / 1000) + ' s ago';
    }
    else if (elapsed < msPerHour && elapsed > 0) {
      return Math.round(elapsed / msPerMinute) + ' min ago';
    }

    else if (elapsed < msPerDay && elapsed > 0) {
      return Math.round(elapsed / msPerHour) + ' h ago';
    }


    else if (elapsed < msPerMonth && elapsed > 0) {
      if (Math.round(elapsed / msPerDay) == 1) return 'Yesterday at ' + previous.getHours() + ":" + previous.getMinutes();
      return Math.round(elapsed / msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear && elapsed > 0) {
      return 'about ' + Math.round(elapsed / msPerMonth) + ' month ago';
    }
    elapsed = Math.abs(elapsed)

     if (elapsed <= msPerMinute) {
      if (Math.round(elapsed / 1000) > 3) return 'At the moment';
      return 'in ' + Math.round(elapsed / 1000) + 's';
    }
    else if (elapsed <= msPerHour) {
      return 'in ' + Math.round(elapsed / msPerMinute) + 'min';
    }
    else if (elapsed <= msPerDay) {
      return 'in ' + Math.round(elapsed / msPerHour) + 'h ';
    }
    else if (elapsed <= msPerMonth) {
      if (Math.round(elapsed / msPerDay) == 1) return 'Yesterday at ' + previous.getHours() + ":" + previous.getMinutes();
      return 'in ' + Math.round(elapsed / msPerDay) + 'days';
    }
    else if (elapsed <= msPerYear) {
      return 'in ' + Math.round(elapsed / msPerMonth) + 'month ';
    }









    else {
      return this.dateFormat(previous);
    }
  }

  dateFormat(value): string {
    var datePipe = new DatePipe("en-US");
    value = datePipe.transform(value, 'dd-MM-yyyy HH:mm');
    return value;
  }
}