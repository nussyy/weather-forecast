import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatTabsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weather-forecast';


  apiKey ='dee07975f6b7dc3cbdee4c6c431895a3';
  city: string ='';
  weatherData:any=null;
  forecastData:any[]=[];
  errorMessage:string | null =null;

  constructor(private http:HttpClient){}

  getWeatherData(): void{
    const currentWeatherUrl =`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=${this.apiKey}&units=metric`;



  this.http.get(currentWeatherUrl).subscribe({
    next: (data:any)=>{
      this.weatherData={
        temp: data.main.temp,
        humidity:data.main.humidity,
        wind:data.wind.speed,
        condition:data.weather[0].description,
      };
      this.errorMessage =null;
    },

    error:()=>{
      this.weatherData=null;
      this.errorMessage='City not found or API error';
    },
  });

  this.http.get(forecastUrl).subscribe({
    next:(data: any)=>{
      this.forecastData = data.list
      .filter((_: any, index: number) => index % 8 === 0)
      .map((item:any)=> ({
        data: new Date (item.dt * 1000).toLocaleDateString(),
        temp: item.main.temp,
        condition:item.weather[0].description,

      }));
    this.errorMessage= null;
  },
error:()=>{
  this.forecastData =[];
this.errorMessage ='Error fetching forcast data.';

},
  });

}

}