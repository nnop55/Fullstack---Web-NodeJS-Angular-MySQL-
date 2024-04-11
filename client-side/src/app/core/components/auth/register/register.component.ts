import { Component, OnInit, ViewContainerRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { DyComponentsService } from 'src/app/core/services/dy-components.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { DropdownComponent } from 'src/app/shared/components/dropdown/dropdown.component';
import { TextInputComponent } from 'src/app/shared/components/text-input/text-input.component';
import { regex } from 'src/app/shared/utils/regex';
import { RegisterForm, Status } from 'src/app/shared/utils/unions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [ButtonComponent, TextInputComponent, ReactiveFormsModule, DropdownComponent, RouterLink]
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  shared: SharedService = inject(SharedService)
  dyService: DyComponentsService = inject(DyComponentsService)
  auth: AuthService = inject(AuthService)
  vcRef: ViewContainerRef = inject(ViewContainerRef)

  options = [];

  ngOnInit(): void {
    this.initForm()
    this.getUserRoles()
  }

  initForm() {
    this.form = new FormGroup<RegisterForm>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      fullName: new FormControl(null, [Validators.required]),
      role: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.pattern(regex.password)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.pattern(regex.password)])
    })
  };

  getUserRoles() {
    this.shared.getUserRoles().subscribe({
      next: (response) => {
        if (response.code == Status.success) {
          this.options = response['data']
        }
      },
      error: () => { }
    })
  }

  hasError(control: string, pattern: string[] = []) {
    return this.shared.hasError(this.form, control, pattern)
  }

  submitForm(form: FormGroup) {
    console.log(form.value)
    if (form.invalid) {
      this.shared.markAllDirty(form)
      return
    }

    if (form.controls['password'].value !== form.controls['confirmPassword'].value) {
      this.dyService.showMessage(`Password doesn't match!`, this.vcRef, true)
      return
    }

    this.auth.register(
      {
        email: form.value['email'],
        fullName: form.value['fullName'],
        role: form.value['role'],
        password: form.value['password']
      }
    ).subscribe({
      next: (response) => {
        if (response.code == Status.success) {
          this.dyService.showMessage(response.message, this.vcRef)
        }
      },
      error: (error) => {
        this.dyService.showMessage(error.error.error, this.vcRef, true)
      }
    })
  }

}
