import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { login } from 'src/app/store/auth/auth.actions';
import { isLoadingAuth, fetchAuthError } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  error = false;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(isLoadingAuth)).subscribe(status => this.loading = status );
    this.store.pipe(select(fetchAuthError)).subscribe(error => {
      if (error) {
        if (error.for === 'login') {
          this.error = true;
        }
      }
    });
  }

  onLogin(form: NgForm): void {
    this.error = false;
    if (form.invalid) {
      return;
    }
    const user: Partial<User> = form.value;
    this.store.dispatch(login({ data: user }));
  }

}
