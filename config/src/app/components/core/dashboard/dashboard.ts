import { Component, inject, signal } from '@angular/core';
import { StationServices } from '../../../services/station/station-services';
import { BikesServices } from '../../../services/bikes/bikes-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
    stations!:any
    bikes!:any


    stationServices = inject(StationServices)
    bikesServices = inject(BikesServices)

    constructor(private router: Router){}

    ngOnInit() {
        this.renderStation()


    }

    renderStation() {
        this.stationServices.getStations().subscribe({
            next:(dataApi:any)=> {
                this.stations = dataApi
                this.router.navigate(['/dashboard',this.stations[0]._id])

            },
            error:(error:any)=> {
                console.log(error);
            }
        })
    }

    renderBikes(id:string){
        this.bikesServices.getBikes(id).subscribe({
            next:(dataApi:any)=> {
                this.bikes.set(dataApi)
            },
            error:(error:any)=> {
                console.log(error);

            }
        })
    }
}
