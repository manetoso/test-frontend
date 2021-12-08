import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  apiData:Itest = {}

  colorInput:any = ''

  constructor( private router: Router, private api:ApiService ) { }

  ngOnInit(): void {
    let isLogged = localStorage.getItem('isLogged')
    if ( isLogged != null ) {
      isLogged = JSON.parse(isLogged)
      if ( !isLogged ) {
        this.router.navigate(['/'])
      }
    }

    this.api.getPopular().subscribe( data => {
      this.apiData = data
    })
  }

  getColor( data:NgForm ) {
    if ( data == null ) return;
    this.colorInput = data;
    (document.querySelector('button') as HTMLElement).style.backgroundColor = this.colorInput.color
  }

  saveMovie( movie:Iresults ) {
    localStorage.setItem('movie', JSON.stringify(movie))
    this.router.navigate(['movie-datail'])
  }
}
