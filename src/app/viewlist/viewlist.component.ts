import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpBackend, HttpResponse } from '@angular/common/http';
import { CrudService } from '../crud.service';
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import * as FileSaver from "file-saver";

@Component({
  selector: 'app-viewlist',
  templateUrl: './viewlist.component.html',
  styleUrls: ['./viewlist.component.css']
})
export class ViewlistComponent implements OnInit {
  videos:Array<any>=[];
  id:number=0;
  vid:any;
  url;
  file:string;
  constructor(private route:ActivatedRoute,private router:Router,private obj:CrudService,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.vid = this.route
    .queryParams
    .subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
    this.listVideoById();
    const encodedData = window.btoa('Hello, world'); // encode a string
const decodedData = window.atob(encodedData);
console.log(decodedData);
  }

  listVideoById(){
    this.obj.listVideoById(this.id).subscribe((result:any)=>
    {
      this.videos=result;
      console.log(this.videos);
    }
    );
  }
  downloadFile(file) {
    this.obj.fileDw(file).subscribe(
        (data) => {
         //console.log(data);
        const FILE_DATA=data.body;
       //console.log(filedata);
        const DECODED_FILE_DATA=window.atob(FILE_DATA);
        const blob = new Blob([DECODED_FILE_DATA], { type:'application/octet-stream' })
       // this.url = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        FileSaver.saveAs(blob, file);   
      });
  }

    back()
    {
       this.router.navigate(['view']);
    }   
}
