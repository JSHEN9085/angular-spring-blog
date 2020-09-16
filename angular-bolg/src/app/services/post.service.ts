import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostPayload } from '../class/post-payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = "http://localhost:8080/api/posts"

  constructor(private httpClient: HttpClient) { }

  addPost(postPayload: PostPayload){
    console.log(postPayload);   
    return this.httpClient.post(this.url, postPayload); 
  }

  getAllPosts(): Observable< Array<PostPayload> > {
    return this.httpClient.get< Array<PostPayload> >(this.url);
  }
}
