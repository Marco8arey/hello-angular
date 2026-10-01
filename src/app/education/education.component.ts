import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { EducationService } from '../services/education-service/education.service';
import { Education } from '../models/education/education.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {

  education: Education[] = [];

  constructor(public educationService: EducationService) {
    console.log(this.educationService);
    this.educationService.getEducation().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.education = data;
      console.log(this.education);
    });
  }
}
