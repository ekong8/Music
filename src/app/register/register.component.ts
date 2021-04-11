import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { RegisterUser } from './../RegisterUser';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerUser: RegisterUser = {
    userName: '',
    password: '',
    password2: '',
  };

  public warning: string;
  public success: boolean = false;
  public loading: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void {
    if (
      this.registerUser.userName !== ''
    ) {
      this.loading = true;
      this.auth.register(this.registerUser).subscribe(() => {
          this.success = true;
          this.warning = null;
          this.loading = false;
        },
        (err) => {
          this.success = false;
          this.warning = err.error.message;
          this.loading = false;
        }
      );
    }
  }

}
