import { Component } from '@angular/core';
import { WebService } from '../web.service';

@Component({
 selector: 'movies',
 templateUrl: '../movies/movie.component.html',
 styleUrls: ['../movies/movie.component.css']
})
export class MovieComponent { 
    movie_list: any = [];
    page: number = 1;
   
    constructor(public webService: WebService) {}

    ngOnInit() {
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