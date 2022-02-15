import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form!: FormGroup;
  submitted: boolean = false;
  message: string = ''

  constructor(
    public authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params)=> {
      if (params['loginAgain']){
        this.message = 'Please enter your account data'
      } else if (params['authFailed']){
        this.message = 'Session ended. Please login again'
      }
    })

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.minLength(6),
        Validators.required
      ]),
    })
  }

  submit() {
    if (this.form?.invalid){
      return;
    }
    this.submitted = true;

    const user: User = {
      email: this.form.value.email.trim(),
      password: this.form.value.password.trim(),
      // returnSecureToken: true
    }

    this.authService.login(user).subscribe((response)=> {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
    }, ()=> this.submitted = false)
  }
}
