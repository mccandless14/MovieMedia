// add-movie.component.ts

import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {
  movie: any = {};
  isSuccess: boolean = false;
  successMessage: string = '';

  constructor(private webService: WebService, private router: Router) {}

  addMovie() {
    this.webService.addMovie(this.movie).subscribe(
      (response) => {
        this.isSuccess = true;
        this.successMessage = 'Movie added successfully';
        // Optionally, you can add a delay before redirecting to give the user time to see the alert
        setTimeout(() => {
          this.isSuccess = false;
          // Redirect to the movies page
          // Assuming you have a router configured in your application
          // Make sure to import Router from '@angular/router'
          // and inject it in the constructor
          this.router.navigate(['/movies']);
        }, 2000);
      },
      (error) => {
        console.error('Error adding movie:', error);
        // Handle error, e.g., display an error message to the user
      }
    );
  }
}
