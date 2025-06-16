import React, { useState } from "react";
import { Search, MapPin, Wifi, ExternalLink } from "lucide-react";
import { IPInfo, IPError } from "./types/ip";
import { getCurrentIP, getIPInfo, isValidIP } from "./services/ipService";
import IPCard from "./components/IPCard";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import LocalIPGuide from "./components/LocalIPGuide";

function App() {
  const [ipInput, setIpInput] = useState("");
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDetectMyIP = async () => {
    setLoading(true);
    setError(null);
    setIpInfo(null);

    try {
      const currentIP = await getCurrentIP();
      const info = await getIPInfo(currentIP);
      setIpInfo(info);
      setIpInput(currentIP);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to detect your IP address"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTrackIP = async () => {
    if (!ipInput.trim()) {
      setError("Please enter an IP address");
      return;
    }

    if (!isValidIP(ipInput.trim())) {
      setError("Please enter a valid IPv4 or IPv6 address");
      return;
    }

    setLoading(true);
    setError(null);
    setIpInfo(null);

    try {
      const info = await getIPInfo(ipInput.trim());
      setIpInfo(info);
    } catch (err) {
      if (err instanceof IPError) {
        setError(err.message);
      } else {
        setError("Failed to track IP address. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTrackIP();
    }
  };

  const clearResults = () => {
    setIpInfo(null);
    setError(null);
    setIpInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">IP Tracker</h1>
              <p className="text-gray-600">
                Discover the location and details of any IPv4 or IPv6 address
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Track Any IP Address
            </h2>
            <p className="text-gray-600">
              Enter an IPv4 or IPv6 address to discover its location and network
              information
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-6">
            <div className="flex-1">
              <input
                type="text"
                value={ipInput}
                onChange={(e) => setIpInput(e.target.value)}
                onKeyPress={handleInputKeyPress}
                placeholder="Enter IP address (e.g., 8.8.8.8 or 2001:4860:4860::8888)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                disabled={loading}
              />
            </div>
            <button
              onClick={handleTrackIP}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 font-medium"
            >
              <Search className="w-5 h-5" />
              <span>Track IP</span>
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={handleDetectMyIP}
              disabled={loading}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 font-medium mx-auto"
            >
              <Wifi className="w-5 h-5" />
              <span>Detect My IP</span>
            </button>
          </div>

          {(ipInfo || error) && (
            <div className="text-center mt-6">
              <button
                onClick={clearResults}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                Clear Results
              </button>
            </div>
          )}
        </div>

        {!ipInfo && !error && (
          <div className="mt-8">
            <LocalIPGuide />
          </div>
        )}
        {/* Results Section */}
        <div className="space-y-8">
          {loading && <LoadingSpinner />}

          {error && (
            <ErrorMessage
              message={error}
              onRetry={() => {
                setError(null);
                if (ipInput.trim()) {
                  handleTrackIP();
                }
              }}
            />
          )}

          {ipInfo && !error && <IPCard ipInfo={ipInfo} />}

          {/* Local IP Guide - Show after IP details */}
          {ipInfo && (
            <div className="mt-8">
              <LocalIPGuide />
            </div>
          )}
        </div>

        {/* Features Section */}
        {!ipInfo && !loading && !error && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
              What you can discover
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Precise Location
                </h4>
                <p className="text-gray-600 text-sm">
                  Get detailed location information including city, region, and
                  country with coordinates for both IPv4 and IPv6 addresses.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Wifi className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Network Details
                </h4>
                <p className="text-gray-600 text-sm">
                  Discover ISP information, organization details, and network
                  infrastructure data with support for modern IPv6 networks.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Interactive Map
                </h4>
                <p className="text-gray-600 text-sm">
                  Visualize the IP location on an interactive map with precise
                  positioning and detailed popup information.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>
              &copy; 2025 <strong>IP Tracker</strong>. Developed by Rafif
              Ramadhana.{" "}
            </p>
            <p className="mt-1">
              <a
                href="https://rafiframadhana.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-400 text-sm mr-3"
              >
                My Portfolio <ExternalLink className="w-4 h-4 ml-1" />
              </a>

              <a
                href="https://github.com/rafiframadhana"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-400 text-sm"
              >
                GitHub <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
