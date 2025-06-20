
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Phone, Video, MoreVertical, Heart, User, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: number;
  sender: "donor" | "requester";
  content: string;
  timestamp: string;
  type: "text" | "system";
}

const Chat = () => {
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "donor",
      content: "Hi! I saw your blood request and I'm available to help.",
      timestamp: "10:30 AM",
      type: "text"
    },
    {
      id: 2,
      sender: "requester",
      content: "Thank you so much! This is urgent for my surgery tomorrow.",
      timestamp: "10:32 AM",
      type: "text"
    },
    {
      id: 3,
      sender: "donor",
      content: "No problem at all. I can be at the hospital by 2 PM today. Is that okay?",
      timestamp: "10:35 AM",
      type: "text"
    },
    {
      id: 4,
      sender: "requester",
      content: "That would be perfect! The hospital is City Medical Center, Room 304.",
      timestamp: "10:37 AM",
      type: "text"
    },
    {
      id: 5,
      sender: "donor",
      content: "Great! I'll bring my ID and medical records. See you there!",
      timestamp: "10:40 AM",
      type: "text"
    }
  ]);

  const currentUser = "requester"; // This would come from auth context
  
  const chatPartner = {
    name: "John Donor",
    bloodGroup: "O+",
    location: "Downtown Medical Center",
    avatar: "JD",
    status: "online",
    verificationStatus: "verified"
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: messages.length + 1,
        sender: currentUser,
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "text"
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
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
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Chat</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Chat Partner Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Chat Partner</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold text-red-500">{chatPartner.avatar}</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold flex items-center justify-center space-x-2">
                    <span>{chatPartner.name}</span>
                    {chatPartner.verificationStatus === "verified" && (
                      <Badge className="bg-green-500 text-white text-xs">
                        Verified
                      </Badge>
                    )}
                  </h3>
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-red-600 font-semibold">{chatPartner.bloodGroup}</span>
                  </div>
                  <p className="text-gray-600 text-sm flex items-center justify-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {chatPartner.location}
                  </p>
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    {chatPartner.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full" variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Voice Call
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Video className="w-4 h-4 mr-2" />
                    Video Call
                  </Button>
                  <Button className="w-full bg-red-500 hover:bg-red-600">
                    <Heart className="w-4 h-4 mr-2" />
                    Confirm Donation
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full text-left justify-start" size="sm">
                  📍 Share Location
                </Button>
                <Button variant="outline" className="w-full text-left justify-start" size="sm">
                  📋 Medical Info
                </Button>
                <Button variant="outline" className="w-full text-left justify-start" size="sm">
                  🏥 Hospital Details
                </Button>
                <Button variant="outline" className="w-full text-left justify-start" size="sm">
                  ⚠️ Report Issue
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="flex-shrink-0 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="font-bold text-red-500">{chatPartner.avatar}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{chatPartner.name}</h3>
                      <p className="text-sm text-green-600">Online • Available for donation</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === currentUser ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === currentUser
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === currentUser
                            ? 'text-red-100'
                            : 'text-gray-500'
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </CardContent>
              
              {/* Message Input */}
              <div className="flex-shrink-0 border-t p-4">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button type="submit" className="bg-red-500 hover:bg-red-600">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
