import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

interface IUserInfo {
  name: string
  email: string
  password: string
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userInfo:IUserInfo = {
    name: '',
    email: '',
    password: ''
  }

  constructor( private router: Router ) { }

  ngOnInit(): void {
    let data = localStorage.getItem('user')
    if ( data != null ){
      const dataParse = JSON.parse(data)
      this.userInfo = dataParse
    }
  }

  logOut() {
    setTimeout(() => {
      localStorage.setItem('isLogged', JSON.stringify(false));
      this.router.navigate(['/'])
    }, 500);
  }

  deleteMovie() {
    localStorage.removeItem('movie')
  }

}
