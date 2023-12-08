import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class WebService {
    movie_list: any;
    private SmovieID: any;

    constructor(private http: HttpClient) {}

    getMovies(page: number) {
        return this.http.get('http://localhost:5000/api/v1.0/movies?pn=' + page);
    }

    getSmovie(id: any) {
        this.SmovieID = id;
        return this.http.get('http://localhost:5000/api/v1.0/movies/' + id);
    }

    getReviews(id: any) {
        return this.http.get('http://localhost:5000/api/v1.0/movies/' + id + '/reviews');
    }

    postReview(review: any) {
        let postData = new FormData();
        postData.append("user", review.user);
        postData.append("text", review.comment);
        postData.append("star_rating", review.star_rating);

        return this.http.post('http://localhost:5000/api/v1.0/movies/' + this.SmovieID + '/add_review', postData);
    }

    deleteMovie(movieId: string) {
        return this.http.delete('http://localhost:5000/api/v1.0/movies/' + movieId);
    }

    addMovie(movieData: any): Observable<any> {
      let postData = new FormData();
      postData.append('Certificate', movieData.Certificate);
      postData.append('Director', movieData.Director);
      postData.append('Genre', movieData.Genre);
      postData.append('Gross', movieData.Gross);
      postData.append('IMDB_Rating', movieData.IMDB_Rating);
      postData.append('Meta_score', movieData.Meta_score);
      postData.append('No_of_Votes', movieData.No_of_Votes);
      postData.append('Overview', movieData.Overview);
      postData.append('Poster_Link', movieData.Poster_Link);
      postData.append('Released_Year', movieData.Released_Year);
      postData.append('Runtime', movieData.Runtime);
      postData.append('Series_Title', movieData.Series_Title);
      postData.append('Star1', movieData.Star1);
      postData.append('Star2', movieData.Star2);
      postData.append('Star3', movieData.Star3);
      postData.append('Star4', movieData.Star4);
  
      return this.http.post<any>('http://localhost:5000/api/v1.0/movies', postData);
    }
}
