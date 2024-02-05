import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './homePage.component.html',
  styleUrl: './homePage.component.scss'
})

export class HomePageComponent {
  uuid = '';
  newLink = '';

  originalLinkControl = new FormControl('');


  async createRecord() {
    if (this.originalLinkControl.value && !this.newLink) {
      this.newLink = '...'
      await axios.post('http://localhost:5200/record/create', {originalLink: this.originalLinkControl.value})
      .then(res => {
        this.newLink = 'localhost:4200' + '/' + res.data;
      })
    }
  }
}
