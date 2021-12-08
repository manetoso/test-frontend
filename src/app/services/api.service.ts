import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiKey = 'e9ca31205c0080b081d82fd75e22922d'

  constructor( private http:HttpClient ) { }

  getPopular() {
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=es-ES&page=1`
    return this.http.get(url)
  }

  getNowPlaying() {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=es-ES&page=1`
    return this.http.get(url)
  }
}
