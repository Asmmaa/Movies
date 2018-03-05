import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { UserViewComponent } from './user-view/user-view.component';
import { MovieViewComponent } from './movie-view/movie-view.component';
import {DataService} from "./dataservice.service";


@NgModule({
  declarations: [
    AppComponent,
    UserViewComponent,
    MovieViewComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
