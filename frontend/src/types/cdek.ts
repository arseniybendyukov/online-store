export const enum DeliveryType {
  DOOR = 'door',
  OFFICE = 'office',
}

export type Tariff = {
  tariff_code: number;
  tariff_name: string;
  tariff_description: string;
  delivery_mode: number;
  period_min: number;
  period_max: number;
  delivery_sum: number;
}

export type OfficeAddress = {
  city: string;
  postal_code: string;
  country_code: string;
  name: string;
  city_code: number;
  type: string;
  have_cashless: boolean;
  have_cash: boolean;
  allowed_cod: boolean;
  is_dressing_room: boolean;
  code: string;
  address: string;
  work_time: string;
  location: number[];
}

export type DoorAddress = {
  city: string;
  postal_code: string;
  country_code: string;
  name: string;
  position: number[];
  kind: string;
  precision: string;
  formatted: string;
}
