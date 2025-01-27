import React, { useEffect } from 'react';
import { Users, Target, Shield, Trophy, ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const About = () => {
  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community First",
      description: "Building a vibrant community of sports enthusiasts who share your passion"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Goal Oriented",
      description: "Helping you achieve your fitness goals with like-minded partners"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Safe & Secure",
      description: "Verified users and secure platform for a worry-free experience"
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Achievement Tracking",
      description: "Track your progress and celebrate milestones together"
    }
  ];

  const teamMembers = [
    {
      name: "Prakash",
      role: "Founder & Developer",
      image: "/images/prakash.jpg",
      bio: "Passionate about creating technology that brings people together through sports",
      skills: ["Full Stack Development", "UI/UX Design", "Sports Enthusiast"],
      achievements: ["100+ Events Created", "1000+ Active Users", "50+ Sports Communities"],
      social: {
        github: "https://github.com/Prakash9724",
        linkedin: "https://www.linkedin.com/in/prakash-patel-webdev?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        twitter: "#"
      }
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax */}
      <div className="relative h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1526676037777-05a232554f77?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
            transform: 'translateZ(-1px) scale(2)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-purple-600/90" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-full flex items-center justify-center text-center px-4"
        >
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              About SportsBuddy
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-2xl mx-auto">
              Connecting sports enthusiasts and building active communities through the power of technology
            </p>
          </div>
        </motion.div>
      </div>

      {/* Mission Section with Floating Elements */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent" />
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                At SportsBuddy, we believe that sports have the power to bring people together and create lasting connections. Our mission is to make it easier for sports enthusiasts to find partners, join events, and stay active while building meaningful relationships.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-full hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50"
              >
                Join Our Community
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-20 blur-xl animate-pulse" />
              <img
                src="https://images.unsplash.com/photo-1603351820248-eb5d68f64be0?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Sports Community"
                className="relative rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section with Hover Effects */}
      <section className="py-20 bg-gradient-to-b from-white to-indigo-50">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-16">
            <motion.h2 variants={itemVariants} className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600">
              The features that make SportsBuddy unique
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-indigo-50"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Team Section with Modern Cards */}
      <section className="py-20 bg-gradient-to-b from-white to-indigo-50">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-16">
            <motion.h2 variants={itemVariants} className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600">
              The passionate minds behind SportsBuddy
            </motion.p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                {/* Background Gradient Animation */}
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                
                {/* Card Content */}
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl">
                  {/* Image Section */}
                  <div className="relative h-80">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-top object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-3xl font-bold text-white mb-1">{member.name}</h3>
                        <p className="text-indigo-300 text-lg font-medium">{member.role}</p>
                      </div>
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="p-6">
                    {/* Bio */}
                    <p className="text-gray-600 mb-6 leading-relaxed">{member.bio}</p>
                    
                    {/* Skills */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">EXPERTISE</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-4 pt-4 border-t">
                      <motion.a 
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-900 transition-colors"
                        whileHover={{ scale: 1.2 }}
                      >
                        <Github className="h-6 w-6" />
                      </motion.a>
                      <motion.a 
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        whileHover={{ scale: 1.2 }}
                      >
                        <Linkedin className="h-6 w-6" />
                      </motion.a>
                      <motion.a 
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                        whileHover={{ scale: 1.2 }}
                      >
                        <Twitter className="h-6 w-6" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About; 