/* ═══════════════════════════════════════════════════════
   VCK COOL SPACE — Static Fallback Data
   Used when API is unavailable. Mirrors Google Sheets structure.
═══════════════════════════════════════════════════════ */

const FALLBACK = {

  heroImages: [
    { ORDER: 1, STATUS: 'active', IMAGE_URL: '', ALT_TH: 'VCK Cool Space ซาวน่า', ALT_EN: 'VCK Cool Space Sauna' },
    { ORDER: 2, STATUS: 'active', IMAGE_URL: '', ALT_TH: 'ออนเซ็น และสระน้ำ', ALT_EN: 'Onsen & Pool' },
    { ORDER: 3, STATUS: 'active', IMAGE_URL: '', ALT_TH: 'บรรยากาศยามค่ำคืน', ALT_EN: 'Evening Atmosphere' },
  ],

  recurringEvents: [
    { STATUS: 'active', DAY: 'Monday',    NAME_TH: 'วี-ไนท์',     NAME_EN: 'V-Night',      TIME: '20:00 – 21:00', IMAGE_URL: '' },
    { STATUS: 'active', DAY: 'Tuesday',   NAME_TH: 'คืนหน้ากาก',  NAME_EN: 'Mask Night',   TIME: '20:00 – 21:00', IMAGE_URL: '' },
    { STATUS: 'active', DAY: 'Wednesday', NAME_TH: 'โกมอน',        NAME_EN: 'Gomon Dark',   TIME: '20:00 – 21:00', IMAGE_URL: '' },
    { STATUS: 'active', DAY: 'Friday',    NAME_TH: 'ชิงโกะ',       NAME_EN: 'Chinko',       TIME: '19:00 – 19:45', IMAGE_URL: '', SLOT: 1 },
    { STATUS: 'active', DAY: 'Friday',    NAME_TH: 'ยูนิฟอร์ม',   NAME_EN: 'Uniform',      TIME: '20:00 – 21:00', IMAGE_URL: '', SLOT: 2 },
    { STATUS: 'active', DAY: 'Saturday',  NAME_TH: 'ชิงโกะ',       NAME_EN: 'Chinko',       TIME: '19:00 – 19:45', IMAGE_URL: '', SLOT: 1 },
    { STATUS: 'active', DAY: 'Saturday',  NAME_TH: 'รูฟท็อป',      NAME_EN: 'Rooftop Orgy', TIME: '20:00 – 21:00', IMAGE_URL: '', SLOT: 2 },
    { STATUS: 'active', DAY: 'Sunday',    NAME_TH: 'ชิงโกะ',       NAME_EN: 'Chinko',       TIME: '19:00 – 19:45', IMAGE_URL: '', SLOT: 1 },
    { STATUS: 'active', DAY: 'Sunday',    NAME_TH: 'พูลปาร์ตี้',   NAME_EN: 'Pool Party',   TIME: '20:00 – 21:00', IMAGE_URL: '', SLOT: 2 },
  ],

  weeklyThu: [
    {
      STATUS: 'active',
      DATE: '',
      NAME_TH: 'เอ็กซ์โมเดล',
      NAME_EN: 'X Model',
      TIME: '20:00 – 21:00',
      DESC_TH: 'อีเวนต์พิเศษประจำสัปดาห์',
      DESC_EN: 'Weekly special event',
      IMAGE_URL: '',
    },
  ],

  promotion: [
    {
      ORDER: 1,
      STATUS: 'active',
      CODE: 'VCK-VAL',
      NAME_TH: 'Value Package',
      NAME_EN: 'Value Package',
      DESC_TH: 'แพ็กเกจคุ้มค่าสำหรับการใช้บริการครบครัน ซาวน่า ออนเซ็น สระน้ำ ฟิตเนส',
      DESC_EN: 'All-inclusive package for a complete experience: sauna, onsen, pool & gym.',
      DESC_ZHS: '一票畅享所有设施：桑拿、温泉、泳池和健身房。',
      DESC_ZHT: '一票暢享所有設施：桑拿、溫泉、泳池和健身房。',
    },
    {
      ORDER: 2,
      STATUS: 'active',
      CODE: 'VCK-VCL',
      NAME_TH: 'Vclub7 Membership',
      NAME_EN: 'Vclub7 Membership',
      DESC_TH: 'สมาชิก Vclub7 รับสิทธิพิเศษตลอดปี ส่วนลดและสิทธิ์เข้าใช้พิเศษ',
      DESC_EN: 'Vclub7 members enjoy exclusive year-round privileges, discounts and priority access.',
      DESC_ZHS: 'Vclub7 会员全年享受专属优惠与优先使用权。',
      DESC_ZHT: 'Vclub7 會員全年享受專屬優惠與優先使用權。',
    },
    {
      ORDER: 3,
      STATUS: 'active',
      CODE: 'VCK-DAY',
      NAME_TH: 'One Day Pass',
      NAME_EN: 'One Day Pass',
      DESC_TH: 'เข้าใช้งานได้ทั้งวัน ไม่จำกัดรอบ เพลิดเพลินกับทุกสิ่งอำนวยความสะดวก',
      DESC_EN: 'Unlimited all-day access with no session limits. Enjoy every facility.',
      DESC_ZHS: '全天无限次使用，尽享所有设施。',
      DESC_ZHT: '全天無限次使用，盡享所有設施。',
    },
    {
      ORDER: 4,
      STATUS: 'active',
      CODE: 'VCK-STU',
      NAME_TH: 'โปรนักศึกษา',
      NAME_EN: 'Student Special',
      DESC_TH: 'ส่วนลดพิเศษสำหรับนักศึกษา แสดงบัตรนักศึกษาเพื่อรับสิทธิ์',
      DESC_EN: 'Special discount for students. Present your student ID to redeem.',
      DESC_ZHS: '学生专属折扣，出示学生证即可享受。',
      DESC_ZHT: '學生專屬折扣，出示學生證即可享受。',
    },
  ],

  gallery: [
    { ORDER: 1, STATUS: 'active', IMAGE_URL: '', CAPTION_TH: 'ซาวน่า', CAPTION_EN: 'Sauna' },
    { ORDER: 2, STATUS: 'active', IMAGE_URL: '', CAPTION_TH: 'ออนเซ็น', CAPTION_EN: 'Onsen' },
    { ORDER: 3, STATUS: 'active', IMAGE_URL: '', CAPTION_TH: 'สระน้ำ', CAPTION_EN: 'Pool' },
    { ORDER: 4, STATUS: 'active', IMAGE_URL: '', CAPTION_TH: 'ฟิตเนส', CAPTION_EN: 'Gym' },
    { ORDER: 5, STATUS: 'active', IMAGE_URL: '', CAPTION_TH: 'ห้องพัก', CAPTION_EN: 'Room' },
    { ORDER: 6, STATUS: 'active', IMAGE_URL: '', CAPTION_TH: 'คาเฟ่', CAPTION_EN: 'Café' },
  ],

};
