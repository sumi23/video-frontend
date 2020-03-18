import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Level } from '../model/level';
import { Category } from '../model/category';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Video } from '../model/video';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  levels: Array<Level>;
  categories: Array<Category>;
  videoForm: FormGroup;
  level: FormGroup;
  video: Video;
  level1:Level;
  category1:Category;
  vid:any;
  id:number;
  constructor(private route:ActivatedRoute,private crudservice: CrudService, private formbuilder: FormBuilder,private router:Router) { }

  ngOnInit(): void {

    this.vid = this.route
    .queryParams
    .subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
    this.form();
    this.viewLevels();
    this.viewCategories();
    this.listVideoById();
  }

  form() {
    this.videoForm = this.formbuilder.group({
      name: [''],
      displayName: [''],
      url: [''],
      duration: [{value:'',disabled: true}],
      tags: [''],
      active:[''],
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
          description: ['']
        }
      )]),
      sampleProgram: this.formbuilder.array([this.formbuilder.group(
        {
          name: [''],
          file: [''],
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
i:number=0;
//object:any=this.video.referenceArtifact;
 listVideoById(){
  this.crudservice.listVideoById(this.id).subscribe(result=>
  {
    this.video=result;
    console.log(this.video);
    console.log(this.video[0].name); //undefined
    console.log(this.video[0].referenceUrl.length)
    this.videoForm.patchValue({
      name :this.video[0].name,
      displayName:this.video[0].displayName,
      url:this.video[0].url,
      duration:this.video[0].duration,
      tags:this.video[0].tags,
      active:this.video[0].status,
      description:this.video[0].description,
      level: { id: this.video[0].level.id},
      category: { id: this.video[0].category.id},
     
  //     referenceArtifact:[
  //        {
  //          name:this.video[0].referenceArtifact[0].name,
  //          description:this.video[0].referenceArtifact[0].description
  //        }
  //     ],
  //     sampleProgram:[
  //       {
  //         name:this.video[0].sampleProgram[0].name,
  //         description:this.video[0].sampleProgram[0].description
  //       }
  //    ],
  //    referenceUrl:[
  //     {
  //       name:this.video[0].referenceUrl[0].name,
  //       url:this.video[0].referenceUrl[0].url,
  //       description:this.video[0].referenceUrl[0].description
  //     }
  //  ]
    });
    this.patchRefArt();
    this.patchSamProg();
    this.patchRefUrl();
  });
}

filestr:string="C://fakepath//";

patchRefArt() {
  let control = this.videoForm.get('referenceArtifact') as FormArray;
  // Following is also correct
  // let control = <FormArray>this.form.controls['resultList'];

 this.video[0].referenceArtifact.forEach(x=>{
      control.push(this.formbuilder.group({
          name: x.name,
          file:'',
          description: x.description,

      }));
  });
}

patchSamProg() {
  let control = this.videoForm.get('sampleProgram') as FormArray;
  // Following is also correct
  // let control = <FormArray>this.form.controls['resultList'];

 this.video[0].sampleProgram.forEach(x=>{
      control.push(this.formbuilder.group({
          name: x.name,
          file:'',     
          description: x.description,
      }));
  });
}

  patchRefUrl() {
    let control = this.videoForm.get('referenceUrl') as FormArray;
    // Following is also correct
    // let control = <FormArray>this.form.controls['resultList'];
  
   this.video[0].referenceUrl.forEach(x=>{
        control.push(this.formbuilder.group({
            name: x.name,
            url: x.url,
            description: x.description,
  
        }));
    });
  }

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
  deleteRefArt(index: number) {
    this.referenceArtifact.removeAt(index);
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


  viewLevels() {
    this.crudservice.viewLevels().subscribe((result: any) => {
      this.levels = result;
      console.log(this.levels);
    });
  }

  viewCategories() {
    this.crudservice.viewCategories().subscribe((result: any) => {
      this.categories = result;
      console.log(this.categories);
    });
  }

  setLevelId(levelId: number) {
    this.videoForm.patchValue({ level: { id: levelId } });
  }

  setCategoryId(categoryId: number) {
    this.videoForm.patchValue({ category: { id: categoryId } });
  }

  save() {
     
    //this.videoForm.patchValue(this.referenceArtifact[{file:}])
    this.video=this.videoForm.value;
    console.log(this.video);
    this.crudservice.editVideo(this.video).subscribe((result: any) => {
      this.categories = result;
      console.log(this.categories);
    });

  }
  back()
  {
     this.router.navigate(['view']);
  }  
  fileName:string;
  file:string;
  selectedFile=null;
  uploadFile(event)
  {
     this.selectedFile=event.target.files[0];
     this.fileName = this.selectedFile.name;
     console.log('selectedFilesname: ' + this.fileName )
     this.file=this.fileName;
     console.log(this.selectedFile);
     const payload = new FormData();  
     payload.append('file', this.selectedFile);  
    this.crudservice.uploadFile(payload).subscribe((result:any)=>
   {
     console.log(result);
   }
   );
  }

}
