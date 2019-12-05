import { Component, OnInit, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { DogService } from './dog.service';
import { DogComponent } from './dog.component';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  name = 'Angular';

  dogPictures = [];

  errorMessage = null;

  @ViewChildren(DogComponent) dogs !: QueryList<DogComponent>;

  constructor(
    private _dogService: DogService
  ) {

  }
  ngAfterViewInit() {
    this.dogs.changes.subscribe(dog => {
      if (dog.first) dog.first.focusImage();
    });
  }
  ngOnInit() {
    this.fetchDogImages();
  }

  getBreed(pictureUrl) {
    if (!pictureUrl) return '';

    let breed = '';

    const segments = pictureUrl.split('/');

    if (segments.length === 0) return '';

    breed = segments[4];

    return breed.split('-').map(s => s[0].toUpperCase() + s.substring(1)).join(' ')
  }

  fetchDogImages() {
    const count = Math.ceil(Math.random() * 50);

    return this._dogService.fetchRandomImages(count)
      .subscribe(
        (dogPictures) => {
          this.dogPictures = dogPictures;
          this.errorMessage = null;
        },
        () => {
          this.errorMessage = 'No dogs found';
        }
      )
  }
}
