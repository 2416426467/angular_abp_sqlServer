/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-identity',
  template: `
    <p>
      identity works!
    </p>
  `,
  styles: [
  ]
})
export class IdentityComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
