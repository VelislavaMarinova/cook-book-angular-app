import { Component } from '@angular/core';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  apiError$ = this.errorService.apiError$$.asObservable();
  errorMsg = '';

  constructor(private errorService: ErrorService) {}

  ngOnInit(): void {
    if(this.apiError$){
      this.apiError$.subscribe((err: any) => {
        this.errorMsg = err.message;
      });
    }else{
      this.errorMsg='Unknown Error'
    }
  }
}
