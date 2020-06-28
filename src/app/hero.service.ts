import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Hero } from './hero';
import { Observable, of } from "rxjs";
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private messageService: MessageService
  ) { }

  getHeroes(): Observable<Hero[]> {
    const observable: Observable<Hero[]> = of(HEROES);
    this.messageService.addMessage("fetching of heroes successfull");
    return observable;
  }

  getHeroById(id: number) {
    const observable: Observable<Hero> = of(HEROES.find(hero => hero.id === id));
    this.messageService.addMessage(`fetched hero details for id ${id}`);
    return observable;
  }
}
