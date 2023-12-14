import { FormControl } from '@angular/forms';

export interface parentRecordFormModel {
  parentName: FormControl<string | null>;
  centerId: FormControl<number | null>;
  dialCode: FormControl<string | null>;
  contactNo: FormControl<string | null>;
  address: FormControl<string | null>;
  email: FormControl<string | null>;
  statusId: FormControl<number | null>;
}