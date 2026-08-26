/* ТАЛГАТ БЕЛИСАРОВ — юридический консультант, Костанай
   Vanilla JS без зависимостей. Обработчики tel:/WhatsApp — делегированные,
   чтобы Opus позже повесил gtag-конверсии в одном месте. */
(function () {
  "use strict";

  var WA_PHONE = "77783597878";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* служебный режим для скриншотов: ?shot */
  if (/[?&]shot\b/.test(location.search)) {
    document.documentElement.classList.add("shotmode");
    reduceMotion = true;
  }

  /* ═════════ i18n: RU в разметке, KK — словарь. RU-оригиналы снимаются с DOM ═════════ */

  var META = {
    ru: {
      title: "Талгат Белисаров — юридический консультант в Костанае. Судебные и сложные споры",
      desc: "Персональная юридическая практика в Костанае: представительство в судах, взыскание задолженности, налоговые споры и проверки, госзакупки, строительные и земельные споры, защита потерпевших. 15+ лет опыта: следствие, СЭР, прокуратура. Тел.: +7 778 359 78 78."
    },
    kk: {
      title: "Талгат Белисаров — Қостанайдағы заң консультанты. Сот даулары және күрделі даулар",
      desc: "Қостанайдағы жеке заң практикасы: сотта өкілдік ету, берешекті өндіріп алу, салықтық даулар мен тексерулер, мемлекеттік сатып алу, құрылыс және жер даулары, жәбірленушілерді қорғау. 15+ жыл тәжірибе: тергеу, ЭТҚ, прокуратура. Тел.: +7 778 359 78 78."
    }
  };

  var KK = {
    "skip": "Практика бағыттарына өту",
    "brand.role": "заң консультанты",
    "nav.services": "Бағыттар",
    "nav.exp": "Тәжірибе",
    "nav.process": "Жұмыс тәртібі",
    "nav.reviews": "Пікірлер",
    "nav.contacts": "Байланыс",
    "mnav.addr": "Қостанай, «Кеме» БО, Полевая к-сі, 7/3",

    "hero.over": "Заң консультанты · Қостанай",
    "hero.h1a": "Мен 15 жыл процестің арғы жағында жұмыс істедім.",
    "hero.h1b": "Енді&nbsp;— сіздің жағыңыздамын.",
    "hero.sub": "Ішкі істер органдары, Экономикалық тергеу қызметі, прокуратура&nbsp;— мемлекеттік жүйенің істі қалай жүргізетінін іштен білемін. Бүгін бұл тәжірибе сізге қызмет етеді: сотта, мемлекеттік органдармен дауларда және күрделі келіссөздерде.",
    "hero.call": "Қоңырау шалу",
    "hero.callnote": "қоңыраулар: дс–жм 20:00-ге дейін, сб–жс 10:00–20:00",
    "hero.wa": "WhatsApp арқылы жазу",
    "hero.form": "немесе өтінім қалдыру&nbsp;→",
    "hero.f1": "жыл құқық саласында",
    "hero.f2": "2ГИС рейтингі",
    "hero.f3": "практика бағыты",
    "portrait.top": "Жеке практика",
    "portrait.bottom": "Қостанай · «Кеме» БО",

    "career.s1": "ІІО тергеушісі",
    "career.s2": "ЭТҚ тергеушісі",
    "career.s3": "Прокурор",
    "career.s4": "Оқытушы",
    "career.s5": "Жеке практика",

    "marquee": "сот даулары&ensp;·&ensp;берешекті өндіріп алу&ensp;·&ensp;салықтық тексерулер&ensp;·&ensp;мемлекеттік сатып алу&ensp;·&ensp;құрылыс мердігерлігі&ensp;·&ensp;жер даулары&ensp;·&ensp;жер қойнауын пайдалану&ensp;·&ensp;мүлікті бөлу&ensp;·&ensp;жәбірленушілерді қорғау&ensp;·&ensp;құқықтық талдау&ensp;·&ensp;",

    "svc.label": "Практика бағыттары",
    "svc.h2": "Немен айналысамын",
    "svc.intro": "Әр бағыт&nbsp;— өз мерзімдері мен ережелері бар жеке рәсім. Өз жағдайыңызды табыңыз&nbsp;— немесе оны маған сипаттап беріңіз, мен оны қалай саралау керегін және неден бастау керегін айтамын.",
    "toc.t": "Тізімдеме",
    "cluster.a": "Соттар мен даулар",
    "cluster.b": "Бизнес және мемлекетпен жұмыс",
    "cluster.c": "Жеке тұлғаларға",
    "svc.cta": "Жағдайды талқылау",

    "svc.sudy.t": "Сотта өкілдік ету",
    "svc.sudy.l1": "азаматтық және кәсіпкерлік даулар",
    "svc.sudy.l2": "соттарда және мемлекеттік органдарда өкілдік ету",
    "svc.sudy.l3": "сот шешімдеріне шағымдану",
    "svc.sudy.l4": "келіссөздер, сотқа дейінгі реттеу, бітімгершілік келісімдер",

    "svc.dokumenty.t": "Процестік құжаттар",
    "svc.dokumenty.l1": "талап арыздар және талап арызға пікірлер",
    "svc.dokumenty.l2": "апелляциялық және өзге де шағымдар",
    "svc.dokumenty.l3": "кінәрат-талаптар мен сотқа дейінгі талаптар",
    "svc.dokumenty.l4": "өтінішхаттар, мемлекеттік органдарға арыздар",

    "svc.vzyskanie.t": "Берешекті өндіріп алу",
    "svc.vzyskanie.l1": "қолхаттар мен қарыз шарттары бойынша борыштар",
    "svc.vzyskanie.l2": "шарттар, актілер, жүкқұжаттар бойынша контрагенттерден өндіріп алу",
    "svc.vzyskanie.l3": "сотқа дейінгі талаптар, келіссөздер, берешекті қайта құрылымдау келісімдері",
    "svc.vzyskanie.l4": "жеке сот орындаушыларының әрекеттеріне шағымдану, Жеке сот орындаушылары палатасына шағымдар",

    "svc.dogovory.t": "Шарттық және кәсіпкерлік даулар",
    "svc.dogovory.l1": "жеткізу, мердігерлік, жалдау, қызмет көрсету бойынша даулар",
    "svc.dogovory.l2": "шарттарды талдау және дайындау, шарт талаптарын нақтылау",
    "svc.dogovory.l3": "контрагенттермен дауларда қорғау",

    "svc.zemlya.t": "Жер даулары",
    "svc.zemlya.l1": "жер учаскелеріне құқықтар туралы даулар",
    "svc.zemlya.l2": "заңсыз актілер мен нұсқамаларға шағымдану",
    "svc.zemlya.l3": "жерге қатысты құжаттарды құқықтық талдау",

    "svc.biznes.t": "Бизнесті заңдық сүйемелдеу",
    "svc.biznes.l1": "шарттық жұмыс: жеткізу, мердігерлік, жалдау, қосалқы мердігерлік, лизинг",
    "svc.biznes.l2": "контрагенттердің құжаттары мен мәмілелеріне заңдық сараптама",
    "svc.biznes.l3": "мемлекеттік органдар тексерулерін сүйемелдеу, актілерге қарсылықтар",
    "svc.biznes.l4": "корпоративтік мәселелер, ЖК мен ЖШС-ні тіркеу және тарату",

    "svc.nalogi.t": "Салықтық даулар және тексерулер",
    "svc.nalogi.l1": "салықтық тексерулер кезінде сүйемелдеу және қорғау",
    "svc.nalogi.l2": "мемлекеттік кірістер органдарының хабарламаларына жауаптар",
    "svc.nalogi.l3": "актілерге қарсылықтар, тексеру нәтижелеріне шағымдану",
    "svc.nalogi.l4": "соттардағы салықтық даулар",

    "svc.goszakupki.t": "Мемлекеттік сатып алу және тендерлік даулар",
    "svc.goszakupki.l1": "тендерлік құжаттаманы талдау",
    "svc.goszakupki.l2": "шағымдар және сатып алу қорытындыларын даулау",
    "svc.goszakupki.l3": "бәсекелестердің өтінімдерін сәйкестікке тексеру",
    "svc.goszakupki.l4": "конкурстарға қатысуды сүйемелдеу",

    "svc.stroitelstvo.t": "Құрылыс даулары",
    "svc.stroitelstvo.l1": "құрылыс мердігерлігі және қосалқы мердігерлік шарттары",
    "svc.stroitelstvo.l2": "тапсырыс беруші мен мердігер даулары: мерзім, сапа, төлем",
    "svc.stroitelstvo.l3": "кінәрат-талаптар, актілер, сотта қорғау",

    "svc.nedra.t": "Жер қойнауын пайдалану",
    "svc.nedra.l1": "жер қойнауы заңнамасының талаптары бойынша кеңестер",
    "svc.nedra.l2": "уәкілетті органдарға өтініштер мен түсініктемелер",
    "svc.nedra.l3": "тексерулерді сүйемелдеу, актілер мен нұсқамаларға шағымдану",

    "svc.semya.t": "Отбасы құқығы",
    "svc.semya.l1": "некені бұзу (ажырасу)",
    "svc.semya.l2": "ерлі-зайыптылардың мүлкін бөлу",
    "svc.semya.l3": "алимент және баламен қарым-қатынас тәртібі",
    "svc.semya.l4": "мұрагерлік істер, үлестерді анықтау",

    "svc.poterpevshie.t": "Қылмыстық процесте жәбірленушілерді қорғау",
    "svc.poterpevshie.l1": "қылмыс туралы арыз және оны СДТБТ-та (ЕРДР) тіркеу",
    "svc.poterpevshie.l2": "тіркеуден бас тартуға шағымдану, тергеушілердің әрекетсіздігіне шағымдар",
    "svc.poterpevshie.l3": "тексеру мерзімдерін бақылау, дәлелдемелер базасын талдау",
    "svc.poterpevshie.l4": "келтірілген залалды өтеу",

    "svc.konsultacii.t": "Консультациялар және құқықтық талдау",
    "svc.konsultacii.l1": "бір реттік консультация және құжаттарды құқықтық талдау",
    "svc.konsultacii.l2": "тұтынушылар құқығын қорғау, борыштар, қолхаттар, кепілдік хаттар",
    "svc.konsultacii.l3": "көші-қон мәселелері: ықтиярхат, тіркеу, жұмысқа рұқсат",
    "svc.konsultacii.l4": "жеке тұлғалардың банкроттығы: негіздерді тексеру, арыз дайындау",

    "exp.label": "Тәжірибе",
    "exp.h2": "Бұл жүйені іштен білемін",
    "exp.intro": "Жеке практикаға дейін мен істер қозғалатын, тергелетін және бақыланатын жерде қызмет еттім. Сондықтан заңда не жазылғанын ғана емес, шешімдердің іс жүзінде қалай қабылданатынын да түсінемін.",
    "exp.t1": "Ішкі істер органдарының тергеушісі",
    "exp.p1": "Жалпы қылмыстық бағыттағы қылмыстық істерді тергеу: дәлелдемелер, жауап алу, процестік мерзімдер.",
    "exp.t2": "Экономикалық тергеу қызметінің тергеушісі",
    "exp.p2": "Экономикалық қылмыстар мен лауазымдық құқық бұзушылықтарды тергеу.",
    "exp.t3": "Прокурор",
    "exp.p3": "Заңдылықты қадағалау: бизнесті қорғау, салық, мемлекеттік сатып алу, жер қойнауын пайдалану, тұрғын үй қатынастары, құрылыс және сәулет.",
    "exp.t4": "Оқытушы",
    "exp.p4": "Оқытушылық жұмыс&nbsp;— күрделі құқықтық мәселелерді қарапайым әрі жүйелі түсіндіру дағдысы.",
    "exp.t5": "Жеке заң практикасы",
    "exp.p5": "Қостанайдағы және Қазақстан бойынша сот даулары мен күрделі даулар. Жинақталған бүкіл тәжірибе&nbsp;— енді клиент жағында.",
    "exp.numcap": "жыл құқық саласында",
    "exp.quote": "«Экономикалық, жалпы қылмыстық бағыттағы қылмыстық істерді және лауазымдық құқық бұзушылықтарды тергеу мен қадағалау тәжірибем бар. Бизнесті қорғау, салық заңнамасы, мемлекеттік сатып алу, жер қойнауын пайдалану, тұрғын үй қатынастары, құрылыс және сәулет қызметі мәселелері бойынша мемлекеттік органдардың қызметіне қадағалауды жүзеге асырдым».",

    "proc.label": "Жұмыс тәртібі",
    "proc.h2": "Жұмыс қалай жүреді",
    "proc.t1": "Хабарласу",
    "proc.p1": "Қоңырау немесе хабарлама. Жағдайды қысқаша сипаттайсыз&nbsp;— қандай құжаттар қажет болатынын айтамын.",
    "proc.t2": "Талдау",
    "proc.p2": "Құжаттар мен практиканы зерделеймін, істің болашағын бағалаймын және құнын айтамын&nbsp;— жұмыс басталғанға дейін.",
    "proc.t3": "Позиция",
    "proc.p3": "Стратегия мен мерзімдерді келісеміз. Құжаттарды дайындаймын: талап арыз, пікір, шағым, шарт, кінәрат-талап.",
    "proc.t4": "Сүйемелдеу",
    "proc.p4": "Істі жүргіземін: соттар, мемлекеттік органдар, келіссөздер. Сіз әр қадам мен әр құжаттан хабардарсыз.",
    "honest.q": "Істің болашағы болмаса, мұны менен тікелей естисіз&nbsp;— бір жыл соттасқаннан кейін емес, талдау кезеңінде.",
    "honest.c": "Мен «кез келген істі ұтамыз» деп уәде бермеймін&nbsp;— мүмкіндіктерді адал бағалап, нақты көмектесе алатын істерге ғана кірісемін.",

    "rev.label": "Пікірлер",
    "rev.h2": "Клиенттер не дейді",
    "rev.cap": "2ГИС рейтингі",
    "rev.btn2gis": "2ГИС пікірлері",
    "rev.btngoogle": "Google пікірлері",
    "rev.note": "Пікірлер 2ГИС-тен сөзбе-сөз, түпнұсқа тілінде келтірілген.",

    "faq.h2": "Жүгінер алдында қойылатын сұрақтар",
    "faq.q1": "Консультация және істі жүргізу қанша тұрады?",
    "faq.a1": "Құны істің санаты мен жұмыс көлеміне байланысты. Бағаны тапсырманы түсінгеннен кейін&nbsp;— жұмыс басталғанға дейін, жасырын қосымша төлемсіз айтамын. Жағдайыңызды телефон немесе WhatsApp арқылы сипаттаңыз&nbsp;— бұл ешнәрсеге міндеттемейді.",
    "faq.q2": "Кез келген іске кірісесіз бе?",
    "faq.a2": "Жоқ. Алдымен құжаттарды талдап, істің болашағын бағалаймын. Заң мен практика бойынша мүмкіндік болмаса&nbsp;— мұны тікелей айтып, себебін түсіндіремін. Сіз алдын ала ұтылатын процеске ақша төлемейсіз.",
    "faq.q3": "Заң консультанты адвокаттан немен ерекшеленеді?",
    "faq.a3": "Адвокат&nbsp;— ең алдымен қылмыстық істер бойынша айыпталушыларды қорғау үшін міндетті, лицензияланатын мәртебе. Мен заң консультанты ретінде жұмыс істеймін: адвокат мәртебесі талап етілмейтін азаматтық, әкімшілік, салықтық және өзге де істерді жүргіземін, ал қылмыстық процесте жәбірленуші тараптың мүддесін білдіремін.",
    "faq.q4": "Қашықтан жұмыс істейсіз бе?",
    "faq.a4": "Иә. Істердің жекелеген санаттары бойынша бүкіл республика көлемінде жұмыс істеймін: консультациялар, құжаттарды талдау, талап арыздар мен шағымдар дайындау&nbsp;— қашықтан. Негізгі практика&nbsp;— Қостанай және Қостанай облысы.",
    "faq.q5": "Алғашқы консультацияға не алып келу керек?",
    "faq.a5": "Іске қатысты барлық құжатты: шарттар, қолхаттар, хат-хабар, хабарламалар, сот немесе мемлекеттік орган шешімдері. Құжат болмаса&nbsp;— жағдайды сипаттап келіңіз, нені қалпына келтіруге және сұратуға болатынын бірге анықтаймыз.",
    "faq.q6": "Қай уақытта қоңырау шалуға болады?",
    "faq.a6": "Жұмыс күндері қоңырауларды 20:00-ге дейін, демалыс күндері 10:00-ден 20:00-ге дейін қабылдаймын. Кеңседе қабылдау: дс–жм 09:00–18:00, демалыс күндері&nbsp;— алдын ала жазылу бойынша. WhatsApp хабарламаларына сол күні жауап беремін.",

    "cont.label": "Байланыс",
    "cont.h2": "Маған хабарласу",
    "cont.phone": "Телефон · WhatsApp · Telegram",
    "cont.phonenote": "қоңыраулар: дс–жм 20:00-ге дейін · сб–жс 10:00–20:00",
    "cont.addr": "Мекенжай",
    "cont.addrval": "Қостанай, «Кеме» БО, Полевая к-сі, 7/3, 3-қабат, №3 кеңсе",
    "cont.hours": "қабылдау: дс–жм 09:00–18:00 · сб–жс алдын ала жазылу бойынша",
    "cont.2gis": "2ГИС-те ашу",
    "scheme.street": "Полевая к-сі",
    "scheme.addr": "Полевая, 7/3 · 3-қабат · №3 кеңсе",

    "form.h3": "Өтінім қалдыру",
    "form.sub": "Жағдайды сипаттаңыз&nbsp;— жауап беріп, қалай көмектесе алатынымды айтамын. Форма дайын хабарламамен WhatsApp мессенджерін ашады, деректер еш жерде сақталмайды.",
    "form.name": "Есіміңіз",
    "form.nameph": "Сізге қалай жүгінсем болады",
    "form.tel": "Телефон",
    "form.msg": "Жағдай туралы қысқаша",
    "form.msgph": "Мысалы: мердігер шарт бойынша аванс қайтармады…",
    "form.send": "WhatsApp арқылы жіберу",
    "form.donet": "Рақмет!",
    "form.donep": "Хабарлама құрастырылып, WhatsApp мессенджерінде ашылды. Терезе ашылмаса&nbsp;— жай ғана қоңырау шалыңыз: +7&nbsp;778&nbsp;359&nbsp;78&nbsp;78.",

    "footer.role": "Заң консультанты · Қостанай",
    "footer.note": "Адвокат мәртебесі талап етілмейтін істер бойынша заң көмегін көрсетемін. Қылмыстық процесте&nbsp;— жәбірленуші тараптың мүддесін қорғау.",
    "footer.copy": "Талгат Белисаров, Қостанай"
  };

  /* снимок RU-оригиналов с DOM */
  var RU_HTML = {};
  var RU_PH = {};
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var k = el.getAttribute("data-i18n");
    if (!(k in RU_HTML)) RU_HTML[k] = el.innerHTML;
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
    var k = el.getAttribute("data-i18n-ph");
    if (!(k in RU_PH)) RU_PH[k] = el.getAttribute("placeholder") || "";
  });

  var currentLang = "ru";

  function applyLang(lang) {
    currentLang = lang === "kk" ? "kk" : "ru";
    var kk = currentLang === "kk";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      var v = kk ? KK[k] : RU_HTML[k];
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-ph");
      var v = kk ? KK[k] : RU_PH[k];
      if (v != null) el.setAttribute("placeholder", v);
    });

    document.documentElement.setAttribute("lang", currentLang);
    document.title = META[currentLang].title;
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", META[currentLang].desc);

    document.querySelectorAll(".lang button").forEach(function (b) {
      var on = b.getAttribute("data-lang") === currentLang;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    try { localStorage.setItem("belisarov-lang", currentLang); } catch (e) {}
  }

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { applyLang(b.getAttribute("data-lang")); });
  });

  var savedLang = null;
  try { savedLang = localStorage.getItem("belisarov-lang"); } catch (e) {}
  var urlLang = (location.search.match(/[?&]lang=(ru|kk)\b/) || [])[1];
  if (urlLang) { applyLang(urlLang); }
  else if (savedLang && savedLang !== "ru") { applyLang(savedLang); }

  /* ═════════ делегированные клики: WhatsApp / tel ═════════ */
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a") : null;
    if (!a) return;

    var wa = currentLang === "kk"
      ? (a.getAttribute("data-wa-kk") || a.getAttribute("data-wa"))
      : a.getAttribute("data-wa");
    if (wa) {
      e.preventDefault();
      window.open("https://wa.me/" + WA_PHONE + "?text=" + encodeURIComponent(wa), "_blank", "noopener");
      /* сюда позже добавится gtag('event', 'whatsapp_click', …) */
      return;
    }
    if (a.href && a.href.indexOf("tel:") === 0) {
      /* сюда позже добавится gtag('event', 'phone_click', …) */
    }
  });

  /* ═════════ header: подложка при скролле ═════════ */
  var header = document.getElementById("header");
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ═════════ мобильное меню ═════════ */
  var burger = document.getElementById("burger");
  var mnav = document.getElementById("mnav");

  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    mnav.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.style.overflow = open ? "hidden" : "";
  }
  burger.addEventListener("click", function () {
    setMenu(!document.body.classList.contains("menu-open"));
  });
  mnav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) setMenu(false);
  });

  /* ═════════ появление при скролле ═════════ */
  var animTargets = document.querySelectorAll(".reveal, .stamp, .timeline, .steps, .career-line");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    animTargets.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -40px 0px" });
    animTargets.forEach(function (el) { io.observe(el); });
  }

  /* ═════════ опись: активный пункт ═════════ */
  var tocLinks = document.querySelectorAll(".toc a");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var map = {};
    tocLinks.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var tio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var link = map[en.target.id];
        if (!link) return;
        if (en.isIntersecting) {
          tocLinks.forEach(function (a) { a.classList.remove("active"); });
          link.classList.add("active");
        }
      });
    }, { rootMargin: "-30% 0px -55% 0px" });
    document.querySelectorAll(".svc[id]").forEach(function (s) { tio.observe(s); });
  }

  /* ═════════ FAQ ═════════ */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    q.addEventListener("click", function () {
      var open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", open ? "true" : "false");
      a.style.maxHeight = open ? a.scrollHeight + "px" : "0px";
    });
  });

  /* ═════════ форма → WhatsApp ═════════ */
  var form = document.getElementById("leadform");
  var done = document.getElementById("formdone");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (form.name.value || "").trim();
      var phone = (form.phone.value || "").trim();
      var msg = (form.msg.value || "").trim();
      if (!name || !phone || !msg) {
        [form.name, form.phone, form.msg].forEach(function (f) {
          f.style.borderColor = f.value.trim() ? "" : "#c96a5a";
        });
        return;
      }
      var text = currentLang === "kk"
        ? "Сәлеметсіз бе, Талгат! Менің атым " + name + ". Телефон: " + phone + ". Жағдай: " + msg
        : "Здравствуйте, Талгат! Меня зовут " + name + ". Телефон: " + phone + ". Ситуация: " + msg;
      window.open("https://wa.me/" + WA_PHONE + "?text=" + encodeURIComponent(text), "_blank", "noopener");
      /* сюда позже добавится gtag('event', 'form_submit', …) */
      done.hidden = false;
      form.reset();
      done.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
    });
  }
})();
