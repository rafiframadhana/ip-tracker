import { IPInfo, IPError } from '../types/ip';

const IP_API_BASE = 'http://ip-api.com/json';
const FALLBACK_API = 'https://ipapi.co';

export async function getCurrentIP(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    if (!response.ok) {
      throw new Error('Failed to get current IP');
    }
    const data = await response.json();
    return data.ip;
  } catch (error) {
    throw new Error('Unable to detect your IP address');
  }
}

export async function getIPInfo(ip: string): Promise<IPInfo> {
  try {
    // First try with ip-api.com (free, no key required)
    const response = await fetch(`${IP_API_BASE}/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`);
    
    if (!response.ok) {
      throw new IPError('Network error occurred', response.status);
    }
    
    const data = await response.json();
    
    if (data.status === 'fail') {
      throw new IPError(data.message || 'Invalid IP address');
    }
    
    return {
      ip: data.query,
      country: data.country,
      country_code: data.countryCode,
      region: data.regionName,
      region_code: data.region,
      city: data.city,
      zip: data.zip,
      latitude: data.lat,
      longitude: data.lon,
      timezone: data.timezone,
      isp: data.isp,
      org: data.org,
      as: data.as
    };
  } catch (error) {
    if (error instanceof IPError) {
      throw error;
    }
    
    // Fallback to ipapi.co
    try {
      const fallbackResponse = await fetch(`${FALLBACK_API}/${ip}/json/`);
      if (!fallbackResponse.ok) {
        throw new Error('Failed to get IP information');
      }
      
      const fallbackData = await fallbackResponse.json();
      
      if (fallbackData.error) {
        throw new IPError('Invalid IP address or service unavailable');
      }
      
      return {
        ip: fallbackData.ip,
        country: fallbackData.country_name,
        country_code: fallbackData.country_code,
        region: fallbackData.region,
        region_code: fallbackData.region_code,
        city: fallbackData.city,
        zip: fallbackData.postal,
        latitude: fallbackData.latitude,
        longitude: fallbackData.longitude,
        timezone: fallbackData.timezone,
        isp: fallbackData.org,
        org: fallbackData.org,
        as: fallbackData.asn
      };
    } catch (fallbackError) {
      throw new IPError('Unable to retrieve IP information. Please check the IP address and try again.');
    }
  }
}

export function isValidIP(ip: string): boolean {
  // IPv4 validation
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  
  // IPv6 validation (comprehensive)
  const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
  
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

export function getIPVersion(ip: string): 'IPv4' | 'IPv6' | 'Invalid' {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  
  if (ipv4Regex.test(ip)) {
    return 'IPv4';
  } else if (isValidIP(ip)) {
    return 'IPv6';
  } else {
    return 'Invalid';
  }
}