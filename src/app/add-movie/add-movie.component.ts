// add-movie.component.ts

import { Component } from '@angular/core';
import { WebService } from '../web.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {
  movie: any = {}; // Initialize an empty object to store movie data

  constructor(private webService: WebService) {}

  addMovie() {
    // Assuming you have a method in your WebService to make the POST request
    this.webService.addMovie(this.movie).subscribe(
      (response) => {
        console.log('Movie added successfully:', response);
        // You can add further logic here, such as redirecting to another page
      },
      (error) => {
        console.error('Error adding movie:', error);
        // Handle error, e.g., display an error message to the user
      }
    );
  }
}
