import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Level } from '../model/level';
import { Category } from '../model/category';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Video } from '../model/video';
import { CrudService } from '../crud.service';
import { FileNamePipe } from '../file-name.pipe';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  levels: Array<Level>;
  categories: Array<Category>;
  videoForm: FormGroup;
  videoobj:Array<Video>
  video: Video;
  vid:any;
  id:number;
  updateSuccessMessageFlag:boolean;
  submitted = false;
  fileName:string;
  file:string;
  selectedFile=null;
  uploadVideo:Video;
  constructor(private route:ActivatedRoute,private crudservice: CrudService, private formbuilder: FormBuilder,private router:Router,private filepipe:FileNamePipe) { }

  ngOnInit(): void {

    this.vid = this.route
    .queryParams
    .subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
    this.initializeForm();
    this.listVideoById();
    this.viewLevels();
    this.viewCategories();
    
  }

  initializeForm() {
    this.videoForm = this.formbuilder.group({
      name: ['',[Validators.required]],
      displayName: ['',[Validators.required]],
      url: ['',[Validators.required]],
      duration: [''],
      tags: ['',[Validators.required]],
      status:[''],
      description: [''],
      level: this.formbuilder.group({
        id: ['']
      }),
      category: this.formbuilder.group({
        id: ['']
      }),
      transcript: [''],
      referenceArtifact: this.formbuilder.array([this.formbuilder.group(
        {
          name: [''],
          file: [''],
          filename:[''],
          description: ['']
        }
      )]),
      sampleProgram: this.formbuilder.array([this.formbuilder.group(
        {
          name: [''],
          file: [''],
          filename:[''],
          description: ['']
        }
      )]),
      referenceUrl: this.formbuilder.array([this.formbuilder.group(
        {
          name:[''],
          url: [''],
          description: ['']
        }
      )])
    });
  }

get videoControls(){
  return this.videoForm.controls;
}


 listVideoById(){
  this.crudservice.listVideoById(this.id).subscribe(result=>
  {
    this.videoobj=new Array(result.data);
    this.video=result.data;
    console.log("by id"+this.video);
    this.patchFormValue();
  });
}


viewLevels() {
  this.crudservice.viewLevels().subscribe((result: any) => {
    this.levels = result.data;
    console.log(this.levels);
  });
}

viewCategories() {
  this.crudservice.viewCategories().subscribe((result: any) => {
    this.categories = result.data;
    console.log(this.categories);
  });
}

patchFormValue(){
console.log("videoooo objjj"+this.video)

  this.videoForm.patchValue({
    name :this.video.name,
    displayName:this.video.displayName,
    url:this.video.url,
    duration:this.video.duration,
    tags:this.video.tags,
    status:this.video.status,
    description:this.video.description,
    level: { id: this.video.level.id},
    category: { id: this.video.category.id}
  });
  this.patchRefArt();
  this.patchSamProg();
  this.patchRefUrl();
}

patchRefArt() {
  this.deleteRefArt(0);
  let control = this.videoForm.get('referenceArtifact') as FormArray;
  this.video.referenceArtifact.forEach(x=>{
      control.push(this.formbuilder.group({
          name: x.name,
          file:'',
          filename:this.filepipe.transform(x.file), 
          description: x.description,

      }));
  });
  console.log("patch ref art 2")
}
patchSamProg() {
  this.deleteSamProg(0);
  let control = this.videoForm.get('sampleProgram') as FormArray;
  this.video.sampleProgram.forEach(x=>{
      control.push(this.formbuilder.group({
          name: x.name,
          file:'', 
          filename:this.filepipe.transform(x.file),    
          description: x.description,
      }));
  });
}

  patchRefUrl() {
    this.deleteRefUrl(0);
    console.log("patch ref url")
    let control = this.videoForm.get('referenceUrl') as FormArray;
    this.video.referenceUrl.forEach(x=>{
        control.push(this.formbuilder.group({
            name: x.name,
            url: x.url,
            description: x.description,
  
        }));
    });
    
   
  }
  result:boolean;
  deleteRefArtById(id: number) {
   this.result=confirm("Are you sure want to delete this video content?");
   if(this.result==true){
  this.crudservice.deleteReferenceArtifactById(id).subscribe(
        data => {
          console.log(data);
          this.patchFormValue();
        },
        error => console.log(error));
  }

}

  deleteSamProgById(id: number) {
    this.result=confirm("Are you sure want to delete this video content?");
   if(this.result==true){
    this.crudservice.deleteSampleProgramById(id).subscribe(
        data => {
          console.log(data);
          this.patchFormValue();
        },
        error => console.log(error));
  }}

  deleteRefUrlById(id: number) {
    this.result=confirm("Are you sure want to delete this video content?");
   if(this.result==true){
     this.deleteRefUrl;
    this.crudservice.deleteReferenceUrlById(id).subscribe(
        data => {
          console.log(data);
          this.patchFormValue();
        },
        error => console.log(error));
  }}


  get referenceArtifact() {
    return this.videoForm.get('referenceArtifact') as FormArray;
  }
  
  addRefArt() {
    this.referenceArtifact.push(this.formbuilder.group({
      name: '',
      file: '',
      description: ''
    }));
  }
  
  deleteRefArt(refArtIndex: number) {
    this.referenceArtifact.removeAt(refArtIndex);
  }

  get sampleProgram() {
    return this.videoForm.get('sampleProgram') as FormArray;
  }
  
  addSamProg() {
    this.sampleProgram.push(this.formbuilder.group({
      name: '',
      file: '',
      description: ''
    }));
  }
  
  deleteSamProg(samProgindex: number) {
    this.sampleProgram.removeAt(samProgindex);
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
  deleteRefUrl(refUrlindex: number) {
    this.referenceUrl.removeAt(refUrlindex);
  }

  setLevelId(levelId: number) {
    this.videoForm.patchValue({ level: { id: levelId } });
  }

  setCategoryId(categoryId: number) {
    this.videoForm.patchValue({ category: { id: categoryId } });
  }

  
  uploadFile(event)
  {
     this.selectedFile=event.target.files[0];
     this.fileName = this.selectedFile.name;
     console.log('selectedFilesname: ' + this.fileName )
     console.log(this.selectedFile);
     const payload = new FormData();  
     payload.append('file', this.selectedFile);  
    this.crudservice.uploadFile(payload).subscribe((result:any)=>
    {
     console.log(result);
    }
   );
  }

  save() {
    this.submitted = true;
    if(this.videoForm.invalid){
      return;
    }
    this.uploadVideo=this.videoForm.value;
    this.uploadVideo.id=this.video.id;
    this.uploadVideo.createdOn=this.video.createdOn;
    this.uploadVideo.createdBy=this.video.createdBy;
    const refArtlen=this.video.referenceArtifact.length;
    for(let i=0;i< refArtlen;i++){
      this.uploadVideo.referenceArtifact[i].id=this.video.referenceArtifact[i].id;
      this.uploadVideo.referenceArtifact[i].file=this.filepipe.transform(this.video.referenceArtifact[i].file);
    } 
    const samProglen=this.video.sampleProgram.length;
    for(let i=0;i< samProglen;i++){
      this.uploadVideo.sampleProgram[i].id=this.video.sampleProgram[i].id;
      this.uploadVideo.sampleProgram[i].file=this.filepipe.transform(this.video.sampleProgram[i].file);
    }
    const refUrllen=this.video.referenceUrl.length;
    for(let i=0;i< refUrllen;i++){
      this.uploadVideo.referenceUrl[i].id=this.video.referenceUrl[i].id;
    }
    console.log(this.uploadVideo);
    this.crudservice.editVideo(this.uploadVideo).subscribe((result: any) => {
      this.video =result;
      console.log(this.video);
      this.updateSuccessMessageFlag=true;
    });

  }
  back()
  {
     this.router.navigate(['view']);
  }  
  

}
