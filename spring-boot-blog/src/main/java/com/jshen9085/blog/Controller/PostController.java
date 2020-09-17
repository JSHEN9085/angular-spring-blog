package com.jshen9085.blog.Controller;

import com.jshen9085.blog.dto.PostDto;
import com.jshen9085.blog.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts") //this path must match the path on postman, otherwise will throw 403
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping
    public ResponseEntity createPost(@RequestBody PostDto postDto){
        postService.createPost(postDto);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<PostDto>> showAllPosts() {
        return new ResponseEntity<>(postService.showAllPosts(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getSinglePost(@PathVariable @RequestBody Long id) {
        return new ResponseEntity<>(postService.readSinglePost(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostDto> updateLikes(@PathVariable Long id){
        return new ResponseEntity<>(postService.updateLikes(id), HttpStatus.OK);
    }

}
