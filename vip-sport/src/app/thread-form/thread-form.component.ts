import { AfterViewInit, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Subcategory } from 'src/models/Subcategory';
import { SubcategoriesService } from '../services/subcategories.service';

export interface ThreadFormValues {
  title: string;
  subcategory: number;
}

@Component({
  selector: 'thread-form',
  templateUrl: './thread-form.component.html',
  styleUrls: ['./thread-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ThreadFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ThreadFormComponent),
      multi: true
    }
  ]
})
export class ThreadFormComponent implements ControlValueAccessor, OnDestroy, OnInit {
  @Input('subcategory') currentSubcategory: number;
  form: FormGroup;
  subscriptions: Subscription[] = [];
  titleCharacterLimit = 70;
  subcategories: Subcategory[];

  get value(): ThreadFormValues {
    return this.form.value;
  }

  set value(value: ThreadFormValues) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get title() {
    return this.form.controls.title;
  }

  constructor(private formBuilder: FormBuilder, private service: SubcategoriesService) {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(this.titleCharacterLimit)]],
      subcategory: ['', Validators.required]
    });

    this.service.getAll()
      .subscribe((response: Subcategory[]) => this.subcategories = response);

    this.subscriptions.push(
      this.form.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit() {
    this.form.controls['subcategory'].setValue(this.currentSubcategory);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
    if (value)
      this.value = value;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.form.valid ? null : { thread: { valid: false } };
  }

}
