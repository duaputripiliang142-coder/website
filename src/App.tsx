/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { QueueTracker } from './components/QueueTracker';
import { ServicesSection } from './components/ServicesSection';
import { DoctorScheduleSection } from './components/DoctorScheduleSection';
import { McuSection } from './components/McuSection';
import { InsurancePartners } from './components/InsurancePartners';
import { TestimonialsAndFaq } from './components/TestimonialsAndFaq';
import { FooterAndContact } from './components/FooterAndContact';
import { BookingModal } from './components/BookingModal';
import { FloatingActions } from './components/FloatingActions';
import { Doctor } from './data/clinicData';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preSelectedDoctor, setPreSelectedDoctor] = useState<Doctor | null>(null);
  const [preSelectedService, setPreSelectedService] = useState<string | null>(null);

  const handleOpenBooking = () => {
    setPreSelectedDoctor(null);
    setPreSelectedService(null);
    setIsBookingOpen(true);
  };

  const handleOpenBookingForDoctor = (doctor: Doctor) => {
    setPreSelectedDoctor(doctor);
    setPreSelectedService(null);
    setIsBookingOpen(true);
  };

  const handleOpenBookingForService = (serviceName: string) => {
    setPreSelectedDoctor(null);
    setPreSelectedService(serviceName);
    setIsBookingOpen(true);
  };

  const handleOpenQueue = () => {
    const queueSection = document.getElementById('antrean');
    if (queueSection) {
      queueSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      {/* Top Navbar */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenQueue={handleOpenQueue}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenBooking={handleOpenBooking}
          onOpenQueue={handleOpenQueue}
        />

        {/* Live Queue Monitor */}
        <QueueTracker
          onOpenBooking={handleOpenBooking}
        />

        {/* Core Clinical Services Bento Grid */}
        <ServicesSection
          onOpenBookingForService={handleOpenBookingForService}
        />

        {/* Doctor Schedules & Specialist Profiles */}
        <DoctorScheduleSection
          onSelectDoctorForBooking={handleOpenBookingForDoctor}
        />

        {/* Medical Check-Up & Corporate Calculator */}
        <McuSection
          onOpenBookingForMcu={handleOpenBookingForService}
        />

        {/* Insurance & Corporate Partners */}
        <InsurancePartners />

        {/* Testimonials & FAQs */}
        <TestimonialsAndFaq />
      </main>

      {/* Footer & Location Guide */}
      <FooterAndContact />

      {/* Floating Emergency & WhatsApp Widgets */}
      <FloatingActions
        onOpenBooking={handleOpenBooking}
      />

      {/* Interactive Online Appointment Booking Wizard */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedDoctor={preSelectedDoctor}
        preSelectedService={preSelectedService}
      />
    </div>
  );
}
