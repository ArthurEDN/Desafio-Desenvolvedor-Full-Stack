import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroFormComponent } from '../hero_form/hero_form.component';
import { HeroService } from '../../../../core/services/hero.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { Hero } from '../../../../core/models/hero';


@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [CommonModule, HeroFormComponent],
  templateUrl: './hero_list.component.html', 
  styleUrls: ['./hero_list.component.css']   
})
export class HeroListComponent implements OnInit {
  private heroService = inject(HeroService);
  private notification = inject(NotificationService);

  heroes = signal<Hero[]>([]);
  loading = signal(true);
  isFormVisible = signal(false);
  selectedHero = signal<Hero | null>(null);

  ngOnInit(): void {
    this.loadHeroes();
  }

 loadHeroes(): void {
  this.loading.set(true);
  this.heroService.getHeroes().subscribe({
    next: (response) => {
      this.heroes.set(response.content);
      this.loading.set(false);
    },
    error: (err) => {
      console.error('Erro ao carregar heróis:', err);
      this.heroes.set([]);
      this.loading.set(false);
    }
  });
}

  onNewHero(): void {
    this.selectedHero.set(null);
    this.isFormVisible.set(true);
  }

  onEditHero(hero: Hero): void {
    this.selectedHero.set(hero);
    this.isFormVisible.set(true);
  }

  onDeleteHero(hero: Hero): void {
    if (confirm(`Tem certeza que deseja excluir ${hero.nomeHeroi}?`)) {
      this.heroService.deleteHero(hero.id).subscribe(() => {
        this.notification.show(`${hero.nomeHeroi} excluído com sucesso!`);
        this.loadHeroes();
      });
    }
  }

  onFormSaved(): void {
    this.isFormVisible.set(false);
    this.loadHeroes();
  }

  onFormCancelled(): void {
    this.isFormVisible.set(false);
  }
}