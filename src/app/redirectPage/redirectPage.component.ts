import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-redirect-page',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './redirectPage.component.html',
  styleUrl: './redirectPage.component.scss'
})

export class RedirectPageComponent {
  message = '...';

  constructor(private route: ActivatedRoute) { }

  async ngOnInit() {
    await axios.get('http://localhost:5200/record/get/' + this.route.snapshot.paramMap.get('uuid'))
    .then(res => {
      window.location.href = res.data.originalLink;
    })
    .catch(err => {
      this.message = '404 Not Found'
    })
  }
}
