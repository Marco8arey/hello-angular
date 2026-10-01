import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience } from '../models/work-experience/work-experience.model';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.css'
})
export class WorkExperienceComponent {

  workExperience: WorkExperience[] = [];

  constructor(public workExperienceService: WorkExperienceService) {
    console.log(this.workExperienceService);
    this.workExperienceService.getWorkExperience().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.workExperience = data;
      console.log(this.workExperience);
    });
  }
}
