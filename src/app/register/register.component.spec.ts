import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, RegisterComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create the form with default values', () => {
    expect(component.registrationForm).toBeTruthy();
    expect(component.registrationForm.get('nome')?.value).toBe('');
    expect(component.registrationForm.get('email')?.value).toBe('');
    expect(component.registrationForm.get('senha')?.value).toBe('');
    expect(component.registrationForm.get('confirmarSenha')?.value).toBe('');
  });

  it('should invalidate the form when required fields are empty', () => {
    component.registrationForm.get('nome')?.setValue('');
    component.registrationForm.get('email')?.setValue('');
    component.registrationForm.get('senha')?.setValue('');
    component.registrationForm.get('confirmarSenha')?.setValue('');

    expect(component.registrationForm.valid).toBeFalse();
    expect(component.registrationForm.get('nome')?.valid).toBeFalse();
    expect(component.registrationForm.get('email')?.valid).toBeFalse();
    expect(component.registrationForm.get('senha')?.valid).toBeFalse();
    expect(component.registrationForm.get('confirmarSenha')?.valid).toBeFalse();
  });

  it('should validate email format', () => {
    component.registrationForm.get('email')?.setValue('invalidEmail');
    expect(component.registrationForm.get('email')?.valid).toBeFalse();

    component.registrationForm.get('email')?.setValue('valid@example.com');
    expect(component.registrationForm.get('email')?.valid).toBeTrue();
  });

  it('should validate password length', () => {
    component.registrationForm.get('senha')?.setValue('short');
    expect(component.registrationForm.get('senha')?.valid).toBeFalse();

    component.registrationForm.get('senha')?.setValue('validPassword123');
    expect(component.registrationForm.get('senha')?.valid).toBeTrue();
  });

  it('should validate that senha and confirmarSenha match', () => {
    component.registrationForm.get('senha')?.setValue('password123');
    component.registrationForm.get('confirmarSenha')?.setValue('password123');
    expect(component.passwordMatchValidator(component.registrationForm)).toBeNull(); // Valid match

    component.registrationForm.get('confirmarSenha')?.setValue('differentPassword');
    expect(component.passwordMatchValidator(component.registrationForm)).toEqual({ mismatch: true }); // Invalid match
  });

  it('should call onSubmit and navigate to success on valid form', () => {
    component.registrationForm.setValue({
      nome: 'Test User',
      email: 'test@example.com',
      senha: 'password123',
      confirmarSenha: 'password123',
    });


    spyOn(component['http'], 'post').and.returnValue(of({}));

    component.onSubmit();

    expect(component['http'].post).toHaveBeenCalledWith('http://localhost:8088/api/usuarios/registrar', component.registrationForm.value);
    expect(router.navigate).toHaveBeenCalledWith(['/success']);
    expect(component.errorMessage).toBeNull();
  });

  it('should handle error on submit and set errorMessage', () => {
    component.registrationForm.setValue({
      nome: 'Test User',
      email: 'test@example.com',
      senha: 'password123',
      confirmarSenha: 'password123',
    });

    
    spyOn(component['http'], 'post').and.returnValue(throwError({ status: 500 }));

    component.onSubmit();

    expect(component.errorMessage).toBe('Ocorreu um erro ao tentar registrar. Tente novamente.');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should check that the form is invalid if senha and confirmarSenha do not match', () => {
    component.registrationForm.get('senha')?.setValue('password123');
    component.registrationForm.get('confirmarSenha')?.setValue('password321');

    expect(component.registrationForm.valid).toBeFalse();
  });

  it('should check if the error message is initially null', () => {
    expect(component.errorMessage).toBeNull();
  });
});
