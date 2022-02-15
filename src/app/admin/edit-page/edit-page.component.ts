import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostService} from "../../shared/post.service";
import {Subscription, switchMap} from "rxjs";
import {Post} from "../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  post!: Post;
  submitted: boolean = false;
  uSub!: Subscription;

  constructor(
    private activatedRout: ActivatedRoute,
    private postService: PostService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.activatedRout.params
      .pipe(
        switchMap((params: Params)=> {
          return this.postService.getById(params['id'])
        })
      ).subscribe((post: Post) => {
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title, [Validators.required]),
          text: new FormControl(post.text, [Validators.required])
      })
    })
  }

  submit() {
    if (this.form.invalid) return;
    this.submitted = true;
    this.uSub = this.postService.update({
      ...this.post,
      title: this.form.value.title,
      text: this.form.value.text,
    }).subscribe((post: Post) => {
      this.submitted = true;
      this.alert.success('Post was successfully updated!')

    })
  }

  ngOnDestroy() {
    if (this.uSub) this.uSub.unsubscribe();
  }
}
