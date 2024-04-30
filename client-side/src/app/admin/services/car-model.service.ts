import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CarModelRes, IApi } from '../../shared/utils/unions';
import { Observable, Subject, map } from 'rxjs';
import { IDropdown } from '../utils/unions';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CarModelService {

  private baseUrl: string = environment.baseUrl;

  private dropdown: Subject<IDropdown[]> = new Subject<IDropdown[]>()
  dropdown$ = this.dropdown.asObservable()

  modelsByMark: any = new Object();

  constructor(private http: HttpClient) { }

  getCarModels(): Observable<IApi<CarModelRes>> {
    return this.http.get<IApi<CarModelRes>>(`${this.baseUrl}car/models/all`)
      .pipe(map(res => {
        this.modelsByMark = res.data.models
        return res
      }));
  }

  fillModelDropdown(mark: string) {
    let data: IDropdown[] = []

    if (Object.keys(this.modelsByMark).length > 0) {
      for (const item of this.modelsByMark[mark]) {
        data.push({ label: item, value: item })
      }

      this.dropdown.next(data)

    }

  }
}
