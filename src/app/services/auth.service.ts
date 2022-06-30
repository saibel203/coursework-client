import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private fb: FormBuilder) { }

    readonly BaseLocalhostURL = 'https://localhost:7269/api';

    formRegisterModel = this.fb.group({
        UserName: ['', Validators.required],
        Email: ['', [Validators.required, Validators.email]],
        Passwords: this.fb.group({
            Password: ['', [Validators.required, Validators.minLength(6)]],
            ConfirmPassword: ['', Validators.required]
        }, { validators: [this.comparePasswords, this.digitAndSymbolInPassword] }),
    });

    editProfileModel = this.fb.group({
        Name: [''],
        LastName: [''],
        Description: [''],
        ImagePath: ['']
    });

    comparePasswords(fb: FormGroup) {
        let confirmPswd = fb.get('ConfirmPassword');
        if (confirmPswd?.errors == null || 'passwordMismatch' in confirmPswd?.errors) {
            if (fb.get('Password')?.value != confirmPswd?.value)
                confirmPswd?.setErrors({ passwordMismatch: true });
            else
                confirmPswd?.setErrors(null);
        }
    }
    digitAndSymbolInPassword(fb: FormGroup) {
        let password = fb.get('Password');
        let reDigit = /\d/;
        let reSymbol = /[a-zA-Z]/;
        if (password?.errors == null || 'passwordDigitOrSymbolError' in password?.errors) {
            if (fb.get('Password')?.value.search(reDigit) == -1 || fb.get('Password')?.value.search(reSymbol) == -1)
                password?.setErrors({ passwordDigitOrSymbolError: true });
            else
                password?.setErrors(null);
        }
    }

    // Http requests

    register() {
        let body = {
            UserName: this.formRegisterModel.value.UserName,
            Email: this.formRegisterModel.value.Email,
            Password: this.formRegisterModel.value.Passwords.Password,
        };

        return this.http.post(this.BaseLocalhostURL + '/User/Register', body);
    }

    login(formData: any) {
        return this.http.post(this.BaseLocalhostURL + '/User/Login', formData);
    }

    getUserProfile() {
        return this.http.get(this.BaseLocalhostURL + '/UserProfile');
    }

    getUserImage() {
        return this.http.get(this.BaseLocalhostURL + '/UserProfile/GetImage');
    }

    changeProfileData() {
        let body: any[] = [
            {
                'op': 'replace',
                'path': '/Name',
                'value': this.editProfileModel.value.Name
            },
            {
                'op': 'replace',
                'path': '/LastName',
                'value': this.editProfileModel.value.LastName
            },
            {
                'op': 'replace',
                'path': '/Description',
                'value': this.editProfileModel.value.Description
            },
            {
                'op': 'replace',
                'path': '/ImagePath',
                'value': this.editProfileModel.value.ImagePath
            }
        ];
        return this.http.patch(this.BaseLocalhostURL + '/UserProfile/Edit', body);
    }
}
