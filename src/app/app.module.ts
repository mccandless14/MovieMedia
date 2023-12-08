import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { WebService } from './web.service';
import { HttpClientModule } from '@angular/common/http';
import { MovieComponent } from './movies/movie.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SmovieComponent } from './singleMovie/Smovie.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { NavcomponentComponent } from './navcomponent/navcomponent.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { FormsModule } from '@angular/forms';

var routes: any = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'movies',
    component: MovieComponent
  },
  {
    path:'movie/:id',
    component: SmovieComponent
  },
  {
    path:'addMovie',
    component: AddMovieComponent
  },
    
];

@NgModule({
 declarations: [
 AppComponent, MovieComponent, HomeComponent, SmovieComponent, NavcomponentComponent, AddMovieComponent
 ],
 imports: [
 BrowserModule, HttpClientModule, FormsModule,
 RouterModule.forRoot(routes), ReactiveFormsModule,
 AuthModule.forRoot({ domain: 'dev-f2qm0y6xxijwfpx8.uk.auth0.com',
                      clientId:'VRt7rkVJZTnD63ZHbGJvTQfViqxKUv0c'})
 ],
 providers: [WebService],
 bootstrap: [AppComponent]
})
export class AppModule { }