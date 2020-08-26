import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { isLoadingAuth, fetchAuthError } from 'src/app/store/auth/auth.selectors';
import { User } from 'src/app/models/user.model';
import { registerUser } from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('regForm', { static: false }) registerForm: NgForm;

  loading = false;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(isLoadingAuth)).subscribe(status => this.loading = status );
    this.store.pipe(select(fetchAuthError)).subscribe(error => {
      if (error) {
        if (error.for === 'register' && error.type === 'email') {
          this.registerForm.form.controls.email.setErrors({ unique: true });
        }
      }
    });
  }

  onRegister(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    const user: Partial<User> = form.value;
    this.store.dispatch(registerUser({ user }));
  }

}
