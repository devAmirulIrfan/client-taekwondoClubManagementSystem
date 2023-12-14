import { FormControl } from '@angular/forms';

export interface adminLoginForm {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
}