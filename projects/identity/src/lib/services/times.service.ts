/* eslint-disable @angular-eslint/contextual-lifecycle */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimesService {

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  settime(date:any,type:any){
    date = new Date(date)
		let year = date.getFullYear()
		let month = date.getMonth() + 1
		let day = date.getDate()
		let hour = date.getHours()
		let minute = date.getMinutes()
		let second = date.getSeconds()
		month = this.formatNumber(month)
		day = this.formatNumber(day)
		hour = this.formatNumber(hour)
		minute = this.formatNumber(minute)
		second = this.formatNumber(second)
    if(type=='dd/mm/yy hh:mm:ss'){
      return `${year}/${month}/${day} ${hour}:${minute}:${second}`
    }
    if(type=='dd/mm/yy'){
      return `${year}/${month}/${day}`
    }


  }
  formatNumber(n:any) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}

}
