import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  projectForm: FormGroup;
  submitted:boolean=false;
  forbiddenProjects:string[] = ["Test"];
  ngOnInit(){
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null,[Validators.required],this.forbiddenProjectsValidationAsync),
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'status': new FormControl(null),
    });
  }
  forbiddenProjectsValidation(formControl:FormControl):{[s:string]:boolean}{
    console.log("lala"+this.forbiddenProjects.indexOf(formControl.value));
    if(this.forbiddenProjects.indexOf(formControl.value)!==-1){
      console.log("Forbidden");
      return {'forbiddenProjectName':true}
    }
    return null;
  }
  forbiddenProjectsValidationAsync(control:FormControl):Promise<any>|Observable<any>{
    const promise =  new Promise<any>((resolve,reject)=>{
      setTimeout(()=>{
        console.log("forb"+control.value);
          if(control.value==="Test"){
            console.log("forbidden");
            resolve({'forbiddenProjectName':true});
          }
          else{
            resolve(null);
          }
      },150);
    });
    return promise;
  }

  forbiddenEmails(control: FormControl): Promise <any> | Observable<any>{
    const promise = new Promise<any>((resolve,reject)=>{
      setTimeout(()=>{
        if(control.value==='test@test.com'){
          resolve({'emailIsForbidden':true});
        }
        else{
          resolve(null);
        }
      },1500);
    });
    return promise;
  }
  onSubmit(){
    this.submitted= true;
    console.log(this.projectForm);
    console.log(this.projectForm.controls['projectName'].valid)
    //console.log("asd"+this.forbiddenProjects.indexOf(this.projectForm['projectName'].value));
  }

}
