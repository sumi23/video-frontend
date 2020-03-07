import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpBackend } from '@angular/common/http';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-viewlist',
  templateUrl: './viewlist.component.html',
  styleUrls: ['./viewlist.component.css']
})
export class ViewlistComponent implements OnInit {
  videos:Array<any>=[];
  id:number=0;
  vid:any;
  constructor(private route:ActivatedRoute,private router:Router,private obj:CrudService) { }

  ngOnInit(): void {
    this.vid = this.route
    .queryParams
    .subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
    this.listVideoById();
  }

  listVideoById(){
    this.obj.listVideoById(this.id).subscribe((result:any)=>
    {
      this.videos=result;
      console.log(this.videos);
    }
    );
  }

    back()
    {
       this.router.navigate(['view']);
    }   
}
