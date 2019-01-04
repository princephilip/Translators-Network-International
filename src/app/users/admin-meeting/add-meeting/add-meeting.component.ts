import { Component, OnInit, ViewChild} from '@angular/core';
import { Meeting } from 'src/app/_models';
import {faPlay, faPause, faEdit, faTrash, faWindowClose} from '@fortawesome/free-solid-svg-icons';
import { EventsService } from 'src/app/_services';
import { NotificationService } from 'src/app/_helpers';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MDBModalRef, ModalDirective } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.scss']
})
export class AddMeetingComponent implements OnInit {
  @ViewChild('editModal') editModal: ModalDirective;

  modalRef: MDBModalRef;

  selectedMeeting: Meeting = null
  allAdminMeetings : Meeting[]
  loading: boolean
  faPlay = faPlay
  faPause = faPause
  faTrash = faTrash
  faEdit = faEdit
  faWindowClose = faWindowClose
  addMeetingForm: FormGroup
  editMeetingForm: FormGroup

  constructor(private events: EventsService,
              private fb: FormBuilder,
              private router: Router,
              private notifier: NotificationService) 
              {
                this.createMeeting()
              }

    createMeeting(){
          this.addMeetingForm = this.fb.group({
          title: ['', Validators.required],
          description: ['', Validators.required],
          starting: ['', Validators.required],
          ending: ['', Validators.required],
          location: ['', Validators.required],
        })
      }

  ngOnInit() {
    this.loading = true
    this.getAllAdminMeetings()
  }

    getAllAdminMeetings(){
      this.events.getAllAdminMeetings().subscribe(
        res => {
          this.loading = false
          this.allAdminMeetings = res.data
        },
        err =>{
          this.notifier.display('error', `${err}`)
        }
      )
    }

    closeModal(){
      this.editModal.hide();
    }

    openModal(meeting: Meeting){
      this.selectedMeeting = meeting
      console.log('editModal', this.selectedMeeting)
      this.editModal.show();
      }

      onUpdate(){
        console.log(this.editMeetingForm.value)
      }

      // show meetings
    play(meeting: Meeting){
      if(confirm('Will you like to show \"'+ `${meeting.title}` +'\" meeting item? ')){
          meeting.suspend = '0'
          this.events.suspendMeeting(meeting).subscribe(
          res => {
            if(res.success){
              this.notifier.display('success', `${res.message.text}`)
            } else {
              this.notifier.display('error', `${res.message.text}`)
            }
          }
        )
      }
    }

    // suspend meetings
    pause(meeting: Meeting){
      if(confirm('Will you like to suspend \"'+ `${meeting.title}` +'\" meeting item? ')){
          meeting.suspend = '1'
          this.events.suspendMeeting(meeting).subscribe(
          res => {
            if(res.success){
              this.notifier.display('success', `${res.message.text}`)
            } else {
              this.notifier.display('error', `${res.message.text}`)
            }
            console.log('suspend', res)
          }
        )
      }
    }

    // close meetings
    close(meeting: Meeting){
      if(confirm('Will you like to close \"'+ `${meeting.title}` +'\" meeting item? ')){
        meeting.closed = '1'
        this.events.closeMeeting(meeting).subscribe(
          res => {
            if(res.success){
              this.notifier.display('success', `${res.message.text}`)
            } else {
              this.notifier.display('error', `${res.message.text}`)
            }
            console.log('close', res)
          }
        )
      }
    }

    // add meeting
    onSubmit(){
      console.log(this.addMeetingForm.value)
      this.events.addAdminMeetings(this.addMeetingForm.value).subscribe(
        res=> {
          if(res.success){
            this.notifier.display('success', `${res.message.text}`)
            this.getAllAdminMeetings()
          } else {
            this.notifier.display('error', `${res.message.text}`)
          }
        }, 
        err => {
          this.notifier.display('error', 'Internal server CORS error. Please refresh')
        }
      )
    }
   

    deleteMeeting(meeting: Meeting){
      if(confirm('Will you like to delete \" ' +`${meeting.title}` + ' \" meeting item?')){
           this.events.deleteMeeting(meeting.id)
              .subscribe(res => {
                console.log(res)
                if(res.data.length === 0){
                  this.notifier.display('error', `${res.message.text}`)
                  return
                } else{
                  this.allAdminMeetings = this.allAdminMeetings.filter(u=> u !== meeting)
                  this.notifier.display('success', 'Meeting deleted successfully')
                  this.getAllAdminMeetings()
                  return
                }
              })
        }
   
    }

    editMeeting(meeting: Meeting){
      window.localStorage.removeItem('editMeetingId')
      window.localStorage.setItem("editMeetingId", meeting.id.toString())
      this.router.navigate(['edit-meeting'])
    }
}
