import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild("userForm",{static:false}) userForm: NgForm;
  default_subscription:string = "advanced";  
  form_email:string="";
  form_subscription:string="";
  form_password:string="";
  submitted = false;
  onSubmit(f){
    console.log(f.value)
    this.submitted = true;
    this.form_email = f.value["email"];
    this.form_subscription = f.value["subscription"];
    this.form_password = f.value["password"];
    console.log(f.value["email"]);
    console.log(f.value["subscription"]);
    console.log(f.value["password"]);
  }


}
