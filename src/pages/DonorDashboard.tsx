
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Heart, MapPin, Clock, MessageSquare, User, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DonorDashboard = () => {
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState(true);
  
  const donorInfo = {
    name: "John Donor",
    bloodGroup: "O+",
    location: "Downtown Medical Center",
    lastDonation: "3 months ago",
    totalDonations: 12
  };

  const activeRequests = [
    {
      id: 1,
      requesterName: "Emergency Ward - City Hospital",
      bloodGroup: "O+",
      urgency: "Critical",
      distance: "2.3 km",
      timeRequested: "15 mins ago",
      diseases: "Accident victim, internal bleeding"
    },
    {
      id: 2,
      requesterName: "Sarah Johnson",
      bloodGroup: "O+",
      urgency: "Urgent",
      distance: "5.1 km",
      timeRequested: "1 hour ago",
      diseases: "Surgery preparation"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical": return "bg-red-500";
      case "Urgent": return "bg-orange-500";
      case "Normal": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

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
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Donor Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="w-6 h-6 text-gray-600" />
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Donor Profile */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Donor Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-red-500">{donorInfo.bloodGroup}</span>
                  </div>
                  <h3 className="text-xl font-semibold">{donorInfo.name}</h3>
                  <p className="text-gray-600 flex items-center justify-center mt-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {donorInfo.location}
                  </p>
                </div>
                
                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Donations:</span>
                    <span className="font-semibold">{donorInfo.totalDonations}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Donation:</span>
                    <span className="font-semibold">{donorInfo.lastDonation}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Available to Donate:</span>
                    <Switch 
                      checked={isAvailable} 
                      onCheckedChange={setIsAvailable}
                    />
                  </div>
                </div>

                <Button className="w-full bg-red-500 hover:bg-red-600">
                  Update Profile
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Impact Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-red-500">36</div>
                    <div className="text-sm text-gray-600">Lives Saved</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-500">98%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Requests */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Blood Requests Near You</span>
                  <Badge variant="secondary">{activeRequests.length} Active</Badge>
                </CardTitle>
                <CardDescription>
                  {isAvailable ? "You are available to receive requests" : "You are currently unavailable"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeRequests.map((request) => (
                    <Card key={request.id} className="border-l-4 border-l-red-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-lg">{request.requesterName}</h4>
                            <p className="text-gray-600 text-sm">{request.diseases}</p>
                          </div>
                          <Badge className={`${getUrgencyColor(request.urgency)} text-white`}>
                            {request.urgency}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <Heart className="w-4 h-4 mr-1 text-red-500" />
                            {request.bloodGroup}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {request.distance}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {request.timeRequested}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            className="flex-1 bg-red-500 hover:bg-red-600"
                            disabled={!isAvailable}
                          >
                            Accept Request
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex items-center"
                            onClick={() => navigate("/chat")}
                          >
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Chat
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {activeRequests.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No active requests in your area right now.</p>
                    <p className="text-sm">We'll notify you when someone needs your blood group.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <Button 
                variant="outline" 
                className="p-6 h-auto flex flex-col items-center space-y-2"
                onClick={() => navigate("/donor-map")}
              >
                <MapPin className="w-6 h-6" />
                <span>View Map</span>
              </Button>
              <Button 
                variant="outline" 
                className="p-6 h-auto flex flex-col items-center space-y-2"
                onClick={() => navigate("/chat")}
              >
                <MessageSquare className="w-6 h-6" />
                <span>Messages</span>
              </Button>
              <Button 
                variant="outline" 
                className="p-6 h-auto flex flex-col items-center space-y-2"
                onClick={() => navigate("/blogs")}
              >
                <Heart className="w-6 h-6" />
                <span>Health Tips</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
