import { Provider } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AuthApiService } from '#auth/api';
import { AuthForm } from '#auth/model';
import { AuthViewComponent } from '#auth/page/auth-view';

const authFormMock: AuthForm = {
  email: 'test@gmail.com',
  password: '12345',
  username: 'testUsername',
};

const authApiServiceStub = {
  loginWithGoogle$: vi.fn().mockReturnValue(of({})),
  loginWithEmailAndPassword$: vi.fn().mockReturnValue(of({})),
  createUserWithEmailAndPassword$: vi.fn().mockReturnValue(of({})),
};
const activatedRouteStub = {};

describe('AuthViewComponent', () => {
  let component: AuthViewComponent;
  let fixture: ComponentFixture<AuthViewComponent>;

  beforeEach(() => {
    const providers: Provider[] = [
      { provide: AuthApiService, useValue: authApiServiceStub },
      { provide: ActivatedRoute, useValue: activatedRouteStub },
    ];

    TestBed.configureTestingModule({ providers });

    fixture = TestBed.createComponent(AuthViewComponent);
    component = fixture.componentInstance;

    vi.clearAllMocks();
  });

  it('should create component insntance', () => {
    expect(component).toBeDefined();
  });

  it('should update formType', () => {
    component.setFormType('register');
    expect(component.state().formType).toBe('register');

    component.setFormType('login');
    expect(component.state().formType).toBe('login');
  });

  it('should call loginWithGoogle$ method', () => {
    const loginWithGoogleSpy = vi.spyOn(authApiServiceStub, 'loginWithGoogle$');
    component.loginWithGoogle();

    expect(loginWithGoogleSpy).toHaveBeenCalledTimes(1);
  });

  it('should call loginWithEmailAndPassword$ method', () => {
    const loginWithEmailAndPasswordSpy = vi.spyOn(authApiServiceStub, 'loginWithEmailAndPassword$');
    const createUserWithEmailAndPasswordSpy = vi.spyOn(authApiServiceStub, 'createUserWithEmailAndPassword$');
    component.authenticateWithEmailAndPassword(authFormMock);

    expect(loginWithEmailAndPasswordSpy).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPasswordSpy).not.toHaveBeenCalled();
  });

  it('should call createUserWithEmailAndPassword$ method', () => {
    const loginWithEmailAndPasswordSpy = vi.spyOn(authApiServiceStub, 'loginWithEmailAndPassword$');
    const createUserWithEmailAndPasswordSpy = vi.spyOn(authApiServiceStub, 'createUserWithEmailAndPassword$');

    component.setFormType('register');
    component.authenticateWithEmailAndPassword(authFormMock);

    expect(createUserWithEmailAndPasswordSpy).toHaveBeenCalledTimes(1);
    expect(loginWithEmailAndPasswordSpy).not.toHaveBeenCalled();
  });
});
