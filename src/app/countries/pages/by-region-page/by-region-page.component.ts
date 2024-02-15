import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent {

  constructor(private countriesService: CountriesService){}

  public countries : Country[] = [];

  searchByRegion(term :string) : void {
    this.countriesService.searchRegion(term)
    .subscribe( countries => {
      this.countries = countries;
      console.log(countries)
    })

}

}
