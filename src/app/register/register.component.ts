import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Adicione o HttpClientModule aqui
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, RouterModule],  // Adicione o HttpClientModule aqui
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm: FormGroup;
  public errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registrationForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmarSenha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('senha')?.value === form.get('confirmarSenha')?.value ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.http.post('http://localhost:8088/api/usuarios/registrar', this.registrationForm.value)
        .subscribe(response => {
          // Redirecionar para a página de sucesso
          this.router.navigate(['/success']);
        }, error => {
          // Exibir mensagem de erro
          this.errorMessage = 'Ocorreu um erro ao tentar registrar. Tente novamente.';
          console.error('Erro ao cadastrar usuário', error);
        });
    }
  }
}
