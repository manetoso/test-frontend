import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  storageData:any = null
  userData:any = {
    email: '',
    password: ''
  }
  messageError = ''
  areLocalData = false
  emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  constructor( private router: Router ) { }

  ngOnInit(): void {
    let isLogged = localStorage.getItem('isLogged')
    if ( isLogged != null ) {
      isLogged = JSON.parse(isLogged)
      if ( isLogged ) {
        this.router.navigate(['home'])
      }
    }
    const local1 = localStorage.getItem('user')
    if ( local1 != null ) {
      this.storageData = JSON.parse(local1)
      this.areLocalData = true
    } else {
      this.messageError = '¡No hay usuario en el localStorge! Por favor registre uno'
    }
  }

  validate( email: string, password: string ) {
    setTimeout(() => {
      if ( !this.emailRegex.test(email) ) return this.messageError = 'El email es incorrecto';
      if ( password.length < 5 ) return this.messageError = 'La contraseña tiene que ser mayor o igual a 6';

      if ( email != this.storageData.email || password != this.storageData.password ) {
        return this.messageError = 'La contraseña o el usuario no coinciden'
      }
      localStorage.setItem('isLogged', JSON.stringify(true));
      this.router.navigate(['home'])
      return this.messageError = ''
    }, 1000);
  }

  getData( data:NgForm ) {
    if ( data == null ) return;
    this.userData = data;
    this.validate( this.userData.email, this.userData.password )
  }
}
