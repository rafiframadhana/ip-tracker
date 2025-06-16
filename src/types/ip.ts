export interface IPInfo {
  ip: string;
  country: string;
  country_code: string;
  region: string;
  region_code: string;
  city: string;
  zip: string;
  latitude: number;
  longitude: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
}

export class IPError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'IPError';
    this.status = status;
  }
}