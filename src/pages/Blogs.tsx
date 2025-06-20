
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MessageSquare, Heart, Calendar, User, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "awareness", "health", "education", "stories", "tips"];

  const blogs = [
    {
      id: 1,
      title: "The Life-Saving Impact of Blood Donation",
      excerpt: "Every two seconds, someone in the world needs blood. Learn about the incredible impact your donation can have on saving lives.",
      content: "Blood donation is one of the most significant contributions to community health. A single donation can save up to three lives...",
      author: "Red Cross Foundation",
      authorAvatar: "RC",
      date: "2024-06-19",
      category: "awareness",
      tags: ["blood donation", "awareness", "community health"],
      readTime: "5 min read",
      views: 1245,
      likes: 89
    },
    {
      id: 2,
      title: "Debunking Common Blood Donation Myths",
      excerpt: "Separating fact from fiction about blood donation to encourage more people to become regular donors.",
      content: "Many people avoid donating blood due to misconceptions. Let's address the most common myths and provide factual information...",
      author: "Dr. Sarah Johnson",
      authorAvatar: "SJ",
      date: "2024-06-18",
      category: "education",
      tags: ["myths", "education", "facts"],
      readTime: "7 min read",
      views: 892,
      likes: 67
    },
    {
      id: 3,
      title: "Preparing for Your First Blood Donation",
      excerpt: "A comprehensive guide to help first-time donors know what to expect and how to prepare.",
      content: "Donating blood for the first time can feel overwhelming. Here's everything you need to know to make your experience smooth...",
      author: "Health Tips Community",
      authorAvatar: "HT",
      date: "2024-06-17",
      category: "tips",
      tags: ["first time", "preparation", "guide"],
      readTime: "6 min read",
      views: 756,
      likes: 54
    },
    {
      id: 4,
      title: "A Donor's Journey: Saving Lives Through Regular Donation",
      excerpt: "Personal story of a regular blood donor and the impact they've made over 10 years of donations.",
      content: "Meet John, who has been donating blood regularly for 10 years and has saved over 90 lives. Here's his inspiring story...",
      author: "Community Stories",
      authorAvatar: "CS",
      date: "2024-06-16",
      category: "stories",
      tags: ["personal story", "inspiration", "regular donor"],
      readTime: "8 min read",
      views: 1089,
      likes: 124
    },
    {
      id: 5,
      title: "Blood Types and Compatibility: What You Need to Know",
      excerpt: "Understanding blood types, compatibility, and why certain blood groups are in higher demand.",
      content: "Blood type compatibility is crucial for safe transfusions. Learn about the different blood groups and their importance...",
      author: "Medical Education Center",
      authorAvatar: "ME",
      date: "2024-06-15",
      category: "health",
      tags: ["blood types", "compatibility", "medical"],
      readTime: "9 min read",
      views: 1567,
      likes: 156
    },
    {
      id: 6,
      title: "Nutrition and Recovery After Blood Donation",
      excerpt: "Tips for proper nutrition and recovery to help your body replenish after donating blood.",
      content: "Proper nutrition and hydration are essential for quick recovery after blood donation. Here are expert recommendations...",
      author: "Nutrition Experts",
      authorAvatar: "NE",
      date: "2024-06-14",
      category: "health",
      tags: ["nutrition", "recovery", "health"],
      readTime: "5 min read",
      views: 643,
      likes: 41
    }
  ];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              <h1 className="text-xl font-bold text-gray-900">Health & Awareness Blogs</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search blogs, topics, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          {categories.slice(1).map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`h-12 ${selectedCategory === category ? 'bg-purple-500 hover:bg-purple-600' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <Card key={blog.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge 
                    variant="secondary"
                    className={`
                      ${blog.category === 'awareness' ? 'bg-red-100 text-red-800' : ''}
                      ${blog.category === 'health' ? 'bg-green-100 text-green-800' : ''}
                      ${blog.category === 'education' ? 'bg-blue-100 text-blue-800' : ''}
                      ${blog.category === 'stories' ? 'bg-purple-100 text-purple-800' : ''}
                      ${blog.category === 'tips' ? 'bg-yellow-100 text-yellow-800' : ''}
                    `}
                  >
                    {blog.category}
                  </Badge>
                  <span className="text-sm text-gray-500">{blog.readTime}</span>
                </div>
                <CardTitle className="text-lg leading-tight">{blog.title}</CardTitle>
                <CardDescription className="line-clamp-2">{blog.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-4">
                  {blog.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold">{blog.authorAvatar}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{blog.author}</p>
                      <p className="text-xs text-gray-500">{blog.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{blog.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{blog.views}</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-4 bg-purple-500 hover:bg-purple-600">
                  Read Full Article
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-16">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No blogs found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-red-500 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <Heart className="w-16 h-16 mx-auto mb-4 text-white" />
            <h2 className="text-3xl font-bold mb-4">Ready to Save Lives?</h2>
            <p className="text-xl mb-6">
              Every donation counts. Join thousands of heroes making a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-red-600 hover:bg-gray-100"
                onClick={() => navigate("/donor-dashboard")}
              >
                Become a Donor
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-red-600"
                onClick={() => navigate("/requester-dashboard")}
              >
                Request Blood
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Blogs;
