import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PivotViewModule } from '@syncfusion/ej2-angular-pivotview';
import { AppComponent } from './app.component';
import {
  GroupingBarService,
  FieldListService,
  CalculatedFieldService,
  ConditionalFormattingService
} from '@syncfusion/ej2-angular-pivotview';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PivotViewModule
  ],
  providers: [
    GroupingBarService,
    FieldListService,
    CalculatedFieldService,
    ConditionalFormattingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
