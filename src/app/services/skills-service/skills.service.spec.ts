import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

import { SkillsService } from './skills.service';

const firestoreStub = {
  collection: () => ({
    snapshotChanges: () => of([])
  })
};

describe('SkillsService', () => {
  let service: SkillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: firestoreStub }
      ]
    });
    service = TestBed.inject(SkillsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
