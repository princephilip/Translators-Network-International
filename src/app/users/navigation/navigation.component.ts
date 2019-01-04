import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/_services';
import { Observable } from 'rxjs';
import { Profile, UserData, Menu } from 'src/app/_models';

interface tniData {
  menu : Menu[];
  profile: Profile;
  user_data: UserData;
}

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @ViewChild('sidenav') sidenav: ElementRef;

  user: tniData;
  public data$ : Observable<tniData>
  clicked: boolean;

  constructor(public auth: AuthService) { 
    this.clicked = this.clicked === undefined ? false : true;
    this.data$ = this.auth.currentUser
  }

  ngOnInit() {
    this.data$.subscribe(user => {this.user = user});   
    
  }

  setClicked(val: boolean): void {
    this.clicked = val;
  }
}
