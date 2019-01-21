import { Component, OnInit } from '@angular/core';
import {faUsers, faEnvelope, faThumbsUp, faCommentAlt, faTrash, faLanguage,
  faUserCircle, faGlobe} from '@fortawesome/free-solid-svg-icons';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { EventsService, AuthService } from 'src/app/_services';
import { NotificationService } from 'src/app/_helpers';
import { Router } from '@angular/router';
import { tniData } from 'src/app/_models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {
  faThumbsUp = faThumbsUp
  faCommentAlt = faCommentAlt
  faUserCircle = faUserCircle
  faTrash = faTrash
  faGlobe = faGlobe
  faUsers = faUsers
  faLanguage = faLanguage
  faEnvelope = faEnvelope
  addUserForm: FormGroup
  roles: Object
  goals: Object
  posts: Object
  loading: boolean = true
  data$: Observable<tniData>
  user: tniData
  monthlyStatus : string
  monthlyStats: number

  constructor(private fb: FormBuilder, 
              private events: EventsService, 
              private auth: AuthService,
              private router: Router,
              private notifier: NotificationService) { 
              this.addUser()
              this.data$ = this.auth.currentUser
              }

        addUser(){
          this.addUserForm = this.fb.group({
            'email': ['', Validators.compose([ Validators.required, Validators.email])],
            'role': ['', Validators.required],
          })
        }
  ngOnInit() {
    this.getRoles()
    this.getAllGoals()
    this.getPosts()
    this.data$.subscribe(
      res => this.user = res
    )
    this.getHomepage()
  }

  meetingsClicked(){
    this.router.navigate(['add/meeting'])
  }

  inboxClicked(){
    this.router.navigate(['inbox'])
  }

  getHomepage(){
    this.events.getHomepage().subscribe(
      res => {
        console.log(res)
        // this.goals = res.data.goals.records
        // this.paceSetters = res.data.paceSetters
        // this.posts = res.data.posts.records
        // this.month = res.data.reportSummary.month
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

  getRoles(){
    this.events.getUsersRoles().subscribe(
      res => { 
        this.roles = res.data
      },
      err => {
        this.notifier.display('error',`${err}`)
      }
    )
  }

  // Show all Posts
  getPosts(){
    this.events.getAllPosts().subscribe(
      res => {
        this.posts = res.data.splice(0,4)
        this.loading = false
        console.log(res)
      }
    )
  }

  usersHead = [{name:'System Users', value: 'Total'}]
  users = [
    {name: 'Administrators', value: '15'},
    {name: 'Team Leaders', value: '60'},
    {name: 'Sub Team Leaders', value: '86'},
    {name: 'Members', value: '890'},
    {name: 'Developers', value: '10'},
  ]

  latestMembers = [
    {name: 'Amos Okojie', when: 'Today'},
    {name: 'Philip Okafor', when: 'Yesterday'},
    {name: 'King Munya', when: 'Today'},
    {name: 'Sis Eudoxie', when: 'Today'},
    {name: 'Bro Emmanuel', when: 'Today'},
    {name: 'Pastor Irene', when: 'Today'}
  ]

  getAllGoals(){
    this.events.getAllGoals().subscribe(
      res => {
        if(res.data.status === 401){
          this.router.navigate(['/login'])
        }
        console.log(res)
        this.loading = false
        this.goals = res.data
      },
      err => {
        this.notifier.display('error', `Server Error ${err}`)
      }
    )
  }

  onSubmitInvite(){
    this.loading = true
    this.events.addUser(this.addUserForm.value.email, this.addUserForm.value.role)
      .subscribe(
        res => {
          console.log(res)
          if(res.message.type === 'info'){
            this.loading = false
            this.reset()
            return this.notifier.display('success', `${this.addUserForm.value.email} has been added`)
         
          } else if(res.message.type==='warn'){
            this.loading = false
            this.reset()
            return this.notifier.display('error', `${res.data.email}`)
          
          } else{
            this.loading = false
            return this.notifier.display('error', 'Server Error, please retry')
          }
        }
      )
    }

   reset(){
    this.addUserForm.controls['email'].reset(' ')
   }

}
