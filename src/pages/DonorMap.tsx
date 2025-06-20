
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Filter, Heart, Users, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DonorMap = () => {
  const navigate = useNavigate();
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("All");
  const [viewMode, setViewMode] = useState("map");

  const bloodGroups = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  
  const donors = [
    { id: 1, name: "John Doe", bloodGroup: "O+", distance: "0.5 km", available: true, location: "Downtown Medical Center" },
    { id: 2, name: "Sarah Wilson", bloodGroup: "A+", distance: "1.2 km", available: true, location: "City Hospital" },
    { id: 3, name: "Mike Johnson", bloodGroup: "B+", distance: "2.1 km", available: false, location: "Regional Center" },
    { id: 4, name: "Emma Davis", bloodGroup: "AB+", distance: "2.8 km", available: true, location: "Community Clinic" },
    { id: 5, name: "Robert Chen", bloodGroup: "O-", distance: "3.2 km", available: true, location: "Emergency Ward" },
    { id: 6, name: "Lisa Brown", bloodGroup: "A-", distance: "3.5 km", available: true, location: "Medical Plaza" },
  ];

  const bloodGroupStats = {
    "A+": { count: 12, available: 8 },
    "A-": { count: 5, available: 3 },
    "B+": { count: 9, available: 6 },
    "B-": { count: 3, available: 2 },
    "AB+": { count: 7, available: 4 },
    "AB-": { count: 2, available: 1 },
    "O+": { count: 15, available: 11 },
    "O-": { count: 4, available: 3 }
  };

  const filteredDonors = selectedBloodGroup === "All" 
    ? donors 
    : donors.filter(donor => donor.bloodGroup === selectedBloodGroup);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" onClick={() => navigate("/")}>
                ←
              </Button>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Donor Map</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant={viewMode === "map" ? "default" : "outline"}
                onClick={() => setViewMode("map")}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Map View
              </Button>
              <Button 
                variant={viewMode === "list" ? "default" : "outline"}
                onClick={() => setViewMode("list")}
              >
                <Users className="w-4 h-4 mr-2" />
                List View
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters & Stats */}
          <div className="lg:col-span-1">
            {/* Blood Group Filter */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="w-5 h-5" />
                  <span>Filter by Blood Group</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {bloodGroups.map((group) => (
                    <Button
                      key={group}
                      variant={selectedBloodGroup === group ? "default" : "outline"}
                      className={`h-12 ${selectedBloodGroup === group ? 'bg-red-500 hover:bg-red-600' : ''}`}
                      onClick={() => setSelectedBloodGroup(group)}
                    >
                      {group}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Blood Group Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Donor Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(bloodGroupStats).map(([group, stats]) => (
                    <div key={group} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-red-600">{group}</span>
                        </div>
                        <span className="font-medium">{group}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-green-600">{stats.available} available</div>
                        <div className="text-xs text-gray-600">{stats.count} total</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map/List Content */}
          <div className="lg:col-span-3">
            {viewMode === "map" ? (
              <Card>
                <CardHeader>
                  <CardTitle>Donor Heatmap</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Placeholder for interactive map */}
                  <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100"></div>
                    
                    {/* Mock map markers */}
                    <div className="absolute top-16 left-20">
                      <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="text-xs bg-white px-2 py-1 rounded shadow mt-1">O+ Donor</div>
                    </div>
                    <div className="absolute top-32 right-32">
                      <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                      <div className="text-xs bg-white px-2 py-1 rounded shadow mt-1">A+ Donor</div>
                    </div>
                    <div className="absolute bottom-20 left-32">
                      <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                      <div className="text-xs bg-white px-2 py-1 rounded shadow mt-1">B+ Donor</div>
                    </div>
                    <div className="absolute bottom-32 right-20">
                      <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
                      <div className="text-xs bg-white px-2 py-1 rounded shadow mt-1">AB+ Donor</div>
                    </div>

                    <div className="z-10 text-center">
                      <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-600 text-lg">Interactive Donor Map</p>
                      <p className="text-gray-500 text-sm">Real-time donor locations and availability</p>
                      <p className="text-gray-400 text-xs mt-2">
                        {selectedBloodGroup === "All" ? "Showing all blood groups" : `Filtered: ${selectedBloodGroup}`}
                      </p>
                    </div>
                  </div>
                  
                  {/* Map Legend */}
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Available Donors</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <span>Unavailable</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>Your Location</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      Nearby Donors 
                      {selectedBloodGroup !== "All" && (
                        <span className="ml-2 text-red-500">({selectedBloodGroup})</span>
                      )}
                    </CardTitle>
                    <Badge variant="secondary">
                      {filteredDonors.length} found
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredDonors.map((donor) => (
                      <Card key={donor.id} className={`border-l-4 ${donor.available ? 'border-l-green-500' : 'border-l-gray-400'}`}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold text-lg">{donor.name}</h4>
                              <p className="text-gray-600 text-sm flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {donor.location}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-red-500 mb-1">{donor.bloodGroup}</div>
                              <Badge className={donor.available ? "bg-green-500" : "bg-gray-400"}>
                                {donor.available ? "Available" : "Unavailable"}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                              <strong>Distance:</strong> {donor.distance}
                            </span>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                disabled={!donor.available}
                              >
                                <Search className="w-4 h-4 mr-1" />
                                View Details
                              </Button>
                              <Button 
                                size="sm"
                                className="bg-red-500 hover:bg-red-600"
                                disabled={!donor.available}
                                onClick={() => navigate("/chat")}
                              >
                                <Heart className="w-4 h-4 mr-1" />
                                Contact
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {filteredDonors.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No donors found for {selectedBloodGroup} in your area.</p>
                      <p className="text-sm">Try expanding your search radius or selecting a different blood group.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorMap;
