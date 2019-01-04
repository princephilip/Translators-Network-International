import { Component, OnInit } from '@angular/core';
import { Meeting } from 'src/app/_models';
import { EventsService } from 'src/app/_services';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {first} from "rxjs/operators";
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/_helpers';

@Component({
  selector: 'meeting-detail',
  templateUrl: './meeting-detail.component.html',
  styleUrls: ['./meeting-detail.component.scss'],
  // outputs: ['updateMeetingEvent']
})
export class MeetingDetailComponent implements OnInit {

  meeting : Meeting;
  editForm: FormGroup;
  // private updateMeetingEvent = new EventEmitter()

    constructor(private events: EventsService,
                private formbuilder: FormBuilder,
                private notifier: NotificationService,
                private router: Router) { }

    ngOnInit() {
     let meetingId = window.localStorage.getItem("editMeetingId")
     if(!meetingId){
        alert("Invalid action.")
        this.router.navigate(['meetings/list'])
        return
     }
   
    
    this.editForm = this.formbuilder.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      starting: ['', Validators.required],
      ending: ['', Validators.required],
      location: ['', Validators.required],
    })
   
    this.events.getMeetingById(+meetingId)
      .subscribe(res => {
        this.editForm.setValue(res.data)
      })
  }

  onSubmit(){
    this.events.updateMeeting(this.editForm.value)
      .pipe(first())
      .subscribe(
        res => {
          if(res.success === "success"){
            this.notifier.display('success', `${res.message.text}`)
            this.router.navigate(['add/meeting'])
          } else {
            this.notifier.display('error', `${res.message.text}`)
            alert(`${res.message.text}`)
            this.router.navigate(['add/meeting'])
          }
        },
        error => {
          this.notifier.display('error', 'Server Error due to CORS policy. Please contact retry or contact admin')
        }
      )
  }
}
