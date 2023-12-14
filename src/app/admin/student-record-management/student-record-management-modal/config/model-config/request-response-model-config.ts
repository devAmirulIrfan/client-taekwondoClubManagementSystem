export interface responseStudentGrade {
    checked: boolean;
    id: number;
    gradeName: string;
    color: string
}

export interface responseStudentParent {
    id: number;
    parentName: string;
    contactNo: string;
    statusId: number;
}

export interface responseStudentStatus {
    id: number;
    statusName: string;
}


export interface requestStudentRecordForm {
    studentName: string | null
    birthDate: string | null
    gradeId: number | null
    parentId: number | null
    statusId: number | null
  }

  export interface responseStudentRecord {
        id: number;
        studentName: string;
        birthDate: string | null;
        centerId: number | null
        centerName: string;
        gradeId: number;
        gradeName: string;
        parentName: string;
        contactNo: string;
        statusName: string;
        statusId: number
  }

  export interface responseStudentCenter{
    id: number
    centerName: string
    centerAddress: string
    checked: boolean
    color: boolean
}