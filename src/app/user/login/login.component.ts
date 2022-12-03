import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  }

  showAlert = false;
  alertMsg = 'Please wait. Your credentials are being verified.';
  alertColor = 'blue';
  inSubmission = false;

  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  async login() {
    this.showAlert = true;
    this.alertMsg = 'Please wait. Your credentials are being verified.';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email, this.credentials.password
      )
    } catch (e) {
      
      this.inSubmission = false;
      this.alertMsg = 'Invalid email/password';
      this.alertColor = 'red';

      console.error(e);
      
      return
    }

    this.alertMsg = 'Your login has been successful!';
    this.alertColor = 'green';
  }
}
