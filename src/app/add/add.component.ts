import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder,  } from '@angular/forms';
import { CrudService } from '../crud.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  videoform:FormGroup;
  constructor(private crudservice:CrudService,private formbuilder:FormBuilder) { 
    
  }

  ngOnInit(): void {
    this.form();
  }

  form()
  {
    this.videoform=this.formbuilder.group({
      name:[''],
      displayName:[''],
      url:[''],
      file:['']
      
    });
     
  }

  save()
  {
    console.log(this.videoform.value);
  }



}
