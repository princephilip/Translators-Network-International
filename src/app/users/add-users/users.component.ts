import { Component, OnInit, OnChanges } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { EventsService, AuthService } from 'src/app/_services';
import { Invite, Role } from 'src/app/_models';
import { NotificationService } from 'src/app/_helpers';
import { Router } from '@angular/router';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [EventsService]
})
export class UsersComponent implements OnInit{
  
  loading : boolean = false
  addUserForm: FormGroup
  nRole: Role
  roles: Object

  constructor(private fb: FormBuilder, 
              private events: EventsService,
              private notifier: NotificationService) {
    this.addUserForm = this.fb.group({
      'email': ['', Validators.compose([ Validators.required, Validators.email])],
       'role': ['', Validators.required],
    })
   }

  ngOnInit() {

    this.getRoles()

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

  // add new role to api
  onAddNewRole(newRole: Role){
    this.events.addRole(newRole)
    .subscribe(
      nrole => {
          if(nrole.success){
            this.notifier.display('success', 'Role added successfully')
            this.getRoles()
          } else if(!nrole.success && nrole.message.type==="warn"){
            this.notifier.display('error', `${nrole.data.role} - ${nrole.data.alias} - ${nrole.data.alias}`)
          }
          else {
            this.notifier.display('error', `${nrole.message.text}`)
          }
       }, 
       catchError => { this.notifier.display('error', `${catchError}`)}
    )
  }

  onSubmit(){
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
