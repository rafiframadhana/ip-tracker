import React from 'react';
import { MapPin, Globe, Clock, Wifi, Building, Hash, Shield, AlertCircle } from 'lucide-react';
import { IPInfo } from '../types/ip';
import { getIPVersion } from '../services/ipService';
import IPMap from './IPMap';

interface IPCardProps {
  ipInfo: IPInfo;
}

const IPCard: React.FC<IPCardProps> = ({ ipInfo }) => {
  const ipVersion = getIPVersion(ipInfo.ip);
  const isIPv4 = ipVersion === 'IPv4';
  
  const infoItems = [
    { icon: MapPin, label: 'Location', value: `${ipInfo.city}, ${ipInfo.region}, ${ipInfo.country}` },
    { icon: Hash, label: 'ZIP Code', value: ipInfo.zip || 'N/A' },
    { icon: Globe, label: 'Country Code', value: ipInfo.country_code },
    { icon: Clock, label: 'Timezone', value: ipInfo.timezone },
    { icon: Wifi, label: 'ISP', value: ipInfo.isp },
    { icon: Building, label: 'Organization', value: ipInfo.org },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">IP Address Details</h2>
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="text-2xl font-mono text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">
            {ipInfo.ip}
          </div>
          <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
            ipVersion === 'IPv4' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-purple-100 text-purple-700'
          }`}>
            <Shield className="w-4 h-4" />
            <span>{ipVersion}</span>
          </div>
        </div>
        
        {/* IPv6 Status for IPv4 addresses */}
        {isIPv4 && (
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-lg inline-flex">
            <AlertCircle className="w-4 h-4" />
            <span>IPv6 not detected</span>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Location Information</h3>
          {infoItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <item.icon className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm text-gray-600">{item.label}</div>
                <div className="font-medium text-gray-800">{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Map Location</h3>
          <IPMap
            latitude={ipInfo.latitude}
            longitude={ipInfo.longitude}
            city={ipInfo.city}
            country={ipInfo.country}
            ip={ipInfo.ip}
          />
        </div>
      </div>

      {ipInfo.as && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2">Network Information</h4>
          <p className="text-sm text-gray-600">{ipInfo.as}</p>
        </div>
      )}
    </div>
  );
};

export default IPCard;