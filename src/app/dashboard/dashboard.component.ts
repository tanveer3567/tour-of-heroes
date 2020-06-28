import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe(data => this.heroes = data.slice(0, 4));
  }

  select(hero: Hero) {
    this.selectedHero = hero;
    this.messageService.addMessage(`${this.selectedHero.name} has been selected`);
  }

}
