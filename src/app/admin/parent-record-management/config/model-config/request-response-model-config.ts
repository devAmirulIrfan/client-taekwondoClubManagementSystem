export interface responseParentRecord {
    id: number
    email: string
    address: string
    parentName: string
    centerId: number
    contactNo: string
    statusId: number
    centerName: string
    statusName: string
}

export interface responseParentStatus {
    id: number;
    statusName: string;
}

export interface responseParentCenter{
    id: number
    centerName: string
    centerAddress: string
}

export interface requestParentRecordForm {
    parentName: string | null
    centerId: number | null
    contactNo: string | null
    email: string | null
    address: string | null
    statusId: number | null
}


