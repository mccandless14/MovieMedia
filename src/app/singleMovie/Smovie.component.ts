import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  editingReview: any; // New property to store the currently editing review

  constructor(
    private webService: WebService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.reviewForm = this.formBuilder.group({
      user: ['', Validators.required],
      comment: ['', Validators.required],
      starRating: 5
    });

    this.editForm = this.formBuilder.group({
      comment: [''],
      starRating: [null],
    });

    this.sMovie = this.webService.getSmovie(this.route.snapshot.params['id']);
    this.reviews = this.webService.getReviews(this.route.snapshot.params['id']);
  }

  onSubmit() {
    this.webService.postReview(this.reviewForm.value).subscribe((response: any) => {
      this.reviewForm.reset();
      this.reviews = this.webService.getReviews(this.route.snapshot.params['id']);
    });
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
    this.editingReview = null; // Reset editingReview when editing a movie
  }

  deleteMovie(movieId: string): void {
    this.webService.deleteMovie(movieId).subscribe(
      () => {
        console.log('Movie deleted successfully');
        this.router.navigate(['/movies'], { queryParams: { deleted: 'true' } });
      },
      (error) => {
        console.error('Error deleting movie:', error);
      }
    );
  }

  editReview(review: any) {
    this.editingReview = review;
    this.editForm.patchValue(review);
    this.editingMovie = null; // Reset editingMovie when editing a review
  }

  deleteReview(reviewId: string): void {
    this.webService.deleteReview(this.route.snapshot.params['id'], reviewId).subscribe(
      () => {
        console.log('Review deleted successfully');
        this.reviews = this.webService.getReviews(this.route.snapshot.params['id']);
      },
      (error) => {
        console.error('Error deleting review:', error);
      }
    );
  }

  onSubmitEdit() {
    if (this.editingMovie) {
      const editedMovieDetails = this.editForm.value;
      this.webService.updateMovie(this.editingMovie._id, editedMovieDetails).subscribe(() => {
        console.log('Movie details updated successfully');
        this.editForm.reset();
        this.editingMovie = null;
      });
    } else if (this.editingReview) {
      const editedReviewDetails = this.editForm.value;
      this.webService.updateReview(this.route.snapshot.params['id'], this.editingReview.id, editedReviewDetails).subscribe(() => {
        console.log('Review details updated successfully');
        this.editForm.reset();
        this.editingReview = null;
        this.reviews = this.webService.getReviews(this.route.snapshot.params['id']);
      });
    }
  }

  sMovie: any = [];
  reviews: any = [];
}
