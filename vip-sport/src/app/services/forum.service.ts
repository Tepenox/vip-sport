import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

//Temporaire, c'est pour pouvoir récupérer les utilisateurs du placeholder JSON

export class ForumService {
  private usersUrl = 'https://my-json-server.typicode.com/taguet/posts/users';

  constructor(private http: HttpClient) { }

  getUser(id) {
    return this.http.get(this.usersUrl + '?id=' + id);
  }
}
