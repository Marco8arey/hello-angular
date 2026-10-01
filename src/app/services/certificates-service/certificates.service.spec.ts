import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

import { CertificatesService } from './certificates.service';

const firestoreStub = {
  collection: () => ({
    snapshotChanges: () => of([])
  })
};

describe('CertificatesService', () => {
  let service: CertificatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: firestoreStub }
      ]
    });
    service = TestBed.inject(CertificatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
