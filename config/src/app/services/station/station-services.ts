import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StationServices {

    private apiUrl = "http://localhost:3000/api"

    constructor(private http: HttpClient) {}

    getStations() {
        return this.http.get(`${this.apiUrl}/estaciones`)
    }

    getOneStation(id:String) {
        return this.http.get(`${this.apiUrl}/estacion/${id}`)
    }

    createStation(body:any) {
        return this.http.post(`${this.apiUrl}/estacion`, body)
    }

    updateStation(id:String, body:any) {
        return this.http.put(`${this.apiUrl}/estacion/${id}`, body)
    }

    deleteStation(id:String) {
        return this.http.delete(`${this.apiUrl}/estacion/${id}`)
    }


}
