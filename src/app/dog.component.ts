import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'dog',
  template: `
    <figure class="dog-picture-container">
      <img #img tabindex="0" height="100" [src]="picture" [alt]="getCaption()" />
      <figcaption>{{ breed }}</figcaption>
    </figure>
  `,
  styles: [`
    .dog-picture-container {
      width: 200px;
      float: left;
      text-align: center;
    }
    img:focus {
      border-color: #FF0000;
      border-width: 2px;
    }
  `]
})
export class DogComponent  {
  @Input() breed = 'Spaniel Cocker';
  @Input() picture = 'https://images.dog.ceo/breeds/spaniel-cocker/n02102318_3827.jpg'

  @ViewChild('img') img: ElementRef;

  focusImage() {
    this.img.nativeElement.focus();
  }

  getCaption() {
    return `picture of ${['a','e','i','o', 'u'].includes(this.breed[0].toLowerCase()) ? 'an' : 'a'} ${this.breed} dog`
  }
}
