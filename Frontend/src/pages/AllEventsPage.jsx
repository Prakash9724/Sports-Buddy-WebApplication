import React from 'react';
import Masonry from 'react-masonry-css';

// Sample data for sports events
const sportsEvents = [
  {
    id: 1,
    image: "https://via.placeholder.com/400x300",
    title: "Football Tournament",
    description: "Join the annual football tournament and showcase your skills.",
    eligibility: "Age 18+",
    prize: "₹50,000",
    address: "City Stadium, Mumbai",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/400x500",
    title: "Cricket League",
    description: "Participate in the inter-city cricket league.",
    eligibility: "Age 16+",
    prize: "₹1,00,000",
    address: "National Cricket Ground, Delhi",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/400x400",
    title: "Basketball Championship",
    description: "Compete in the state-level basketball championship.",
    eligibility: "Age 15+",
    prize: "₹30,000",
    address: "Sports Complex, Bangalore",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/400x600",
    title: "Marathon",
    description: "Run for a cause in the annual city marathon.",
    eligibility: "All ages",
    prize: "Medals and Certificates",
    address: "Marine Drive, Mumbai",
  },
];

// Define breakpoints for masonry layout
const breakpointColumnsObj = {
  default: 4,
  1100: 2,
  700: 1,
};

function AllEventsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Sports Events</h1>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {sportsEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
            <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <div className="space-y-2">
                <p className="text-sm text-gray-600"><span className="font-semibold">Eligibility:</span> {event.eligibility}</p>
                <p className="text-sm text-gray-600"><span className="font-semibold">Prize:</span> {event.prize}</p>
                <p className="text-sm text-gray-600"><span className="font-semibold">Address:</span> {event.address}</p>
              </div>
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
}

export default AllEventsPage;