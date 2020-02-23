import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LzwtComponent } from './lzwt/lzwt.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LzwdComponent } from './lzwd/lzwd.component';
import { LzwcComponent } from './lzwc/lzwc.component';

@NgModule({
  declarations: [
    AppComponent,
    LzwtComponent,
    LzwdComponent,
    LzwcComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatCheckboxModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
