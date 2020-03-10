import { Injectable } from '@angular/core';
import {HttpClient,HttpClientModule} from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Video } from './video';
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private baseUrl ="http://localhost:8080/video";

  constructor(private http:HttpClient) { }

  listVideo(){
    return this.http.get(`${this.baseUrl}/list`);
  }
  deleteVideo(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteById/${id}`).pipe(map((res:any)=>console.log(res)));
  }
  listVideoById(id:number): Observable<any>
  {
    return this.http.get("http://localhost:8080/video/listById/"+id);
  }
  toggleStatus(id:number)
  {
    return this.http.get("http://localhost:8080/video/toggleStatus/"+id);
  }
  viewLevels(){
    return this.http.get(`${this.baseUrl}/listLevels`);
  }
  viewCategories(){
    return this.http.get(`${this.baseUrl}/listCategories`);
  }
  addVideo(video:Video){
    return this.http.post(`${this.baseUrl}/add`,video);
  }
}
