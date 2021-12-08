import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

interface Iresults {
  backdrop_path: string
  poster_path: string
  id: number
  title: string
  original_title: string
  overview: string
  release_date: string
}

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  movieInfo:Iresults = {
    backdrop_path: '',
    poster_path: '',
    id: 0,
    title: '',
    original_title: '',
    overview: '',
    release_date: '',
  }

  constructor( private router: Router ) { }

  ngOnInit(): void {
    let isLogged = localStorage.getItem('isLogged')
    if ( isLogged != null ) {
      isLogged = JSON.parse(isLogged)
      if ( !isLogged ) {
        this.router.navigate(['/'])
      }
    }

    const data = localStorage.getItem('movie')
    if ( data != null ) {
      const dataParsed = JSON.parse(data)
      this.movieInfo = dataParsed
    } else {
      this.router.navigate(['/'])
    }
  }

}
