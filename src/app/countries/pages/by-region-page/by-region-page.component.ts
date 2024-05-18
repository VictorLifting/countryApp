import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Regions } from '../../interfaces/region.type';



@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent implements OnInit{

  constructor(private countriesService: CountriesService){}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.term;
  }

  public countries : Country[] = [];
  public regions : Regions[] = ['Africa','Americas', 'Asia', 'Oceania', 'Europe'];
  public selectedRegion? :Regions

  searchByRegion(term : Regions) : void {
    this.selectedRegion = term;
    this.countriesService.searchRegion(term)
    .subscribe( countries => {
      this.countries = countries;
      console.log(countries)
    })

}

}
