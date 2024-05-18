import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Regions } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage()
  }

  private apiUrl : string = "https://restcountries.com/v3.1";

  public cacheStore : CacheStore ={
    byCapital:{term: '', countries:[] },
    byCountries:{term: '', countries:[] },
    byRegion:{term: '', countries:[] },

  }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore) )
  }

  private loadFromLocalStorage(){
    if(!localStorage.getItem('cacheStore')) return
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
  }

  private getCountriesRequest(url:string):Observable<Country[]>{
    return this.http.get<Country[]>(url).pipe(
      catchError(()=>of([])),
      delay( 2000 ),
    )
  }
   
  searchCountryByAlphaCode(code:string) : Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
    .pipe(
      map(countries => countries.length>0 ? countries[0] :null),
     catchError( error => 
      of (null)
    ));
  }

  searchCapital ( term: string ): Observable<Country[]> {
    const url : string = `${this.apiUrl}/capital/${term}`;
     return this.getCountriesRequest(url)
     .pipe(
        tap(countries => 
          this.cacheStore.byCapital = {
            term: term, countries:countries
          }),
          tap(() => this.saveToLocalStorage())
     )
      // tap( countries => console.log('paso por el tap', countries )),
      // map( countries => [])

  }

  searchCountry (term:string) : Observable<Country[]>{
    const url:string = `${this.apiUrl}/name/${term}`;
     return this.getCountriesRequest(url)
     .pipe(
      tap(countries =>
        this.cacheStore.byCountries= {
          term : term,
          countries: countries
        }),
        tap(() => this.saveToLocalStorage())
     )
  }


  searchRegion (term:Regions) : Observable<Country[]>{
    const url:string = `${this.apiUrl}/region/${term}`;
     return this.getCountriesRequest(url)
     .pipe(
        tap(region => this.cacheStore.byRegion ={
          term: term,
          countries:region
        } ),
        tap(() => this.saveToLocalStorage())
     )
  }


}
