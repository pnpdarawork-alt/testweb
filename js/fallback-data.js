/* ═══════════════════════════════════════════════════════
   VCK COOL SPACE — Static Fallback Data
   Field names match the actual Google Sheets columns:
   Recurring_Events: TH, EN, ZH_S, ZH_T, TIME_1, TIME_2,
                     IMAGE_URL, DAY, STATUS, SLOT
   Gallery:          IMAGE_URL, ALT_TH, ALT_EN, ORDER, STATUS
   Hero_Images:      IMAGE_URL, ORDER, STATUS
═══════════════════════════════════════════════════════ */

const FALLBACK = {

  heroImages: [
    { ORDER: '1', STATUS: 'active', IMAGE_URL: '', ALT_TH: 'VCK Cool Space ซาวน่า', ALT_EN: 'VCK Cool Space Sauna' },
    { ORDER: '2', STATUS: 'active', IMAGE_URL: '', ALT_TH: 'ออนเซ็น และสระน้ำ',     ALT_EN: 'Onsen & Pool' },
    { ORDER: '3', STATUS: 'active', IMAGE_URL: '', ALT_TH: 'บรรยากาศยามค่ำคืน',     ALT_EN: 'Evening Atmosphere' },
  ],

  recurringEvents: [
    { STATUS: 'active', DAY: 'Monday',    TH: 'วี-ไนท์',     EN: 'V-Night',       ZH_S: 'V之夜',   ZH_T: 'V之夜',   TIME_1: '20:00', TIME_2: '21:00', IMAGE_URL: '', SLOT: '1' },
    { STATUS: 'active', DAY: 'Tuesday',   TH: 'คืนหน้ากาก',  EN: 'Mask Night',    ZH_S: '面具之夜', ZH_T: '面具之夜', TIME_1: '20:00', TIME_2: '21:00', IMAGE_URL: '', SLOT: '1' },
    { STATUS: 'active', DAY: 'Wednesday', TH: 'โกมอน',        EN: 'Gomon Dark',    ZH_S: '暗夜幻影', ZH_T: '暗夜幻影', TIME_1: '20:00', TIME_2: '21:00', IMAGE_URL: '', SLOT: '1' },
    { STATUS: 'active', DAY: 'Friday',    TH: 'ชิงโกะ',       EN: 'Chinko',        ZH_S: 'Chinko',   ZH_T: 'Chinko',   TIME_1: '19:00', TIME_2: '19:45', IMAGE_URL: '', SLOT: '1' },
    { STATUS: 'active', DAY: 'Friday',    TH: 'ยูนิฟอร์ม',   EN: 'Uniform',       ZH_S: '制服派对', ZH_T: '制服派對', TIME_1: '20:00', TIME_2: '21:00', IMAGE_URL: '', SLOT: '2' },
    { STATUS: 'active', DAY: 'Saturday',  TH: 'ชิงโกะ',       EN: 'Chinko',        ZH_S: 'Chinko',   ZH_T: 'Chinko',   TIME_1: '19:00', TIME_2: '19:45', IMAGE_URL: '', SLOT: '1' },
    { STATUS: 'active', DAY: 'Saturday',  TH: 'รูฟท็อป',      EN: 'Rooftop Orgy',  ZH_S: '屋顶派对', ZH_T: '屋頂派對', TIME_1: '20:00', TIME_2: '21:00', IMAGE_URL: '', SLOT: '2' },
    { STATUS: 'active', DAY: 'Sunday',    TH: 'ชิงโกะ',       EN: 'Chinko',        ZH_S: 'Chinko',   ZH_T: 'Chinko',   TIME_1: '19:00', TIME_2: '19:45', IMAGE_URL: '', SLOT: '1' },
    { STATUS: 'active', DAY: 'Sunday',    TH: 'พูลปาร์ตี้',   EN: 'Pool Party',    ZH_S: '泳池派对', ZH_T: '泳池派對', TIME_1: '20:00', TIME_2: '21:00', IMAGE_URL: '', SLOT: '2' },
  ],

  weeklyThu: [
    {
      STATUS:  'active',
      DATE:    '',
      TH:      'เอ็กซ์โมเดล',
      EN:      'X Model',
      ZH_S:    'X模特',
      ZH_T:    'X模特',
      TIME_1:  '20:00',
      TIME_2:  '21:00',
      IMAGE_URL: '',
    },
  ],

  promotion: [
    { ORDER: '1', STATUS: 'active', CODE: 'VCK-VAL', TH: 'Value Package',   EN: 'Value Package',    DESC_TH: 'แพ็กเกจคุ้มค่าสำหรับการใช้บริการครบครัน', DESC_EN: 'All-inclusive package',           DESC_ZHS: '超值套餐', DESC_ZHT: '超值套餐' },
    { ORDER: '2', STATUS: 'active', CODE: 'VCK-VCL', TH: 'Vclub7 Membership', EN: 'Vclub7 Membership', DESC_TH: 'สมาชิก Vclub7 รับสิทธิพิเศษตลอดปี',     DESC_EN: 'Year-round member privileges',     DESC_ZHS: 'Vclub7会员', DESC_ZHT: 'Vclub7會員' },
    { ORDER: '3', STATUS: 'active', CODE: 'VCK-DAY', TH: 'One Day Pass',    EN: 'One Day Pass',     DESC_TH: 'เข้าใช้งานได้ทั้งวัน ไม่จำกัดรอบ',        DESC_EN: 'Unlimited all-day access',         DESC_ZHS: '全日通',    DESC_ZHT: '全日通' },
    { ORDER: '4', STATUS: 'active', CODE: 'VCK-STU', TH: 'โปรนักศึกษา',    EN: 'Student Special',  DESC_TH: 'ส่วนลดพิเศษสำหรับนักศึกษา',               DESC_EN: 'Special discount for students',    DESC_ZHS: '学生优惠',  DESC_ZHT: '學生優惠' },
  ],

  gallery: [
    { ORDER: '1', STATUS: 'active', IMAGE_URL: '', ALT_TH: 'ซาวน่า',   ALT_EN: 'Sauna' },
    { ORDER: '2', STATUS: 'active', IMAGE_URL: '', ALT_TH: 'ออนเซ็น',  ALT_EN: 'Onsen' },
    { ORDER: '3', STATUS: 'active', IMAGE_URL: '', ALT_TH: 'สระน้ำ',   ALT_EN: 'Pool' },
    { ORDER: '4', STATUS: 'active', IMAGE_URL: '', ALT_TH: 'ฟิตเนส',   ALT_EN: 'Gym' },
    { ORDER: '5', STATUS: 'active', IMAGE_URL: '', ALT_TH: 'ห้องพัก',  ALT_EN: 'Room' },
    { ORDER: '6', STATUS: 'active', IMAGE_URL: '', ALT_TH: 'คาเฟ่',    ALT_EN: 'Café' },
  ],

};
