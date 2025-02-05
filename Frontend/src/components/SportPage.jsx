import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, MapPin, Trophy, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';


const SportPage = ({ sport }) => {
  const sportsData = {
    cricket: {
      title: "Cricket",
      hero: "https://images.unsplash.com/photo-1531415074968-036ba1b575da",
      description: "Experience the thrill of cricket with fellow enthusiasts",
      intro: "Cricket isn't just a sport in India, it's an emotion that brings millions together. Whether you're a batsman, bowler, or just love the game, find your perfect match here.",
      history: "Cricket originated in England in the 16th century and has evolved into one of the world's most popular sports, especially in Commonwealth nations.",
      legendaryPlayers: [
        { name: "Ms Dhoni", achievement: "Only Captain to win all three ICC trophies" },
        { name: "Virat Kohli", achievement: "Modern era batting legend" },
        { name: "Sachin Tendulkar", achievement: "100 International centuries" },
        
        
      ],
      facts: [
        "Most popular sport in India",
        "Team sport with 11 players",
        "Multiple formats: T20, ODI, Test",
        "Great for fitness and teamwork"
      ],
      equipment: [
        "Cricket bat",
        "Cricket ball",
        "Protective gear",
        "Stumps and bails"
      ],
      skillLevels: [
        { level: "Beginner", description: "Learning basic batting and bowling" },
        { level: "Intermediate", description: "Good understanding of game tactics" },
        { level: "Advanced", description: "Competitive level player" },
        { level: "Professional", description: "Expert with tournament experience" }
      ],
      upcomingEvents: [
        {
          title: "Weekend Cricket League",
          date: "Next Sunday",
          location: "Local Ground",
          participants: "24/30",
          format: "T20",
          entryFee: "₹500 per team",
          prizes: "Winners: ₹10,000"
        }
      ],
      popularLocations: [
        {
          name: "DY Patil Stadium",
          address: "Nerul, Navi Mumbai",
          facilities: ["Flood lights", "Practice nets", "Pavilion"]
        },
        {
          name: "Local Cricket Ground",
          address: "Andheri Sports Complex",
          facilities: ["Practice nets", "Equipment rental"]
        }
      ]
    },
    football: {
      title: "Football",
      hero: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c",
      description: "Join the beautiful game and showcase your skills",
      intro: "Football, known as 'the beautiful game', unites people across cultures and continents with its simple yet captivating nature.",
      history: "Modern football originated in Britain in the 19th century, though ancient civilizations played similar ball games.",
      legendaryPlayers: [
        { name: "Pelé", achievement: "3-time World Cup winner" },
        { name: "Lionel Messi", achievement: "7-time Ballon d'Or winner" },
        { name: "Cristiano Ronaldo", achievement: "5-time Champions League winner" }
      ],
      facts: [
        "World's most popular sport",
        "11 players per team",
        "90 minutes of action",
        "Perfect for cardio fitness"
      ],
      equipment: [
        "Football",
        "Football boots",
        "Shin guards",
        "Team jerseys"
      ],
      skillLevels: [
        { level: "Beginner", description: "Learning basic ball control and passing" },
        { level: "Intermediate", description: "Good understanding of tactics" },
        { level: "Advanced", description: "High-level technical skills" },
        { level: "Professional", description: "Elite competitive player" }
      ],
      upcomingEvents: [
        {
          title: "5-a-side Tournament",
          date: "This Saturday",
          location: "Football Arena",
          participants: "40/50",
          format: "5v5",
          entryFee: "₹1000 per team",
          prizes: "Winners: ₹15,000"
        }
      ],
      popularLocations: [
        {
          name: "Andheri Sports Complex",
          address: "Andheri West, Mumbai",
          facilities: ["Multiple grounds", "Floodlights", "Changing rooms"]
        },
        {
          name: "PowerPlay Arena",
          address: "Powai, Mumbai",
          facilities: ["Artificial turf", "Indoor facility"]
        }
      ]
    },
    basketball: {
      title: "Basketball",
      hero: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
      description: "Experience fast-paced action on the court",
      intro: "Basketball combines athleticism, strategy, and teamwork in a fast-paced, exciting game that's perfect for both competitive and casual players.",
      history: "Invented by Dr. James Naismith in 1891, basketball has grown into a global phenomenon.",
      legendaryPlayers: [
        { name: "Michael Jordan", achievement: "6-time NBA champion" },
        { name: "LeBron James", achievement: "4-time NBA MVP" },
        { name: "Kobe Bryant", achievement: "5-time NBA champion" }
      ],
      facts: [
        "Fast-paced team sport",
        "5 players per team",
        "Great for agility",
        "Indoor/Outdoor sport"
      ],
      equipment: [
        "Basketball",
        "Basketball shoes",
        "Jersey",
        "Court"
      ],
      skillLevels: [
        { level: "Beginner", description: "Learning dribbling and shooting" },
        { level: "Intermediate", description: "Basic game strategies" },
        { level: "Advanced", description: "Complex plays and tactics" },
        { level: "Professional", description: "High-level competition ready" }
      ],
      upcomingEvents: [
        {
          title: "3v3 Street Basketball",
          date: "Next Weekend",
          location: "Basketball Court",
          participants: "18/24",
          format: "3v3 Tournament",
          entryFee: "₹500 per team",
          prizes: "Winners: ₹8,000"
        }
      ],
      popularLocations: [
        {
          name: "YMCA Basketball Court",
          address: "Bandra West, Mumbai",
          facilities: ["Indoor court", "Training programs"]
        },
        {
          name: "Phoenix Market City",
          address: "Kurla West, Mumbai",
          facilities: ["Professional court", "Coaching available"]
        }
      ]
    },
    badminton: {
      title: "Badminton",
      hero: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea",
      description: "Perfect your technique and enjoy quick matches",
      intro: "Badminton is one of the fastest racquet sports, requiring quick reflexes, agility, and strategic thinking.",
      history: "Developed from an ancient game called battledore and shuttlecock, modern badminton was formalized in British India.",
      legendaryPlayers: [
        { name: "Lin Dan", achievement: "2-time Olympic gold medalist" },
        { name: "Prakash Padukone", achievement: "First Indian to win All England" },
        { name: "P.V. Sindhu", achievement: "Olympic medalist" }
      ],
      facts: [
        "Singles or doubles play",
        "Indoor sport",
        "Great for reflexes",
        "Suitable for all ages"
      ],
      equipment: [
        "Badminton racquet",
        "Shuttlecocks",
        "Court shoes",
        "Sports attire"
      ],
      skillLevels: [
        { level: "Beginner", description: "Basic shots and serves" },
        { level: "Intermediate", description: "Advanced shots and footwork" },
        { level: "Advanced", description: "Strategic gameplay" },
        { level: "Professional", description: "Tournament level skills" }
      ],
      upcomingEvents: [
        {
          title: "Doubles Tournament",
          date: "Coming Saturday",
          location: "Badminton Court",
          participants: "32/40",
          format: "Doubles",
          entryFee: "₹400 per pair",
          prizes: "Winners: ₹5,000"
        }
      ],
      popularLocations: [
        {
          name: "Khar Gymkhana",
          address: "Khar West, Mumbai",
          facilities: ["Multiple courts", "Professional coaching"]
        },
        {
          name: "MIG Club",
          address: "Bandra East, Mumbai",
          facilities: ["Indoor courts", "Tournament venue"]
        }
      ]
    }
  };

  const currentSport = sportsData[sport];

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!currentSport) {
    return <div>Sport not found</div>;
  }



  return (
    <main className="mt-0">
      <section className="relative">
        <div className="h-screen relative">
          <motion.div 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img 
              src={currentSport.hero}
              alt={currentSport.title}
              className="w-full h-full object-cover "
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
          </motion.div>

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-3xl"
              >
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                  {currentSport.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8">
                  {currentSport.description}
                </p>
                <p className="text-lg text-gray-300">
                  {currentSport.intro}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-gray-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Quick Facts About {currentSport.title}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentSport.facts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white hover:bg-white/20 transition-colors"
              >
                <p className="text-lg">{fact}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">History</h2>
              <p className="text-gray-600 leading-relaxed">{currentSport.history}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Legendary Players</h2>
              <div className="space-y-4">
                {currentSport.legendaryPlayers.map((player, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 10 }}
                    className="bg-white rounded-lg p-4 shadow-md border border-gray-100"
                  >
                    <h3 className="text-lg font-semibold text-indigo-600">{player.name}</h3>
                    <p className="text-gray-600">{player.achievement}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Required Equipment</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {currentSport.equipment.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 rounded-xl p-6 text-center shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-900">{item}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Skill Levels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentSport.skillLevels.map((skill, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-indigo-600 mb-3">{skill.level}</h3>
                <p className="text-gray-600">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentSport.upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{event.title}</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{event.participants}</span>
                  </div>
                </div>
                <Link
                  to="/events"
                  className="mt-6 inline-flex items-center text-indigo-600 hover:text-indigo-700"
                >
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentSport.popularLocations.map((location, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-6 shadow-md text-center"
              >
                <MapPin className="h-8 w-8 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">{location.name}</h3>
                <p className="text-gray-600">{location.address}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to Play {currentSport.title}?
          </h2>
          <Link
            to="/events"
            className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Find {currentSport.title} Events
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default SportPage; 