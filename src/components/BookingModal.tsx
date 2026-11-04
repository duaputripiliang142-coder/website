import React, { useState } from 'react';
import { DOCTORS_DATA, Doctor, CLINIC_INFO } from '../data/clinicData';
import { X, Calendar, Clock, User, CheckCircle2, QrCode, Printer, MessageSquare, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedDoctor?: Doctor | null;
  preSelectedService?: string | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedDoctor,
  preSelectedService
}) => {
  const [step, setStep] = useState<number>(1);

  // Form states
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    preSelectedDoctor ? preSelectedDoctor.id : DOCTORS_DATA[0].id
  );
  const [bookingDate, setBookingDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0] // Tomorrow
  );
  const [bookingTime, setBookingTime] = useState<string>('09:00 WIB');

  const [patientName, setPatientName] = useState<string>('');
  const [nik, setNik] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [insuranceType, setInsuranceType] = useState<string>('umum');
  const [insuranceName, setInsuranceName] = useState<string>('');
  const [notes, setNotes] = useState<string>(preSelectedService ? `Layanan: ${preSelectedService}` : '');

  // Form errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Generated Ticket Result
  const [ticketResult, setTicketResult] = useState<{
    code: string;
    queueNumber: string;
    doctorName: string;
    specialty: string;
    room: string;
    date: string;
    time: string;
    patientName: string;
    insuranceType: string;
  } | null>(null);

  if (!isOpen) return null;

  const selectedDoctor = DOCTORS_DATA.find((d) => d.id === selectedDoctorId) || DOCTORS_DATA[0];

  const availableTimeSlots = [
    '08:30 WIB', '09:15 WIB', '10:00 WIB', '10:45 WIB',
    '13:30 WIB', '14:15 WIB', '15:00 WIB', '16:00 WIB',
    '18:30 WIB', '19:15 WIB', '20:00 WIB'
  ];

  const validateStep3 = () => {
    const errs: { [key: string]: string } = {};
    if (!patientName.trim()) {
      errs.patientName = 'Nama lengkap pasien wajib diisi';
    }
    if (!nik.trim() || nik.length < 16) {
      errs.nik = 'NIK harus 16 digit sesuai e-KTP';
    }
    if (!whatsapp.trim() || whatsapp.length < 9) {
      errs.whatsapp = 'Nomor WhatsApp aktif wajib diisi untuk kirim e-tiket';
    }
    if (insuranceType === 'asuransi' && !insuranceName.trim()) {
      errs.insuranceName = 'Tuliskan nama asuransi Anda (cth: AdMedika, Prudential)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (validateStep3()) {
        // Generate E-Ticket
        const randomNum = Math.floor(Math.random() * 80) + 10;
        const prefix = selectedDoctor.specialtyCategory === 'umum' ? 'A' : 'B';
        const ticketCode = `JB-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${randomNum}`;
        const queueNum = `${prefix}-${String(randomNum).padStart(3, '0')}`;

        setTicketResult({
          code: ticketCode,
          queueNumber: queueNum,
          doctorName: selectedDoctor.name,
          specialty: selectedDoctor.specialty,
          room: selectedDoctor.room,
          date: bookingDate,
          time: bookingTime,
          patientName: patientName,
          insuranceType: insuranceType === 'umum' ? 'Pasien Umum / Mandiri' : insuranceType === 'bpjs' ? 'BPJS Kesehatan' : `Asuransi Swasta (${insuranceName})`
        });

        setStep(4);
      }
    }
  };

  const handlePrintTicket = () => {
    window.print();
  };

  const handleShareToWhatsApp = () => {
    if (!ticketResult) return;
    const msg = encodeURIComponent(
      `*E-TIKET JANJI TEMU KLINIK JB MEDICAL CENTER CIKARANG*\n\n` +
      `No. Tiket: ${ticketResult.code}\n` +
      `Nomor Antrean: ${ticketResult.queueNumber}\n` +
      `Nama Pasien: ${ticketResult.patientName}\n` +
      `Dokter: ${ticketResult.doctorName}\n` +
      `Spesialis: ${ticketResult.specialty}\n` +
      `Ruangan: ${ticketResult.room}\n` +
      `Tanggal: ${ticketResult.date}\n` +
      `Pukul: ${ticketResult.time}\n` +
      `Penjamin: ${ticketResult.insuranceType}\n\n` +
      `Lokasi: Jl. Cikarang Baru Raya Kav. 88, Jababeka II, Cikarang\n` +
      `Harap hadir 15 menit sebelum jam konsultasi dengan membawa KTP.`
    );
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Tutup pendaftaran"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider mb-1">
            <span>Pendaftaran Janji Temu Online</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Konfirmasi Langsung SIMKLINIK</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {step === 4 ? 'E-Tiket Janji Temu Terbit' : 'Formulir Reservasi Dokter'}
          </h2>

          {/* Stepper indicator (Steps 1-3) */}
          {step < 4 && (
            <div className="flex items-center gap-2 mt-4 text-xs">
              <span className={`px-2.5 py-1 rounded font-semibold ${step === 1 ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                1. Pilih Dokter
              </span>
              <span className="text-slate-300">/</span>
              <span className={`px-2.5 py-1 rounded font-semibold ${step === 2 ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                2. Tanggal & Waktu
              </span>
              <span className="text-slate-300">/</span>
              <span className={`px-2.5 py-1 rounded font-semibold ${step === 3 ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                3. Data Diri Pasien
              </span>
            </div>
          )}
        </div>

        {/* STEP 1: SELECT DOCTOR */}
        {step === 1 && (
          <div className="space-y-4">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Pilih Dokter Spesialis / Dokter Umum:
            </label>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {DOCTORS_DATA.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoctorId(doc.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                    selectedDoctorId === doc.id
                      ? 'border-teal-600 bg-teal-50/50 ring-1 ring-teal-600'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <img
                      src={doc.photoUrl}
                      alt={doc.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-teal-800 truncate block">
                        {doc.specialty}
                      </span>
                      <span className="text-xs font-bold text-slate-900 font-mono tabular-nums shrink-0">
                        Rp {doc.consultationFee.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {doc.room} · Pengalaman {doc.experienceYears} thn
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <span>Lanjut: Pilih Waktu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT DATE & TIME */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-200 shrink-0">
                <img
                  src={selectedDoctor.photoUrl}
                  alt={selectedDoctor.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-xs text-teal-700 font-semibold block">{selectedDoctor.specialty}</span>
                <h4 className="text-sm font-bold text-slate-900">{selectedDoctor.name}</h4>
                <p className="text-xs text-slate-500">{selectedDoctor.room}</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Tanggal Kunjungan / Konsultasi:
              </label>
              <input
                type="date"
                value={bookingDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-teal-600 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Pilih Jam Kedatangan (Slot Tersedia):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {availableTimeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setBookingTime(slot)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all font-mono tabular-nums ${
                      bookingTime === slot
                        ? 'border-teal-600 bg-teal-600 text-white shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <span>Lanjut: Data Pasien</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PATIENT INFO */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Lengkap Pasien *
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Sesuai KTP / BPJS"
                className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:bg-white ${
                  errors.patientName ? 'border-rose-500' : 'border-slate-300 focus:border-teal-600'
                }`}
              />
              {errors.patientName && (
                <p className="text-xs text-rose-500 mt-1">{errors.patientName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor Induk Kependudukan (NIK 16 Digit) *
                </label>
                <input
                  type="text"
                  maxLength={16}
                  value={nik}
                  onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))}
                  placeholder="3216xxxxxxxxxxxx"
                  className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-lg font-mono focus:outline-none focus:bg-white ${
                    errors.nik ? 'border-rose-500' : 'border-slate-300 focus:border-teal-600'
                  }`}
                />
                {errors.nik && (
                  <p className="text-xs text-rose-500 mt-1">{errors.nik}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor WhatsApp Aktif *
                </label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value.replace(/[^\d+]/g, ''))}
                  placeholder="Contoh: 08128937xxxx"
                  className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-lg font-mono focus:outline-none focus:bg-white ${
                    errors.whatsapp ? 'border-rose-500' : 'border-slate-300 focus:border-teal-600'
                  }`}
                />
                {errors.whatsapp && (
                  <p className="text-xs text-rose-500 mt-1">{errors.whatsapp}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Jenis Pembayaran / Penjamin:
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { key: 'umum', label: 'Umum / Mandiri' },
                  { key: 'bpjs', label: 'BPJS Kesehatan' },
                  { key: 'asuransi', label: 'Asuransi Swasta' }
                ].map((ins) => (
                  <button
                    key={ins.key}
                    type="button"
                    onClick={() => setInsuranceType(ins.key)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                      insuranceType === ins.key
                        ? 'border-teal-600 bg-teal-50 text-teal-800'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {ins.label}
                  </button>
                ))}
              </div>
            </div>

            {insuranceType === 'asuransi' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Asuransi / Korporasi Rekanan *
                </label>
                <input
                  type="text"
                  value={insuranceName}
                  onChange={(e) => setInsuranceName(e.target.value)}
                  placeholder="Contoh: AdMedika, Prudential, Sinarmas, Astra Life"
                  className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:bg-white ${
                    errors.insuranceName ? 'border-rose-500' : 'border-slate-300 focus:border-teal-600'
                  }`}
                />
                {errors.insuranceName && (
                  <p className="text-xs text-rose-500 mt-1">{errors.insuranceName}</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Keluhan / Keperluan Singkat (Opsional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Sakit lambung 3 hari, demam naik turun, kontrol rutin"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white"
              />
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <span>Konfirmasi & Terbitkan Tiket</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: DIGITAL E-TICKET (PRINTABLE) */}
        {step === 4 && ticketResult && (
          <div>
            <div id="printable-ticket" className="bg-slate-50 border border-slate-300 rounded-2xl p-6 sm:p-7 mb-6">
              {/* Ticket Brand Top */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
                <div>
                  <span className="text-xs font-extrabold text-teal-800 tracking-wider uppercase block">
                    Klinik JB Medical Center Cikarang
                  </span>
                  <p className="text-xs text-slate-500">
                    Sistem Reservasi & Antrean Online Resmi
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block font-mono">Kode Booking</span>
                  <span className="text-sm font-bold font-mono text-slate-900">{ticketResult.code}</span>
                </div>
              </div>

              {/* Big Queue Number */}
              <div className="bg-white rounded-xl p-4 border border-slate-200 text-center mb-5">
                <span className="text-xs uppercase text-slate-500 font-semibold tracking-wider block mb-1">
                  Nomor Antrean Anda
                </span>
                <span className="text-4xl sm:text-5xl font-black text-teal-700 font-mono tracking-tight tabular-nums">
                  {ticketResult.queueNumber}
                </span>
                <span className="text-xs text-slate-500 block mt-1">
                  Harap perhatikan layar panggilan di ruang tunggu {ticketResult.room}
                </span>
              </div>

              {/* Detail Items */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Nama Pasien:</span>
                  <span className="font-bold text-slate-900">{ticketResult.patientName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Metode Penjamin:</span>
                  <span className="font-semibold text-slate-800">{ticketResult.insuranceType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Dokter Pemeriksa:</span>
                  <span className="font-bold text-teal-900">{ticketResult.doctorName}</span>
                  <span className="text-[11px] text-slate-500 block">{ticketResult.specialty}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Jadwal & Waktu:</span>
                  <span className="font-bold text-slate-900">{ticketResult.date}</span>
                  <span className="text-teal-700 font-semibold block">{ticketResult.time}</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Alamat: Jababeka II Cikarang Kav. 88</span>
                <span className="text-teal-700 font-semibold">Status: Terverifikasi Aktif</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleShareToWhatsApp}
                className="w-full sm:flex-1 py-3 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Simpan ke WhatsApp</span>
              </button>

              <button
                onClick={handlePrintTicket}
                className="w-full sm:w-auto py-3 px-4 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Tiket</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto py-3 px-5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 rounded-lg transition-colors"
              >
                Selesai
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
