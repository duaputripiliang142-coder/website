import React, { useState } from 'react';
import { Users, Clock, Search, RefreshCw, Volume2, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { INITIAL_QUEUES, QueueDepartment } from '../data/clinicData';

interface QueueTrackerProps {
  onOpenBooking: () => void;
}

export const QueueTracker: React.FC<QueueTrackerProps> = ({ onOpenBooking }) => {
  const [queues, setQueues] = useState<QueueDepartment[]>(INITIAL_QUEUES);
  const [searchCode, setSearchCode] = useState('');
  const [searchResult, setSearchResult] = useState<{
    found: boolean;
    ticketCode?: string;
    department?: string;
    aheadCount?: number;
    estimatedMinutes?: number;
    status?: string;
    room?: string;
  } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [quickTicketSuccess, setQuickTicketSuccess] = useState<string | null>(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate real-time queue bump
      setQueues(prev => prev.map(q => {
        const parts = q.currentNumber.split('-');
        const currentNum = parseInt(parts[1], 10);
        return {
          ...q,
          currentNumber: `${parts[0]}-${String(currentNum + 1).padStart(3, '0')}`,
          waitingCount: Math.max(1, q.waitingCount + (Math.random() > 0.5 ? 1 : -1))
        };
      }));
      setIsRefreshing(false);
    }, 600);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    const code = searchCode.trim().toUpperCase();
    const prefix = code.charAt(0);
    const num = parseInt(code.slice(2), 10);

    const dept = queues.find(q => q.codePrefix === prefix);
    if (!dept || isNaN(num)) {
      setSearchResult({
        found: false
      });
      return;
    }

    const currentDeptNum = parseInt(dept.currentNumber.slice(2), 10);
    const diff = num - currentDeptNum;

    if (diff < 0) {
      setSearchResult({
        found: true,
        ticketCode: code,
        department: dept.name,
        status: "Nomor antrean Anda telah selesai dipanggil. Silakan melapor ke petugas informasi bila terlewat.",
        aheadCount: 0,
        estimatedMinutes: 0,
        room: dept.room
      });
    } else if (diff === 0) {
      setSearchResult({
        found: true,
        ticketCode: code,
        department: dept.name,
        status: "SEDANG DIPANGGIL! Segera menuju ke ruangan pemeriksaan.",
        aheadCount: 0,
        estimatedMinutes: 0,
        room: dept.room
      });
      if (soundEnabled) {
        // Quick visual or audio ding simulation
      }
    } else {
      setSearchResult({
        found: true,
        ticketCode: code,
        department: dept.name,
        status: `Sedang dalam antrean. Sisa ${diff} pasien sebelum nomor Anda.`,
        aheadCount: diff,
        estimatedMinutes: diff * dept.avgWaitMins,
        room: dept.room
      });
    }
  };

  const handleQuickGetQueue = (deptId: string) => {
    const dept = queues.find(q => q.id === deptId);
    if (!dept) return;

    const parts = dept.currentNumber.split('-');
    const currentNum = parseInt(parts[1], 10);
    const myNum = currentNum + dept.waitingCount + 1;
    const ticketCode = `${dept.codePrefix}-${String(myNum).padStart(3, '0')}`;

    setQuickTicketSuccess(`Tiket Berhasil Diambil: ${ticketCode} (${dept.name}). Estimasi panggilan: ${dept.waitingCount * dept.avgWaitMins + dept.avgWaitMins} menit.`);
    setSearchCode(ticketCode);
  };

  return (
    <section id="antrean" className="py-16 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">
              <span>Sistem Antrean Real-time</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Terhubung Sistem Informasi Manajemen Klinik (SIMKLINIK)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Pantau Antrean Poli & Farmasi Hari Ini
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-xl">
              Cek nomor panggilan aktif saat ini agar Anda dapat mengatur waktu keberangkatan dari rumah atau pabrik tanpa menunggu berjam-jam di ruang tunggu.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 ${
                soundEnabled 
                  ? 'border-teal-500/50 bg-teal-950/60 text-teal-300' 
                  : 'border-slate-700 bg-slate-800 text-slate-400'
              }`}
              title="Notifikasi Suara Panggilan"
            >
              <Volume2 className="w-4 h-4" />
              <span>Suara: {soundEnabled ? 'Aktif' : 'Nonaktif'}</span>
            </button>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 rounded-lg border border-slate-700 transition-colors flex items-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-teal-400' : ''}`} />
              <span>{isRefreshing ? 'Memperbarui...' : 'Perbarui Status'}</span>
            </button>
          </div>
        </div>

        {/* Live Queue Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {queues.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800/90 border border-slate-700 rounded-xl p-5 hover:border-teal-500/50 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-medium">{item.room}</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Users className="w-3.5 h-3.5" />
                    Sisa: {item.waitingCount} Pasien
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-4 line-clamp-1">
                  {item.name}
                </h3>

                {/* Big Calling Number Display */}
                <div className="bg-slate-900/90 rounded-lg p-4 border border-slate-700/80 text-center mb-4">
                  <span className="text-xs uppercase tracking-wider text-slate-400 block mb-1">
                    Sedang Dipanggil
                  </span>
                  <div className="text-4xl font-extrabold text-teal-400 font-mono tracking-tight tabular-nums">
                    {item.currentNumber}
                  </div>
                </div>

                <div className="text-xs text-slate-300 space-y-1 mb-4">
                  <p className="flex items-center justify-between">
                    <span className="text-slate-400">Dokter / Petugas:</span>
                    <span className="font-medium text-slate-200 truncate max-w-[150px]">{item.activeDoctor}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-slate-400">Estimasi Tunggu:</span>
                    <span className="font-semibold text-amber-300 font-mono tabular-nums">
                      ± {item.waitingCount * item.avgWaitMins} mnt
                    </span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleQuickGetQueue(item.id)}
                className="w-full py-2 px-3 text-xs font-semibold text-teal-300 bg-teal-950/60 hover:bg-teal-900/80 active:bg-teal-800/80 border border-teal-800/70 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Ambil Nomor Antrean</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {quickTicketSuccess && (
          <div className="mb-8 p-4 rounded-xl bg-teal-950/80 border border-teal-600/60 text-teal-200 text-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
              <span>{quickTicketSuccess}</span>
            </div>
            <button 
              onClick={() => setQuickTicketSuccess(null)}
              className="text-xs text-teal-400 hover:text-white underline shrink-0"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Check Specific Ticket Form */}
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 sm:p-8">
          <div className="max-w-2xl mx-auto text-center mb-6">
            <h3 className="text-lg font-bold text-white mb-2">
              Sudah Memiliki Tiket Antrean atau Kode Booking?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Masukkan kode tiket Anda (contoh: <code className="text-teal-300 font-mono">A-045</code>, <code className="text-teal-300 font-mono">B-020</code>, atau kode booking) untuk memantau sisa giliran Anda.
            </p>
          </div>

          <form onSubmit={handleSearch} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Masukkan Nomor Tiket (cth: A-045)"
                className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 font-mono uppercase"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold rounded-lg text-sm transition-colors whitespace-nowrap shrink-0"
            >
              Cek Posisi Saya
            </button>
          </form>

          {/* Search Result Box */}
          {searchResult && (
            <div className="mt-6 max-w-xl mx-auto">
              {searchResult.found ? (
                <div className="p-5 rounded-xl bg-slate-900 border border-teal-500/40 text-slate-200">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                    <div>
                      <span className="text-xs text-slate-400">Kode Tiket Pasien</span>
                      <p className="text-xl font-bold font-mono text-teal-400">{searchResult.ticketCode}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400">Tujuan Poli</span>
                      <p className="text-sm font-semibold text-white">{searchResult.department}</p>
                    </div>
                  </div>

                  <p className="text-sm font-medium text-slate-100 mb-3">{searchResult.status}</p>

                  <div className="grid grid-cols-2 gap-3 text-xs bg-slate-800/80 p-3 rounded-lg border border-slate-700/60 font-mono">
                    <div>
                      <span className="text-slate-400 block font-sans">Pasien di Depan:</span>
                      <span className="text-base font-bold text-teal-300 tabular-nums">
                        {searchResult.aheadCount} Orang
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-sans">Estimasi Waktu:</span>
                      <span className="text-base font-bold text-amber-300 tabular-nums">
                        ± {searchResult.estimatedMinutes} Menit
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-sm flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400" />
                  <span>
                    Nomor tiket <strong>"{searchCode}"</strong> tidak ditemukan dalam sistem antrean hari ini. Silakan periksa kembali huruf loket dan nomor tiket Anda.
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
