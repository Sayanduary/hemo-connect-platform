
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Calendar, MapPin, Users, Plus, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NgoDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("blogs");
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showCampForm, setShowCampForm] = useState(false);
  
  const [blogForm, setBlogForm] = useState({
    title: "",
    content: "",
    tags: "",
    category: "awareness"
  });
  
  const [campForm, setCampForm] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    description: "",
    contact: "",
    expectedDonors: ""
  });

  const blogs = [
    {
      id: 1,
      title: "The Importance of Regular Blood Donation",
      content: "Regular blood donation is crucial for maintaining blood supplies...",
      author: "Red Cross Society",
      date: "2024-06-19",
      tags: ["awareness", "health"],
      views: 245,
      status: "published"
    },
    {
      id: 2,
      title: "Blood Donation Myths Debunked",
      content: "Many people avoid donating blood due to common myths...",
      author: "Health Foundation",
      date: "2024-06-18",
      tags: ["education", "myths"],
      views: 189,
      status: "published"
    }
  ];

  const camps = [
    {
      id: 1,
      name: "Community Blood Drive 2024",
      date: "2024-06-25",
      time: "09:00 AM - 05:00 PM",
      location: "Central Community Center, Downtown",
      description: "Join us for our annual blood drive to help save lives in our community.",
      contact: "+1 555-0123",
      expectedDonors: 150,
      registeredDonors: 87,
      status: "upcoming"
    },
    {
      id: 2,
      name: "Emergency Blood Collection",
      date: "2024-06-22",
      time: "10:00 AM - 04:00 PM", 
      location: "City Hospital Parking Lot",
      description: "Urgent blood collection drive due to increased demand at local hospitals.",
      contact: "+1 555-0456",
      expectedDonors: 100,
      registeredDonors: 92,
      status: "upcoming"
    }
  ];

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting blog:", blogForm);
    setShowBlogForm(false);
    setBlogForm({ title: "", content: "", tags: "", category: "awareness" });
  };

  const handleCampSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting camp:", campForm);
    setShowCampForm(false);
    setCampForm({ name: "", date: "", time: "", location: "", description: "", contact: "", expectedDonors: "" });
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
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">NGO Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                className={activeTab === "blogs" ? "bg-purple-500 hover:bg-purple-600" : "bg-gray-500 hover:bg-gray-600"}
                onClick={() => setActiveTab("blogs")}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Blogs
              </Button>
              <Button 
                className={activeTab === "camps" ? "bg-purple-500 hover:bg-purple-600" : "bg-gray-500 hover:bg-gray-600"}
                onClick={() => setActiveTab("camps")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Camps
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold text-purple-600">{blogs.length}</div>
              <div className="text-sm text-gray-600">Published Blogs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold text-blue-600">{camps.length}</div>
              <div className="text-sm text-gray-600">Upcoming Camps</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold text-green-600">179</div>
              <div className="text-sm text-gray-600">Registered Donors</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold text-red-600">8.5k</div>
              <div className="text-sm text-gray-600">Blog Views</div>
            </CardContent>
          </Card>
        </div>

        {/* Content based on active tab */}
        {activeTab === "blogs" && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Blog Form */}
            {showBlogForm && (
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Blog Post</CardTitle>
                    <CardDescription>Share awareness content and health information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleBlogSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="title">Blog Title *</Label>
                        <Input
                          id="title"
                          value={blogForm.title}
                          onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                          placeholder="Enter blog title"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="content">Content *</Label>
                        <Textarea
                          id="content"
                          value={blogForm.content}
                          onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
                          placeholder="Write your blog content here..."
                          rows={8}
                          required
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <select 
                            className="w-full p-2 border rounded-md"
                            value={blogForm.category}
                            onChange={(e) => setBlogForm({...blogForm, category: e.target.value})}
                          >
                            <option value="awareness">Awareness</option>
                            <option value="health">Health Tips</option>
                            <option value="education">Education</option>
                            <option value="stories">Success Stories</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="tags">Tags</Label>
                          <Input
                            id="tags"
                            value={blogForm.tags}
                            onChange={(e) => setBlogForm({...blogForm, tags: e.target.value})}
                            placeholder="e.g., health, awareness, donation"
                          />
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <Button type="submit" className="bg-purple-500 hover:bg-purple-600">
                          Publish Blog
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setShowBlogForm(false)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Blog List */}
            <div className={showBlogForm ? "lg:col-span-1" : "lg:col-span-3"}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Published Blogs</CardTitle>
                    <Button 
                      className="bg-purple-500 hover:bg-purple-600"
                      onClick={() => setShowBlogForm(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      New Blog
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {blogs.map((blog) => (
                      <Card key={blog.id} className="border-l-4 border-l-purple-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold text-lg">{blog.title}</h4>
                              <p className="text-gray-600 text-sm line-clamp-2">{blog.content}</p>
                            </div>
                            <Badge className="bg-green-500 text-white">
                              {blog.status}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {blog.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex justify-between items-center text-sm text-gray-600">
                            <div>
                              <span>{blog.author} • {blog.date}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span>{blog.views} views</span>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "camps" && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Camp Form */}
            {showCampForm && (
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Organize Blood Donation Camp</CardTitle>
                    <CardDescription>Create a new blood donation camp event</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCampSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="campName">Camp Name *</Label>
                        <Input
                          id="campName"
                          value={campForm.name}
                          onChange={(e) => setCampForm({...campForm, name: e.target.value})}
                          placeholder="Enter camp name"
                          required
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="date">Date *</Label>
                          <Input
                            id="date"
                            type="date"
                            value={campForm.date}
                            onChange={(e) => setCampForm({...campForm, date: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="time">Time *</Label>
                          <Input
                            id="time"
                            value={campForm.time}
                            onChange={(e) => setCampForm({...campForm, time: e.target.value})}
                            placeholder="e.g., 09:00 AM - 05:00 PM"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="location">Location *</Label>
                        <Input
                          id="location"
                          value={campForm.location}
                          onChange={(e) => setCampForm({...campForm, location: e.target.value})}
                          placeholder="Enter full address"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={campForm.description}
                          onChange={(e) => setCampForm({...campForm, description: e.target.value})}
                          placeholder="Describe the camp details..."
                          rows={4}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="contact">Contact Number *</Label>
                          <Input
                            id="contact"
                            value={campForm.contact}
                            onChange={(e) => setCampForm({...campForm, contact: e.target.value})}
                            placeholder="Contact number"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="expectedDonors">Expected Donors</Label>
                          <Input
                            id="expectedDonors"
                            type="number"
                            value={campForm.expectedDonors}
                            onChange={(e) => setCampForm({...campForm, expectedDonors: e.target.value})}
                            placeholder="Expected number of donors"
                          />
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <Button type="submit" className="bg-purple-500 hover:bg-purple-600">
                          Create Camp
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setShowCampForm(false)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Camp List */}
            <div className={showCampForm ? "lg:col-span-1" : "lg:col-span-3"}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Upcoming Camps</CardTitle>
                    <Button 
                      className="bg-purple-500 hover:bg-purple-600"
                      onClick={() => setShowCampForm(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      New Camp
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {camps.map((camp) => (
                      <Card key={camp.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold text-lg">{camp.name}</h4>
                              <p className="text-gray-600 text-sm">{camp.description}</p>
                            </div>
                            <Badge className="bg-blue-500 text-white">
                              {camp.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {camp.date} • {camp.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {camp.location}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {camp.registeredDonors}/{camp.expectedDonors} registered
                            </div>
                            <div>
                              <strong>Contact:</strong> {camp.contact}
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              View Registrations
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NgoDashboard;
