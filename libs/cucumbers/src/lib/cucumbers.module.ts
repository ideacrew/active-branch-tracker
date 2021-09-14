import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VisualizeReportComponent } from './visualize-report/visualize-report.component';
import { CucumberFeatureComponent } from './cucumber-feature/cucumber-feature.component';
import { CucumberElementComponent } from './cucumber-element/cucumber-element.component';
import { NanosecondsToSecondsPipe } from './pipes/nanoseconds-to-seconds.pipe';
import { ConvertNanosecondsPipe } from './pipes/convert-nanoseconds.pipe';
import { CucumberBaseStepComponent } from './cucumber-base-step/cucumber-base-step.component';
import { ElementStepComponent } from './element-step/element-step.component';
import { ElementRuntimePipe } from './pipes/element-runtime.pipe';
import { FeatureRuntimePipe } from './pipes/feature-runtime.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: VisualizeReportComponent },
    ]),
  ],
  declarations: [
    VisualizeReportComponent,
    CucumberFeatureComponent,
    CucumberElementComponent,
    NanosecondsToSecondsPipe,
    ConvertNanosecondsPipe,
    CucumberBaseStepComponent,
    ElementStepComponent,
    ElementRuntimePipe,
    FeatureRuntimePipe,
  ],
})
export class CucumbersModule {}
