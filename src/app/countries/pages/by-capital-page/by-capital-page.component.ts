import { Country } from './../../interfaces/country.interface';
import { CountriesService } from './../../services/countries.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent implements OnInit {

  constructor( private countriesService: CountriesService){
  }

  ngOnInit(): void {
    this.countries= this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  public isLoading : boolean = false;
  public countries : Country[] = [];
  public initialValue : string = "";

  searchByCapital(term :string) : void {
    this.isLoading = true;
    this.countriesService.searchCapital(term)
    .subscribe( countries => {
      this.countries = countries;
      this.isLoading = false;
    })

}

}
