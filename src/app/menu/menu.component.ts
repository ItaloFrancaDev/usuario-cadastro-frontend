import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private router: Router) { }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToList() {
    this.router.navigate(['/listar']);
  }
}
