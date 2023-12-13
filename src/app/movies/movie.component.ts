import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute } from '@angular/router';

@Component({
 selector: 'movies',
 templateUrl: '../movies/movie.component.html',
 styleUrls: ['../movies/movie.component.css']
})
export class MovieComponent { 
    movie_list: any = [];
    page: number = 1;
   
    constructor(public webService: WebService, private route: ActivatedRoute) {}

    isMovieDeleted: boolean = false;

    ngOnInit() {
         // Check for the 'deleted' query parameter
  this.route.queryParams.subscribe(params => {
    if (params['deleted'] === 'true') {
      this.isMovieDeleted = true;
      console.log('Movie has been successfully deleted');
    }
  });
        if (sessionStorage['page']) {
            this.page = Number(sessionStorage['page']);
            }
       this.movie_list=this.webService.getMovies(this.page);
        }

        previousPage() {
            if (this.page > 1) {
                this.page = this.page - 1;
                sessionStorage['page'] = this.page;
                this.movie_list =
                this.webService.getMovies(this.page);
                }
        }
        nextPage() {
            this.page = this.page + 1;
            sessionStorage['page'] = this.page;
            this.movie_list =
            this.webService.getMovies(this.page);
        }
        
        
    
}