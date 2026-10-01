import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { CertificatesService } from '../services/certificates-service/certificates.service';
import { Certificates } from '../models/certificates/certificates.model';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.css'
})
export class CertificatesComponent {

  certificates: Certificates[] = [];

  constructor(public certificatesService: CertificatesService) {
    console.log(this.certificatesService);
    this.certificatesService.getCertificates().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.certificates = data;
      console.log(this.certificates);
    });
  }
}
