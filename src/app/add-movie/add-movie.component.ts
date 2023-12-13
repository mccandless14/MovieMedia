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
        setTimeout(() => {
          this.isSuccess = false;
          this.router.navigate(['/movies']);
        }, 2000);
      },
      (error) => {
        console.error('Error adding movie:', error);
      }
    );
  }
}
