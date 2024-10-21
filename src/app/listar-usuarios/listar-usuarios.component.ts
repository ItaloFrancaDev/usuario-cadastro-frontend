import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Adicione RouterModule aqui
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  usuarios: any[] = [];
  mostrarConfirmacao: boolean = false;
  usuarioParaExcluir: number | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.http.get<any[]>('http://localhost:8088/api/usuarios')
      .subscribe(data => {
        this.usuarios = data;
      });
  }

  editarUsuario(id: number) {
    this.router.navigate([`/editar/${id}`]);
  }

  confirmarExclusao(id: number) {
    this.usuarioParaExcluir = id;
    this.mostrarConfirmacao = true;
  }

  cancelarExclusao() {
    this.mostrarConfirmacao = false;
    this.usuarioParaExcluir = null;
  }

  excluirUsuarioConfirmado() {
    if (this.usuarioParaExcluir !== null) {
      this.http.delete(`http://localhost:8088/api/usuarios/${this.usuarioParaExcluir}`)
        .subscribe(() => {
          alert('Usuário excluído com sucesso.');
          this.carregarUsuarios(); // Atualiza a lista após a exclusão
          this.cancelarExclusao();
        }, error => {
          console.error('Erro ao excluir usuário', error);
        });
    }
  }
}
