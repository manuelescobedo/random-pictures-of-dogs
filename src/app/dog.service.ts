import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';


const URL = 'https://dog.ceo/api/breeds/image/random'

@Injectable({
  providedIn: 'root',
})
export class DogService {
  constructor(
    private _http: HttpClient
  ) {

  }
  fetchRandomImages(count = 50) {
    return this._http.get(`${URL}/${count}`)
      .map(d => {
        if (!d.hasOwnProperty('message') || d['message'].length === 0) return Observable.throw([]);

        return d['message'];
      });
  }
}