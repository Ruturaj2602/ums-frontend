export interface User {
  fname: string;
  lname: string;
  email: string;
  phno: number;
  dob: string;
  gender: string;
  countryId: number;
  stateId: number;
  cityId: number;
}

export interface Login {
  email: string;
  pwd: string;
}

export interface Unlock {
  email: string;
  tempPwd: string;
  newPwd: string;
  confirmPwd: string;
}