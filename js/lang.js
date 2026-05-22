/* ═══════════════════════════════════════════════════════
   VCK COOL SPACE — i18n Language System
   Languages: TH (default), EN, zh-s, zh-t
   Usage: switchLanguage('en')
═══════════════════════════════════════════════════════ */

const translations = {

  th: {
    'nav.events':           'อีเวนต์',
    'nav.promotion':        'โปรโมชัน',
    'nav.services':         'บริการ',
    'nav.gallery':          'แกลเลอรี',
    'nav.contact':          'ติดต่อ',

    'cta.book':             'จองที่พัก',
    'cta.inquire':          'สอบถามเพิ่มเติม',
    'cta.bookMassage':      'จองนวด',
    'cta.bookRyokan':       'จอง Yaoi Ryokan',
    'cta.bookVilla':        'จอง Chino Villa',

    'hero.title':           'Welcome to Chakran',
    'hero.subtitle':        'Sauna  ·  Onsen  ·  Pool  ·  Gym  ·  Stay',

    'events.eyebrow':       'EVENTS',
    'events.title':         "What's On",
    'events.today':         'วันนี้',
    'events.wednesday':     'วันพุธ',
    'events.gomonName':     'โกมอน',
    'events.gomonNameAlt':  'Gomon Dark',
    'events.thisWeek':      "อีเวนต์สัปดาห์นี้",
    'events.mon':           'จ',
    'events.tue':           'อ',
    'events.wed':           'พ',
    'events.thu':           'พฤ',
    'events.fri':           'ศ',
    'events.sat':           'ส',
    'events.sun':           'อา',
    'events.vnight':        'วี-ไนท์',
    'events.vnightEn':      'V-Night',
    'events.mask':          'คืนหน้ากาก',
    'events.maskEn':        'Mask Night',
    'events.gomon':         'โกมอน',
    'events.gomonEn':       'Gomon Dark',
    'events.thuName':       'เอ็กซ์โมเดล',
    'events.thuNameEn':     'X Model',
    'events.chinko':        'ชิงโกะ',
    'events.uniform':       'ยูนิฟอร์ม',
    'events.rooftop':       'รูฟท็อป',
    'events.pool':          'พูลปาร์ตี้',
    'events.noEvent':       'ไม่มีอีเวนต์วันนี้',

    'promo.eyebrow':        'PROMOTION',
    'promo.title':          'Special Offers',
    'promo.value':          'Value Package',
    'promo.valueDesc':      'แพ็กเกจคุ้มค่าสำหรับการใช้บริการครบครัน ซาวน่า ออนเซ็น สระน้ำ ฟิตเนส',
    'promo.vclub':          'Vclub7 Membership',
    'promo.vclubDesc':      'สมาชิก Vclub7 รับสิทธิพิเศษตลอดปี ส่วนลดและสิทธิ์เข้าใช้พิเศษ',
    'promo.daypass':        'One Day Pass',
    'promo.daypassDesc':    'เข้าใช้งานได้ทั้งวัน ไม่จำกัดรอบ เพลิดเพลินกับทุกสิ่งอำนวยความสะดวก',
    'promo.student':        'โปรนักศึกษา',
    'promo.studentDesc':    'ส่วนลดพิเศษสำหรับนักศึกษา แสดงบัตรนักศึกษาเพื่อรับสิทธิ์',

    'services.eyebrow':     'OUR SERVICES',
    'services.title':       'Experience',
    'services.saunaEye':    'Signature',
    'services.saunaTitle':  '🛁 Chakran Sauna',
    'services.saunaDesc':   'ซาวน่าระดับพรีเมียม พร้อมออนเซ็น สระน้ำ และห้องสตีม ใจกลางกรุงเทพฯ เปิดให้บริการมาตั้งแต่ปี 1995',
    'services.massageEye':  'Wellness',
    'services.massageTitle':'🧖 Vclub7 Massage',
    'services.massageDesc': 'บริการนวดเพื่อผ่อนคลายโดยผู้เชี่ยวชาญ หลากหลายโปรแกรม จองผ่าน Line Official ได้ทันที',
    'services.stayEye':     'Stay',
    'services.stayTitle':   '🛏️ Ryokan & Chino Villa',
    'services.stayDesc':    'พักผ่อนในบรรยากาศสไตล์ญี่ปุ่น ที่ Yaoi Ryokan หรือ Chino Villa สัมผัสความเป็นส่วนตัวในใจกลางกรุงเทพฯ',
    'services.coffeeEye':   'Café',
    'services.coffeeTitle': '☕ IKUZE Coffee Bar',
    'services.coffeeDesc':  'คาเฟ่บรรยากาศผ่อนคลาย พร้อมเครื่องดื่มและของว่าง เปิดให้บริการระหว่างใช้สิ่งอำนวยความสะดวกต่างๆ',

    'gallery.eyebrow':      'GALLERY',
    'gallery.title':        'Our Space',
    'gallery.all':          'ดูทั้งหมด ›',

    'contact.eyebrow':      'CONTACT',
    'contact.title':        'Find Us',
    'contact.followUs':     'ติดตามเรา',
    'contact.address':      'ที่อยู่',
    'contact.phone':        'โทรศัพท์',
    'contact.hours':        'เวลาทำการ',
    'contact.hoursWeekday': 'จ–พฤ  15:00 – 00:00',
    'contact.hoursWeekend': 'ศ–อา  14:00 – 00:00',
  },

  en: {
    'nav.events':           'Events',
    'nav.promotion':        'Promotion',
    'nav.services':         'Services',
    'nav.gallery':          'Gallery',
    'nav.contact':          'Contact',

    'cta.book':             'Book a Stay',
    'cta.inquire':          'Inquire',
    'cta.bookMassage':      'Book Massage',
    'cta.bookRyokan':       'Book Yaoi Ryokan',
    'cta.bookVilla':        'Book Chino Villa',

    'hero.title':           'Welcome to Chakran',
    'hero.subtitle':        'Sauna  ·  Onsen  ·  Pool  ·  Gym  ·  Stay',

    'events.eyebrow':       'EVENTS',
    'events.title':         "What's On",
    'events.today':         'Today',
    'events.wednesday':     'Wednesday',
    'events.gomonName':     'Gomon',
    'events.gomonNameAlt':  'Gomon Dark',
    'events.thisWeek':      "This Week's Events",
    'events.mon':           'MON',
    'events.tue':           'TUE',
    'events.wed':           'WED',
    'events.thu':           'THU',
    'events.fri':           'FRI',
    'events.sat':           'SAT',
    'events.sun':           'SUN',
    'events.vnight':        'V-Night',
    'events.vnightEn':      'V-Night',
    'events.mask':          'Mask Night',
    'events.maskEn':        'Mask Night',
    'events.gomon':         'Gomon',
    'events.gomonEn':       'Gomon Dark',
    'events.thuName':       'X Model',
    'events.thuNameEn':     'X Model',
    'events.chinko':        'Chinko',
    'events.uniform':       'Uniform',
    'events.rooftop':       'Rooftop Orgy',
    'events.pool':          'Pool Party',
    'events.noEvent':       'No events today',

    'promo.eyebrow':        'PROMOTION',
    'promo.title':          'Special Offers',
    'promo.value':          'Value Package',
    'promo.valueDesc':      'All-inclusive package for a complete experience: sauna, onsen, pool & gym.',
    'promo.vclub':          'Vclub7 Membership',
    'promo.vclubDesc':      'Vclub7 members enjoy exclusive year-round privileges, discounts and priority access.',
    'promo.daypass':        'One Day Pass',
    'promo.daypassDesc':    'Unlimited all-day access with no session limits. Enjoy every facility.',
    'promo.student':        'Student Special',
    'promo.studentDesc':    'Special discount for students. Present your student ID to redeem.',

    'services.eyebrow':     'OUR SERVICES',
    'services.title':       'Experience',
    'services.saunaEye':    'Signature',
    'services.saunaTitle':  '🛁 Chakran Sauna',
    'services.saunaDesc':   'Premium sauna with onsen, pool and steam room in the heart of Bangkok. Open since 1995.',
    'services.massageEye':  'Wellness',
    'services.massageTitle':'🧖 Vclub7 Massage',
    'services.massageDesc': 'Expert relaxation massage with multiple programs. Book instantly via Line Official.',
    'services.stayEye':     'Stay',
    'services.stayTitle':   '🛏️ Ryokan & Chino Villa',
    'services.stayDesc':    'Rest in a Japanese-inspired setting at Yaoi Ryokan or Chino Villa — an intimate retreat in central Bangkok.',
    'services.coffeeEye':   'Café',
    'services.coffeeTitle': '☕ IKUZE Coffee Bar',
    'services.coffeeDesc':  'Relaxed café with drinks and light snacks, open during your facility visit.',

    'gallery.eyebrow':      'GALLERY',
    'gallery.title':        'Our Space',
    'gallery.all':          'All Photos ›',

    'contact.eyebrow':      'CONTACT',
    'contact.title':        'Find Us',
    'contact.followUs':     'Follow Us',
    'contact.address':      'Address',
    'contact.phone':        'Phone',
    'contact.hours':        'Hours',
    'contact.hoursWeekday': 'Mon–Thu  15:00 – 00:00',
    'contact.hoursWeekend': 'Fri–Sun  14:00 – 00:00',
  },

  'zh-s': {
    'nav.events':           '活动',
    'nav.promotion':        '优惠',
    'nav.services':         '服务',
    'nav.gallery':          '图库',
    'nav.contact':          '联系',

    'cta.book':             '预订住宿',
    'cta.inquire':          '咨询',
    'cta.bookMassage':      '预订按摩',
    'cta.bookRyokan':       '预订 Yaoi Ryokan',
    'cta.bookVilla':        '预订 Chino Villa',

    'hero.title':           '欢迎来到 Chakran',
    'hero.subtitle':        '桑拿  ·  温泉  ·  泳池  ·  健身  ·  住宿',

    'events.eyebrow':       '活动',
    'events.title':         '本周精彩',
    'events.today':         '今日',
    'events.wednesday':     '星期三',
    'events.gomonName':     '暗夜幻影',
    'events.gomonNameAlt':  'Gomon Dark',
    'events.thisWeek':      '本周活动',
    'events.mon':           '一',
    'events.tue':           '二',
    'events.wed':           '三',
    'events.thu':           '四',
    'events.fri':           '五',
    'events.sat':           '六',
    'events.sun':           '日',
    'events.vnight':        'V之夜',
    'events.vnightEn':      'V-Night',
    'events.mask':          '面具之夜',
    'events.maskEn':        'Mask Night',
    'events.gomon':         '暗夜幻影',
    'events.gomonEn':       'Gomon Dark',
    'events.thuName':       'X模特',
    'events.thuNameEn':     'X Model',
    'events.chinko':        'Chinko',
    'events.uniform':       '制服派对',
    'events.rooftop':       '屋顶派对',
    'events.pool':          '泳池派对',
    'events.noEvent':       '今日无活动',

    'promo.eyebrow':        '优惠',
    'promo.title':          '特别优惠',
    'promo.value':          '超值套餐',
    'promo.valueDesc':      '一票畅享所有设施：桑拿、温泉、泳池和健身房。',
    'promo.vclub':          'Vclub7 会员',
    'promo.vclubDesc':      'Vclub7 会员全年享受专属优惠与优先使用权。',
    'promo.daypass':        '全日通',
    'promo.daypassDesc':    '全天无限次使用，尽享所有设施。',
    'promo.student':        '学生优惠',
    'promo.studentDesc':    '学生专属折扣，出示学生证即可享受。',

    'services.eyebrow':     '我们的服务',
    'services.title':       '体验',
    'services.saunaEye':    '招牌',
    'services.saunaTitle':  '🛁 Chakran 桑拿',
    'services.saunaDesc':   '位于曼谷市中心的高级桑拿，配备温泉、泳池和蒸汽室，自1995年起开业。',
    'services.massageEye':  '养生',
    'services.massageTitle':'🧖 Vclub7 按摩',
    'services.massageDesc': '专业放松按摩，多种套餐可选，可通过 Line Official 即时预订。',
    'services.stayEye':     '住宿',
    'services.stayTitle':   '🛏️ Ryokan & Chino Villa',
    'services.stayDesc':    '在 Yaoi Ryokan 或 Chino Villa 享受日式风情住宿体验，曼谷市中心的私密度假。',
    'services.coffeeEye':   '咖啡馆',
    'services.coffeeTitle': '☕ IKUZE 咖啡吧',
    'services.coffeeDesc':  '休闲咖啡馆，提供饮品和小食，开放于设施使用期间。',

    'gallery.eyebrow':      '图库',
    'gallery.title':        '我们的空间',
    'gallery.all':          '全部照片 ›',

    'contact.eyebrow':      '联系',
    'contact.title':        '找到我们',
    'contact.followUs':     '关注我们',
    'contact.address':      '地址',
    'contact.phone':        '电话',
    'contact.hours':        '营业时间',
    'contact.hoursWeekday': '周一至周四  15:00 – 00:00',
    'contact.hoursWeekend': '周五至周日  14:00 – 00:00',
  },

  'zh-t': {
    'nav.events':           '活動',
    'nav.promotion':        '優惠',
    'nav.services':         '服務',
    'nav.gallery':          '圖庫',
    'nav.contact':          '聯絡',

    'cta.book':             '預訂住宿',
    'cta.inquire':          '諮詢',
    'cta.bookMassage':      '預訂按摩',
    'cta.bookRyokan':       '預訂 Yaoi Ryokan',
    'cta.bookVilla':        '預訂 Chino Villa',

    'hero.title':           '歡迎來到 Chakran',
    'hero.subtitle':        '桑拿  ·  溫泉  ·  泳池  ·  健身  ·  住宿',

    'events.eyebrow':       '活動',
    'events.title':         '本週精彩',
    'events.today':         '今日',
    'events.wednesday':     '星期三',
    'events.gomonName':     '暗夜幻影',
    'events.gomonNameAlt':  'Gomon Dark',
    'events.thisWeek':      '本週活動',
    'events.mon':           '一',
    'events.tue':           '二',
    'events.wed':           '三',
    'events.thu':           '四',
    'events.fri':           '五',
    'events.sat':           '六',
    'events.sun':           '日',
    'events.vnight':        'V之夜',
    'events.vnightEn':      'V-Night',
    'events.mask':          '面具之夜',
    'events.maskEn':        'Mask Night',
    'events.gomon':         '暗夜幻影',
    'events.gomonEn':       'Gomon Dark',
    'events.thuName':       'X模特',
    'events.thuNameEn':     'X Model',
    'events.chinko':        'Chinko',
    'events.uniform':       '制服派對',
    'events.rooftop':       '屋頂派對',
    'events.pool':          '泳池派對',
    'events.noEvent':       '今日無活動',

    'promo.eyebrow':        '優惠',
    'promo.title':          '特別優惠',
    'promo.value':          '超值套餐',
    'promo.valueDesc':      '一票暢享所有設施：桑拿、溫泉、泳池和健身房。',
    'promo.vclub':          'Vclub7 會員',
    'promo.vclubDesc':      'Vclub7 會員全年享受專屬優惠與優先使用權。',
    'promo.daypass':        '全日通',
    'promo.daypassDesc':    '全天無限次使用，盡享所有設施。',
    'promo.student':        '學生優惠',
    'promo.studentDesc':    '學生專屬折扣，出示學生證即可享受。',

    'services.eyebrow':     '我們的服務',
    'services.title':       '體驗',
    'services.saunaEye':    '招牌',
    'services.saunaTitle':  '🛁 Chakran 桑拿',
    'services.saunaDesc':   '位於曼谷市中心的高級桑拿，配備溫泉、泳池和蒸汽室，自1995年起開業。',
    'services.massageEye':  '養生',
    'services.massageTitle':'🧖 Vclub7 按摩',
    'services.massageDesc': '專業放鬆按摩，多種套餐可選，可通過 Line Official 即時預訂。',
    'services.stayEye':     '住宿',
    'services.stayTitle':   '🛏️ Ryokan & Chino Villa',
    'services.stayDesc':    '在 Yaoi Ryokan 或 Chino Villa 享受日式風情住宿體驗，曼谷市中心的私密度假。',
    'services.coffeeEye':   '咖啡館',
    'services.coffeeTitle': '☕ IKUZE 咖啡吧',
    'services.coffeeDesc':  '休閒咖啡館，提供飲品和小食，開放於設施使用期間。',

    'gallery.eyebrow':      '圖庫',
    'gallery.title':        '我們的空間',
    'gallery.all':          '全部照片 ›',

    'contact.eyebrow':      '聯絡',
    'contact.title':        '找到我們',
    'contact.followUs':     '關注我們',
    'contact.address':      '地址',
    'contact.phone':        '電話',
    'contact.hours':        '營業時間',
    'contact.hoursWeekday': '週一至週四  15:00 – 00:00',
    'contact.hoursWeekend': '週五至週日  14:00 – 00:00',
  },
};

/* Translate all [data-i18n] inside `root` (default: whole document).
   Render modules call this on newly-built fragments instead of
   re-invoking switchLanguage (which would recurse via langchange). */
function applyI18n(root) {
  root = root || document;
  const dict = translations[getLang()] || translations.th;
  root.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
}

function switchLanguage(lang) {
  if (!translations[lang]) return;
  localStorage.setItem('vck-lang', lang);
  document.documentElement.lang = lang === 'th' ? 'th' : lang === 'en' ? 'en' : 'zh';

  applyI18n(document);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('lang-btn--active', btn.dataset.lang === lang);
  });

  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

function getLang() {
  return localStorage.getItem('vck-lang') || 'th';
}

function t(key) {
  const lang = getLang();
  return (translations[lang] && translations[lang][key]) || (translations.th[key]) || key;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
  });
  switchLanguage(getLang());
});
