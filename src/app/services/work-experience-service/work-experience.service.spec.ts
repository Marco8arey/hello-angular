import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

import { WorkExperienceService } from './work-experience.service';

const firestoreStub = {
  collection: () => ({
    snapshotChanges: () => of([])
  })
};

describe('WorkExperienceService', () => {
  let service: WorkExperienceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: firestoreStub }
      ]
    });
    service = TestBed.inject(WorkExperienceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
