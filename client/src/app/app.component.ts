import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title:string = 'Dating app';
  users : any
// {Id:number, UserName:string}[];

  constructor(private http : HttpClient){}

  ngOnInit(){
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (res) =>{this.users = res},
      error: (error) => {console.error(error)},
      complete: () => {console.log('request has completed')}
    });
  }

}
