import { Component, OnInit } from '@angular/core';
import {faUsers, faEnvelope, faThumbsUp, faDownload, faCommentAlt, faCheckCircle, faTimesCircle,
  faLanguage,faTrash, faUserCircle, faFileSignature} from '@fortawesome/free-solid-svg-icons';
import { EventsService, AuthService } from 'src/app/_services';
import { NotificationService } from 'src/app/_helpers';
import { Router } from '@angular/router';
import { tniData } from 'src/app/_models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faCheckCircle = faCheckCircle
  faTimesCircle = faTimesCircle
  faLanguage = faLanguage
  faThumbsUp = faThumbsUp
  faCommentAlt = faCommentAlt
  faUserCircle = faUserCircle
  faUsers = faUsers
  faDownload = faDownload
  faTrash = faTrash
  faFileSignature = faFileSignature
  faEnvelope = faEnvelope
  monthlyStatus : string
  loading: boolean = true
  goals: Object
  posts: Object
  month: string
  paceSetters: Object
  monthlyStats: number
  data$: Observable<tniData>
  user: tniData
  
  constructor(private events: EventsService, 
              private router: Router,
              private auth: AuthService,
              private notifier: NotificationService) { 
                this.data$ = this.auth.currentUser
              }

  ngOnInit() {
    this.getHomepage()
    this.data$.subscribe(
      res => this.user = res
    )
  }

  getHomepage(){
    this.events.getHomepage().subscribe(
      res => {
        console.log(res)
        this.goals = res.data.goals.records
        this.paceSetters = res.data.paceSetters
        this.posts = res.data.posts.records
        this.month = res.data.reportSummary.month
        this.monthlyStats = res.data.reportSummary.overallMonthlyReportSubmissionStatus
        this.monthlyStats = Math.round(this.monthlyStats)
        this.monthlyStatus =`${this.monthlyStats}%`
        this.loading = false
      },
      err =>{
        this.notifier.display('error', `Server Error, please retry ${err}`)
      }
    )
  }

  meetingsClicked(){
    this.router.navigate(['meetings/list'])
  }

  inboxClicked(){
    this.router.navigate(['inbox'])
  }

  scoresHead = [{name:'Report', value: 'Submitted'}]
  scores = [
    {name: 'Translation', submitted: true},
    {name: 'Production', submitted: false},
    {name: 'Media', submitted: true},
    {name: 'Distribution', submitted: false},
    {name: 'TNION', submitted: true},
    {name: 'Online Church', submitted: true},
    {name: 'Reachout', submitted: false},
    {name: 'Mission', submitted: false},
  ]

  archives = [
    {title: 'The Year of Light', when: 'Today'},
    {title: 'Increase in Wisdom and Ability', when: 'Yesterday'},
    {title: 'Being Bigger and Better', when: 'Today'},
   
  ]

}
