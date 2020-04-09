import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub =  this.authService.getAuthStatusListener().subscribe(
      authStates => {
        this.isLoading = false;
      }
    );
  }

  onSignup(form: NgForm) {
    if(form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createuser(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
