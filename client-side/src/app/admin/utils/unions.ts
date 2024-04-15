export enum ParkingZoneColumnKey {
    Id = 'id',
    Name = 'name',
    Price = 'price',
    Address = 'address',
    Available = 'available',
    CarId = 'car_id'
}

export interface TableColumn {
    key?: string;
    label?: string;
    isInput?: boolean;
    isDropdown?: boolean;
}