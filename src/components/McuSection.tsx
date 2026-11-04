import React, { useState } from 'react';
import { MCU_PACKAGES, McuPackage, CLINIC_INFO } from '../data/clinicData';
import { Check, Building2, Truck, FileText, Download, MessageSquare, Calculator, ShieldCheck } from 'lucide-react';

interface McuSectionProps {
  onOpenBookingForMcu: (packageName: string) => void;
}

export const McuSection: React.FC<McuSectionProps> = ({ onOpenBookingForMcu }) => {
  const [selectedCalcPkgId, setSelectedCalcPkgId] = useState<string>('mcu-industrial');
  const [headcount, setHeadcount] = useState<number>(75);
  const [includeOnsiteBus, setIncludeOnsiteBus] = useState<boolean>(true);
  const [companyName, setCompanyName] = useState<string>('');
  const [showQuotationModal, setShowQuotationModal] = useState<boolean>(false);

  const selectedPkg = MCU_PACKAGES.find((p) => p.id === selectedCalcPkgId) || MCU_PACKAGES[1];

  // Tiered discount calculation
  let discountPercent = 0;
  if (headcount >= 250) discountPercent = 20;
  else if (headcount >= 100) discountPercent = 15;
  else if (headcount >= 50) discountPercent = 10;
  else if (headcount >= 25) discountPercent = 5;

  const basePricePerPerson = selectedPkg.price;
  const discountedPricePerPerson = basePricePerPerson * (1 - discountPercent / 100);
  const subtotalEmployees = discountedPricePerPerson * headcount;
  const onsiteLogisticsFee = includeOnsiteBus ? (headcount >= 100 ? 0 : 750000) : 0; // Free onsite for 100+
  const grandTotal = subtotalEmployees + onsiteLogisticsFee;

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Halo Tim Corporate MCU JB Medical Center Cikarang,\n` +
      `Saya ingin meminta penawaran resmi Medical Check-Up:\n` +
      `- Perusahaan: ${companyName || 'Calon Klien Pabrik Cikarang'}\n` +
      `- Paket Dipilih: ${selectedPkg.name}\n` +
      `- Jumlah Karyawan: ${headcount} orang\n` +
      `- Layanan Onsite Mobile Bus: ${includeOnsiteBus ? 'Ya, di Lokasi Pabrik' : 'Tidak, Datang ke Klinik'}\n` +
      `- Estimasi Anggaran: Rp ${grandTotal.toLocaleString('id-ID')}\n` +
      `Mohon dikirimkan proposal penawaran resmi (Surat Penawaran Harga / SPH). Terima kasih.`
    );
    window.open(`https://wa.me/${CLINIC_INFO.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="mcu-industri" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider mb-2">
            <span>Occupational Health & K3 Industri</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Standar Kemenaker & BNSP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Medical Check-Up (MCU) Karyawan & Korporasi
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Menjaga produktivitas dan keselamatan tenaga kerja di kawasan industri Cikarang dengan pemeriksaan kesehatan kerja berkala, sertifikasi fit-to-work, serta layanan Mobile MCU langsung ke pabrik Anda.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {MCU_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                pkg.popular
                  ? 'border-teal-600 shadow-md ring-1 ring-teal-600'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {pkg.name}
                  </h3>
                  {pkg.badge && (
                    <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 border border-teal-200/80 rounded px-2 py-0.5 whitespace-nowrap shrink-0">
                      Rekomendasi Pabrik
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  {pkg.tagline}
                </p>

                {/* Price Display */}
                <div className="mb-5 pb-4 border-b border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-slate-500 font-medium">Rp</span>
                    <span className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight tabular-nums">
                      {pkg.price.toLocaleString('id-ID')}
                    </span>
                    <span className="text-xs text-slate-400">/ orang</span>
                  </div>
                  <span className="text-[11px] text-teal-700 font-medium block mt-1">
                    Durasi: ~{pkg.durationMinutes} Menit · {pkg.turnaroundTime}
                  </span>
                </div>

                {/* Scope items */}
                <div className="mb-6">
                  <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider block mb-2.5">
                    Item Pemeriksaan:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {pkg.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => onOpenBookingForMcu(pkg.name)}
                  className={`w-full py-2.5 px-4 text-xs font-semibold rounded-lg transition-colors text-center ${
                    pkg.popular
                      ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  Daftar MCU Paket Ini
                </button>
                <button
                  onClick={() => {
                    setSelectedCalcPkgId(pkg.id);
                    const calcEl = document.getElementById('kalkulator-mcu');
                    if (calcEl) calcEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs text-slate-600 hover:text-slate-900 font-medium text-center py-1"
                >
                  Hitung Simulasi Korporasi &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Corporate MCU Quotation Simulator */}
        <div id="kalkulator-mcu" className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              {/* Left Column: Form Controls */}
              <div className="w-full lg:w-7/12">
                <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider mb-2">
                  <Calculator className="w-4 h-4 text-teal-600" />
                  <span>Kalkulator Penawaran Khusus Perusahaan (Corporate MCU)</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
                  Simulasi Biaya & Diskon Karyawan Rombongan
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-6">
                  Dapatkan penawaran harga terbaik untuk pemeriksaan pra-kerja maupun MCU tahunan karyawan perusahaan di kawasan industri Cikarang.
                </p>

                <div className="space-y-5">
                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Perusahaan / Pabrik (Opsional)
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Contoh: PT Astra Component Cikarang"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white"
                    />
                  </div>

                  {/* Choose Package */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Pilihan Paket Medical Check-Up
                    </label>
                    <select
                      value={selectedCalcPkgId}
                      onChange={(e) => setSelectedCalcPkgId(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white font-medium"
                    >
                      {MCU_PACKAGES.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} — Rp {p.price.toLocaleString('id-ID')} / org
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Number of Employees Slider */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
                      <span>Estimasi Jumlah Karyawan</span>
                      <span className="text-teal-700 font-mono text-sm tabular-nums">
                        {headcount} Orang
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={1000}
                      step={5}
                      value={headcount}
                      onChange={(e) => setHeadcount(parseInt(e.target.value, 10))}
                      className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                      <span>10 org</span>
                      <span>50 org (Diskon 10%)</span>
                      <span>100 org (Diskon 15% & Onsite Gratis)</span>
                      <span>500+ org (Diskon 20%)</span>
                    </div>
                  </div>

                  {/* On-Site Mobile Bus Toggle */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="onsite-bus-check"
                      checked={includeOnsiteBus}
                      onChange={(e) => setIncludeOnsiteBus(e.target.checked)}
                      className="mt-1 h-4 w-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                    />
                    <label htmlFor="onsite-bus-check" className="cursor-pointer text-xs">
                      <span className="font-bold text-slate-800 block">
                        Layanan On-Site ke Pabrik (Mobile X-Ray & Tim Dokter Datang)
                      </span>
                      <span className="text-slate-500 block mt-0.5">
                        Tim medis & bus rontgen digital datang langsung ke pabrik. Gratis biaya mobilisasi untuk peserta di atas 100 orang.
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Pricing Summary Card */}
              <div className="w-full lg:w-5/12 bg-slate-900 text-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                    <div>
                      <span className="text-xs text-slate-400 block">Paket Terpilih</span>
                      <span className="text-base font-bold text-teal-400">{selectedPkg.name}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 tabular-nums">
                      {headcount} Peserta
                    </span>
                  </div>

                  {/* Breakdown rows */}
                  <div className="space-y-2.5 text-xs text-slate-300 mb-6 font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans">Tarif Normal:</span>
                      <span>Rp {basePricePerPerson.toLocaleString('id-ID')} / org</span>
                    </div>

                    <div className="flex justify-between text-teal-400">
                      <span className="text-slate-400 font-sans">Diskon Rombongan ({discountPercent}%):</span>
                      <span>- Rp {(basePricePerPerson * (discountPercent / 100)).toLocaleString('id-ID')} / org</span>
                    </div>

                    <div className="flex justify-between font-bold text-white pt-1 border-t border-slate-800">
                      <span className="text-slate-300 font-sans">Tarif Bersih Per Karyawan:</span>
                      <span>Rp {discountedPricePerPerson.toLocaleString('id-ID')}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans">Biaya Mobilisasi Onsite Bus:</span>
                      <span>
                        {includeOnsiteBus ? (
                          onsiteLogisticsFee === 0 ? (
                            <span className="text-teal-400 font-semibold font-sans">GRATIS (≥100 Karyawan)</span>
                          ) : (
                            `Rp ${onsiteLogisticsFee.toLocaleString('id-ID')}`
                          )
                        ) : (
                          'Tidak Digunakan'
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Grand Total Box */}
                  <div className="bg-slate-800/90 rounded-xl p-4 border border-slate-700/80 mb-6">
                    <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
                      Estimasi Total Anggaran MCU:
                    </span>
                    <div className="text-3xl font-extrabold text-white font-mono tracking-tight tabular-nums">
                      Rp {grandTotal.toLocaleString('id-ID')}
                    </div>
                    <span className="text-[11px] text-teal-300 block mt-1">
                      Termasuk Sertifikat Kelaikan Kerja Kemenaker & Portal Laporan HRD
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={handleWhatsAppInquiry}
                    className="w-full py-3 px-4 text-xs font-semibold text-slate-900 bg-teal-400 hover:bg-teal-300 active:bg-teal-200 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-slate-950" />
                    <span>Minta Surat Penawaran Resmi (SPH) via WA</span>
                  </button>

                  <p className="text-[11px] text-slate-400 text-center">
                    Atau hubungi Marketing MCU kami: <span className="text-slate-300 font-medium">0812-8937-800</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
