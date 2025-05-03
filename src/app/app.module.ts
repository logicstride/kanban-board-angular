import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop'; // Import DragDropModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColumnComponent } from './components/column/column.component';

@NgModule({
  declarations: [
    AppComponent,
    ColumnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule // Add DragDropModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
