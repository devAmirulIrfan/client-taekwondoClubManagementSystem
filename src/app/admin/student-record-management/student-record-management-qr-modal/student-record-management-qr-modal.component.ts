import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-student-record-management-qr-modal',
  templateUrl: './student-record-management-qr-modal.component.html',
  styleUrls: ['./student-record-management-qr-modal.component.scss']
})
export class StudentRecordManagementQrModalComponent implements OnInit{

  qrCodeData = ""

  constructor(
    public dialogRef: MatDialogRef<StudentRecordManagementQrModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){}
  ngOnInit(): void {
    this.qrCodeData = `${this.data.studentId}`
  }


  

  title = 'html-to-pdf-angular-application';
  public convetToPDF() {
    var data = document.getElementById('test') as HTMLElement;
    html2canvas(data).then(canvas => {
      // Calculate image dimensions and position
      var imgWidth = 100;
      var imgHeight = canvas.height * imgWidth / canvas.width;
  
      // Page dimensions
      var pageWidth = 210; // A4 width in mm
      var pageHeight = 297; // A4 height in mm
  
      // Calculate the position to center horizontally and vertically
      var positionX = (pageWidth - imgWidth) / 2;
      var positionY = (pageHeight - imgHeight) / 2;
  
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      pdf.addImage(contentDataURL, 'PNG', positionX, positionY, imgWidth, imgHeight);
      pdf.save('new-file.pdf'); // Generated PDF
    });
  }

}
