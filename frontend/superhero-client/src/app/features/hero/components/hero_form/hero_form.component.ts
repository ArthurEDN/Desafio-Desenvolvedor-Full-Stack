import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Hero, HeroRequest } from '../../../../core/models/hero';
import { HeroService } from '../../../../core/services/hero.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { Superpower } from '../../../../core/models/super_power';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: 'hero_form.component.html',
  styleUrls: ['hero_form.component.css']
})
export class HeroFormComponent implements OnInit {
  @Input() hero: Hero | null = null;
  @Output() formSaved = new EventEmitter<void>();
  @Output() formCancelled = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private heroService = inject(HeroService);
  private notification = inject(NotificationService);

  heroForm!: FormGroup;
  allSuperpowers = signal<Superpower[]>([]);
  loading = signal(false);

  ngOnInit(): void {
    this.heroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(120)]],
      nomeHeroi: ['', [Validators.required, Validators.maxLength(120)]],
      dataNascimento: ['', Validators.required],
      altura: ['', [Validators.required, Validators.min(0.01)]],
      peso: ['', [Validators.required, Validators.min(0.1)]],
      superpoderesIds: [[], [Validators.required, Validators.minLength(1)]]
    });

    this.loadSuperpowers();

    if (this.hero) {
      this.heroForm.patchValue({
        nome: this.hero.nome,
        nomeHeroi: this.hero.nomeHeroi,
        dataNascimento: this.hero.dataNascimento,
        altura: this.hero.altura,
        peso: this.hero.peso,
        superpoderesIds: this.hero.superpoderes.map((s: Superpower) => s.id)
      });
    }
  }

  loadSuperpowers(): void {
    this.heroService.getSuperpowers().subscribe({
      next: (data) => this.allSuperpowers.set(data),
      error: (err) => {
        this.notification.show('Falha ao carregar superpoderes.', 'danger');
        console.error('Erro ao carregar superpoderes:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.heroForm.invalid) {
      this.heroForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const formValue = { ...this.heroForm.value };

    formValue.altura = String(formValue.altura).replace(',', '.');
    formValue.peso = String(formValue.peso).replace(',', '.');
    
    const requestData: HeroRequest = formValue;

    const request$ = this.hero
      ? this.heroService.updateHero(this.hero.id, requestData)
      : this.heroService.createHero(requestData);

    request$.subscribe({
      next: () => {
        this.loading.set(false);
        this.notification.show(this.hero ? 'Herói atualizado com sucesso!' : 'Herói criado com sucesso!');
        this.formSaved.emit();
      },
      error: () => this.loading.set(false)
    });
  }

  onCancel(): void {
    this.formCancelled.emit();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.heroForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  onSuperpowerChange(event: Event, superpowerId: number): void {
    const value = this.heroForm.get('superpoderesIds')?.value;
    const currentIds = Array.isArray(value) ? [...value] : [];

    if ((event.target as HTMLInputElement).checked) {
      if (!currentIds.includes(superpowerId)) {
        currentIds.push(superpowerId);
      }
    } else {
      const index = currentIds.indexOf(superpowerId);
      if (index > -1) {
        currentIds.splice(index, 1);
      }
    }
    
    this.heroForm.get('superpoderesIds')?.setValue(currentIds);
    this.heroForm.get('superpoderesIds')?.markAsDirty();
    this.heroForm.get('superpoderesIds')?.markAsTouched();
  }
}