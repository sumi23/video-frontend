import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
video:Array<any>=[];
id:Number=0;
  constructor(private obj:CrudService) { }

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

  deleteVideo(id: number) {
    this.obj.deleteVideo(id).subscribe(
        data => {
          console.log(data);
          this.listVideo();
        },
        error => console.log(error));
  }

}
