import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;
  id: number | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.usuarioForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      confirmarSenha: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID do usuário a ser editado:', this.id);
    this.carregarUsuario();
  }

  carregarUsuario() {
    this.http.get<any>(`http://localhost:8088/api/usuarios/${this.id}`)
      .subscribe((usuario: { [key: string]: any; }) => {
        this.usuarioForm.patchValue(usuario);
      });
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      const { confirmarSenha, ...usuarioAtualizado } = this.usuarioForm.value;
      console.log('Dados a serem enviados:', usuarioAtualizado);
      this.http.put(`http://localhost:8088/api/usuarios/alterar/${this.id}`, usuarioAtualizado)
        .subscribe(() => {
          this.router.navigate(['/listar']);
        }, (error: any) => {
          console.error('Erro ao atualizar usuário', error);
          alert(`Erro ao atualizar usuário: ${error.message}`);
        });
    }
  }

  voltar() {
    this.router.navigate(['/listar']); 
  }

  confirmarExclusao() {
    const confirmacao = confirm('Tem certeza que deseja excluir este usuário?');
    if (confirmacao) {
      this.excluirUsuario();
    }
  }

  excluirUsuario() {
    this.http.delete(`http://localhost:8088/api/usuarios/${this.id}`)
      .subscribe(() => {
        alert('Usuário excluído com sucesso.');
        this.router.navigate(['/listar']);
      }, (error: any) => {
        console.error('Erro ao excluir usuário', error);
      });
  }
}
