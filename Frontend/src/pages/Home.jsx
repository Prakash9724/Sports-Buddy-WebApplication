import { Link } from 'react-router-dom';
import { Users, MapPin, Calendar, ArrowRight } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Users className="h-6 w-6 text-indigo-600" />,
      title: "Connect with Sports Enthusiasts",
      description: "Find and connect with people who share your passion for sports"
    },
    {
      icon: <MapPin className="h-6 w-6 text-indigo-600" />,
      title: "Discover Local Events",
      description: "Find sports events happening in your area"
    },
    {
      icon: <Calendar className="h-6 w-6 text-indigo-600" />,
      title: "Organize Events",
      description: "Create and manage your own sports events"
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <div 
        className="relative h-[700px] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1526676037777-05a232554f77?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-6xl font-extrabold mb-6 leading-tight animate-fade-in">
              Find Your Perfect <span className="text-indigo-400">Sports Partner</span>
            </h1>
            <p className="text-2xl mb-10 max-w-2xl text-gray-300 leading-relaxed">
              Connect with local sports enthusiasts, join events, and make new friends while staying active and healthy.
            </p>
            <div className="space-x-4">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-full hover:bg-indigo-500 transition-all transform hover:scale-105 shadow-lg hover:shadow-indigo-500/50"
              >
                Get Started
                <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How SportsBuddy Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">Simple steps to find your next sports partner and begin your fitness journey together</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="group p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
                <div className="mt-6">
                  <Link to="#" className="text-indigo-600 font-semibold flex items-center hover:text-indigo-800">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;