import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  standalone: true,
  selector: 'app-unlock',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './unlock.html',
  styleUrls: ['./unlock.css']
})
export class UnlockComponent implements OnInit {

  unlockForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const emailFromUrl = this.route.snapshot.queryParamMap.get('email');

    this.unlockForm = this.fb.group({
      email: [emailFromUrl || '', Validators.required],
      tempPwd: ['', Validators.required],
      newPwd: ['', Validators.required],
      confirmPwd: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.unlockForm.valid) {

      const formValue = this.unlockForm.value;

      if (formValue.newPwd !== formValue.confirmPwd) {
        alert("Passwords do not match");
        return;
      }

      this.userService.unlock(formValue).subscribe({
        next: (res) => {
          alert(res);
        },
        error: (err) => {
          console.error("Unlock Failed", err);
          alert("Unlock Failed");
        }
      });
    }
  }
}