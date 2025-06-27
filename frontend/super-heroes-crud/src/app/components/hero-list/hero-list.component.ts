import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroService } from '../../services/hero.service';
import { HeroFormComponent } from '../hero-form/hero-form.component';
import { Hero } from '../../models/hero';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [CommonModule, HeroFormComponent],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Lista de Super-Heróis</h2>
        <button class="btn btn-primary" (click)="showCreateForm.set(true)">
          <i class="fas fa-plus"></i> Novo Herói
        </button>
      </div>

      <!-- Formulário de Criação/Edição -->
      @if (showCreateForm() || editingHero()) {
        <div class="card mb-4">
          <div class="card-header">
            <h5>{{ editingHero() ? 'Editar Herói' : 'Novo Herói' }}</h5>
          </div>
          <div class="card-body">
            <app-hero-form 
              [hero]="editingHero()"
              (heroSaved)="onHeroSaved()"
              (cancelled)="onFormCancelled()">
            </app-hero-form>
          </div>
        </div>
      }

      <!-- Mensagens -->
      @if (message()) {
        <div class="alert" [class.alert-success]="!isError()" [class.alert-danger]="isError()">
          {{ message() }}
        </div>
      }

      <!-- Loading -->
      @if (loading()) {
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
        </div>
      }

      <!-- Lista de Heróis -->
      @if (!loading()) {
        <div class="row">
          @for (hero of heroes(); track hero.id) {
            <div class="col-md-6 col-lg-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{{ hero.nomeHeroi }}</h5>
                  <p class="card-text">
                    <strong>Nome:</strong> {{ hero.nome }}<br>
                    <strong>Nascimento:</strong> {{ formatDate(hero.dataNascimento) }}<br>
                    <strong>Altura:</strong> {{ hero.altura }}m<br>
                    <strong>Peso:</strong> {{ hero.peso }}kg
                  </p>
                  
                  <div class="mb-2">
                    <small class="text-muted">Superpoderes:</small><br>
                    @for (poder of hero.superpoderes; track poder.id) {
                      <span class="badge bg-secondary me-1">
                        {{ poder.superpoder }}
                      </span>
                    }
                  </div>

                  <div class="btn-group w-100">
                    <button class="btn btn-outline-primary btn-sm" (click)="editHero(hero)">
                      <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn btn-outline-danger btn-sm" (click)="deleteHero(hero)">
                      <i class="fas fa-trash"></i> Excluir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      }

      <!-- Mensagem quando não há heróis -->
      @if (!loading() && heroes().length === 0) {
        <div class="text-center mt-5">
          <h4 class="text-muted">Nenhum super-herói cadastrado</h4>
          <p class="text-muted">Clique em "Novo Herói" para começar!</p>
        </div>
      }
    </div>
  `
})
export class HeroListComponent implements OnInit {
  private heroService = inject(HeroService);
  
  heroes = signal<Hero[]>([]);
  loading = signal(false);
  message = signal('');
  isError = signal(false);
  showCreateForm = signal(false);
  editingHero = signal<Hero | null>(null);

  ngOnInit(): void {
    this.loadHeroes();
  }

  loadHeroes(): void {
    this.loading.set(true);
    this.heroService.getHeroes().subscribe({
      next: (heroes) => {
        this.heroes.set(heroes);
        this.loading.set(false);
      },
      error: (error) => {
        this.showMessage(error, true);
        this.loading.set(false);
      }
    });
  }

  editHero(hero: Hero): void {
    this.editingHero.set(hero);
    this.showCreateForm.set(false);
  }

  deleteHero(hero: Hero): void {
    if (confirm(`Tem certeza que deseja excluir ${hero.nomeHeroi}?`)) {
      this.heroService.deleteHero(hero.id!).subscribe({
        next: () => {
          this.showMessage('Herói excluído com sucesso!');
          this.loadHeroes();
        },
        error: (error) => {
          this.showMessage(error, true);
        }
      });
    }
  }

  onHeroSaved(): void {
    this.showCreateForm.set(false);
    this.editingHero.set(null);
    this.showMessage('Herói salvo com sucesso!');
    this.loadHeroes();
  }

  onFormCancelled(): void {
    this.showCreateForm.set(false);
    this.editingHero.set(null);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('pt-BR');
  }

  showMessage(message: string, isError = false): void {
    this.message.set(message);
    this.isError.set(isError);
    setTimeout(() => {
      this.message.set('');
    }, 5000);
  }
}