import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

import { EducationComponent } from './education.component';

const firestoreStub = {
  collection: () => ({
    snapshotChanges: () => of([])
  })
};

describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EducationComponent],
      providers: [
        { provide: AngularFirestore, useValue: firestoreStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the education collection through the service', () => {
    expect(component.educationService.getEducation()).toBeTruthy();
  });
});
