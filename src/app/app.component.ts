import { Component, VERSION } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public version = VERSION.full;
  public recaptchaMode = 'v3';
  public reactiveForm: FormGroup = new FormGroup({
    recaptchaReactive: new FormControl(null, Validators.required)
  });
  public log: string[] = [];

  constructor(private recaptchaV3Service: ReCaptchaV3Service) {}

  public executeRecaptchaV3() {
    this.log.push(`Recaptcha v3 execution requested...`);
    this.recaptchaV3Service.execute('myAction').subscribe(
      token => {
        this.addTokenLog('Recaptcha v3 token', token);
      },
      error => {
        this.log.push(`Recaptcha v3 error: see console`);
        console.log(`Recaptcha v3 error:`, error);
      }
    );
  }

  public addTokenLog(message: string, token: string | null) {
    this.log.push(`${message}: ${this.formatToken(token)}`);
  }

  public formatToken(token: string | null) {
    return token !== null
      ? `${token.substr(0, 7)}...${token.substr(-7)}`
      : 'null';
  }

  public printLog() {
    return this.log
      .map((logEntry, index) => `${index + 1}. ${logEntry}`)
      .join('\n');
  }
}
