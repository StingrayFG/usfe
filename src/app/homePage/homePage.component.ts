import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './homePage.component.html',
  styleUrl: './homePage.component.scss'
})

export class HomePageComponent {
  newLink = '';
  lastOriginalLink = '';
  
  showingMessage = false;
  message = ''

  originalLinkControl = new FormControl('', [
    Validators.required,
    Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
  ])

  handleKey(e: any): void {
    if(e.keyCode === 13) {        
      this.createRecord();    
    }
  }  
  copyLink(): void {
    if (this.newLink) {
      this.showMessage('Copied!')
      navigator.clipboard.writeText(this.newLink);
    }
  }

  async showMessage(msg: string) {
    this.message = msg;
    this.showingMessage = true;
    await new Promise(res => setTimeout(res, 1500));
    this.showingMessage = false;
  }

  async createRecord() {
    console.log(this.originalLinkControl)
    if (this.originalLinkControl.status === 'VALID') {
      if (this.originalLinkControl.value !== this.lastOriginalLink) {
        this.newLink = '...'
        await axios.post('http://localhost:5200/record/create', {originalLink: this.originalLinkControl.value})
        .then(res => {
          this.newLink = 'localhost:4200' + '/' + res.data;
          this.lastOriginalLink = this.originalLinkControl.value!;
        })
        .catch(err => {
          this.newLink = 'Something went wrong'
        })
      }
    } else {
      this.showMessage('Enter a correct link')
    }
  }
}
