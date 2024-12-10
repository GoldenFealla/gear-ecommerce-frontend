import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

export type Response<T = any> = {
  message: string;
  data: T;
};
