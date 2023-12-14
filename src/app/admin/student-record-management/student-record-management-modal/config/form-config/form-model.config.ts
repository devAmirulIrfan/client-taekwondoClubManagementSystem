import { FormControl } from '@angular/forms';

export interface studentRecordFormModel {
  studentName: FormControl<string | null>;
  birthDate: FormControl<string | null>;
  gradeId: FormControl<number | null>;
  parentName: FormControl<string | null>;
  statusId: FormControl<number | null>;
}