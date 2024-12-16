import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReusableButtonComponent } from './../../buttons/reusable-button/reusable-button.component';
import { MatCardModule } from '@angular/material/card';
import { SelectDropdownComponent } from './../../inputs/select-dropdown/select-dropdown.component';
import { InputFieldComponent } from './../../inputs/text-input/input-field.component';
import { BOOKS_DIALOG_CANCEL_LABEL, BOOKS_DIALOG_CATEGORY, BOOKS_DIALOG_CREATE_LABEL, BOOKS_DIALOG_QUANTITY, BOOKS_DIALOG_TITLE, BOOKS_DIALOG_TITLE_FIELD, CRIME_LABEL, IT_LABEL, MYSTERY_LABEL, ROMANCE_LABEL, SCIENCES_LABEL } from '../../../utils/titles-and-labels';

@Component({
  selector: 'app-create-book-dialog',
  standalone: true,
  imports: [ ReusableButtonComponent, MatCardModule, ReactiveFormsModule, SelectDropdownComponent, InputFieldComponent ],
  templateUrl: './create-book-dialog.component.html',
  styleUrl: './create-book-dialog.component.css'
})
export class CreateBookDialogComponent implements OnInit {

  createBookForm!: FormGroup;
  TITLE = BOOKS_DIALOG_TITLE;
  TITLE_FIELD = BOOKS_DIALOG_TITLE_FIELD;
  CATEGORY = BOOKS_DIALOG_CATEGORY;
  QUANTITY = BOOKS_DIALOG_QUANTITY;
  CREATE_LABEL = BOOKS_DIALOG_CREATE_LABEL;
  CANCEL_LABEL = BOOKS_DIALOG_CANCEL_LABEL;
  list: any[] = [ { code: 'IT', label: IT_LABEL }, { code: 'SC', label: SCIENCES_LABEL }, { code: 'MT', label: MYSTERY_LABEL },
                  { code: 'CR', label: CRIME_LABEL }, { code: 'RO', label: ROMANCE_LABEL } ];

  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<CreateBookDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.initCreateBookForm();
  }

  private initCreateBookForm = () => {
    this.createBookForm = this.fb.group({
      title: [ null, [ Validators.required, Validators.minLength(2), Validators.maxLength(50) ]],
      category: [ null, [ Validators.required, Validators.minLength(2) ]],
      quantity: [ null, [ Validators.required, Validators.min(0), Validators.max(10) ]]
    });
  }

  get formControls() {
    const formControls = {};
    return { ...formControls, 
              title: this.createBookForm.get('title') as FormControl,
              category: this.createBookForm.get('category') as FormControl,
              quantity: this.createBookForm.get('quantity') as FormControl,
           };
  }

  onCreateBook = () => {
    if (this.createBookForm.invalid) {
      this.createBookForm.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.createBookForm.value);
  };

  onCancel = () => this.dialogRef.close('ok')

}
