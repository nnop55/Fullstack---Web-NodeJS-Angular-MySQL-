import { Component, inject } from '@angular/core';
import { GenericTableComponent } from '../../components/generic-table/generic-table.component';
import { ModuleBase } from '../../utils/module-base';
import { CarsService } from './cars.service';
import { CarColumnKey, IDropdown, ITableColumn, SearchModes } from '../../utils/unions';
import { Status } from '../../../shared/utils/unions';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [GenericTableComponent],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.scss'
})
export class CarsComponent extends ModuleBase {

  service: CarsService = inject(CarsService)
  apiService: ApiService = inject(ApiService)

  markDropdown: IDropdown[] = []

  modelDropdown: IDropdown[] = [
    { label: "test", value: 1 },
  ]

  typeDropdown: IDropdown[] = []

  carModelsData: any[] = []

  ngOnInit(): void {
    super.loadTable(
      this.service,
      'getCars'
    )

    this.getCarModels()
  }

  getCarModels() {
    this.isLoading = true
    this.apiService.getCarModels().subscribe({
      next: (response: any) => {
        if (response.code === Status.success) {
          this.markDropdown = response.data.marks
          this.typeDropdown = response.data.types
        }
        this.isLoading = false
      },
      error: (error: any) => this.isLoading = false
    })
  }

  override getColumnSettings(): ITableColumn[] {
    return [
      {
        key: CarColumnKey.Id,
        label: 'id',
        searchable: SearchModes.Input,
        getVal: (value) => { return value }
      },
      {
        key: CarColumnKey.Mark,
        label: 'mark',
        searchable: SearchModes.Dropdown,
        dropdown: this.markDropdown,
        getVal: (value) => { return value }
      },
      {
        key: CarColumnKey.Model,
        label: 'model',
        searchable: SearchModes.Dropdown,
        dropdown: this.modelDropdown,
        getVal: (value) => { return value }
      },
      {
        key: CarColumnKey.Type,
        label: 'type',
        searchable: SearchModes.Dropdown,
        dropdown: this.typeDropdown,
        getVal: (value) => { return value }
      },
      {
        key: CarColumnKey.LicenseNumber,
        label: 'license number',
        searchable: SearchModes.Input,
        getVal: (value) => { return value }
      },
      {
        key: CarColumnKey.ZoneId,
        label: 'zone id',
        searchable: SearchModes.Input,
        getVal: (value) => { return value }
      },
      {
        key: CarColumnKey.UserId,
        label: 'user id',
        searchable: SearchModes.Input,
        getVal: (value) => { return value }
      }
    ]
  }

}
