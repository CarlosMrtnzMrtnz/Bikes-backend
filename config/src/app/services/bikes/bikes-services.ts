import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BikesServices {

    private apiUrl = "http://localhost:3000/api"

    constructor(private http: HttpClient) {}

    getBikes(id:string) {
        return this.http.get(`${this.apiUrl}/bicicleta/${id}`)
    }

    getOneBike(id:string) {
        return this.http.get(`${this.apiUrl}/bicicleta/${id}`)
    }

    createBike(body:any) {
        return this.http.post(`${this.apiUrl}/bicicleta`, body)
    }

    updateBike(id:string, body:any) {
        return this.http.put(`${this.apiUrl}/bicicleta/${id}`, body)
    }

    deleteBike(id:string) {
        return this.http.delete(`${this.apiUrl}/bicicleta/${id}`)
    }
}
