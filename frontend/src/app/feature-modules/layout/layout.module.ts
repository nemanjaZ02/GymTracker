import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../infrastructure/mat/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
	declarations: [
		NavbarComponent
	],
	imports: [
		CommonModule,
		MaterialModule,
		ReactiveFormsModule,
		RouterModule
	],
	exports: [NavbarComponent]
})
export class LayoutModule { }