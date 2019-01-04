import { Component, OnInit } from '@angular/core';
import {MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { AuthService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit{

  constructor(private mdbSpinningPreloader: MDBSpinningPreloader,
              public auth: AuthService){
                console.log(auth.loggedIn())
              }

  title = 'tni';

  ngOnInit() {
    this.mdbSpinningPreloader.stop();
  }

}
