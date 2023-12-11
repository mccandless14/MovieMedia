import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'sMovie',
  templateUrl: './Smovie.component.html',
  styleUrls: ['./Smovie.component.css']
})
export class SmovieComponent {

  reviewForm: any;
  editForm: any;
  editingMovie: any;

  constructor(
    private webService: WebService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.reviewForm = this.formBuilder.group({
      user: ['', Validators.required],
      comment: ['', Validators.required],
      starRating: 5
    });

    this.editForm = this.formBuilder.group({
      Certificate: [''],
      Director: [''],
      Genre: [''],
      Gross: [''],
      IMDB_Rating: [null],
      Meta_score: [null],
      No_of_Votes: [null],
      Overview: [''],
      Poster_Link: [''],
      Released_Year: [null],
      Runtime: [''],
      Series_Title: [''],
      Star1: [''],
      Star2: [''],
      Star3: [''],
      Star4: [''],
    });
    

    this.sMovie = this.webService.getSmovie(this.route.snapshot.params['id']);
    this.reviews = this.webService.getReviews(this.route.snapshot.params['id']);
  }

  onSubmit() {
    this.webService.postReview(this.reviewForm.value).subscribe((response: any) => {
      this.reviewForm.reset();
      this.reviews = this.webService.getReviews(this.route.snapshot.params['id']);
    });
    this.reviewForm.reset();
  }

  isInvalid(control: any) {
    return this.reviewForm.controls[control].invalid &&
      this.reviewForm.controls[control].touched;
  }

  isUntouched() {
    return this.reviewForm.controls.user.pristine ||
      this.reviewForm.controls.comment.pristine;
  }

  isIncomplete() {
    return this.isInvalid('user') ||
      this.isInvalid('comment') ||
      this.isUntouched();
  }

  editMovie(movie: any) {
    this.editingMovie = movie;
    this.editForm.patchValue(movie);
  }

  onSubmitEdit() {
    const editedMovieDetails = this.editForm.value;
    // Assuming you have an updateMovie method in your WebService
    this.webService.updateMovie(this.editingMovie._id, editedMovieDetails).subscribe(() => {
      // Additional logic after successful movie update
      console.log('Movie details updated successfully');
      // Optionally, reset the form and clear the editingMovie property
      this.editForm.reset();
      this.editingMovie = null;
    });
  }

  sMovie: any = [];
  reviews: any = [];
}
