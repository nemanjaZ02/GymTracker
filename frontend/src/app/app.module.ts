import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { JwtInterceptor } from './infrastructure/jwt/jwt.interceptor';
import { AppRoutingModule } from './infrastructure/routing/app-routing.module';
import { AuthModule } from './feature-modules/auth/auth.module';
import { MaterialModule } from './infrastructure/mat/material';
import { LayoutModule } from './feature-modules/layout/layout.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
		AppRoutingModule,
    HttpClientModule,

		AuthModule,
		MaterialModule,
    LayoutModule
],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }