import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.forgotForm.valid) {
      this.userService.forgotPassword(this.forgotForm.value.email)
        .subscribe(() => {
          alert('Reset link sent');
        });
    }
  }
}