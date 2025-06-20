
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, MapPin, Clock, Users, AlertTriangle, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RequesterDashboard = () => {
  const navigate = useNavigate();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [formData, setFormData] = useState({
    bloodGroup: "",
    urgency: "",
    location: "",
    diseases: "",
    requiredBy: "",
    contactNumber: "",
    hospitalName: ""
  });

  const activeRequests = [
    {
      id: 1,
      bloodGroup: "O+",
      urgency: "Critical",
      location: "City Hospital, Downtown",
      status: "Searching",
      donorsFound: 3,
      timeLeft: "2 hours",
      diseases: "Emergency surgery required"
    },
    {
      id: 2,
      bloodGroup: "AB-",
      urgency: "Urgent",
      location: "Regional Medical Center",
      status: "Match Found",
      donorsFound: 1,
      timeLeft: "6 hours",
      diseases: "Blood transfusion needed"
    }
  ];

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const urgencyLevels = ["Critical", "Urgent", "Normal"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Match Found": return "bg-green-500";
      case "Searching": return "bg-orange-500";
      case "Expired": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical": return "bg-red-500";
      case "Urgent": return "bg-orange-500";
      case "Normal": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting request:", formData);
    setShowRequestForm(false);
    // Here you would typically send the data to your backend
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
              <h1 className="text-xl font-bold text-gray-900">Request Blood</h1>
            </div>
            <Button 
              className="bg-red-500 hover:bg-red-600"
              onClick={() => setShowRequestForm(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Request
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Emergency Banner */}
        <Card className="border-red-200 bg-red-50 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <div>
                <h3 className="text-lg font-semibold text-red-800">Emergency Blood Request</h3>
                <p className="text-red-600">Get connected with nearby donors in minutes. Our system prioritizes urgent requests.</p>
              </div>
              <Button 
                className="bg-red-500 hover:bg-red-600 ml-auto"
                onClick={() => setShowRequestForm(true)}
              >
                Request Now
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Request Form */}
          {showRequestForm && (
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Create Blood Request</CardTitle>
                  <CardDescription>Fill in the details for your blood requirement</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitRequest} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bloodGroup">Blood Group *</Label>
                        <Select value={formData.bloodGroup} onValueChange={(value) => setFormData({...formData, bloodGroup: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select blood group" />
                          </SelectTrigger>
                          <SelectContent>
                            {bloodGroups.map((group) => (
                              <SelectItem key={group} value={group}>{group}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="urgency">Urgency Level *</Label>
                        <Select value={formData.urgency} onValueChange={(value) => setFormData({...formData, urgency: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select urgency" />
                          </SelectTrigger>
                          <SelectContent>
                            {urgencyLevels.map((level) => (
                              <SelectItem key={level} value={level}>{level}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="hospitalName">Hospital/Medical Center *</Label>
                      <Input
                        id="hospitalName"
                        value={formData.hospitalName}
                        onChange={(e) => setFormData({...formData, hospitalName: e.target.value})}
                        placeholder="Enter hospital name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="location">Location/Address *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        placeholder="Enter full address"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="requiredBy">Required By *</Label>
                        <Input
                          id="requiredBy"
                          type="datetime-local"
                          value={formData.requiredBy}
                          onChange={(e) => setFormData({...formData, requiredBy: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactNumber">Contact Number *</Label>
                        <Input
                          id="contactNumber"
                          value={formData.contactNumber}
                          onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                          placeholder="Enter contact number"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="diseases">Medical Condition/Reason *</Label>
                      <Textarea
                        id="diseases"
                        value={formData.diseases}
                        onChange={(e) => setFormData({...formData, diseases: e.target.value})}
                        placeholder="Describe the medical condition requiring blood transfusion"
                        required
                      />
                    </div>

                    <div className="flex space-x-4">
                      <Button type="submit" className="bg-red-500 hover:bg-red-600">
                        Submit Request
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowRequestForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Active Requests */}
          <div className={showRequestForm ? "lg:col-span-1" : "lg:col-span-2"}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Your Requests</span>
                  <Badge variant="secondary">{activeRequests.length} Active</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeRequests.map((request) => (
                    <Card key={request.id} className="border-l-4 border-l-red-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-2xl font-bold text-red-500">{request.bloodGroup}</span>
                              <Badge className={`${getUrgencyColor(request.urgency)} text-white`}>
                                {request.urgency}
                              </Badge>
                            </div>
                            <p className="text-gray-600 text-sm">{request.diseases}</p>
                          </div>
                          <Badge className={`${getStatusColor(request.status)} text-white`}>
                            {request.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {request.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {request.timeLeft} left
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {request.donorsFound} donors found
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => navigate("/donor-map")}
                          >
                            <MapPin className="w-4 h-4 mr-1" />
                            View Map
                          </Button>
                          {request.status === "Match Found" && (
                            <Button 
                              className="flex-1 bg-green-500 hover:bg-green-600"
                              onClick={() => navigate("/chat")}
                            >
                              Contact Donor
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Stats */}
          <div className={showRequestForm ? "lg:col-span-3" : "lg:col-span-1"}>
            <div className="space-y-6">
              {/* Donor Heatmap */}
              <Card>
                <CardHeader>
                  <CardTitle>Donor Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full mb-4"
                    variant="outline"
                    onClick={() => navigate("/donor-map")}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    View Donor Map
                  </Button>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {bloodGroups.map((group) => (
                      <div key={group} className="flex justify-between p-2 bg-gray-50 rounded">
                        <span className="font-medium">{group}</span>
                        <span className="text-green-600">{Math.floor(Math.random() * 20 + 5)} nearby</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contacts */}
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contacts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="font-semibold text-red-800">Emergency Helpline</div>
                    <div className="text-red-600">+1 (555) 911-BLOOD</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-blue-800">Blood Bank</div>
                    <div className="text-blue-600">+1 (555) 123-BANK</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequesterDashboard;
