import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './homePage.component.html',
  styleUrl: './homePage.component.scss'
})

export class HomePageComponent {
  newLink = '';
  lastOriginalLink = '';


  originalLinkControl = new FormControl('', [
    Validators.required,
    Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
  ])

  async createRecord() {
    console.log(this.originalLinkControl)
    if (this.originalLinkControl.status === 'VALID') {
      if (this.originalLinkControl.value !== this.lastOriginalLink) {
        this.newLink = '...'
        await axios.post('http://localhost:5200/record/create', {originalLink: this.originalLinkControl.value})
        .then(res => {
          this.newLink = 'localhost:4200' + '/' + res.data;
        })
        .catch(err => {
          this.newLink = 'Something went wrong'
        })
      }
    } else {
      this.newLink = 'Invalid link'
    }
  }
}
