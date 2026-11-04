import React from 'react';
import { INSURANCE_PARTNERS, CORPORATE_PARTNERS } from '../data/clinicData';
import { ShieldCheck, CreditCard, CheckCircle2, FileCheck, Building } from 'lucide-react';

export const InsurancePartners: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Klaim Mudah & Bebas Repot</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Kerjasama Asuransi, BPJS & Mitra Industri
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Mendukung fasilitas klaim non-tunai (cashless), jaminan perusahaan langsung, serta faskes rujukan BPJS Kesehatan di Cikarang.
          </p>
        </div>

        {/* Insurance Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-12">
          {INSURANCE_PARTNERS.map((ins, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-teal-500/50 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-4 h-4 text-teal-700 shrink-0" />
                <span className="text-sm font-bold text-slate-900 leading-tight">
                  {ins.name}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 leading-tight block">
                {ins.type}
              </span>
            </div>
          ))}
        </div>

        {/* Corporate Trust Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-xs text-teal-400 font-semibold mb-2">
                <Building className="w-4 h-4 text-teal-400" />
                <span>Kemitraan Korporasi Terpercaya Kawasan Industri</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Dipercaya oleh lebih dari 140+ Perusahaan Manufaktur & Logistik di Cikarang
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Layanan mencakup tanggap darurat kecelakaan kerja pabrik 24 jam, evaluasi penyakit akibat kerja, serta on-site clinic management.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center lg:justify-end max-w-lg">
              {CORPORATE_PARTNERS.map((corp, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 rounded-lg border border-slate-700"
                >
                  {corp}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
