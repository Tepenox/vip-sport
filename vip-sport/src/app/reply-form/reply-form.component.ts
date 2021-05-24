import { Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


export interface ReplyFormValues {
  postContent: string;
}

@Component({
  selector: 'reply-form',
  templateUrl: './reply-form.component.html',
  styleUrls: ['./reply-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReplyFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ReplyFormComponent),
      multi: true
    }
  ]
})
export class ReplyFormComponent implements ControlValueAccessor, OnDestroy {
  form: FormGroup;
  subscriptions: Subscription[] = [];
  characterLimit = 2000;
  content = '';
  contentLength = this.content.length;

  get value(): ReplyFormValues {
    return this.form.value;
  }

  set value(value: ReplyFormValues) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get postContent() {
    return this.form.controls.postContent;
  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      postContent: ['', [Validators.required, Validators.maxLength(this.characterLimit)]]
    });

    this.subscriptions.push(
      this.form.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
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

    if (value === null)
      this.form.reset();
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.form.valid ? null : { reply: { valid: false } };
  }
}
