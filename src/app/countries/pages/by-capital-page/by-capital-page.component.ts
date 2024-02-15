import { Country } from './../../interfaces/country.interface';
import { CountriesService } from './../../services/countries.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent {

  constructor( private countriesService: CountriesService){
  }

  public isLoading : boolean = false;

  public countries : Country[] = [];

  searchByCapital(term :string) : void {
    this.isLoading = true;
    this.countriesService.searchCapital(term)
    .subscribe( countries => {
      this.countries = countries;
      this.isLoading = false;
    })

}

}
