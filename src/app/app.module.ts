import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component'; // Import TaskComponent

@NgModule({
  declarations: [
    AppComponent,
    ColumnComponent,
    TaskComponent // Declare TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule // Add FormsModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
