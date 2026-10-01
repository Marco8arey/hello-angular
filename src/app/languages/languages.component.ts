import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Languages } from '../models/languages/languages.model';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.css'
})
export class LanguagesComponent {

  languages: Languages[] = [];

  constructor(public languagesService: LanguagesService) {
    console.log(this.languagesService);
    this.languagesService.getLanguages().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.languages = data;
      console.log(this.languages);
    });
  }
}
