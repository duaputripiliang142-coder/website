import React, { useState } from 'react';
import { DOCTORS_DATA, Doctor } from '../data/clinicData';
import { Calendar, Clock, Award, MapPin, Search, Check, ChevronRight } from 'lucide-react';

interface DoctorScheduleSectionProps {
  onSelectDoctorForBooking: (doctor: Doctor) => void;
}

export const DoctorScheduleSection: React.FC<DoctorScheduleSectionProps> = ({ onSelectDoctorForBooking }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const specialties = [
    { key: 'all', label: 'Semua Spesialisasi' },
    { key: 'sp.pd', label: 'Penyakit Dalam' },
    { key: 'sp.a', label: 'Anak (Pediatri)' },
    { key: 'sp.og', label: 'Kandungan (Obgyn)' },
    { key: 'gigi', label: 'Gigi & Mulut' },
    { key: 'okupasi', label: 'K3 & Okupasi' },
    { key: 'umum', label: 'Dokter Umum & IGD' }
  ];

  const days = ['all', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  const filteredDoctors = DOCTORS_DATA.filter((doc) => {
    // Filter specialty
    if (selectedSpecialty !== 'all' && doc.specialtyCategory !== selectedSpecialty) {
      return false;
    }
    // Filter day
    if (selectedDay !== 'all') {
      const worksOnDay = doc.schedules.some((s) => s.day === selectedDay);
      if (!worksOnDay) return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = doc.name.toLowerCase().includes(q);
      const matchSpec = doc.specialty.toLowerCase().includes(q);
      const matchBio = doc.bio.toLowerCase().includes(q);
      if (!matchName && !matchSpec && !matchBio) return false;
    }
    return true;
  });

  return (
    <section id="jadwal-dokter" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider mb-2">
              <span>Tim Medis Berpengalaman</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Izin Praktik Resmi SIP Dinas Kesehatan Kab. Bekasi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Jadwal Praktik Dokter & Spesialis
            </h2>
            <p className="text-base text-slate-600 mt-2 max-w-2xl">
              Pilih dokter spesialis atau dokter umum terpercaya kami dan jadwalkan kunjungan Anda tanpa antre manual.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-72">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama dokter atau keluhan..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Filter Controls: Segmented Buttons for Specialty & Days */}
        <div className="space-y-4 mb-10">
          {/* Specialty Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {specialties.map((spec) => (
              <button
                key={spec.key}
                onClick={() => setSelectedSpecialty(spec.key)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors shrink-0 ${
                  selectedSpecialty === spec.key
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {spec.label}
              </button>
            ))}
          </div>

          {/* Day Filter Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-500 font-medium mr-2 shrink-0">Hari Praktik:</span>
            {days.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDay(d)}
                className={`px-3 py-1 rounded-md whitespace-nowrap transition-colors shrink-0 font-medium ${
                  selectedDay === d
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {d === 'all' ? 'Semua Hari' : d}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-teal-500/60 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="p-6">
                  {/* Doctor Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      <img
                        src={doctor.photoUrl}
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-teal-700 block">
                        {doctor.specialty}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {doctor.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {doctor.education}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {doctor.bio}
                  </p>

                  <div className="text-xs text-slate-500 space-y-1 mb-5 pt-3 border-t border-slate-100">
                    <p className="flex items-center justify-between">
                      <span className="text-slate-400">Pengalaman:</span>
                      <span className="font-semibold text-slate-800 font-mono tabular-nums">{doctor.experienceYears} Tahun</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="text-slate-400">Lokasi Ruang:</span>
                      <span className="font-medium text-slate-700">{doctor.room}</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="text-slate-400">Tarif Konsultasi:</span>
                      <span className="font-bold text-teal-700 font-mono tabular-nums">
                        Rp {doctor.consultationFee.toLocaleString('id-ID')}
                      </span>
                    </p>
                  </div>

                  {/* Schedule List */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 mb-2">
                    <span className="text-xs font-semibold text-slate-700 block mb-2">
                      Jadwal Praktik Mingguan:
                    </span>
                    <div className="space-y-1 text-xs">
                      {doctor.schedules.map((sc, idx) => (
                        <div key={idx} className="flex items-center justify-between text-slate-600">
                          <span className="font-medium text-slate-800">{sc.day}</span>
                          <span className="font-mono text-slate-600 tabular-nums">{sc.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50/50 border-t border-slate-100">
                  <button
                    onClick={() => onSelectDoctorForBooking(doctor)}
                    className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Pilih Dokter & Jadwalkan</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-sm text-slate-600 mb-3">
              Tidak ditemukan jadwal dokter untuk kriteria filter yang Anda pilih.
            </p>
            <button
              onClick={() => {
                setSelectedSpecialty('all');
                setSelectedDay('all');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-teal-700 hover:underline"
            >
              Reset Semua Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
