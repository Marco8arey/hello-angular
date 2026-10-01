import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

import { WorkExperienceComponent } from './work-experience.component';

const firestoreStub = {
  collection: () => ({
    snapshotChanges: () => of([])
  })
};

describe('WorkExperienceComponent', () => {
  let component: WorkExperienceComponent;
  let fixture: ComponentFixture<WorkExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkExperienceComponent],
      providers: [
        { provide: AngularFirestore, useValue: firestoreStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
