import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent {

  constructor(private countriesService: CountriesService){}


  public countries : Country[] = [];

  searchByCountry(term :string) : void {
    this.countriesService.searchCountry(term)
    .subscribe( countries => {
      this.countries = countries;
      console.log(countries)
    })

}

}
