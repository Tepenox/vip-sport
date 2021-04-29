import { Exercice } from './../../models/Exercice';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError, Observable, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YoutubeAPIService {
  private apikey = 'AIzaSyAvh6-Pio0Wn3IY3u_DqLtvGz6jHO1-yuk';
  private videoTitle = '';
  private request = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${this.videoTitle}&type=video&key=${this.apikey}`;
  private youtubeUrl = 'https://www.youtube.com/watch?v=';
  constructor(private httpClient: HttpClient) {}

  assignExerciceVideo(exercice: Exercice) {
    this.videoTitle = exercice.name.toString();
    this.request = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${this.videoTitle}&type=video&key=${this.apikey}`;
    this.httpClient
      .get<any>(this.request)
      .pipe(catchError(this.errorHandler))
      .subscribe(
        (data) => {
          let videoId = data.items[0].id.videoId;
          exercice.videoUrl = this.youtubeUrl + videoId;
          console.log('here is the link bruduh ' + exercice.videoUrl);
        },
        (err) => console.log(err)
      );

    
  }

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'api sport error');
  }
}
