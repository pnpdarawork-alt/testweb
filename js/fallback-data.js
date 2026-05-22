/* ═══════════════════════════════════════════════════════
   VCK COOL SPACE — Static Fallback Data
   Field names match the actual Google Sheets columns:
   Hero_Images:       ORDER, IMAGE_URL, STATUS
   Recurring_Events:  DAY, TH, EN, ZH_S, ZH_T, TIME_1, TIME_2,
                      IMAGE_URL, DETAIL_TH, DETAIL_EN, DETAIL_ZH_S, DETAIL_ZH_T,
                      STATUS, SLOT
   Weekly_THU:        DATE, TH, EN, ZH_S, ZH_T, TIME,
                      IMAGE_URL, DETAIL_TH, DETAIL_EN, DETAIL_ZH_S, DETAIL_ZH_T,
                      STATUS
   Promotion:         ID, TH_TITLE, EN_TITLE, ZH_S_TITLE, ZH_T_TITLE,
                      TH_DETAIL, EN_DETAIL, ZH_S_DETAIL, ZH_T_DETAIL,
                      IMAGE_URL, CTA_URL, STATUS, ORDER
   Gallery:           ORDER, IMAGE_URL, STATUS
   Service:           ID, TH_TITLE, EN_TITLE, ZH_S_TITLE, ZH_T_TITLE,
                      TH_DETAIL, EN_DETAIL, ZH_S_DETAIL, ZH_T_DETAIL,
                      IMAGE_URL, TH, EN, ZH_S, ZH_T, CTA_URL, STATUS
═══════════════════════════════════════════════════════ */

const FALLBACK = {

  heroImages: [
    { ORDER: '1', STATUS: 'active', IMAGE_URL: '' },
    { ORDER: '2', STATUS: 'active', IMAGE_URL: '' },
    { ORDER: '3', STATUS: 'active', IMAGE_URL: '' },
  ],

  recurringEvents: [
    { STATUS: 'active', DAY: 'Monday',    TH: 'วี-ไนท์',     EN: 'V-Night',       ZH_S: 'V之夜',   ZH_T: 'V之夜',   TIME_1: '20:00', TIME_2: '21:00', IMAGE_URL: '', SLOT: '1', DETAIL_TH: 'ค่ำคืนสุดพิเศษสำหรับสมาชิก V',          DETAIL_EN: 'A special evening for V members',         DETAIL_ZH_S: 'V会员专属特别之夜',   DETAIL_ZH_T: 'V會員專屬特別之夜' },
    { STATUS: 'active', DAY: 'Tuesday',   TH: 'คืนหน้ากาก',  EN: 'Mask Night',    ZH_S: '面具之夜', ZH_T: '面具之夜', TIME_1: '20:00', TIME_2: '21:00', IMAGE_URL: '', SLOT: '1', DETAIL_TH: 'มาพร้อมหน้ากากแล้วปล่อยตัวเป็นอิสระ',    DETAIL_EN: 'Come masked and set yourself free',       DETAIL_ZH_S: '戴上面具，释放自我',   DETAIL_ZH_T: '戴上面具，釋放自我' },
    { STATUS: 'active', DAY: 'Wednesday', TH: 'โกมอน',        EN: 'Gomon Dark',    ZH_S: '暗夜幻影', ZH_T: '暗夜幻影', TIME_1: '20:00', TIME_2: '21:00', IMAGE_URL: '', SLOT: '1', DETAIL_TH: 'บรรยากาศมืดลึกลับ สไตล์ญี่ปุ่น',        DETAIL_EN: 'Dark mysterious atmosphere, Japanese style', DETAIL_ZH_S: '神秘黑暗，日式风格', DETAIL_ZH_T: '神秘黑暗，日式風格' },
    { STATUS: 'active', DAY: 'Friday',    TH: 'ชิงโกะ',       EN: 'Chinko',        ZH_S: 'Chinko',   ZH_T: 'Chinko',   TIME_1: '19:00', TIME_2: '19:45', IMAGE_URL: '', SLOT: '1', DETAIL_TH: 'โชว์สุดฮา ห้ามพลาด',                     DETAIL_EN: 'Fun show, not to be missed',              DETAIL_ZH_S: '趣味表演，不容错过', DETAIL_ZH_T: '趣味表演，不容錯過' },
    { STATUS: 'active', DAY: 'Friday',    TH: 'ยูนิฟอร์ม',   EN: 'Uniform',       ZH_S: '制服派对', ZH_T: '制服派對', TIME_1: '20:00', TIME_2: '21:00', IMAGE_URL: '', SLOT: '2', DETAIL_TH: 'แต่งชุดยูนิฟอร์มมาร่วมสนุก',             DETAIL_EN: 'Come in uniform and join the fun',        DETAIL_ZH_S: '穿上制服，一起狂欢', DETAIL_ZH_T: '穿上制服，一起狂歡' },
    { STATUS: 'active', DAY: 'Saturday',  TH: 'ชิงโกะ',       EN: 'Chinko',        ZH_S: 'Chinko',   ZH_T: 'Chinko',   TIME_1: '19:00', TIME_2: '19:45', IMAGE_URL: '', SLOT: '1', DETAIL_TH: 'โชว์สุดฮา ห้ามพลาด',                     DETAIL_EN: 'Fun show, not to be missed',              DETAIL_ZH_S: '趣味表演，不容错过', DETAIL_ZH_T: '趣味表演，不容錯過' },
    { STATUS: 'active', DAY: 'Saturday',  TH: 'รูฟท็อป',      EN: 'Rooftop Orgy',  ZH_S: '屋顶派对', ZH_T: '屋頂派對', TIME_1: '20:00', TIME_2: '21:00', IMAGE_URL: '', SLOT: '2', DETAIL_TH: 'ปาร์ตี้บนดาดฟ้า วิวสวย อากาศดี',        DETAIL_EN: 'Party on the rooftop with great views',   DETAIL_ZH_S: '屋顶派对，美景当前', DETAIL_ZH_T: '屋頂派對，美景當前' },
    { STATUS: 'active', DAY: 'Sunday',    TH: 'ชิงโกะ',       EN: 'Chinko',        ZH_S: 'Chinko',   ZH_T: 'Chinko',   TIME_1: '19:00', TIME_2: '19:45', IMAGE_URL: '', SLOT: '1', DETAIL_TH: 'โชว์สุดฮา ห้ามพลาด',                     DETAIL_EN: 'Fun show, not to be missed',              DETAIL_ZH_S: '趣味表演，不容错过', DETAIL_ZH_T: '趣味表演，不容錯過' },
    { STATUS: 'active', DAY: 'Sunday',    TH: 'พูลปาร์ตี้',   EN: 'Pool Party',    ZH_S: '泳池派对', ZH_T: '泳池派對', TIME_1: '20:00', TIME_2: '21:00', IMAGE_URL: '', SLOT: '2', DETAIL_TH: 'สนุกสนานริมสระน้ำทุกวันอาทิตย์',         DETAIL_EN: 'Poolside fun every Sunday',               DETAIL_ZH_S: '每周日泳池派对',     DETAIL_ZH_T: '每週日泳池派對' },
  ],

  weeklyThu: [
    {
      STATUS:     'active',
      DATE:       '',
      TH:         'เอ็กซ์โมเดล',
      EN:         'X Model',
      ZH_S:       'X模特',
      ZH_T:       'X模特',
      TIME:       '20:00',
      IMAGE_URL:  '',
      DETAIL_TH:  'ทีมนักแสดง X Model สุดเซ็กซี่',
      DETAIL_EN:  'Featuring the sexy X Model performers',
      DETAIL_ZH_S: 'X模特性感表演',
      DETAIL_ZH_T: 'X模特性感表演',
    },
  ],

  promotion: [
    {
      ORDER: '1', STATUS: 'active', ID: '1', IMAGE_URL: '',
      TH_TITLE: 'บัตร Value Package', EN_TITLE: 'Value Package', ZH_S_TITLE: '优惠套餐', ZH_T_TITLE: '優惠套餐',
      TH_DETAIL: 'ซื้อ 5 แถม 1 ราคา 1,099 บาท / ซื้อ 10 แถม 2 ราคา 2,099 บาท / บัตรเข้าใช้บริการได้ทุกวัน',
      EN_DETAIL: 'Buy 5 Get 1 Free 1,099 THB / Buy 10 Get 2 Free 2,099 THB / Valid every day',
      ZH_S_DETAIL: '买5送1 1,099泰铢 / 买10送2 2,099泰铢 / 每天可用',
      ZH_T_DETAIL: '買5送1 1,099泰銖 / 買10送2 2,099泰銖 / 每天可用',
      CTA_URL: 'https://line.me/vckcoolspace',
    },
    {
      ORDER: '2', STATUS: 'active', ID: '2', IMAGE_URL: '',
      TH_TITLE: 'Vclub7 Membership', EN_TITLE: 'Vclub7 Membership', ZH_S_TITLE: 'Vclub7会员', ZH_T_TITLE: 'Vclub7會員',
      TH_DETAIL: 'ส่วนลดค่าเข้า + สิทธิ์พิเศษ / โปรอายุ วันอาทิตย์ (คนไทย)',
      EN_DETAIL: 'Entrance discount + special privileges / Age promotion on Sundays (Thai nationals)',
      ZH_S_DETAIL: '入场折扣+特权 / 周日年龄优惠（泰国人）',
      ZH_T_DETAIL: '入場折扣+特權 / 週日年齡優惠（泰國人）',
      CTA_URL: 'https://line.me/vckcoolspace',
    },
    {
      ORDER: '3', STATUS: 'active', ID: '3', IMAGE_URL: '',
      TH_TITLE: 'โปรโมชั่นนักศึกษา', EN_TITLE: 'Student Special', ZH_S_TITLE: '学生优惠', ZH_T_TITLE: '學生優惠',
      TH_DETAIL: 'อายุไม่เกิน 23 ปี เพียง 160 บาท/ครั้ง / บัตรเข้าใช้บริการได้ทุกวัน',
      EN_DETAIL: 'Age 23 and under only 160 THB/visit / Valid every day',
      ZH_S_DETAIL: '23岁及以下仅160泰铢/次 / 每天可用',
      ZH_T_DETAIL: '23歲及以下僅160泰銖/次 / 每天可用',
      CTA_URL: 'https://line.me/vckcoolspace',
    },
    {
      ORDER: '4', STATUS: 'active', ID: '4', IMAGE_URL: '',
      TH_TITLE: 'บัตร One Day Pass', EN_TITLE: 'One Day Pass', ZH_S_TITLE: '单日通行证', ZH_T_TITLE: '單日通行證',
      TH_DETAIL: '450 บาท 1 แถม 1 / รับ 1 คะแนน / สะสม 10 คะแนน รับสิทธิ์เข้าฟรี 1 สิทธิ์ / บัตรแถมใช้ได้เฉพาะ จ–พฤ',
      EN_DETAIL: '450 THB Buy 1 Get 1 / Earn 1 point per visit / Collect 10 points get 1 free entry / Free ticket valid Mon–Thu only',
      ZH_S_DETAIL: '450泰铢买一送一 / 每次获1积分 / 积满10分免费入场1次 / 免费券仅限周一至周四',
      ZH_T_DETAIL: '450泰銖買一送一 / 每次獲1積分 / 積滿10分免費入場1次 / 免費券僅限週一至週四',
      CTA_URL: 'https://line.me/vckcoolspace',
    },
  ],

  gallery: [
    { ORDER: '1', STATUS: 'active', IMAGE_URL: '' },
    { ORDER: '2', STATUS: 'active', IMAGE_URL: '' },
    { ORDER: '3', STATUS: 'active', IMAGE_URL: '' },
    { ORDER: '4', STATUS: 'active', IMAGE_URL: '' },
    { ORDER: '5', STATUS: 'active', IMAGE_URL: '' },
    { ORDER: '6', STATUS: 'active', IMAGE_URL: '' },
  ],

  service: [
    {
      ID: '1', STATUS: 'active', IMAGE_URL: '',
      TH_TITLE: '🛁 Chakran Sauna', EN_TITLE: '🛁 Chakran Sauna', ZH_S_TITLE: '🛁 Chakran 桑拿', ZH_T_TITLE: '🛁 Chakran 桑拿',
      TH_DETAIL: 'ซาวน่าระดับพรีเมียม พร้อมออนเซ็น สระน้ำ และห้องสตีม ใจกลางกรุงเทพฯ เปิดให้บริการมาตั้งแต่ปี 1995',
      EN_DETAIL: 'Premium sauna with onsen, pool and steam room in the heart of Bangkok. Open since 1995.',
      ZH_S_DETAIL: '位于曼谷市中心的高级桑拿，配备温泉、泳池和蒸汽室，自1995年起开业。',
      ZH_T_DETAIL: '位於曼谷市中心的高級桑拿，配備溫泉、泳池和蒸汽室，自1995年起開業。',
      TH: 'สอบถามเพิ่มเติม', EN: 'Enquire', ZH_S: '立即咨询', ZH_T: '立即諮詢',
      CTA_URL: 'https://line.me/vckcoolspace',
    },
    {
      ID: '2', STATUS: 'active', IMAGE_URL: '',
      TH_TITLE: '🧖 Vclub7 Massage', EN_TITLE: '🧖 Vclub7 Massage', ZH_S_TITLE: '🧖 Vclub7 按摩', ZH_T_TITLE: '🧖 Vclub7 按摩',
      TH_DETAIL: 'บริการนวดเพื่อผ่อนคลายโดยผู้เชี่ยวชาญ หลากหลายโปรแกรม จองผ่าน Line Official ได้ทันที',
      EN_DETAIL: 'Expert relaxation massage with multiple programs. Book instantly via Line Official.',
      ZH_S_DETAIL: '专业放松按摩，多种套餐可选，可通过 Line Official 即时预订。',
      ZH_T_DETAIL: '專業放鬆按摩，多種套餐可選，可通過 Line Official 即時預訂。',
      TH: 'จองนวด', EN: 'Book Massage', ZH_S: '预约按摩', ZH_T: '預約按摩',
      CTA_URL: 'https://line.me/vckcoolspace',
    },
    {
      ID: '3', STATUS: 'active', IMAGE_URL: '',
      TH_TITLE: '🛏️ Ryokan & Chino Villa', EN_TITLE: '🛏️ Ryokan & Chino Villa', ZH_S_TITLE: '🛏️ Ryokan & Chino Villa', ZH_T_TITLE: '🛏️ Ryokan & Chino Villa',
      TH_DETAIL: 'พักผ่อนในบรรยากาศสไตล์ญี่ปุ่น ที่ Yaoi Ryokan หรือ Chino Villa สัมผัสความเป็นส่วนตัวในใจกลางกรุงเทพฯ',
      EN_DETAIL: 'Rest in a Japanese-inspired setting at Yaoi Ryokan or Chino Villa — an intimate retreat in central Bangkok.',
      ZH_S_DETAIL: '在 Yaoi Ryokan 或 Chino Villa 享受日式风情住宿体验，曼谷市中心的私密度假。',
      ZH_T_DETAIL: '在 Yaoi Ryokan 或 Chino Villa 享受日式風情住宿體驗，曼谷市中心的私密度假。',
      TH: 'จองห้องพัก', EN: 'Book Room', ZH_S: '预订客房', ZH_T: '預訂客房',
      CTA_URL: 'https://www.booking.com/blucabin',
    },
    {
      ID: '4', STATUS: 'active', IMAGE_URL: '',
      TH_TITLE: '☕ IKUZE Coffee Bar', EN_TITLE: '☕ IKUZE Coffee Bar', ZH_S_TITLE: '☕ IKUZE 咖啡吧', ZH_T_TITLE: '☕ IKUZE 咖啡吧',
      TH_DETAIL: 'คาเฟ่บรรยากาศผ่อนคลาย พร้อมเครื่องดื่มและของว่าง เปิดให้บริการระหว่างใช้สิ่งอำนวยความสะดวกต่างๆ',
      EN_DETAIL: 'Relaxed café with drinks and light snacks, open during your facility visit.',
      ZH_S_DETAIL: '休闲咖啡馆，提供饮品和小食，开放于设施使用期间。',
      ZH_T_DETAIL: '休閒咖啡館，提供飲品和小食，開放於設施使用期間。',
      TH: 'สอบถามเพิ่มเติม', EN: 'Enquire', ZH_S: '立即咨询', ZH_T: '立即諮詢',
      CTA_URL: 'https://line.me/vckcoolspace',
    },
  ],

};
