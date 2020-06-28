import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe(data => this.heroes = data);
  }

  select(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.addMessage(`${this.selectedHero.name} has been selected`);
  }

  add(name: String): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero).subscribe(hero => {
      this.heroes.push(hero);
    })
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero).subscribe();
    this.heroes = this.heroes.filter(h => h !== hero);
  }
}
