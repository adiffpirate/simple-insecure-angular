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

  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
  ) {}

  onSubmit(): void {
    // Process checkout data here
    console.warn('Input send', this.checkoutForm.value);
    this.form_result = String(Object.values(this.checkoutForm.value)[0]);
    this.checkoutForm.reset();
  }

  getUnsafeResult(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.form_result);
  }

  getSafeResult(): string {
    return this.form_result;
  }
}
