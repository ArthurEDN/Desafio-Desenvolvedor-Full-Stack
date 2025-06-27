import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../models/hero';
import { Superpoder } from '../../models/superpoder';
import { HeroCreateRequest } from '../../models/hero_create_request';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="heroForm" (ngSubmit)="onSubmit()">
      <div class="row">
        <div class="col-md-6">
          <div class="mb-3">
            <label for="nome" class="form-label">Nome *</label>
            <input type="text" 
                   class="form-control" 
                   id="nome" 
                   formControlName="nome"
                   [class.is-invalid]="isFieldInvalid('nome')">
            <div class="invalid-feedback">
              Nome é obrigatório
            </div>
          </div>
        </div>
        
        <div class="col-md-6">
          <div class="mb-3">
            <label for="nomeHeroi" class="form-label">Nome do Herói *</label>
            <input type="text" 
                   class="form-control" 
                   id="nomeHeroi" 
                   formControlName="nomeHeroi"
                   [class.is-invalid]="isFieldInvalid('nomeHeroi')">
            <div class="invalid-feedback">
              Nome do herói é obrigatório
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <div class="mb-3">
            <label for="dataNascimento" class="form-label">Data de Nascimento *</label>
            <input type="date" 
                   class="form-control" 
                   id="dataNascimento" 
                   formControlName="dataNascimento"
                   [class.is-invalid]="isFieldInvalid('dataNascimento')">
            <div class="invalid-feedback">
              Data de nascimento é obrigatória
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="mb-3">
            <label for="altura" class="form-label">Altura (m) *</label>
            <input type="number" 
                   class="form-control" 
                   id="altura" 
                   step="0.01"
                   min="0"
                   formControlName="altura"
                   [class.is-invalid]="isFieldInvalid('altura')">
            <div class="invalid-feedback">
              Altura é obrigatória e deve ser maior que 0
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="mb-3">
            <label for="peso" class="form-label">Peso (kg) *</label>
            <input type="number" 
                   class="form-control" 
                   id="peso" 
                   step="0.1"
                   min="0"
                   formControlName="peso"
                   [class.is-invalid]="isFieldInvalid('peso')">
            <div class="invalid-feedback">
              Peso é obrigatório e deve ser maior que 0
            </div>
          </div>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Superpoderes *</label>
        <div class="row">
          @for (superpoder of superpoderes(); track superpoder.id) {
            <div class="col-md-4 mb-2">
              <div class="form-check">
                <input class="form-check-input" 
                       type="checkbox" 
                       [id]="'superpoder_' + superpoder.id"
                       [checked]="isSuperpowerSelected(superpoder.id)"
                       (change)="toggleSuperpower(superpoder.id, $event)">
                <label class="form-check-label" [for]="'superpoder_' + superpoder.id">
                  {{ superpoder.superpoder }}
                  <small class="text-muted d-block">{{ superpoder.descricao }}</small>
                </label>
              </div>
            </div>
          }
        </div>
        @if (selectedSuperpowers().length === 0 && heroForm.get('superpoderIds')?.touched) {
          <div class="text-danger small">
            Selecione pelo menos um superpoder
          </div>
        }
      </div>

      @if (errorMessage()) {
        <div class="alert alert-danger">
          {{ errorMessage() }}
        </div>
      }

      <div class="d-flex gap-2">
        <button type="submit" 
                class="btn btn-primary" 
                [disabled]="heroForm.invalid || selectedSuperpowers().length === 0 || loading()">
          @if (loading()) {
            <span class="spinner-border spinner-border-sm me-2"></span>
          }
          {{ hero ? 'Atualizar' : 'Criar' }}
        </button>
        <button type="button" class="btn btn-secondary" (click)="onCancel()">
          Cancelar
        </button>
      </div>
    </form>
  `
})
export class HeroFormComponent implements OnInit {
  @Input() hero: Hero | null = null;
  @Output() heroSaved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  private formBuilder = inject(FormBuilder);
  private heroService = inject(HeroService);

  heroForm: FormGroup;
  superpoderes = signal<Superpoder[]>([]);
  selectedSuperpowers = signal<number[]>([]);
  loading = signal(false);
  errorMessage = signal('');

  constructor() {
    this.heroForm = this.formBuilder.group({
      nome: ['', Validators.required],
      nomeHeroi: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      altura: ['', [Validators.required, Validators.min(0.01)]],
      peso: ['', [Validators.required, Validators.min(0.1)]],
      superpoderIds: [[]]
    });
  }

  ngOnInit(): void {
    this.loadSuperpowers();
    if (this.hero) {
      this.populateForm();
    }
  }

  loadSuperpowers(): void {
    this.heroService.getSuperpowers().subscribe({
      next: (superpoderes) => {
        this.superpoderes.set(superpoderes);
      },
      error: (error) => {
        this.errorMessage.set(error);
      }
    });
  }

  populateForm(): void {
    if (this.hero) {
      this.heroForm.patchValue({
        nome: this.hero.nome,
        nomeHeroi: this.hero.nomeHeroi,
        dataNascimento: this.hero.dataNascimento.split('T')[0], // Format for date input
        altura: this.hero.altura,
        peso: this.hero.peso
      });
      
      this.selectedSuperpowers.set(this.hero.superpoderes.map(sp => sp.id));
    }
  }

  isSuperpowerSelected(superpowerId: number): boolean {
    return this.selectedSuperpowers().includes(superpowerId);
  }

  toggleSuperpower(superpowerId: number, event: any): void {
    const current = this.selectedSuperpowers();
    if (event.target.checked) {
      this.selectedSuperpowers.set([...current, superpowerId]);
    } else {
      this.selectedSuperpowers.set(current.filter(id => id !== superpowerId));
    }
    this.heroForm.patchValue({ superpoderIds: this.selectedSuperpowers() });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.heroForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.heroForm.valid && this.selectedSuperpowers().length > 0) {
      this.loading.set(true);
      this.errorMessage.set('');

      const heroData: HeroCreateRequest = {
        ...this.heroForm.value,
        superpoderIds: this.selectedSuperpowers()
      };

      const request = this.hero 
        ? this.heroService.updateHero(this.hero.id!, heroData)
        : this.heroService.createHero(heroData);

      request.subscribe({
        next: () => {
          this.loading.set(false);
          this.heroSaved.emit();
        },
        error: (error) => {
          this.loading.set(false);
          this.errorMessage.set(error);
        }
      });
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
