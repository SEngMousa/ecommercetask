import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  invalidLogin = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    if (this.authService.isLoggedIn()) {
      this.navigateToCorrectRoute();
    }
  }

  login(): void {
    if (this.form.valid) {
      this.invalidLogin = false;
      const { username, password } = this.form.value;
      const loggedIn = this.authService.login(username, password);
      if (loggedIn) {
        this.navigateToCorrectRoute();
      } else {
        this.invalidLogin = true;
      }
    }
  }

  private navigateToCorrectRoute() {
    const role = this.authService.getUserRole();
    if (role === 'user') {
      this.router.navigate(['/user/products']);
    } else if (role === 'admin') {
      this.router.navigate(['/admin/products']);
    }
  }
}
