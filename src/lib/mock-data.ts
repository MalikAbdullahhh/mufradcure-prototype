// MufradCure mock domain data — frontend only, no backend.

export type MizaajCode = 1 | 2 | 3 | 4 | 5 | 6;

export interface MizaajInfo {
  code: MizaajCode;
  name: string;
  urdu: string;
  primary: string;
}

export const MIZAAJ: Record<MizaajCode, MizaajInfo> = {
  1: { code: 1, name: "Damvi Sada", urdu: "دموی سادہ", primary: "Damm" },
  2: { code: 2, name: "Balghami", urdu: "بلغمی", primary: "Balgham" },
  3: { code: 3, name: "Mizaj Imtizaji", urdu: "مزاج امتزاجی", primary: "Imtizaj" },
  4: { code: 4, name: "Ghudad & Tehreek", urdu: "غدد و تحریک", primary: "Ghudad" },
  5: { code: 5, name: "Ghudi Asaabi", urdu: "غدی اعصابی", primary: "Asaab" },
  6: { code: 6, name: "Asaabi Mulyan", urdu: "اعصابی ملیّن", primary: "Asaab" },
};

export const nextCode = (code: MizaajCode): MizaajCode =>
  (((code % 6) + 1) as MizaajCode);

export interface DiagnosisSession {
  id: string;
  date: string;
  diagnosis: string;
  diagnosisUrdu: string;
  fromCode: MizaajCode;
  toCode: MizaajCode;
  confidence: number;
  status: "Improved" | "Stable" | "Declined";
  statusUrdu: string;
  primaryOrgan: string;
  medicine: string;
  medicineUrdu: string;
}

export const patient = {
  name: "Muhammad Bilal",
  nameUrdu: "محمد بلال",
  id: "PT-1842",
  phone: "+92 300 1234567",
  email: "muhammad.bilal@example.com",
  registered: "12 Jun 2026",
  activeSince: "2025",
  currentCode: 5 as MizaajCode,
  totalSessions: 24,
  recoveries: 3,
};

export const admin = {
  name: "Dr. Hamid",
  role: "Admin",
  email: "dr.hamid@mufradcure.com",
};

export const sessions: DiagnosisSession[] = [
  {
    id: "s1",
    date: "12 Jun 2026",
    diagnosis: "Hepatitis",
    diagnosisUrdu: "یرقان",
    fromCode: 4,
    toCode: 5,
    confidence: 87,
    status: "Improved",
    statusUrdu: "بہتری",
    primaryOrgan: "Liver",
    medicine: "Asaabi Ghudi Mulyan",
    medicineUrdu: "اعصابی غدی ملیان",
  },
  {
    id: "s2",
    date: "03 May 2026",
    diagnosis: "Ghudi Asaabi",
    diagnosisUrdu: "غدی اعصابی",
    fromCode: 5,
    toCode: 6,
    confidence: 79,
    status: "Stable",
    statusUrdu: "مستحکم",
    primaryOrgan: "Nervous System",
    medicine: "Mufrad Syrup",
    medicineUrdu: "مفرد شربت",
  },
  {
    id: "s3",
    date: "18 Feb 2026",
    diagnosis: "Mizaj Imtizaji",
    diagnosisUrdu: "مزاج امتزاجی",
    fromCode: 3,
    toCode: 4,
    confidence: 91,
    status: "Improved",
    statusUrdu: "بہتری",
    primaryOrgan: "Stomach",
    medicine: "Herbal Capsule",
    medicineUrdu: "ہربل کیپسول",
  },
  {
    id: "s4",
    date: "09 Jan 2026",
    diagnosis: "Fatigue",
    diagnosisUrdu: "تھکن",
    fromCode: 2,
    toCode: 3,
    confidence: 68,
    status: "Stable",
    statusUrdu: "مستحکم",
    primaryOrgan: "Heart",
    medicine: "Digestive Tea",
    medicineUrdu: "ہاضمہ چائے",
  },
];

export interface Medicine {
  id: string;
  name: string;
  urdu: string;
  code: MizaajCode;
  organ: string;
  amount: string;
  frequency: string;
  timing: string;
  duration: string;
  contraindications: string;
  formula: { name: string; grams: string }[];
  preparation: string[];
}

export const medicines: Medicine[] = [
  {
    id: "m1",
    name: "Asaabi Ghudi Mulyan",
    urdu: "اعصابی غدی ملیان",
    code: 6,
    organ: "Nervous System",
    amount: "5–7g",
    frequency: "Twice daily",
    timing: "After meals",
    duration: "3 weeks",
    contraindications:
      "Not recommended during pregnancy or for patients with severe hepatic conditions. Consult your Hakeem.",
    formula: [
      { name: "Asgand", grams: "120g" },
      { name: "Satawer", grams: "30g" },
      { name: "Mako Khushk", grams: "80g" },
      { name: "Gul Surkh", grams: "40g" },
    ],
    preparation: [
      "Grind all dried ingredients into a fine powder.",
      "Sieve the powder twice to ensure even texture.",
      "Store in an airtight glass jar away from sunlight.",
    ],
  },
  {
    id: "m2",
    name: "Mufrad Syrup",
    urdu: "مفرد شربت",
    code: 5,
    organ: "Liver",
    amount: "1 tbsp",
    frequency: "Daily",
    timing: "After breakfast",
    duration: "4 weeks",
    contraindications: "Avoid in diabetic patients without supervision.",
    formula: [
      { name: "Arq Kasni", grams: "200ml" },
      { name: "Sharbat Bazoori", grams: "100ml" },
    ],
    preparation: [
      "Mix arq and sharbat thoroughly.",
      "Bottle and refrigerate after preparation.",
    ],
  },
  {
    id: "m3",
    name: "Herbal Capsule",
    urdu: "ہربل کیپسول",
    code: 4,
    organ: "Stomach",
    amount: "2 capsules",
    frequency: "Daily",
    timing: "After lunch",
    duration: "2 weeks",
    contraindications: "Discontinue if gastric irritation occurs.",
    formula: [
      { name: "Zeera Siyah", grams: "40g" },
      { name: "Podina Khushk", grams: "20g" },
    ],
    preparation: ["Grind to fine powder.", "Fill into size-0 capsules."],
  },
];

export interface DietItem {
  meal: string;
  mealUrdu: string;
  time: string;
  detail: string;
}

export const dietPlan: DietItem[] = [
  { meal: "Breakfast", mealUrdu: "ناشتہ", time: "9:00 AM", detail: "Oat porridge, dates, and warm water" },
  { meal: "Lunch", mealUrdu: "دوپہر کا کھانا", time: "1:30 PM", detail: "Light vegetable soup with brown rice" },
  { meal: "Dinner", mealUrdu: "رات کا کھانا", time: "7:30 PM", detail: "Steamed vegetables and herbal tea" },
];

export const dietRecommend = ["Pumpkin", "Barley", "Pomegranate"];
export const dietAvoid = ["Meat", "Fried foods", "Spicy"];

export const medicinePlan = [
  { name: "Mufrad Syrup", schedule: "Daily", detail: "1 tablespoon after breakfast" },
  { name: "Herbal Capsule", schedule: "Daily", detail: "2 capsules after lunch" },
  { name: "Digestive Tea", schedule: "Night", detail: "1 cup before sleep" },
];

// ---- Admin data ----
export interface AdminPatient {
  id: string;
  name: string;
  code: MizaajCode;
  sessions: number;
  lastDiagnosis: string;
  status: "Active" | "Inactive";
}

export const adminPatients: AdminPatient[] = [
  { id: "PT-1042", name: "Muhammad", code: 5, sessions: 24, lastDiagnosis: "Hepatitis", status: "Active" },
  { id: "PT-1088", name: "Ayesha", code: 4, sessions: 18, lastDiagnosis: "Gastritis", status: "Active" },
  { id: "PT-1121", name: "Ali", code: 6, sessions: 31, lastDiagnosis: "Anaemia", status: "Active" },
  { id: "PT-1164", name: "Fatima", code: 3, sessions: 12, lastDiagnosis: "Fatigue", status: "Active" },
  { id: "PT-1188", name: "Hassan", code: 5, sessions: 27, lastDiagnosis: "Jaundice", status: "Active" },
  { id: "PT-1209", name: "Zainab", code: 2, sessions: 9, lastDiagnosis: "Insomnia", status: "Inactive" },
  { id: "PT-1233", name: "Usman", code: 1, sessions: 15, lastDiagnosis: "Migraine", status: "Active" },
];

export const adminStats = {
  totalPatients: "1,247",
  totalMedicines: "38",
  activeSessions: "8",
  mlAccuracy: "94.2%",
  systemHealth: "99%",
};

export const mizaajDistribution = [
  { code: "Code 1", value: 8 },
  { code: "Code 2", value: 12 },
  { code: "Code 3", value: 18 },
  { code: "Code 4", value: 22 },
  { code: "Code 5", value: 25 },
  { code: "Code 6", value: 15 },
];

export const systemActivity = [
  { time: "2 min ago", text: "System health check passed" },
  { time: "14 min ago", text: "Admin searched PT-1042" },
  { time: "41 min ago", text: "Medicine formula updated" },
  { time: "1 hr ago", text: "ML model accuracy recalibrated" },
];

export interface DiseaseRecord {
  id: string;
  name: string;
  urdu: string;
  code: MizaajCode;
  organ: string;
  status: "Approved" | "Pending";
  symptoms: number;
}

export const diseaseRecords: DiseaseRecord[] = [
  { id: "D-101", name: "Hepatitis", urdu: "یرقان", code: 5, organ: "Liver", status: "Approved", symptoms: 8 },
  { id: "D-102", name: "Gastritis", urdu: "ورمِ معدہ", code: 4, organ: "Stomach", status: "Approved", symptoms: 6 },
  { id: "D-103", name: "Anaemia", urdu: "خون کی کمی", code: 6, organ: "Blood", status: "Pending", symptoms: 5 },
  { id: "D-104", name: "Migraine", urdu: "آدھے سر کا درد", code: 1, organ: "Nervous System", status: "Approved", symptoms: 7 },
  { id: "D-105", name: "Insomnia", urdu: "بے خوابی", code: 2, organ: "Nervous System", status: "Pending", symptoms: 4 },
];

export const mlVersions = [
  { version: "v2.4.0", date: "12 Jun 2026", accuracy: 94.2, f1: 92.8, deployed: true },
  { version: "v2.3.0", date: "28 May 2026", accuracy: 93.1, f1: 91.6, deployed: false },
  { version: "v2.2.0", date: "10 May 2026", accuracy: 91.9, f1: 90.2, deployed: false },
  { version: "v2.1.0", date: "22 Apr 2026", accuracy: 90.4, f1: 88.9, deployed: false },
];

export const systemLogs = [
  { time: "2026-06-16 14:02", level: "INFO", actor: "system", message: "System health check passed" },
  { time: "2026-06-16 13:48", level: "INFO", actor: "Dr. Hamid", message: "Searched patient PT-1042" },
  { time: "2026-06-16 13:21", level: "WARN", actor: "rate-limiter", message: "IP throttled: 10/15min exceeded" },
  { time: "2026-06-16 12:40", level: "INFO", actor: "Dr. Hamid", message: "Medicine formula updated (Mufrad Syrup)" },
  { time: "2026-06-16 02:00", level: "INFO", actor: "celery", message: "ML retraining pipeline completed" },
  { time: "2026-06-15 21:14", level: "ERROR", actor: "auth", message: "Failed login attempt blocked" },
];
