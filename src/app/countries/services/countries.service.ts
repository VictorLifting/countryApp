import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) {
  }

  private apiUrl : string = "https://restcountries.com/v3.1";

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

    const url:string = `${this.apiUrl}/capital/${term}`;
     return this.getCountriesRequest(url)

      // tap( countries => console.log('paso por el tap', countries )),
      // map( countries => [])

  }

  searchCountry (term:string) : Observable<Country[]>{
    const url:string = `${this.apiUrl}/name/${term}`;
     return this.getCountriesRequest(url)
  }


  searchRegion (term:string) : Observable<Country[]>{
    const url:string = `${this.apiUrl}/region/${term}`;
     return this.getCountriesRequest(url)
  }


}
