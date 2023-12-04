import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'sMovie',
  templateUrl: './Smovie.component.html',
  styleUrls: ['././Smovie.component.css']
})
export class SmovieComponent {

  reviewForm: any;

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
      star_rating: 5
    });

    this.sMovie = this.webService.getSmovie(this.route.snapshot.params['id']);
    this.reviews = this.webService.getReviews(this.route.snapshot.params['id']);
  }

  onSubmit() {
    this.webService.postReview(this.reviewForm.value).subscribe((response: any) => {
        this.reviewForm.reset();
        this.reviews = this.webService.getReviews(
        this.route.snapshot.params['id']);
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

  sMovie: any = [];
  reviews: any = [];

}
