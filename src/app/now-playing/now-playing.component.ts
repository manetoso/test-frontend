import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService } from '../services/api.service';

interface Itest {
  page?: number
  results?: Iresults[]
  total_pages?: number
  total_results?: number
  prototype?: object
}

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
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss']
})
export class NowPlayingComponent implements OnInit {
  apiData:Itest = {}

  constructor( private router: Router, private api:ApiService ) { }

  ngOnInit(): void {
    let isLogged = localStorage.getItem('isLogged')
    if ( isLogged != null ) {
      isLogged = JSON.parse(isLogged)
      if ( !isLogged ) {
        this.router.navigate(['/'])
      }
    }

    this.api.getNowPlaying().subscribe( data => {
      this.apiData = data
    })
  }

}
