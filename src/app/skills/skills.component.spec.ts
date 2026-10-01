import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

import { SkillsComponent } from './skills.component';

const firestoreStub = {
  collection: () => ({
    snapshotChanges: () => of([])
  })
};

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkillsComponent],
      providers: [
        { provide: AngularFirestore, useValue: firestoreStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the skills collection through the service', () => {
    expect(component.skillsService.getSkills()).toBeTruthy();
  });
});
