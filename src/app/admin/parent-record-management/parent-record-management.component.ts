import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin, tap } from 'rxjs';
import { ParentRecordManagementService } from './parent-record-management.service';
import { requestParentRecordForm, responseParentCenter, responseParentRecord, responseParentStatus } from './config/model-config/request-response-model-config';
import {MatDialog} from '@angular/material/dialog';
import { ParentRecordManagementModalComponent } from './parent-record-management-modal/parent-record-management-modal.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-parent-record-management',
  templateUrl: './parent-record-management.component.html',
  styleUrls: ['./parent-record-management.component.scss']
})
export class ParentRecordManagementComponent implements OnInit{

@ViewChild(MatPaginator) paginator!: MatPaginator;

displayedColumns: string[] = ['id','parentName', 'centerName', 'email', 'address',  'contactNo', 'statusName', 'action'];

dataSource: any[] = []

parentNameSearch = ''

rowCount = 0

paginatedParentListData: any = []

  constructor(private service: ParentRecordManagementService, private dialog: MatDialog){}
  ngOnInit(): void {
    this.getData()
  }

  parentList: responseParentRecord[] = []

  centerList!: responseParentCenter[]

  statusList!: responseParentStatus[]



  getData() {
    forkJoin([
      this.service.getAllParent(),
      this.service.getParentCenter(),
      this.service.getParentStatus()
    ]).pipe(
      tap(([parentRecord, centers, statuses]: [responseParentRecord[], responseParentCenter[], responseParentStatus[]]) => {
        this.parentList = parentRecord
        this.centerList = centers
        this.statusList = statuses
        this.rowCount = parentRecord.length
        this.setpaginatedParentListValues(parentRecord)
      }),
    ).subscribe(() => {
      this.dataSource = this.parentList
      console.log('parentList', this.parentList, 'parent center', this.centerList, 'parent statuse', this.statusList)
    });
  }

  setpaginatedParentListValues(value: responseParentRecord[]){
    value.length > 10 ? this.paginatedParentListData = [...value.slice(0,10)] : this.paginatedParentListData = [...value]
  }

  openDialog(action: number, parentId?: number): void {

    const dialogRef = this.dialog.open(ParentRecordManagementModalComponent, ({data: this.processModalData(action, parentId)}))

    dialogRef.afterClosed().subscribe(result => {this.saveDataAfterCloseModal(result)});
  }

  saveDataAfterCloseModal(result: any){
    if(result){
      result.mode === "Add" ? this.addParent(result.formValue) : this.updateParent(result.parentId, result.formValue)
    }
  }

  addParent(parentRecordformData: requestParentRecordForm){
    this.service.addParent(parentRecordformData).pipe(tap({
      next: () => {
        alert('new parent record added')
        this.getData()
      },
      error: (err) => {
        alert(err.error)
      }
    })).subscribe()
  }

  updateParent(parentId: number, parentRecordformData: requestParentRecordForm){
    this.service.updateParent(parentId, parentRecordformData).pipe(tap({
      next: () => {
        alert('parent record updated')
        this.getData()
      },
      error: (err) => {
        alert(err.error)
      }
    })).subscribe()
  }

  processModalData(action: number, parentId?: number): any{

    const addParent = 1, updateParent = 2

    if(action === addParent) return {mode: "Add", centerList: this.centerList, statusList: this.statusList}

    if(action === updateParent) return {mode: "Update", centerList: this.centerList, statusList: this.statusList, parentId: parentId}
    
  }

  filterPrentRecord(): responseParentRecord[]{

    let filteredParentRecord = [...this.parentList]

    //GET PARENTS NAME BASED ON PARENTS NAME KEYWORD
    const searchedParentNameKeywWordAfterWhiteSpaceTrim = this.parentNameSearch.replace(/\s+/g, '')

    searchedParentNameKeywWordAfterWhiteSpaceTrim.length > 0 ? filteredParentRecord = [...this.parentList.filter(parent => parent.parentName.toLocaleLowerCase().includes(this.parentNameSearch))] : null

    return filteredParentRecord
  }

  handlePage(event?: any) {

    let startIndex: number
    let endIndex: number
    let parentRecord: responseParentRecord[]

    const revertToFirstPage = 0

    if(event.pageIndex && event.pageSize){
      startIndex = event.pageIndex * event.pageSize;
      endIndex = startIndex + event.pageSize;
    }
    else{
      this.paginator.pageIndex = revertToFirstPage
      startIndex = 0 ;
      endIndex =  10;
    }

    parentRecord = this.filterPrentRecord()
    this.paginatedParentListData = [...parentRecord.slice(startIndex, endIndex)]
    this.rowCount = parentRecord.length
  }



  }

