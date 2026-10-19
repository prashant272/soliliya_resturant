import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import MenuSection from '../components/MenuSection';
import BookingSection from '../components/BookingSection';
import ContactSection from '../components/ContactSection';

const Home = () => {
    return (
        <div className="bg-[#fdfbf7] min-h-screen">
            <Hero />
            <AboutSection />
            <MenuSection />
            <BookingSection />
            <ContactSection />
        </div>
    );
};

export default Home;
