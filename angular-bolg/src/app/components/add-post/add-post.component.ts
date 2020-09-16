import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PostPayload } from 'src/app/class/post-payload';
import { PostService } from 'src/app/services/post.service'

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  addPostForm : FormGroup; 
  title = new FormControl('');
  body = new FormControl(''); 
  postPayload : PostPayload; 

  constructor(private postService: PostService, private router: Router) {
    this.addPostForm = new FormGroup({
      title: this.title, 
      body: this.body
    })

    this.postPayload = {
      id: "",
      content: "",
      title: "", 
      username: ""
    }
  }

  ngOnInit(): void {
  }

  addPost() {
    this.postPayload.content = this.addPostForm.get("body").value;
    this.postPayload.title = this.addPostForm.get("title").value; 
    this.postService.addPost(this.postPayload).subscribe(data => {
      this.router.navigateByUrl("/home")
    }, error => {
      console.log(error);
      console.log("failed to add");
    })
  }

}
