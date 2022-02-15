import { Component, OnInit } from '@angular/core';
import {PostService} from "../shared/post.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Post} from "../admin/shared/interfaces";
import {Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$!: Observable<Post>;

  constructor(private postService: PostService,private activatedRout: ActivatedRoute) { }

  ngOnInit(): void {
    this.post$ = this.activatedRout.params
      .pipe(switchMap((params: Params)=> {
        return this.postService.getById(params['id']);
      }))
  }

}
