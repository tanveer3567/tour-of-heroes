import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Hero } from './hero';
import { Observable, of } from "rxjs";
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl: string = 'api/heroes';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  private log(message: string) {
    this.messageService.addMessage(`Hero service: ${message}`)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  getHeroes(): Observable<Hero[]> {
    const observable: Observable<Hero[]> = this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log(`fetched heroes`)),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
    return observable;
  }

  getHeroById(id: number): Observable<Hero> {
    const observable: Observable<Hero> = this.http.get<Hero>(`${this.heroesUrl}/${id}`).pipe(
      tap(_ => this.log(`fetched hero with id: ${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
    return observable;
  }

  updateHero(hero: Hero): Observable<Hero> {
    const observable: Observable<Hero> = this.http.put<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero with id: ${hero.id}`)),
      catchError(this.handleError<Hero>(`updateHero id=${hero.id}`))
    );
    return observable;
  }

  addHero(hero: Hero): Observable<Hero> {
    const observable: Observable<Hero> = this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added new hero with id: ${newHero.id}`)),
      catchError((newHero: Hero) => this.handleError<Hero>(`addHero id=${newHero.id}`))
    );
    return observable;
  }

  deleteHero(hero: Hero): Observable<Hero> {
    const observable: Observable<Hero> = this.http.delete<Hero>(`${this.heroesUrl}/${hero.id}`, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero with id: ${hero.id}`)),
      catchError(this.handleError<Hero>(`deleteHero id=${hero.id}`))
    );
    return observable;
  }

  searchHero(term: string): Observable<Hero[]> {
    if (!term.trim()) { return of([]); }
    const observable: Observable<Hero[]> = this.http.get<Hero[]>(`${this.heroesUrl}/?name${term}`).pipe(
      tap(x => x.length ? this.log(`found heroes matching "${term}"`) : this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
    return observable;
  }
}
