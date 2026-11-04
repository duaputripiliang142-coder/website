import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface FloatingActionsProps {
  onOpenBooking: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenBooking }) => {
  return (
    <aside aria-label="Aksi Cepat" className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2.5">
      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Halo%20Admin%20Klinik%20JB%20Medical%20Center%20Cikarang,%20saya%20ingin%20bertanya%20layanan`}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all text-xs font-semibold group"
        title="Chat WhatsApp Resmi"
      >
        <MessageSquare className="w-4 h-4 fill-white" />
        <span className="hidden sm:inline">WhatsApp CS</span>
      </a>

      {/* Emergency Call Floating Button */}
      <a
        href={`tel:${CLINIC_INFO.phoneEmergencyMobile}`}
        className="flex items-center gap-2 px-3.5 py-2.5 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all text-xs font-semibold group"
        title="Hubungi IGD 24 Jam"
      >
        <Phone className="w-4 h-4 fill-white animate-bounce" />
        <span className="hidden sm:inline">IGD 24 Jam</span>
      </a>
    </aside>
  );
};
