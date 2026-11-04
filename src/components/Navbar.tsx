import React, { useState } from 'react';
import { Phone, Clock, MessageSquare, Menu, X, Calendar, AlertCircle } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenQueue: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenQueue }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Emergency & Quick Access Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-teal-400 font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-teal-400"></span>
              IGD & Farmasi Siaga 24 Jam
            </span>
            <span className="hidden sm:inline text-slate-500">·</span>
            <a 
              href={`tel:${CLINIC_INFO.phoneEmergencyMobile}`}
              className="flex items-center gap-1 hover:text-white transition-colors font-medium text-amber-300"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Gawat Darurat: {CLINIC_INFO.phoneEmergency}</span>
            </a>
            <span className="hidden md:inline text-slate-500">·</span>
            <span className="hidden md:flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              Kawasan Industri Jababeka II, Cikarang
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenQueue}
              className="text-slate-300 hover:text-teal-300 transition-colors text-xs flex items-center gap-1 font-medium"
            >
              <AlertCircle className="w-3.5 h-3.5 text-teal-400" />
              <span>Cek Antrean Hari Ini</span>
            </button>
            <span className="text-slate-600">·</span>
            <a
              href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Halo%20Admin%20Klinik%20JB%20Medical%20Center%20Cikarang,%20saya%20ingin%20konsultasi`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Hotline</span>
            </a>
          </div>
        </div>
      </div>

      {/* Primary Top Bar adhering to Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-20">
            {/* Zone 1: Brand Wordmark (Single Text Element) */}
            <a href="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm font-bold text-xl group-hover:bg-teal-700 transition-colors">
                JB
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900 block leading-tight">
                  JB Medical Center
                </span>
                <span className="text-xs text-slate-500 font-medium tracking-normal block">
                  Klinik Utama & MCU Cikarang
                </span>
              </div>
            </a>

            {/* Zone 2: 4-5 Navigation Links (Clean Single-Line Text) */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#layanan" className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0">
                Layanan Klinis
              </a>
              <a href="#jadwal-dokter" className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0">
                Jadwal Dokter
              </a>
              <a href="#mcu-industri" className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0">
                Medical Check-Up
              </a>
              <a href="#antrean" className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0">
                Antrean & Fasilitas
              </a>
              <a href="#lokasi-kontak" className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0">
                Lokasi & Kontak
              </a>
            </nav>

            {/* Zone 3: 1 Primary Action */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <button
                onClick={onOpenBooking}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Buat Janji Temu</span>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={onOpenBooking}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 rounded-md sm:hidden"
              >
                Janji Temu
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
            <a
              href="#layanan"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-slate-700 hover:text-teal-600 border-b border-slate-100"
            >
              Layanan Klinis
            </a>
            <a
              href="#jadwal-dokter"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-slate-700 hover:text-teal-600 border-b border-slate-100"
            >
              Jadwal Dokter
            </a>
            <a
              href="#mcu-industri"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-slate-700 hover:text-teal-600 border-b border-slate-100"
            >
              Medical Check-Up (MCU)
            </a>
            <a
              href="#antrean"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-slate-700 hover:text-teal-600 border-b border-slate-100"
            >
              Cek Antrean Pasien
            </a>
            <a
              href="#lokasi-kontak"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-slate-700 hover:text-teal-600 border-b border-slate-100"
            >
              Lokasi & Kontak
            </a>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 text-center text-sm font-semibold text-white bg-teal-600 rounded-lg shadow-sm"
              >
                Buat Janji Temu Online
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
