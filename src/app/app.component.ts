/*********************************************************************************
* WEB422 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Eunbi Kong   Student ID: 158281188   Date: 2021/04/11
*
* Online Link: _______________________________________________________________
*
********************************************************************************/ 

import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { AuthService } from './auth.service';
import { User } from './User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'web422-a6';
  searchString!: string;
  token: User;

  constructor(private router: Router, private auth: AuthService) {}

  handleSearch(): void {
    this.router.navigate(['/search'], {
      queryParams: { q: this.searchString },
    });
  }

  ngOnInit(): void {
    this.searchString = '';
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.token = this.auth.readToken();
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}