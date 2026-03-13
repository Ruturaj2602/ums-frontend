import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route:Router
  ) {}

  ngOnInit(): void {
   this.registerForm = this.fb.group({
  fname: ['', Validators.required],
  lname: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  phno: ['', Validators.required],
  dob: ['', Validators.required],
  gender: ['', Validators.required],
  countryId: ['', Validators.required],
  stateId: ['', Validators.required],
  cityId: ['', Validators.required]
});

    this.loadCountries();
  }


  // LOAD COUNTRIES
 loadCountries() {
  this.userService.getCountries().subscribe({
    next: (res: any) => {
      console.log('Countries API Response:', res);
        this.countries=res.data;
      
      
    },
    error: (err) => {
      console.error('Error loading countries', err);
    }
  });
}


 onCountryChange() {
  const countryId = this.registerForm.get('countryId')?.value;

  this.states = [];
  this.cities = [];

  if (countryId) {
    this.userService.getStates(countryId).subscribe((res: any) => {
      this.states=res.data;
    });
  }
}
  //  WHEN STATE CHANGES
 onStateChange() {
  const stateId = this.registerForm.get('stateId')?.value;

  this.cities = [];

  if (stateId) {
    this.userService.getCities(stateId).subscribe((res: any) => {
     this.cities=res.data;
    });
  }
}
// 
emailValid: boolean = true;
  emailUnique: any
  checkEmail(email: any) {
    console.log(email);
    this.userService.checkEmail(email).subscribe(res => {
      console.log(res)
      if (res == "UNIQUE") {
        this.emailValid = true;
        this.emailUnique = res;
      } else if (res == "DUPLICATE") {
        this.emailValid = false;
        this.emailUnique = res;
      }
    })
  }
  

  //  SUBMIT
//  onSubmit() {
//   if (this.registerForm.valid) {

//     const formValue = {
//       ...this.registerForm.value,
//       phno: Number(this.registerForm.value.phno),
//       countryId: Number(this.registerForm.value.countryId),
//       stateId: Number(this.registerForm.value.stateId),
//       cityId: Number(this.registerForm.value.cityId)
//     };

  //   console.log("Sending Data:", formValue);

  //   this.userService.register(formValue).subscribe({
  //     next: (res) => {
  //       alert('User Registered Successfully');
  //       this.route.navigate(['/unlock']);
        
  //       this.registerForm.reset();
  //     },
  //     error: (err) => {
  //       console.error('Registration Failed', err);
  //       alert('Registration Failed');
  //     }
  //   });
  // }
// if (this.registerForm.valid) {
//     const tempPassword = this.generateTempPassword();

//     const formValue = {
//       ...this.registerForm.value,
//       phno: Number(this.registerForm.value.phno),
//       countryId: Number(this.registerForm.value.countryId),
//       stateId: Number(this.registerForm.value.stateId),
//       cityId: Number(this.registerForm.value.cityId),
//       tempPassword: tempPassword
//     };

//     this.userService.register(formValue).subscribe({
//       next: () => {
//         alert('User Registered Successfully. Check your email for the temporary password.');
//         this.route.navigate(['/unlock']);
//         this.registerForm.reset();
//       },
//       error: (err) => {
//         console.error('Registration Failed', err);
//         alert('Registration Failed');
//       }
//     });
//   }

//  }

onSubmit() {
    if (this.emailValid == true) {
      console.log(this.registerForm.value);
      this.userService.register(this.registerForm.value).subscribe(res => {
        console.log(res);
        alert(res)
        this.route.navigate(['/unlock']);
      })
      }
    }
}