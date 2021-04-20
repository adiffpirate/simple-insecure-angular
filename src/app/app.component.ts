import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-angular';
  checkoutForm = this.formBuilder.group({
    user_input: ''
  });

  private form_result: string;

  private unsafe_input: SafeHtml;
  private unsafe_flag: boolean;

  private safe_input: string;
  private safe_flag: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
  ) {}

  onSubmit(): void {
    // Process checkout data here
    console.warn('Input send', this.checkoutForm.value);
    this.form_result = String(Object.values(this.checkoutForm.value)[0]);
    this.checkoutForm.reset();

    this.safe_input = this.form_result;
    this.unsafe_input = this.sanitizer.bypassSecurityTrustHtml(this.form_result)
  }

  setUnsafeFlag(): void {
    this.unsafe_flag = true;
    this.safe_flag = false;
  }

  setSafeFlag(): void {
    this.unsafe_flag = false;
    this.safe_flag = true;
  }

  getResult(): SafeHtml | string {
    if (this.safe_flag){
      return this.safe_input;
    } else {
      return this.unsafe_input;
    }
  }
}
