/**
 * Clinic Data for Klinik JB Medical Center Cikarang
 */

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  specialtyCategory: 'umum' | 'sp.pd' | 'sp.a' | 'sp.og' | 'gigi' | 'okupasi';
  title: string;
  education: string;
  sipNumber: string;
  experienceYears: number;
  consultationFee: number;
  room: string;
  photoUrl: string;
  schedules: {
    day: string; // 'Senin', 'Selasa', etc.
    hours: string; // '08:00 - 12:00'
  }[];
  bio: string;
}

export interface MedicalService {
  id: string;
  number: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  operationalHours: string;
  roomLocation: string;
  equipment: string[];
  photoUrl: string;
}

export interface McuPackage {
  id: string;
  name: string;
  tagline: string;
  price: number;
  badge?: string;
  targetAudience: string;
  durationMinutes: number;
  turnaroundTime: string;
  items: string[];
  popular?: boolean;
}

export interface QueueDepartment {
  id: string;
  codePrefix: string;
  name: string;
  currentNumber: string;
  waitingCount: number;
  avgWaitMins: number;
  activeDoctor: string;
  room: string;
}

export const CLINIC_INFO = {
  name: "JB Medical Center Cikarang",
  tagline: "Pusat Layanan Medis Terpadu & Terpercaya Kawasan Industri Cikarang",
  address: "Jl. Cikarang Baru Raya Kav. 88, Kawasan Industri Jababeka II, Cikarang, Kab. Bekasi, Jawa Barat 17530",
  addressNotes: "Akses 5 menit dari Bundaran Golf Jababeka & Pintu Tol Cikarang Timur / Cibatu",
  googleMapsUrl: "https://maps.google.com/?q=Jababeka+Cikarang+Bekasi",
  phoneEmergency: "(021) 893-7800",
  phoneEmergencyMobile: "0811-9876-800",
  phoneCallCenter: "(021) 893-7801",
  whatsapp: "628128937800",
  emailGeneral: "layanan@jbmedicalcenter.co.id",
  emailCorporate: "mcu.corporate@jbmedicalcenter.co.id",
  operatingHours: {
    emergency: "24 Jam Setiap Hari (Termasuk Hari Libur Nasional)",
    pharmacy: "24 Jam Setiap Hari",
    specialist: "Senin – Sabtu: 08:00 – 21:00 WIB",
    laboratory: "Senin – Minggu: 06:30 – 21:00 WIB",
    mcu: "Senin – Sabtu: 07:00 – 16:00 WIB (Onsite & Clinic)"
  },
  stats: [
    { label: "Pasien Terlayani", value: "85.000+", unit: "sejak 2018" },
    { label: "Perusahaan Rekanan", value: "140+", unit: "Kawasan Industri" },
    { label: "Dokter & Tenaga Medis", value: "32", unit: "Spesialis & Umum" },
    { label: "Ketepatan Waktu Layanan", value: "98.4%", unit: "Standar Akreditasi" },
  ]
};

export const CLINIC_SERVICES: MedicalService[] = [
  {
    id: "igd-umum",
    number: "01",
    title: "Instalasi Gawat Darurat (IGD) & Poli Umum 24 Jam",
    category: "Gawat Darurat & Layanan Dasar",
    shortDesc: "Pertolongan darurat medis 24 jam dengan dokter jaga siaga, resusitasi, penanganan kecelakaan kerja industri, dan poli umum.",
    fullDesc: "Unit IGD kami dirancang khusus untuk respon cepat kecelakaan kerja pabrik, cedera akut, sesak nafas, demam tinggi, dan kondisi kegawatan medis lainnya dengan standar triase Kemenkes.",
    features: [
      "Dokter umum dan perawat bersertifikasi ACLS/ATLS standby 24 jam",
      "Penanganan cedera kecelakaan kerja (trauma luka, hecting, fraktur awal)",
      "Bed pemantauan observasi dengan monitor tanda vital digital",
      "Peralatan nebulizer, suction, tabung O2 medis berkapasitas besar",
      "Rujukan cepat ambulans ke rumah sakit tipe B/A terdekat"
    ],
    operationalHours: "24 Jam / 7 Hari Non-Stop",
    roomLocation: "Gedung Utama Lantai 1 (Akses Langsung Jalur Ambulans)",
    equipment: ["Patient Monitor 5-Parameter", "Defibrillator", "Minor Surgery Set", "Nebulizer Kompresor"],
    photoUrl: "/src/assets/images/hero_clinic_reception_1793197729861.jpg"
  },
  {
    id: "poli-spesialis",
    number: "02",
    title: "Poli Spesialis Terpadu",
    category: "Konsultasi Dokter Ahli",
    shortDesc: "Poli Penyakit Dalam (Sp.PD), Dokter Anak (Sp.A), Kebidanan & Kandungan (Sp.OG), Gigi & Bedah Mulut dengan jadwal teratur.",
    fullDesc: "Layanan konsultasi medis mendalam bersama tim dokter spesialis berpengalaman. Dilengkapi ruang konsultasi berpendingin udara yang privat, nyaman, serta sistem rekam medis elektronik.",
    features: [
      "Poli Penyakit Dalam: diabetes, hipertensi, gangguan lambung, hati & ginjal",
      "Poli Kandungan & Kebidanan: antenatal care rutin, USG 4D live, program hamil",
      "Poli Anak: imunisasi wajib & tambahan IDAI, tumbuh kembang, infeksi tropis",
      "Poli Gigi & Mulut: scaling ultrasonic, tambal estetik, pencabutan & behel gigi"
    ],
    operationalHours: "Senin – Sabtu: 08:00 – 21:00 WIB",
    roomLocation: "Gedung Utama Lantai 2",
    equipment: ["USG 4D Mindray", "Dental Unit Ergonomis", "EKG 12-Channel Nihon Kohden"],
    photoUrl: "/src/assets/images/doctor_consultation_1793197730601.jpg"
  },
  {
    id: "mcu-corporate",
    number: "03",
    title: "Medical Check-Up (MCU) Karyawan & Industri",
    category: "Occupational Health & K3",
    shortDesc: "Layanan pemeriksaan kesehatan kerja lengkap untuk pra-karyawan, tahunan (annual), fit-to-work, serta mobile MCU ke pabrik Cikarang.",
    fullDesc: "Mitra kesehatan tepercaya untuk kawasan MM2100, Jababeka, EJIP, Delta Silicon, dan GIIC. Dipimpin oleh dokter spesialis kedokteran okupasi (MKK) bersertifikat BNSP & Kemenaker.",
    features: [
      "Pemeriksaan Spirometri (fungsi paru) & Audiometri (uji pendengaran kabin kedap)",
      "Rontgen Thorax Digital format DICOM dibaca dokter spesialis radiologi",
      "Skrining Narkotika 3 hingga 6 parameter terstandar BNN",
      "Pemeriksaan On-Site ke Pabrik dengan armada Mobile Clinic X-Ray Bus",
      "Laporan Medical Check Up analitik komprehensif untuk divisi HSE/HRD"
    ],
    operationalHours: "Senin – Sabtu: 07:00 – 16:00 WIB",
    roomLocation: "Pusat MCU Terpadu Wing Timur Lantai 1 & On-Site",
    equipment: ["Audiometry Soundproof Booth", "Digital Spirometer Schiller", "Mobile X-Ray Unit"],
    photoUrl: "/src/assets/images/corporate_mcu_facility_1793197731119.jpg"
  },
  {
    id: "laboratorium",
    number: "04",
    title: "Laboratorium Diagnostik Digital 24 Jam",
    category: "Pemeriksaan Penunjang Medis",
    shortDesc: "Pemeriksaan hematologi lengkap, kimia darah, profil lipid, urine, feses, dan penanda tumor dengan hasil cepat dan akurat.",
    fullDesc: "Didukung analis laboratorium berpengalaman dan alat penganalisis otomatis terintegrasi LIS (Laboratory Information System). Hasil dapat diakses langsung via link WhatsApp atau email.",
    features: [
      "Hematologi rutin & otomatis 5-part differential (hasil 15 menit)",
      "Pemeriksaan diabetes: Glukosa puasa, 2 jam PP, dan HbA1c HPLC",
      "Panel fungsi hati (SGOT/SGPT), fungsi ginjal (Ureum, Kreatinin, eGFR)",
      "Panel Profil Lipid: Kolesterol Total, HDL, LDL Direct, Trigliserida",
      "Skrining demam: NS1 Dengue, Anti-Dengue IgG/IgM, Widal, Typhidot"
    ],
    operationalHours: "Buka 24 Jam Setiap Hari",
    roomLocation: "Gedung Utama Lantai 1 (Sebelah Ruang Farmasi)",
    equipment: ["Sysmex Hematology Analyzer", "Cobas Chemistry Analyzer", "Centrifuge Refrigerated"],
    photoUrl: "/src/assets/images/clinic_laboratory_1793197731120.jpg"
  },
  {
    id: "radiologi-usg",
    number: "05",
    title: "Radiologi Digital & USG 4D",
    category: "Pencitraan Medis",
    shortDesc: "Rontgen digital dosis radiasi rendah dengan hasil instan dan USG kebidanan serta organ dalam beresolusi tinggi.",
    fullDesc: "Teknologi Flat Panel Detector (FPD) menghasilkan citra radiografi paru, tulang, dan sendi yang tajam dan aman dengan radiasi tereduksi hingga 40%.",
    features: [
      "Foto Rontgen Thorax AP/PA untuk skrining TB, infeksi paru, dan pra-kerja",
      "Rontgen ekstremitas tulang dan sendi pasca benturan / trauma kerja",
      "USG 4D Kehamilan dengan rekaman video real-time janin",
      "USG Abdomen menyeluruh (hati, kantung empedu, ginjal, limpa, prostat)"
    ],
    operationalHours: "Senin – Sabtu: 08:00 – 20:00 WIB (IGD Emergency On-Call 24 Jam)",
    roomLocation: "Gedung Utama Lantai 1",
    equipment: ["Direct Radiography (DR) 500mA", "USG 4D High Definition", "Apron Proteksi Timbal"],
    photoUrl: "/src/assets/images/clinic_laboratory_1793197731120.jpg"
  },
  {
    id: "farmasi-ambulans",
    number: "06",
    title: "Farmasi 24 Jam & Ambulans Siaga Cikarang",
    category: "Layanan Penunjang & Evakuasi",
    shortDesc: "Apotek lengkap berizin resmi, konseling apoteker, serta armada ambulans tanggap darurat untuk kawasan industri Cikarang.",
    fullDesc: "Menyediakan obat resep dokter, obat bebas, multivitamin kerja, serta layanan evakuasi pasien gawat darurat dengan peralatan resusitasi bergerak.",
    features: [
      "Stok obat orisinal dan bergaransi resmi distributor farmasi BPOM",
      "Pelayanan resep BPJS Kesehatan dan asuransi korporasi",
      "Unit ambulans transport medis & gawat darurat dilengkapi oksigen dan AED",
      "Penjemputan pasien darurat di area pabrik Jababeka, Delta Silicon, & Lippo Cikarang"
    ],
    operationalHours: "24 Jam / 7 Hari",
    roomLocation: "Depan Pintu Keluar Utama & Area Parkir Ambulans",
    equipment: ["Ambulance HiAce Emergency", "AED Portable", "Stretcher Stryker", "Apotek Berpendingin"],
    photoUrl: "/src/assets/images/hero_clinic_reception_1793197729861.jpg"
  }
];

export const DOCTORS_DATA: Doctor[] = [
  {
    id: "dr-hendra",
    name: "dr. Hendra Wijaya, Sp.PD",
    specialty: "Spesialis Penyakit Dalam (Internis)",
    specialtyCategory: "sp.pd",
    title: "Dokter Spesialis Penyakit Dalam",
    education: "Universitas Indonesia (FK UI) - Sp-1 Penyakit Dalam",
    sipNumber: "SIP.446/182/Dinkes-Bks/2022",
    experienceYears: 14,
    consultationFee: 220000,
    room: "Ruang Konsultasi 201 (Lt. 2)",
    photoUrl: "/src/assets/images/doctor_consultation_1793197730601.jpg",
    bio: "Berpengalaman menangani kasus hipertensi, diabetes melitus tipe 2, sindrom metabolik karyawan, gangguan asam lambung kronis (GERD), serta evaluasi kesehatan organ dalam.",
    schedules: [
      { day: "Senin", hours: "16:00 - 20:30 WIB" },
      { day: "Rabu", hours: "16:00 - 20:30 WIB" },
      { day: "Jumat", hours: "16:00 - 20:30 WIB" },
      { day: "Sabtu", hours: "09:00 - 13:00 WIB" }
    ]
  },
  {
    id: "dr-ratna",
    name: "dr. Ratna Kartika, Sp.A",
    specialty: "Spesialis Anak (Pediatrik)",
    specialtyCategory: "sp.a",
    title: "Dokter Spesialis Anak",
    education: "Universitas Padjadjaran (FK Unpad) - Sp-1 Anak",
    sipNumber: "SIP.446/204/Dinkes-Bks/2021",
    experienceYears: 11,
    consultationFee: 200000,
    room: "Ruang Ramah Anak 203 (Lt. 2)",
    photoUrl: "/src/assets/images/doctor_consultation_1793197730601.jpg",
    bio: "Fokus pada pemantauan tumbuh kembang anak, imunisasi jadwal IDAI, penanganan infeksi pernapasan, alergi, dan nutrisi gizi anak keluarga pekerja Cikarang.",
    schedules: [
      { day: "Senin", hours: "09:00 - 13:00 WIB" },
      { day: "Selasa", hours: "15:00 - 19:00 WIB" },
      { day: "Kamis", hours: "15:00 - 19:00 WIB" },
      { day: "Sabtu", hours: "10:00 - 14:00 WIB" }
    ]
  },
  {
    id: "dr-dimas",
    name: "dr. Dimas Prasetyo, Sp.OG",
    specialty: "Spesialis Obstetri & Ginekologi (Kandungan)",
    specialtyCategory: "sp.og",
    title: "Dokter Spesialis Kebidanan & Kandungan",
    education: "Universitas Gadjah Mada (FK UGM) - Sp-1 Obgyn",
    sipNumber: "SIP.446/099/Dinkes-Bks/2020",
    experienceYears: 13,
    consultationFee: 230000,
    room: "Ruang USG & Obgyn 204 (Lt. 2)",
    photoUrl: "/src/assets/images/doctor_consultation_1793197730601.jpg",
    bio: "Melayani pemeriksaan kehamilan berkala, USG 4D janin, skrining kanker serviks (Pap Smear), konseling program kehamilan, dan kesehatan reproduksi wanita.",
    schedules: [
      { day: "Selasa", hours: "16:00 - 20:30 WIB" },
      { day: "Rabu", hours: "09:00 - 13:00 WIB" },
      { day: "Kamis", hours: "16:00 - 20:30 WIB" },
      { day: "Jumat", hours: "09:00 - 13:00 WIB" }
    ]
  },
  {
    id: "dr-cynthia",
    name: "drg. Cynthia Paramitha",
    specialty: "Dokter Gigi & Mulut",
    specialtyCategory: "gigi",
    title: "Dokter Gigi Umum & Konservasi",
    education: "Fakultas Kedokteran Gigi Universitas Trisakti",
    sipNumber: "SIP.446/331/Dinkes-Bks/2023",
    experienceYears: 8,
    consultationFee: 150000,
    room: "Klinik Gigi Ruang 105 (Lt. 1)",
    photoUrl: "/src/assets/images/doctor_consultation_1793197730601.jpg",
    bio: "Pakar dalam perawatan estetika gigi, pembersihan karang gigi (ultrasonic scaling), restorasi tambal sinar komposit, perawatan saluran akar, dan pencabutan gigi bungsu.",
    schedules: [
      { day: "Senin", hours: "10:00 - 18:00 WIB" },
      { day: "Selasa", hours: "10:00 - 18:00 WIB" },
      { day: "Rabu", hours: "10:00 - 18:00 WIB" },
      { day: "Jumat", hours: "13:00 - 19:30 WIB" },
      { day: "Sabtu", hours: "09:00 - 15:00 WIB" }
    ]
  },
  {
    id: "dr-farhan",
    name: "dr. Farhan Alamsyah, MKK, Sp.Ok",
    specialty: "Spesialis Kedokteran Okupasi (K3 Industri)",
    specialtyCategory: "okupasi",
    title: "Spesialis Kesehatan Kerja & Sertifikasi Fit to Work",
    education: "Universitas Indonesia - Magister Kedokteran Kerja & Sp.Ok",
    sipNumber: "SIP.446/512/Dinkes-Bks/2021",
    experienceYears: 16,
    consultationFee: 250000,
    room: "Klinik MCU & Ergonomi Wing Timur",
    photoUrl: "/src/assets/images/corporate_mcu_facility_1793197731119.jpg",
    bio: "Konsultan K3 dan kesehatan kerja bagi puluhan perusahaan multinasional di Cikarang. Menangani penilaian kelaikan kerja (Fit to Work), evaluasi penyakit akibat kerja (PAK), dan audit ergonomi industri.",
    schedules: [
      { day: "Senin", hours: "08:00 - 14:00 WIB" },
      { day: "Rabu", hours: "08:00 - 14:00 WIB" },
      { day: "Jumat", hours: "08:00 - 14:00 WIB" },
      { day: "Sabtu", hours: "08:00 - 12:00 WIB" }
    ]
  },
  {
    id: "dr-sarah",
    name: "dr. Sarah Anindita",
    specialty: "Dokter Umum & Kepala Pelayanan IGD",
    specialtyCategory: "umum",
    title: "Dokter Umum & Penanggung Jawab Triase 24 Jam",
    education: "Fakultas Kedokteran Universitas Padjadjaran",
    sipNumber: "SIP.446/782/Dinkes-Bks/2023",
    experienceYears: 7,
    consultationFee: 95000,
    room: "Ruang Poli Umum 101 & IGD (Lt. 1)",
    photoUrl: "/src/assets/images/doctor_consultation_1793197730601.jpg",
    bio: "Siaga melayani pasien rawat jalan poli umum, keluhan demam, ISPA, batuk pilek, pencernaan, surat keterangan sehat, dan penanganan kegawatan medis awal di IGD.",
    schedules: [
      { day: "Senin", hours: "08:00 - 16:00 WIB" },
      { day: "Selasa", hours: "08:00 - 16:00 WIB" },
      { day: "Kamis", hours: "08:00 - 16:00 WIB" },
      { day: "Jumat", hours: "08:00 - 16:00 WIB" },
      { day: "Minggu", hours: "09:00 - 17:00 WIB" }
    ]
  },
  {
    id: "dr-budi",
    name: "dr. Budi Santoso",
    specialty: "Dokter Umum & Koordinator MCU Onsite",
    specialtyCategory: "umum",
    title: "Dokter Pelaksana MCU & K3",
    education: "Fakultas Kedokteran Universitas Diponegoro",
    sipNumber: "SIP.446/441/Dinkes-Bks/2022",
    experienceYears: 9,
    consultationFee: 95000,
    room: "Ruang Poli Umum 102 (Lt. 1)",
    photoUrl: "/src/assets/images/corporate_mcu_facility_1793197731119.jpg",
    bio: "Fokus pada pemeriksaan fisik umum tenaga kerja, interpretasi rontgen dan spirometri awal, skrining buta warna Ishihara, dan edukasi gaya hidup sehat pekerja shift malam.",
    schedules: [
      { day: "Senin", hours: "13:00 - 21:00 WIB" },
      { day: "Rabu", hours: "13:00 - 21:00 WIB" },
      { day: "Kamis", hours: "13:00 - 21:00 WIB" },
      { day: "Sabtu", hours: "12:00 - 20:00 WIB" }
    ]
  }
];

export const MCU_PACKAGES: McuPackage[] = [
  {
    id: "mcu-basic",
    name: "Paket Sehat Dasar (Basic Health)",
    tagline: "Pemeriksaan kesehatan esensial untuk individu, pekerja pemula, dan skrining tahunan ringan.",
    price: 320000,
    targetAudience: "Masyarakat umum, mahasiswa, karyawan baru non-pabrik",
    durationMinutes: 45,
    turnaroundTime: "Selesai di hari yang sama (4 - 6 Jam)",
    items: [
      "Pemeriksaan Fisik Lengkap oleh Dokter Umum",
      "Pemeriksaan Tanda Vital & Indeks Massa Tubuh (BMI)",
      "Tes Ketajaman Penglihatan (Visus) & Buta Warna (Ishihara)",
      "Hematologi Rutin (Hemoglobin, Leukosit, Trombosit, Hematokrit, Eritrosit, LED)",
      "Glukosa Darah Puasa (Skrining Awal Diabetes)",
      "Kolesterol Total Darah",
      "Urinalisis Lengkap (Urine Rutin 10 Parameter)",
      "Buku Hasil MCU & Lembar Konsultasi Dokter"
    ]
  },
  {
    id: "mcu-industrial",
    name: "Paket Karyawan Industri (Fit-to-Work Cikarang)",
    tagline: "Standar pemeriksaan keselamatan kerja (K3) pabrik Jababeka, MM2100, EJIP, & GIIC.",
    price: 585000,
    popular: true,
    badge: "Paling Banyak Digunakan Korporasi",
    targetAudience: "Operator mesin, teknisi lapangan, staf pabrik, pre-employment industri",
    durationMinutes: 75,
    turnaroundTime: "1 Hari Kerja (Sertifikat Kemenaker)",
    items: [
      "Semua item Paket Sehat Dasar",
      "Rontgen Thorax Digital (Format DICOM dibaca dr. Sp.Rad)",
      "Uji Fungsi Paru (Spirometri Digital Schiller)",
      "Uji Pendengaran Audiometri di Soundproof Cabin Standar ISO",
      "Tes Bebas Narkoba 3 Parameter (Amphetamine, Morphine, THC/Marijuana)",
      "Penilaian Kelaikan Kerja (Fit-to-Work Certificate dr. Okupasi)",
      "Input data ke portal HRD Perusahaan"
    ]
  },
  {
    id: "mcu-executive",
    name: "Paket Eksekutif Komprehensif",
    tagline: "Skrining organ mendalam dan profil metabolik komplit untuk pimpinan, manajer, dan usia 40+.",
    price: 1350000,
    targetAudience: "Manajemen, ekspatriat kawasan industri, keluarga usia di atas 40 tahun",
    durationMinutes: 120,
    turnaroundTime: "1 Hari Kerja + Konsultasi Dokter Spesialis",
    items: [
      "Pemeriksaan dan Konsultasi dr. Spesialis Penyakit Dalam (Sp.PD)",
      "Elektrokardiogram (EKG 12-Lead Rekam Jantung Istirahat)",
      "Rontgen Thorax Digital Resolusi Tinggi",
      "USG Abdomen Menyeluruh (Organ Hati, Empedu, Ginjal, Limpa)",
      "Panel Profil Lipid Lengkap (Kolesterol Total, HDL, LDL Direct, Trigliserida)",
      "Fungsi Ginjal: Ureum, Kreatinin, Asam Urat, eGFR",
      "Fungsi Hati: SGOT, SGPT, Gamma GT, Bilirubin Total",
      "HbA1c HPLC (Rata-rata Gula Darah 3 Bulan Terakhir)",
      "Urinalisis Otomatis & Konsumsi Snack Sehat Pasca Puasa"
    ]
  },
  {
    id: "mcu-cardio",
    name: "Paket Jantung & Pembuluh Darah (Cardio Screen)",
    tagline: "Deteksi dini risiko serangan jantung koroner, hipertensi, dan plak vaskular.",
    price: 780000,
    targetAudience: "Individu dengan riwayat keluarga sakit jantung, perokok aktif, hipertensi",
    durationMinutes: 60,
    turnaroundTime: "Selesai di hari yang sama",
    items: [
      "Konsultasi & Pemeriksaan Fisik Kardiovaskular",
      "Perekaman EKG 12 Lead dengan interpretasi dokter spesialis",
      "Profil Lipid Komprehensif (Kolesterol Total, HDL, LDL, Trigliserida)",
      "Glukosa Darah Puasa & Asam Urat",
      "Fungsi Ginjal Kreatinin & Laju Filtrasi Glomerulus",
      "Kalkulasi Skor Risiko Kardiovaskular 10 Tahun (Framingham Risk Score)",
      "Panduan Diet Jantung & Rencana Latihan Fisik Aman"
    ]
  },
  {
    id: "mcu-premarital",
    name: "Paket Skrining Pra-Nikah (Premarital Check)",
    tagline: "Persiapan masa depan keluarga sehat untuk calon pengantin pria dan wanita.",
    price: 890000,
    targetAudience: "Pasangan calon pengantin sebelum pernikahan",
    durationMinutes: 60,
    turnaroundTime: "1 Hari Kerja",
    items: [
      "Pemeriksaan Fisik Dokter Umum & Konseling Pra-Nikah",
      "Hematologi Lengkap & Laju Endap Darah",
      "Golongan Darah (ABO) & Faktor Rhesus",
      "Skrining Hepatitis B (HBsAg Kualitatif)",
      "Skrining Penyakit Menular Seksual (VDRL / TPHA)",
      "Glukosa Darah Sewaktu & Urinalisis Lengkap",
      "Surat Keterangan Bebas Penyakit Menular untuk KUA / Catatan Sipil"
    ]
  }
];

export const INITIAL_QUEUES: QueueDepartment[] = [
  {
    id: "queue-umum",
    codePrefix: "A",
    name: "Poli Umum & Tindakan",
    currentNumber: "A-042",
    waitingCount: 3,
    avgWaitMins: 12,
    activeDoctor: "dr. Sarah Anindita",
    room: "Poli 101"
  },
  {
    id: "queue-spesialis",
    codePrefix: "B",
    name: "Poli Spesialis (Dalam & Kandungan)",
    currentNumber: "B-018",
    waitingCount: 2,
    avgWaitMins: 18,
    activeDoctor: "dr. Hendra Wijaya, Sp.PD",
    room: "Poli 201"
  },
  {
    id: "queue-lab",
    codePrefix: "C",
    name: "Laboratorium & Rontgen",
    currentNumber: "C-029",
    waitingCount: 4,
    avgWaitMins: 8,
    activeDoctor: "Tim Analis Medis & Radiografer",
    room: "Lab Lt. 1"
  },
  {
    id: "queue-farmasi",
    codePrefix: "D",
    name: "Apotek & Pengambilan Obat",
    currentNumber: "D-055",
    waitingCount: 5,
    avgWaitMins: 6,
    activeDoctor: "apt. Dewi Rahmawati, S.Farm",
    room: "Loket Farmasi"
  }
];

export const INSURANCE_PARTNERS = [
  { name: "BPJS Kesehatan", type: "Jaminan Pemerintah (Faskes Tingkat Pertama & Rujukan)" },
  { name: "AdMedika", type: "Third Party Administrator (TPA) Terbesar" },
  { name: "Prudential Life", type: "Asuransi Swasta Cashless" },
  { name: "Sinarmas MSIG", type: "Asuransi Korporat & Karyawan" },
  { name: "Mandiri Inhealth", type: "Managed Care & Indemnity" },
  { name: "Astra Life", type: "Asuransi Ekosistem Astra Group" },
  { name: "Reliance Insurance", type: "Asuransi Kesehatan Karyawan Pabrik" },
  { name: "BCA Life", type: "Cashless Hospital & Clinic Care" },
  { name: "BNI Life", type: "Jaminan Kesehatan Korporasi" },
  { name: "Allianz Indonesia", type: "Klaim Digital & Rawat Jalan" }
];

export const CORPORATE_PARTNERS = [
  "PT Jababeka Tbk",
  "PT Unilever Indonesia Cikarang",
  "PT Astra Honda Motor Cikarang Plant",
  "PT Mattel Indonesia (East & West Plant)",
  "PT Indonesia Epson Industry EJIP",
  "PT Denso Indonesia Plant Cikarang",
  "PT Mayora Indah MM2100",
  "PT Showa Indonesia Manufacturing"
];

export const PATIENT_TESTIMONIALS = [
  {
    id: "t1",
    name: "Ir. Bambang Trihatmojo",
    role: "HSE Manager, Perusahaan Otomotif Kawasan Jababeka I",
    treatment: "Pelaksanaan MCU Rutin 650 Karyawan",
    comment: "Kami sudah 3 tahun berturut-turut mempercayakan Medical Check-Up tahunan di JB Medical Center Cikarang. Koordinasi mobile X-Ray ke pabrik sangat rapi, tidak mengganggu shift kerja operator, dan laporan hasil MCU dokter okupasi sangat cepat diserahkan ke Dinas Ketenagakerjaan.",
    rating: 5,
    date: "14 Oktober 2026"
  },
  {
    id: "t2",
    name: "Siti Rahmawati, S.Pd",
    role: "Warga Cikarang Baru, Jababeka II",
    treatment: "Konsultasi Poli Anak & Imunisasi",
    comment: "Klinik JB sangat bersih dan suasananya seperti rumah sakit privat bintang lima, tapi dengan antrean yang manusiawi dan biaya terjangkau. Dokter anak dr. Ratna sangat teliti memeriksa anak saya saat demam malam-malam, IGD 24 jamnya tanggap sekali.",
    rating: 5,
    date: "02 Oktober 2026"
  },
  {
    id: "t3",
    name: "Aris Munandar",
    role: "Senior Engineering Staff, PT Epson EJIP",
    treatment: "Penanganan Darurat Luka Robek Kerja & Rawat Jalan",
    comment: "Waktu jari saya cedera terkena plat mesin di pabrik pukul 2 dini hari, langsung dilarikan rekan tim ke IGD JB Medical Center. Tindakan hecting luka rapi sekali dan penanganan berkas asuransi AdMedika langsung beres di tempat tanpa ribet.",
    rating: 5,
    date: "22 September 2026"
  }
];

export const CLINIC_FAQS = [
  {
    question: "Apakah Klinik JB Medical Center Cikarang melayani peserta BPJS Kesehatan?",
    answer: "Ya, kami melayani pasien BPJS Kesehatan untuk faskes tingkat pertama (FKTP) terdaftar serta program rujukan program penyakit kronis (Prolanis). Pasien cukup membawa KTP / KIS digital saat registrasi."
  },
  {
    question: "Bagaimana prosedur pendaftaran Medical Check-Up (MCU) untuk rombongan perusahaan?",
    answer: "Untuk rombongan karyawan pabrik atau institusi di kawasan Cikarang (Jababeka, EJIP, MM2100, Delta Silicon, GIIC), divisi HR/HSE dapat memesan via formulir Kalkulator MCU di website kami atau menghubungi WhatsApp Corporate Marketing di 0812-8937-800. Kami menyediakan fasilitas On-Site ke pabrik lengkap dengan armada Mobile X-Ray Bus dan kabin audiometri."
  },
  {
    question: "Berapa lama hasil pemeriksaan laboratorium darah rutin dan rontgen digital keluar?",
    answer: "Pemeriksaan darah rutin (hematologi) selesai dalam 15 - 30 menit. Rontgen thorax digital selesai dalam 30 menit dan langsung dievaluasi oleh dokter jaga atau dokter spesialis radiologi. Hasil dapat dicetak fisik maupun dikirimkan dalam format PDF resmi ber-QR Code via WhatsApp."
  },
  {
    question: "Apakah layanan IGD dan Farmasi buka di hari Minggu dan tanggal merah?",
    answer: "Ya, IGD dan Instalasi Farmasi kami beroperasi 24 Jam Non-Stop selama 365 hari dalam setahun, termasuk hari Minggu dan libur nasional."
  },
  {
    question: "Bagaimana cara membuat janji temu dokter spesialis tanpa perlu mengantre lama di klinik?",
    answer: "Anda dapat menggunakan fitur 'Pendaftaran Janji Temu Online' di website ini. Pilih dokter yang dituju, tentukan tanggal serta jam kedatangan, dan Anda akan langsung memperoleh E-Ticket dengan nomor antrean reservasi yang tersimpan di WhatsApp Anda."
  }
];
