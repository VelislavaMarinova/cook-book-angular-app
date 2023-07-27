import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component'
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { RecipeModule } from './recipe/recipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppInterceptor } from './app.interceptor';

@NgModule({
  declarations: [
    AppComponent,
   
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    SharedModule,
    UserModule,
    RecipeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
