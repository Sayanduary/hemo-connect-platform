
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Shield, CheckCircle, XCircle, Clock, User, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [selectedDonation, setSelectedDonation] = useState<number | null>(null);
  const [verificationNotes, setVerificationNotes] = useState("");

  const pendingVerifications = [
    {
      id: 1,
      donorName: "John Donor",
      requesterName: "Sarah Johnson",
      bloodGroup: "O+",
      donationDate: "2024-06-19",
      location: "City Hospital",
      status: "Pending",
      requestReason: "Emergency surgery",
      donorContact: "+1 555-0123",
      requesterContact: "+1 555-0456"
    },
    {
      id: 2,
      donorName: "Mike Wilson",
      requesterName: "Emergency Ward",
      bloodGroup: "AB-",
      donationDate: "2024-06-19",
      location: "Regional Medical Center",
      status: "Pending",
      requestReason: "Blood transfusion needed",
      donorContact: "+1 555-0789",
      requesterContact: "+1 555-0321"
    }
  ];

  const verifiedDonations = [
    {
      id: 3,
      donorName: "Emma Davis",
      requesterName: "Children's Hospital",
      bloodGroup: "A+",
      donationDate: "2024-06-18",
      location: "Children's Hospital",
      status: "Verified",
      verifiedBy: "Dr. Smith",
      verificationDate: "2024-06-18"
    },
    {
      id: 4,
      donorName: "Robert Chen",
      requesterName: "Cancer Ward",
      bloodGroup: "B+",
      donationDate: "2024-06-17",
      location: "Oncology Center",
      status: "Verified",
      verifiedBy: "Dr. Johnson",
      verificationDate: "2024-06-17"
    }
  ];

  const handleVerification = (donationId: number, isVerified: boolean) => {
    console.log(`${isVerified ? 'Verifying' : 'Rejecting'} donation ${donationId}`);
    console.log("Notes:", verificationNotes);
    setSelectedDonation(null);
    setVerificationNotes("");
    // Here you would update the backend
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified": return "bg-green-500";
      case "Rejected": return "bg-red-500";
      case "Pending": return "bg-orange-500";
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
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Doctor Verification Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                {pendingVerifications.length} Pending
              </Badge>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold text-orange-600">{pendingVerifications.length}</div>
              <div className="text-sm text-gray-600">Pending Verifications</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold text-green-600">{verifiedDonations.length}</div>
              <div className="text-sm text-gray-600">Verified Today</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold text-blue-600">156</div>
              <div className="text-sm text-gray-600">Total Verified</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold text-purple-600">98%</div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pending Verifications */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span>Pending Verifications</span>
                </CardTitle>
                <CardDescription>
                  Review and verify completed blood donations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingVerifications.map((donation) => (
                    <Card key={donation.id} className="border-l-4 border-l-orange-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-lg">
                              {donation.donorName} → {donation.requesterName}
                            </h4>
                            <p className="text-gray-600 text-sm">{donation.requestReason}</p>
                          </div>
                          <Badge className={`${getStatusColor(donation.status)} text-white`}>
                            {donation.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                          <div><strong>Blood Group:</strong> {donation.bloodGroup}</div>
                          <div><strong>Date:</strong> {donation.donationDate}</div>
                          <div><strong>Location:</strong> {donation.location}</div>
                          <div><strong>Donor Contact:</strong> {donation.donorContact}</div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            onClick={() => setSelectedDonation(donation.id)}
                            className="bg-blue-500 hover:bg-blue-600"
                          >
                            Review Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recently Verified */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Recently Verified</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {verifiedDonations.map((donation) => (
                    <div key={donation.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-medium">{donation.donorName} → {donation.requesterName}</div>
                        <div className="text-sm text-gray-600">{donation.bloodGroup} • {donation.donationDate}</div>
                      </div>
                      <Badge className="bg-green-500 text-white">Verified</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Verification Panel */}
          <div className="lg:col-span-1">
            {selectedDonation ? (
              <Card>
                <CardHeader>
                  <CardTitle>Verify Donation</CardTitle>
                  <CardDescription>
                    Review donation details and provide verification
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(() => {
                    const donation = pendingVerifications.find(d => d.id === selectedDonation);
                    if (!donation) return null;
                    
                    return (
                      <>
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium text-gray-700">Donor</Label>
                            <p className="text-sm">{donation.donorName}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700">Requester</Label>
                            <p className="text-sm">{donation.requesterName}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700">Blood Group</Label>
                            <p className="text-sm font-semibold text-red-600">{donation.bloodGroup}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700">Location</Label>
                            <p className="text-sm">{donation.location}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700">Reason</Label>
                            <p className="text-sm">{donation.requestReason}</p>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="notes">Verification Notes</Label>
                          <Textarea
                            id="notes"
                            value={verificationNotes}
                            onChange={(e) => setVerificationNotes(e.target.value)}
                            placeholder="Add any notes about the verification..."
                            className="mt-1"
                          />
                        </div>

                        <div className="space-y-2">
                          <Button 
                            onClick={() => handleVerification(selectedDonation, true)}
                            className="w-full bg-green-500 hover:bg-green-600"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Verify Donation
                          </Button>
                          <Button 
                            onClick={() => handleVerification(selectedDonation, false)}
                            variant="outline"
                            className="w-full border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject Donation
                          </Button>
                          <Button 
                            onClick={() => setSelectedDonation(null)}
                            variant="ghost"
                            className="w-full"
                          >
                            Cancel
                          </Button>
                        </div>
                      </>
                    );
                  })()}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Verification Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-1">Before Verification</h4>
                      <ul className="text-blue-700 space-y-1">
                        <li>• Confirm donor identity</li>
                        <li>• Check blood type compatibility</li>
                        <li>• Verify donation completion</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-1">Documentation</h4>
                      <ul className="text-green-700 space-y-1">
                        <li>• Record donation time</li>
                        <li>• Note any complications</li>
                        <li>• Update patient records</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
