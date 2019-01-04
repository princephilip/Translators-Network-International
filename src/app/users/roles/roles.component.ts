import { Component, OnInit, Input, EventEmitter} from '@angular/core';
import { EventsService } from 'src/app/_services';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Role } from 'src/app/_models';
import { NotificationService } from 'src/app/_helpers';

@Component({
  selector: 'roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

// @Input() roles
private addingNewRole = new EventEmitter()

  addRoleForm: FormGroup
  addButton: boolean = false
  loading:boolean = true
  roles: Object

  constructor(
    private events: EventsService, 
    private fb: FormBuilder,
    private notifier: NotificationService) {

    this.addRoleForm = this.fb.group({
      role: ['', Validators.required],
      alias: ['', Validators.required],
      description: ['', Validators.required],
    })
   }
  ngOnInit() {
    this.getRoles()
  }
  // head of table for roles
    headElements = ['Roles', 'Alias', 'Description'];
    
    addNewRole() {
      this.addButton = true
    }

    getRoles(){
      this.events.getUsersRoles().subscribe(
        res => { 
          this.roles = res.data 
          this.loading = false
        },
        err => { this.notifier.display('error',`${err}`)}
      )
    }

  onSubmit() {
    this.events.addRole(this.addRoleForm.value)
      .subscribe(
        res => {
          if(res.success){
            this.notifier.display('success', `${res.message.text}`)
            this.addButton = false
          }else{
            this.notifier.display('error',`${res.message.text}`)
          }
        }
      )
  }
}
