import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostPayload } from 'src/app/class/post-payload';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post: PostPayload = {
    id: "", 
    content: "",
    title: "", 
    username: "" 
  };
  paramsId: String;
  
  constructor(private router: ActivatedRoute, private postService: PostService) {

  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.paramsId = params['id'];
    });
    this.postService.getPost(this.paramsId).subscribe((data: PostPayload) => {
      this.post = data; 
    }, (error: any) => {
      console.log(error);
    })
  }

}
