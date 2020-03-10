import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl, } from '@angular/forms';
import { CrudService } from '../crud.service';
import { Video } from '../video';
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
  video:Video;
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
      status:[''],
      tags:[],
      description:[],
      levels:[],
      categories:[],
      file: [''],
      referenceArtifacts: this.formbuilder.array([this.formbuilder.group(
        {
          ref_name: '',
          artifact: '',
          description: ''
        }
      )]),
      samplePrograms: this.formbuilder.array([this.formbuilder.group(
        {
          sam_name: '',
          sam_artifact: '',
          sam_description: ''
        }
      )]),
      referenceUrls: this.formbuilder.array([this.formbuilder.group(
        {
          refUrl_name: '',
          refUrl: '',
          refUrl_description: ''
        }
      )])


    });
  }
  
  get referenceArtifacts() {
    return this.videoForm.get('referenceArtifacts') as FormArray;
  }
  addRef() {
    this.referenceArtifacts.push(this.formbuilder.group({
      ref_name: '',
      artifact: '',
      description: ''
    }));
  }
  deleteRef(index: number) {
    this.referenceArtifacts.removeAt(index);
  }

  get samplePrograms() {
    return this.videoForm.get('samplePrograms') as FormArray;
  }
  addSam() {
    this.samplePrograms.push(this.formbuilder.group({
      sam_name: '',
      sam_artifact: '',
      sam_description: ''
    }));
  }
  deleteSam(index: number) {
    this.samplePrograms.removeAt(index);
  }

  get referenceUrls() {
    return this.videoForm.get('referenceUrls') as FormArray;
  }
  addRefUrl() {
    this.referenceUrls.push(this.formbuilder.group({
      refUrl_name: '',
      refUrl: '',
      refUrl_description: ''
    }));
  }
  deleteRefUrl(index: number) {
    this.referenceUrls.removeAt(index);
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
  // addVideo(){
  //   this.video=this.videoForm.value;
  // }

}
