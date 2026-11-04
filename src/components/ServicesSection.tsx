import React, { useState } from 'react';
import { CLINIC_SERVICES, MedicalService } from '../data/clinicData';
import { Activity, Clock, MapPin, CheckCircle, ArrowRight, X, Shield, Calendar } from 'lucide-react';

interface ServicesSectionProps {
  onOpenBookingForService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBookingForService }) => {
  const [selectedService, setSelectedService] = useState<MedicalService | null>(null);

  return (
    <section id="layanan" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider mb-2">
            <span>Standar Pelayanan Medis Komprehensif</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Kemenkes RI & Dinas Kesehatan Bekasi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Layanan Klinis Unggulan JB Medical Center
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Menyediakan ekosistem pelayanan medis terintegrasi: dari pertolongan gawat darurat dan rawat jalan dokter spesialis, hingga laboratorium diagnostik modern dan sertifikasi kesehatan kerja industri.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLINIC_SERVICES.map((srv, index) => {
            const isMarquee = index === 0 || index === 2; // IGD & MCU get distinctive presentation

            return (
              <div
                key={srv.id}
                className={`bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-teal-500/60 hover:shadow-md transition-all flex flex-col justify-between ${
                  isMarquee ? 'lg:col-span-2' : 'col-span-1'
                }`}
              >
                <div>
                  {/* Optional Image Banner for Marquee Cards */}
                  {isMarquee && (
                    <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100">
                      <img
                        src={srv.photoUrl}
                        alt={srv.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                      <div className="absolute bottom-4 left-5 right-5 text-white">
                        <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider block">
                          {srv.category}
                        </span>
                        <h3 className="text-xl font-bold text-white tracking-tight">
                          {srv.title}
                        </h3>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    {!isMarquee && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                          <span className="font-mono font-bold text-teal-700">{srv.number}.</span>
                          <span>{srv.category}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                          {srv.title}
                        </h3>
                      </div>
                    )}

                    <p className="text-sm text-slate-600 leading-relaxed mb-5">
                      {srv.shortDesc}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {srv.features.slice(0, isMarquee ? 4 : 3).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle className="w-3.5 h-3.5 text-teal-600 mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    <span>{srv.operationalHours}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedService(srv)}
                      className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
                    >
                      Detail Info
                    </button>
                    <span className="text-slate-300">·</span>
                    <button
                      onClick={() => onOpenBookingForService(srv.title)}
                      className="text-teal-700 hover:text-teal-800 font-semibold flex items-center gap-1"
                    >
                      <span>Janji Temu</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider block">
                {selectedService.category} · {selectedService.number}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {selectedService.title}
              </h3>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {selectedService.fullDesc}
            </p>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-6">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Cakupan Layanan & Fasilitas
              </h4>
              <ul className="space-y-2.5">
                {selectedService.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-8">
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <span className="text-slate-400 block font-medium">Jam Operasional</span>
                <span className="text-slate-800 font-semibold">{selectedService.operationalHours}</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <span className="text-slate-400 block font-medium">Lokasi Ruangan</span>
                <span className="text-slate-800 font-semibold">{selectedService.roomLocation}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  const srv = selectedService;
                  setSelectedService(null);
                  onOpenBookingForService(srv.title);
                }}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Daftar Sekarang untuk Layanan Ini</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
