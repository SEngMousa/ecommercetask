import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', [
      'isLoggedIn',
      'login',
      'getUserRole',
    ]);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to correct route on successful login', () => {
    const username = 'admin';
    const password = 'admin';

    authService.login.and.returnValue('admin');
    authService.getUserRole.and.returnValue('admin');

    component.form.patchValue({ username, password });
    component.login();

    expect(authService.login).toHaveBeenCalledWith(username, password);
    expect(authService.getUserRole).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/admin/products']);
  });

  it('should show error message on invalid userName or password', () => {
    const username = 'errorUserName';
    const password = 'errorPass';

    authService.login.and.returnValue(null);

    component.form.patchValue({ username, password });
    component.login();

    expect(authService.login).toHaveBeenCalledWith(username, password);
    expect(component.invalidLogin).toBe(true);
  });
});
