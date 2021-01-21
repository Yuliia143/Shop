import { FormControl } from '@angular/forms';

export class CustomValidators {
    static minNumberOfDigits(control: FormControl): { [key: string]: boolean } {
        if (control.value.length) {
            if (isNaN(control.value) || control.value.length < 5) {
                return {
                    minNumberOfDigits: true
                };
            }
        }
        return null;
    }
}
