import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent }, // Rota para registro
  { path: 'listar', component: ListarUsuariosComponent }, // Rota para listar usuários
  { path: 'editar/:id', component: EditarUsuarioComponent }, // Rota para editar um usuário específico
  { path: 'menu', component: MenuComponent }, // Rota para o menu
  { path: '', redirectTo: '/listar', pathMatch: 'full' } // Redireciona para listar se não houver caminho

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
