import React from 'react';
import { ShieldCheck, Clock, Award, Users, ChevronRight, PhoneCall, Calendar } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenQueue: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onOpenQueue }) => {
  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-50/50 via-white to-slate-50/30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-24">
        {/* Two-Column Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Quiet Editorial Kicker (No Pill Enclosures) */}
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider mb-4">
              <span>Akreditasi Paripurna Kemenkes RI</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Kawasan Industri Cikarang</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6" style={{ textWrap: 'balance' }}>
              Layanan Medis Terpadu & Terpercaya di Pusat Industri Cikarang
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl">
              Klinik JB Medical Center menghadirkan fasilitas kesehatan komprehensif bagi keluarga, karyawan pabrik, dan mitra industri. Didukung IGD 24 Jam, Poli Spesialis, Laboratorium Cepat, serta paket Medical Check-Up K3 terstandar nasional.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 text-center"
              >
                <Calendar className="w-4 h-4" />
                <span>Daftar Janji Temu Online</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href="#jadwal-dokter"
                className="px-6 py-3.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-lg transition-colors flex items-center justify-center gap-2 text-center"
              >
                <span>Lihat Jadwal Dokter</span>
              </a>

              <a
                href={`tel:${CLINIC_INFO.phoneEmergencyMobile}`}
                className="px-5 py-3.5 text-sm font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors flex items-center justify-center gap-2 text-center"
              >
                <PhoneCall className="w-4 h-4 text-rose-600" />
                <span>IGD Darurat 24 Jam</span>
              </a>
            </div>

            {/* Trust Markers - Clean unboxed text with subtle dividers */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <p className="text-2xl font-bold text-slate-900 tracking-tight font-mono tabular-nums">
                  24/7
                </p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  IGD & Farmasi Buka
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-slate-900 tracking-tight font-mono tabular-nums">
                  32+
                </p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Dokter & Tenaga Medis
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-slate-900 tracking-tight font-mono tabular-nums">
                  140+
                </p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Perusahaan Rekanan
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-teal-700 tracking-tight font-mono tabular-nums">
                  BPJS & Asuransi
                </p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Klaim Cashless Resmi
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 h-full min-h-[360px] lg:min-h-[460px] flex flex-col">
              <img
                src="/src/assets/images/hero_clinic_reception_1793197729861.jpg"
                alt="Lobi dan Reception Klinik JB Medical Center Cikarang yang bersih dan modern"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent text-white">
                <div className="flex items-center gap-2 text-xs text-teal-300 font-semibold mb-1">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>Kenyamanan & Kecepatan Layanan Pasien</span>
                </div>
                <p className="text-sm font-medium text-slate-100">
                  Fasilitas klinik modern berstandar rumah sakit di kawasan Jababeka II Cikarang.
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/15">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-300" />
                    Waktu Tunggu Rata-rata: 12 Menit
                  </span>
                  <button
                    onClick={onOpenQueue}
                    className="text-teal-300 hover:text-white underline font-semibold transition-colors"
                  >
                    Pantau Antrean Live &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
