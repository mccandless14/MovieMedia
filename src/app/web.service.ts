import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebService {
    movie_list:any;
    private SmovieID: any;
 constructor(private http: HttpClient) {}
 getMovies(page: number) {
    return this.http.get(
    'http://localhost:5000/api/v1.0/movies?pn=' + page
    );}
getSmovie(id: any) {
    this.SmovieID = id;
    return this.http.get(
    'http://localhost:5000/api/v1.0/movies/' + id);
        }

getReviews(id: any) {
 return this.http.get(
 'http://localhost:5000/api/v1.0/movies/' + id + '/reviews');
 }
 postReview(review: any) {
    let postData = new FormData();
    postData.append("user", review.user);
    postData.append("text", review.comment);
    postData.append("star_rating", review.star_rating);

    return this.http.post('http://localhost:5000/api/v1.0/movies/' + this.SmovieID + '/add_review', postData); 
    };
}

