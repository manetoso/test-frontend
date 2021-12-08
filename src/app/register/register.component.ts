import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userData:any = {
    name: '',
    email: '',
    password: ''
  }
  messageError = ''
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
  }

  validate( name:string, email: string, password: string ) {
    setTimeout(() => {
      if ( name.length < 3 ) return this.messageError = 'El nombre es muy corto';
      if ( !this.emailRegex.test(email) ) return this.messageError = 'El email es incorrecto';
      if ( password.length < 5 ) return this.messageError = 'La contraseña tiene que ser mayor o igual a 6';

      localStorage.setItem('user', JSON.stringify( this.userData ))
      this.router.navigate(['/'])
      return this.messageError = ''
    }, 1500);
  }

  getData( data:NgForm ) {
    if ( data == null ) return;
    this.userData = data;
    this.validate( this.userData.name, this.userData.email, this.userData.password )
  }
}
