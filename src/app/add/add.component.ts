import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl, } from '@angular/forms';
import { CrudService } from '../crud.service';
import { Video } from '../video';
import { Level } from '../level';
//import { RxFormBuilder } from '@rxweb/reactive-form-validators';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  levels:Array<any>;
  categories:Array<any>;
  videoForm: FormGroup;
  level:FormGroup;
  video:Video;
  levels_:Level;
  constructor(private crudservice: CrudService, private formbuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.form();
    this.viewLevels();
    this.viewCategories();
  }
  form() {
    this.videoForm = this.formbuilder.group({
      name: [''],
      displayName: [''],
      url: [''],
      duration:[''],
      tags:[],
      description:[],
      level:this.formbuilder.group({
       id:[]
     }),
      category:this.formbuilder.group({
        id:[]
      }),
      transcript: [''],
      referenceArtifact: this.formbuilder.array([this.formbuilder.group(
        {
          name: [''],
          file: [''],
          description: ['']
        }
      )]),
      sampleProgram: this.formbuilder.array([this.formbuilder.group(
        {
          name: [''],
          file:[''],
          description: ['']
        }
      )]),
      referenceUrl: this.formbuilder.array([this.formbuilder.group(
        {
          name:'',
          url: [''],
          description:['']
        }
      )])


    });
  }
  
  get referenceArtifact() {
    return this.videoForm.get('referenceArtifact') as FormArray;
  }
  addRef() {
    this.referenceArtifact.push(this.formbuilder.group({
      name: '',
      file: '',
      description: ''
    }));
  }
  deleteRef(index: number) {
    this.referenceArtifact.removeAt(index);
  }

  get sampleProgram() {
    return this.videoForm.get('sampleProgram') as FormArray;
  }
  addSam() {
    this.sampleProgram.push(this.formbuilder.group({
      name: '',
      file: '',
      description: ''
    }));
  }
  deleteSam(index: number) {
    this.sampleProgram.removeAt(index);
  }

  get referenceUrl() {
    return this.videoForm.get('referenceUrl') as FormArray;
  }
  addRefUrl() {
    this.referenceUrl.push(this.formbuilder.group({
      name: '',
      url: '',
      description: ''
    }));
  }
  deleteRefUrl(index: number) {
    this.referenceUrl.removeAt(index);
  }


  viewLevels()
  {
    this.crudservice.viewLevels().subscribe((result:any)=>{
      this.levels=result;
      console.log(this.levels);
    });
  }

  viewCategories()
  {
    this.crudservice.viewCategories().subscribe((result:any)=>{
      this.categories=result;
      console.log(this.categories);
    });
  }
  
  save() {
   
    this.video=this.videoForm.value;
    console.log(this.video);
    this.crudservice.addVideo(this.video).subscribe((result:any)=>{
      this.categories=result;
      console.log(this.categories);
    });

  }

  setLevelId(levelId:number){
    this.videoForm.patchValue({level:{id:levelId}});
  }

  setCategoryId(categoryId:number){
    this.videoForm.patchValue({category:{id:categoryId}});
  }

}

