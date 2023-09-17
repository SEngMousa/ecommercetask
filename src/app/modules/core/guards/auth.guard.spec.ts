import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard, AuthService],
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow access when user is logged in and has correct role', () => {
    spyOn(authService, 'isUserLoggedIn').and.returnValue(true);
    spyOn(authService, 'getUserRole').and.returnValue('admin');

    const routeSnapshot = new ActivatedRouteSnapshot();
    routeSnapshot.data = { roles: ['admin'] };

    const stateSnapshot = {} as RouterStateSnapshot;

    const result = authGuard.canActivate(routeSnapshot, stateSnapshot);

    expect(result).toBe(true);
  });

  it('should redirect to login page when user is not logged in', () => {
    spyOn(authService, 'isUserLoggedIn').and.returnValue(false);

    const routeSnapshot = new ActivatedRouteSnapshot();
    const stateSnapshot = {} as RouterStateSnapshot;

    const navigateSpy = spyOn(router, 'navigate');

    const result = authGuard.canActivate(routeSnapshot, stateSnapshot);

    expect(result).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should redirect to login page when user does not have correct role', () => {
    spyOn(authService, 'isUserLoggedIn').and.returnValue(true);
    spyOn(authService, 'getUserRole').and.returnValue('user');

    const routeSnapshot = new ActivatedRouteSnapshot();
    routeSnapshot.data = { roles: ['admintest'] };

    const stateSnapshot = {} as RouterStateSnapshot;

    const navigateSpy = spyOn(router, 'navigate');

    const result = authGuard.canActivate(routeSnapshot, stateSnapshot);

    expect(result).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
