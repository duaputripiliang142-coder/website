import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { MapPin, Phone, Mail, Clock, Shield, ArrowUpRight, MessageSquare, AlertCircle } from 'lucide-react';

export const FooterAndContact: React.FC = () => {
  return (
    <footer id="lokasi-kontak" className="bg-slate-900 text-slate-300">
      {/* Contact & Location Highlight Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Clinic Brand & Address Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold text-xl">
                JB
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight block">
                  {CLINIC_INFO.name}
                </span>
                <span className="text-xs text-slate-400 font-medium block">
                  {CLINIC_INFO.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md pt-2">
              Klinik utama berstandar nasional yang melayani penanganan gawat darurat 24 jam, poli spesialis, laboratorium diagnostik otomatis, serta medical check-up industri terakreditasi Kemenkes RI.
            </p>

            <div className="pt-2 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  {CLINIC_INFO.address}
                  <span className="block text-slate-500 mt-0.5">{CLINIC_INFO.addressNotes}</span>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>IGD 24 Jam: <a href={`tel:${CLINIC_INFO.phoneEmergencyMobile}`} className="text-amber-300 font-bold hover:underline">{CLINIC_INFO.phoneEmergency}</a> / {CLINIC_INFO.phoneEmergencyMobile}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Corporate MCU: <a href={`mailto:${CLINIC_INFO.emailCorporate}`} className="text-slate-200 hover:underline">{CLINIC_INFO.emailCorporate}</a></span>
              </div>
            </div>

            <div className="pt-3">
              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 active:bg-slate-600 rounded-lg border border-slate-700 transition-colors"
              >
                <span>Buka Petunjuk Arah di Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Operational Hours Box */}
          <div className="lg:col-span-4 bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-4 flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Jam Operasional Pelayanan</span>
            </h4>

            <div className="space-y-3 text-xs divide-y divide-slate-700/60">
              <div className="pb-2">
                <span className="text-slate-400 block">Instalasi Gawat Darurat (IGD):</span>
                <span className="text-emerald-400 font-bold">{CLINIC_INFO.operatingHours.emergency}</span>
              </div>
              <div className="pt-2 pb-2">
                <span className="text-slate-400 block">Instalasi Farmasi & Apotek:</span>
                <span className="text-emerald-400 font-bold">{CLINIC_INFO.operatingHours.pharmacy}</span>
              </div>
              <div className="pt-2 pb-2">
                <span className="text-slate-400 block">Poli Spesialis Terpadu:</span>
                <span className="text-slate-200 font-medium">{CLINIC_INFO.operatingHours.specialist}</span>
              </div>
              <div className="pt-2 pb-2">
                <span className="text-slate-400 block">Laboratorium & Radiologi:</span>
                <span className="text-slate-200 font-medium">{CLINIC_INFO.operatingHours.laboratory}</span>
              </div>
              <div className="pt-2">
                <span className="text-slate-400 block">Medical Check-Up (MCU) Karyawan:</span>
                <span className="text-slate-200 font-medium">{CLINIC_INFO.operatingHours.mcu}</span>
              </div>
            </div>
          </div>

          {/* Emergency & Direct Help Actions */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-4">
            <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-800/60 text-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">
                <AlertCircle className="w-4 h-4" />
                <span>Panggilan Ambulans Cikarang</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Siap tanggap evakuasi pasien darurat di kawasan pabrik Jababeka, EJIP, MM2100, Delta Silicon, & Lippo Cikarang.
              </p>
              <a
                href={`tel:${CLINIC_INFO.phoneEmergencyMobile}`}
                className="w-full py-2.5 px-3 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Hubungi IGD (021) 893-7800</span>
              </a>
            </div>

            <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 text-xs">
              <span className="font-semibold text-slate-200 block mb-1">
                Kemitraan Korporasi & BPJS:
              </span>
              <p className="text-slate-400 mb-2">
                Melayani pendaftaran faskes BPJS dan kerjasama kesehatan perusahaan langsung.
              </p>
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Halo%20Admin%20JB%20Medical%20Center,%20kami%20ingin%20kerjasama%20korporat`}
                target="_blank"
                rel="noreferrer"
                className="text-teal-400 hover:text-teal-300 font-semibold inline-flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat Admin Korporasi via WA &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quiet Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>
          &copy; {new Date().getFullYear()} Klinik JB Medical Center Cikarang. Seluruh Hak Cipta Dilindungi Undang-Undang.
        </p>
        <div className="flex items-center gap-4 text-slate-400">
          <span>Izin Operasional: 445/082/DPMPTSP-BKS/2024</span>
          <span>·</span>
          <span>Akreditasi Paripurna Kemenkes RI</span>
        </div>
      </div>
    </footer>
  );
};
