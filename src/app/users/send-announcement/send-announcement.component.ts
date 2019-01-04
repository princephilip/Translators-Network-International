import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/_models';
import { FormGroup, Validators } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { EventsService } from 'src/app/_services';

@Component({
  selector: 'app-send-announcement',
  templateUrl: './send-announcement.component.html',
  styleUrls: ['./send-announcement.component.scss']
})
export class SendAnnouncementComponent implements OnInit {

  posts: Object;
  delPost: Posts[];
  addPost: Posts[];
  postsForm: FormGroup;

  editPost: Posts; 
  updtPost: Posts[];
  
  constructor(private fb: RxFormBuilder, private events: EventsService,) { }

  ngOnInit() {
    this.getPosts();

    // Posts Form validations
    this.postsForm = this.fb.group({
      author: ['', Validators.required ],
      title: ['', Validators.required ],
      content: ['', Validators.required ],
      media_type: ['', Validators.required ],
      media:[],
      comment_allowed: ['', Validators.required ]    
    });


  }

  // Methods Subscriptions

// Show all Posts
getPosts(){
  this.events.getPost().subscribe(
  (allposts) => {
    this.posts = allposts.data
    console.log(allposts)
  }
)}

// Add a post
addPosts(newPost: Posts){
  console.log(newPost)
  const npost = {
    'id': newPost.id,
    'author': newPost.author,
    'title': newPost.title,
    'content': newPost.content,
    'media_type': newPost.media_type,
    'media': newPost.media,
    'comment_allowed': newPost.comment_allowed
  }  
  this.events.addPost(npost).subscribe(
    res => console.log(res)
    
  );    
}

deletePosts(id){ 
  console.log("deleting "+ id); 
  this.events.deletePost(id)  
    .subscribe(
      (msg) => console.log(msg),
      (error) => console.log(error)
    )  
} 



}
