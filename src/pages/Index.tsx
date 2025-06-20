
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, MapPin, MessageSquare, Clock, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string>("");

  const userRoles = [
    {
      type: "donor",
      title: "Blood Donor",
      description: "Register as a donor and help save lives",
      icon: Heart,
      color: "bg-red-500 hover:bg-red-600",
      path: "/donor-dashboard"
    },
    {
      type: "requester",
      title: "Request Blood",
      description: "Find blood donors in your area urgently",
      icon: Users,
      color: "bg-blue-500 hover:bg-blue-600",
      path: "/requester-dashboard"
    },
    {
      type: "doctor",
      title: "Doctor",
      description: "Verify and validate blood donations",
      icon: Shield,
      color: "bg-green-500 hover:bg-green-600",
      path: "/doctor-dashboard"
    },
    {
      type: "ngo",
      title: "NGO",
      description: "Organize camps and share awareness",
      icon: MessageSquare,
      color: "bg-purple-500 hover:bg-purple-600",
      path: "/ngo-dashboard"
    }
  ];

  const features = [
    {
      icon: MapPin,
      title: "Real-time Matching",
      description: "Find donors near you instantly with our smart matching system"
    },
    {
      icon: MessageSquare,
      title: "In-app Chat",
      description: "Communicate directly with donors/requesters securely"
    },
    {
      icon: Clock,
      title: "Urgent Requests",
      description: "Priority system for emergency blood requirements"
    },
    {
      icon: Heart,
      title: "Verified Donations",
      description: "Doctor-verified donation tracking for transparency"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-red-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">BloodLink</h1>
            </div>
            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
              Login
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Connecting Life Savers
            <span className="text-red-500 block">In Real Time</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            BloodLink connects blood donors and requesters instantly, with real-time matching, 
            verified donations, and emergency response capabilities.
          </p>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {userRoles.map((role) => {
              const IconComponent = role.icon;
              return (
                <Card 
                  key={role.type} 
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-red-200"
                  onClick={() => navigate(role.path)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 ${role.color} rounded-full flex items-center justify-center mx-auto mb-4 transition-colors`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{role.title}</CardTitle>
                    <CardDescription>{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-red-500 hover:bg-red-600">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose BloodLink?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-red-500 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Emergency Blood Needed?</h2>
          <p className="text-xl mb-6">Connect with donors in your area within minutes</p>
          <Button 
            size="lg" 
            className="bg-white text-red-500 hover:bg-red-50"
            onClick={() => navigate("/requester-dashboard")}
          >
            Request Blood Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-bold">BloodLink</span>
          </div>
          <p className="text-gray-400">Saving lives, one donation at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
