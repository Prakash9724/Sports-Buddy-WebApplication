import { Link } from 'react-router-dom';
import { Users, MapPin, Calendar, ArrowRight, Activity, Trophy, Target, Heart } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Find Sports Partners",
      description: "Connect with local players who match your skill level and schedule"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Join Sports Events",
      description: "Discover and participate in local sports events and tournaments"
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Track Progress",
      description: "Monitor your sports activities and celebrate achievements"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Set Goals",
      description: "Set fitness goals and find partners to achieve them together"
    }
  ];

  const popularSports = [
    { name: "Cricket", image: "/images/sports/cricket.jpg" },
    { name: "Football", image: "/images/sports/football.jpg" },
    { name: "Basketball", image: "/images/sports/basketball.jpg" },
    { name: "Badminton", image: "/images/sports/badminton.jpg" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <div className="relative h-screen">
        <video 
          autoPlay 
          loop 
          muted 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/sports-montage.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60"></div>
        
        {/* Hero Content */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
                Your Perfect <br/>
                <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                  Sports Partner
                </span> <br/>
                Awaits
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Join the community of sports enthusiasts. Find partners, join events, and stay active together.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/events"
                  className="btn-primary text-white"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/events"
                  className="btn-secondary text-white"
                >
                  Explore Events
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
            <div className="w-2 h-3 bg-white rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-indigo-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose SportsBuddy?</h2>
            <p className="text-xl text-gray-300">Everything you need to find your perfect sports partner</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Sports Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Popular Sports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularSports.map((sport, index) => (
              <Link 
                key={index}
                to={`/sports/${sport.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-xl aspect-square"
              >
                <img 
                  src={sport.image} 
                  alt={sport.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                  <h3 className="text-2xl font-bold text-white p-6">{sport.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Ready to Find Your Sports Partner?</h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Join thousands of sports enthusiasts who have found their perfect match for sports activities
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 text-lg font-semibold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Join Now
            <Heart className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        .text-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }

        .btn-primary {
          @apply inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-full hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50;
        }

        .btn-secondary {
          @apply inline-flex items-center px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-full hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-300;
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes scroll {
          0% { transform: translateY(0); }
          50% { transform: translateY(8px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default Home;