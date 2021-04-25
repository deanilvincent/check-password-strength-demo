import { Component, OnInit } from '@angular/core';
import { passwordStrength } from 'check-password-strength'

// model
export class PasswordStrength {
  id: number;
  value: string;
  length: number;
  contains: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  passwordStrengthValue: PasswordStrength = {
    id: 0,
    value: "",
    length: 0,
    contains: "[]"
  }
  isShowPassword: Boolean = false

  constructor() { }

  ngOnInit(): void {
    this.badgeConditions()
    // this.isSmallWidth = window.innerWidth <= 1410 ? true : false
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   this.isSmallWidth = event.target.innerWidth <= 1410 ? true : false
  // }

  passwordType(e) {
    const password = e.target.value
    if (password) {
      const strength = passwordStrength(password)
      this.passwordStrengthValue.id = strength.id
      this.passwordStrengthValue.value = strength.value
      this.passwordStrengthValue.length = strength.length
      this.passwordStrengthValue.contains = JSON.stringify(strength.contains)
    } else {
      this.passwordStrengthValue = {
        id: 0,
        value: "",
        length: 0,
        contains: "[]"
      }
    }
    this.badgeConditions()
  }

  pressCheckbox(e) {
    this.isShowPassword = e.target.checked
  }

  badgeConditions() {
    if (!this.passwordStrengthValue.id) {
      return "badge"
    }
    if (this.passwordStrengthValue.value === "Too weak") {
      return "badge light"
    }
    if (this.passwordStrengthValue.value === "Weak") {
      return "badge weak"
    }
    if (this.passwordStrengthValue.value === "Medium") {
      return "badge medium"
    }
    if (this.passwordStrengthValue.value === "Strong") {
      return "badge strong"
    }
  }
}
