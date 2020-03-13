import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
video:Array<any>=[];
id:Number=0;
file:string;
  constructor(private obj:CrudService,private router:Router) { }

  ngOnInit(): void {
    this.listVideo();
  }
  listVideo(){
    this.obj.listVideo().subscribe((result:any)=>
    {
      this.video=result;
      console.log(result);
    }
    );
   
  }
  toggleStatus(id:number){
    this.obj.toggleStatus(id).subscribe(result=>{
       console.log("hi");
      this.listVideo();
      console.log(result);
    }
    );
  }
  deleteVideo(id: number) {
    this.obj.deleteVideo(id).subscribe(
        data => {
          console.log(data);
          this.listVideo();
        },
        error => console.log(error));
  }

  navigateAdd()
  {
    this.router.navigate(['add']);
  }
}
