import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewComponent } from './view/view.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CrudService } from './crud.service';
import { DeleteComponent } from './delete/delete.component';
import { ViewlistComponent } from './viewlist/viewlist.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { AddComponent } from './add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReferenceurlComponent } from './referenceurl/referenceurl.component';
//import {  RxReactiveFormsModule } from "@rxweb/reactive-form-validators"

@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    DeleteComponent,
    ViewlistComponent,
    SafeUrlPipe,
    AddComponent,
    ReferenceurlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    //,RxReactiveFormsModule 
    
  ],
  providers: [HttpClient,HttpClientModule,CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
