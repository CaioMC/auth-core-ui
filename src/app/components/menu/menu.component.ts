import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  name = localStorage.getItem('name')
  ngOnInit(): void {
    this._route.events.subscribe(
      (route) => {
        this.getUrl();
      }
  )  }

  constructor(private _route: Router) {

  }

  childrenPacientes = false;

  menu!: string;

  getUrl(): void {
    this.menu = window.location.pathname;
  }

  navigateTo(url: string) {
    this._route.navigateByUrl(url)
  }

  deslogar(): void {
    localStorage.clear();
    this._route.navigateByUrl('/login')
  }

}
