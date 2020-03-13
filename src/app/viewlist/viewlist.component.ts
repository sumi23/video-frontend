import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpBackend, HttpResponse } from '@angular/common/http';
import { CrudService } from '../crud.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-viewlist',
  templateUrl: './viewlist.component.html',
  styleUrls: ['./viewlist.component.css']
})
export class ViewlistComponent implements OnInit {
  videos:Array<any>=[];
  id:number=0;
  vid:any;
  url:any;
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
    this.downloadFile(this.file);
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
         console.log(data);
      const filedata=data.body;
     console.log(filedata);
        var blob = new Blob([filedata], { type: 'application/octet-stream' })
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
       
      },
        error => console.log(error));
  }

    back()
    {
       this.router.navigate(['view']);
    }   
}
