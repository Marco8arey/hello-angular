import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

import { CertificatesComponent } from './certificates.component';

const firestoreStub = {
  collection: () => ({
    snapshotChanges: () => of([])
  })
};

describe('CertificatesComponent', () => {
  let component: CertificatesComponent;
  let fixture: ComponentFixture<CertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CertificatesComponent],
      providers: [
        { provide: AngularFirestore, useValue: firestoreStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the certificates collection through the service', () => {
    expect(component.certificatesService.getCertificates()).toBeTruthy();
  });
});
