import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

import { InterestsComponent } from './interests.component';

const firestoreStub = {
  collection: () => ({
    snapshotChanges: () => of([])
  })
};

describe('InterestsComponent', () => {
  let component: InterestsComponent;
  let fixture: ComponentFixture<InterestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterestsComponent],
      providers: [
        { provide: AngularFirestore, useValue: firestoreStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the interests collection through the service', () => {
    expect(component.interestsService.getInterests()).toBeTruthy();
  });
});
