import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroListComponent } from './components/hero-list/hero-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeroListComponent],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" href="#">
          <i class="fas fa-mask"></i> Super Heroes Manager
        </a>
      </div>
    </nav>
    
    <app-hero-list></app-hero-list>
  `,
  styles: [`
    .navbar-brand {
      font-weight: bold;
    }
  `]
})
export class AppComponent {
  title = 'super-heroes-crud';
}
