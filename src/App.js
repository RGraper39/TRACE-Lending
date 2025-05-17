import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// --- Компонент для анимации появления элементов ---
function ScrollReveal({ offset = 100, delay = 0, children }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - offset && rect.bottom > 0) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return (
    <div
      ref={ref}
      style={{
        transform: visible ? "translateY(0)" : "translateY(60px)",
        opacity: visible ? 1 : 0,
        transition: "all 0.7s",
        transitionDelay: `${delay}s`
      }}
    >
      {children}
    </div>
  );
}

// --- Popup helpers ---
function useOncePerSession(key, triggerFn) {
  useEffect(() => {
    if (!sessionStorage.getItem(key)) {
      triggerFn();
      sessionStorage.setItem(key, "shown");
    }
  }, [key, triggerFn]);
}

// --- Переводы ---
const translations = {
  en: {
    popupWelcomeTitle: "Where do you want to leave your TRACE?",
    popupWelcomeDesc: "Find your power place. Start your journey with inspiration.",
    popupWelcomeBtn: "Start exploring",
    popupExitTitle: "Want secret places locals love?",
    popupExitDesc: "We’ll send 5 hidden gems by email",
    popupExitBtn: "Send me the list",
    popupExitSent: "Sent! Check your inbox.",
    popupStickyTitle: "TRACE is coming soon",
    popupStickyBtn: "Get early access",
    popupStickyThanks: "Thank you!",
    popupMapBtn: "Add to my route",
    popupEmailPlaceholder: "Your email",
    popupEmailPlaceholderShort: "Email",
    heroTitle: "Leave your TRACE.\nDiscover your path.",
    heroDesc: "TRACE is more than just routes.\nIt's your voice companion, personalized feed, local tips, and language practice — all in your pocket.",
    tryDemo: "Try the Demo",
    getEarlyAccess: "Get Early Access",
    soundsFamiliar: "Sounds familiar?",
    soundsFamiliarDesc: "Here are the main challenges modern travelers face — do any of these sound like you?",
    notSure: "Not sure where to go or why",
    notSureDesc: "Too many options and recommendations — it's hard to know what truly fits you.",
    planningRoutes: "Planning routes is exhausting",
    planningRoutesDesc: "Hours of Googling and piecing together routes can be draining and not enjoyable.",
    noOneToTalk: "No one to talk to on the spot",
    noOneToTalkDesc: "Language barriers make it hard to enjoy the culture and connect, especially when traveling solo.",
    safety: "Worried about safety",
    safetyDesc: "You want to feel safe — especially in a new city or unfamiliar environment.",
    whatIsTrace: "What is TRACE?",
    whatIsTraceDesc: "TRACE is more than just a map or a guide. It's your smart voice companion that adapts to your rhythm, interests, and language.",
    voiceAI: "🎙️ Voice AI Companion",
    voiceAIDesc: "Talk to TRACE like a friend — it will guide, translate, support, and share stories.",
    personalizedRoutes: "🗺️ Personalized Routes",
    personalizedRoutesDesc: "Routes tailored to your pace, mood, and interests. No tourist clichés.",
    localRecs: "🧠 Local Recommendations",
    localRecsDesc: "Genuine tips from locals. Learn how to feel the city, not just see it.",
    tryTrace: "Try TRACE",
    howWorks: "How does it work?",
    howWorksDesc: "TRACE turns your trip into a curated story — guided by voice, tailored to your rhythm.",
    pickDest: "Pick your destination",
    pickDestDesc: "Tell TRACE where you're going — it immediately tunes into the local vibe.",
    setVoice: "Set your voice guide",
    setVoiceDesc: "Choose your mood, travel style and language level — TRACE adapts everything for you.",
    getTips: "Get local tips",
    getTipsDesc: "Discover hidden gems, stories, cafés and corners locals actually love.",
    goLive: "Go live your story",
    goLiveDesc: "TRACE stays with you — guiding, suggesting, translating, supporting along the way.",
    tryTraceFree: "Try TRACE for free",
    useCases: "Use Cases",
    useCasesDesc: "Whether you're chasing history, silence or serendipity — TRACE adapts to your style.",
    soloTrip: "✨ Solo Creator Trip",
    soloTripDesc: "You land in Lisbon with no plan. TRACE curates poetic routes, audio stories, and safe local cafés — and you just walk, record, feel.",
    startExploring: "Start exploring",
    slowTravel: "🌿 Slow Travel Escape",
    slowTravelDesc: "A couple chooses a week in Tuscany. TRACE slows down the pace, offers sensory walks, language tips and mindful moments along vineyards.",
    tryItNow: "Try it now",
    languageJourney: "🗣️ Language Practice Journey",
    languageJourneyDesc: "You're learning Spanish in Mexico City. TRACE gives you real-time voice practice, local slang, and guided micro-chats at markets & cafés.",
    speakTravel: "Speak & travel",
    whyTrace: "Why TRACE?",
    whyTraceDesc: "TRACE isn't just another travel app — it's your mindful, personalized journey companion.",
    aiKnows: "AI That Knows You",
    aiKnowsDesc: "TRACE adapts to your pace, moods, interests, and languages — the more you travel, the smarter it becomes.",
    notJustMaps: "Not Just Maps, but Meaning",
    notJustMapsDesc: "TRACE offers poetic routes, local stories, and emotional textures of a place — beyond the tourist checklist.",
    liveLang: "Live Language Practice",
    liveLangDesc: "Interact with the world around you in real time. TRACE guides you through micro-conversations with locals.",
    curated: "Curated by Locals & Artists",
    curatedDesc: "Every suggestion is based on the soul of the place — created with love by people who live and breathe it.",
    testimonials: "What travelers say about TRACE",
    testimonialsList: [
      {
        text: "I felt like I had a local poet in my pocket. TRACE showed me stories I would have never discovered on my own.",
        name: "Lina, Digital Nomad",
        route: "Berlin → Tbilisi",
        img: "https://randomuser.me/api/portraits/women/65.jpg"
      },
      {
        text: "TRACE helped me practice Italian with real people. The AI felt like a kind travel buddy, not just a chatbot.",
        name: "Mateo, Language Learner",
        route: "Barcelona → Rome",
        img: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        text: "I was burned out by travel planning. TRACE brought back the wonder — it’s like Slow Travel with superpowers.",
        name: "Jules, Creative Explorer",
        route: "Lisbon → Kyoto",
        img: "https://randomuser.me/api/portraits/women/45.jpg"
      }
    ],
    ready: "Ready to travel your way?",
    readyDesc: "Discover meaningful journeys with TRACE — your smart, personal travel companion.",
    getEarly: "Get early access",
    copyright: "Conscious travel. Personal paths.",
  },
  ru: {
    popupWelcomeTitle: "Где вы хотите оставить свой СЛЕД?",
    popupWelcomeDesc: "Найдите своё место силы. Начните путешествие с вдохновения.",
    popupWelcomeBtn: "Начать исследование",
    popupExitTitle: "Хотите секретные места, которые любят местные?",
    popupExitDesc: "Мы пришлём 5 скрытых жемчужин на почту",
    popupExitBtn: "Получить список",
    popupExitSent: "Отправлено! Проверьте почту.",
    popupStickyTitle: "TRACE скоро откроется",
    popupStickyBtn: "Получить ранний доступ",
    popupStickyThanks: "Спасибо!",
    popupMapBtn: "Добавить в мой маршрут",
    popupEmailPlaceholder: "Ваш email",
    popupEmailPlaceholderShort: "Email",
    heroTitle: "Оставь свой СЛЕД.\nОткрой свой путь.",
    heroDesc: "TRACE — это больше, чем маршруты.\nЭто голосовой спутник, персональная лента, советы местных и языковая практика — всё в вашем кармане.",
    tryDemo: "Попробовать демо",
    getEarlyAccess: "Получить ранний доступ",
    soundsFamiliar: "Знакомо?",
    soundsFamiliarDesc: "Вот главные трудности современных путешественников — что-то из этого про вас?",
    notSure: "Не знаете, куда и зачем",
    notSureDesc: "Слишком много вариантов и советов — сложно понять, что действительно подходит именно вам.",
    planningRoutes: "Планирование маршрутов утомляет",
    planningRoutesDesc: "Часы в поиске и составлении маршрутов — это утомительно и не приносит радости.",
    noOneToTalk: "Некому задать вопрос на месте",
    noOneToTalkDesc: "Языковой барьер мешает прочувствовать культуру и общаться, особенно если вы путешествуете в одиночку.",
    safety: "Вопросы безопасности",
    safetyDesc: "Вы хотите чувствовать себя в безопасности — особенно в новом городе или незнакомой среде.",
    whatIsTrace: "Что такое TRACE?",
    whatIsTraceDesc: "TRACE — это не просто карта или гид. Это ваш умный голосовой спутник, который подстраивается под ваш ритм, интересы и язык.",
    voiceAI: "🎙️ Голосовой AI-спутник",
    voiceAIDesc: "Общайтесь с TRACE как с другом — он подскажет, переведёт, поддержит и расскажет истории.",
    personalizedRoutes: "🗺️ Персонализированные маршруты",
    personalizedRoutesDesc: "Маршруты под ваш темп, настроение и интересы. Никаких туристических клише.",
    localRecs: "🧠 Советы от местных",
    localRecsDesc: "Настоящие рекомендации от жителей. Учитесь чувствовать город, а не просто смотреть на него.",
    tryTrace: "Попробовать TRACE",
    howWorks: "Как это работает?",
    howWorksDesc: "TRACE превращает вашу поездку в персональную историю — голосовое сопровождение, подстроенное под ваш ритм.",
    pickDest: "Выберите направление",
    pickDestDesc: "Скажите TRACE, куда вы отправляетесь — он сразу почувствует местную атмосферу.",
    setVoice: "Настройте голосового гида",
    setVoiceDesc: "Выберите настроение, стиль путешествия и уровень языка — TRACE всё подстроит под вас.",
    getTips: "Получайте советы",
    getTipsDesc: "Открывайте скрытые жемчужины, истории, кафе и уголки, которые любят местные.",
    goLive: "Живите своей историей",
    goLiveDesc: "TRACE всегда рядом — подсказывает, переводит, поддерживает на маршруте.",
    tryTraceFree: "Попробовать TRACE бесплатно",
    useCases: "Сценарии использования",
    useCasesDesc: "Ищете ли вы историю, тишину или случайности — TRACE подстроится под ваш стиль.",
    soloTrip: "✨ Путешествие соло-креатора",
    soloTripDesc: "Вы прилетаете в Лиссабон без плана. TRACE подбирает поэтичные маршруты, аудиоистории и безопасные кафе — вы просто гуляете, записываете, чувствуете.",
    startExploring: "Начать исследование",
    slowTravel: "🌿 Медленное путешествие",
    slowTravelDesc: "Пара выбирает неделю в Тоскане. TRACE замедляет темп, предлагает чувственные прогулки, языковые советы и осознанные моменты среди виноградников.",
    tryItNow: "Попробовать сейчас",
    languageJourney: "🗣️ Языковое путешествие",
    languageJourneyDesc: "Вы учите испанский в Мехико. TRACE даёт практику в реальном времени, местный сленг и мини-диалоги на рынках и в кафе.",
    speakTravel: "Говорить и путешествовать",
    whyTrace: "Почему TRACE?",
    whyTraceDesc: "TRACE — это не просто очередное приложение для путешествий, а ваш осознанный и персональный спутник.",
    aiKnows: "AI, который знает вас",
    aiKnowsDesc: "TRACE подстраивается под ваш темп, настроение, интересы и язык — чем больше вы путешествуете, тем умнее он становится.",
    notJustMaps: "Не просто карты, а смыслы",
    notJustMapsDesc: "TRACE предлагает поэтичные маршруты, местные истории и эмоции — за пределами туристических чек-листов.",
    liveLang: "Практика языка вживую",
    liveLangDesc: "Взаимодействуйте с миром вокруг в реальном времени. TRACE ведёт вас через мини-разговоры с местными.",
    curated: "Создано местными и художниками",
    curatedDesc: "Каждая рекомендация — это душа места, созданная с любовью теми, кто здесь живёт.",
    testimonials: "Что говорят путешественники о TRACE",
    testimonialsList: [
      {
        text: "Я будто носила в кармане местного поэта. TRACE показал мне истории, которые я бы никогда не открыла сама.",
        name: "Лина, цифровой кочевник",
        route: "Берлин → Тбилиси",
        img: "https://randomuser.me/api/portraits/women/65.jpg"
      },
      {
        text: "TRACE помог мне практиковать итальянский с реальными людьми. AI ощущался как добрый попутчик, а не просто чат-бот.",
        name: "Матео, изучающий языки",
        route: "Барселона → Рим",
        img: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        text: "Я устала от планирования поездок. TRACE вернул мне ощущение чуда — это как Slow Travel с суперспособностями.",
        name: "Жюль, творческий исследователь",
        route: "Лиссабон → Киото",
        img: "https://randomuser.me/api/portraits/women/45.jpg"
      }
    ],
    ready: "Готовы путешествовать по-своему?",
    readyDesc: "Откройте для себя осмысленные путешествия с TRACE — вашим умным персональным спутником.",
    getEarly: "Получить ранний доступ",
    copyright: "Осознанные путешествия. Личные маршруты.",
  }
};

export default function App() {
  const [lang, setLang] = useState("en");
  const t = translations[lang];

  // --- POPUP STATE ---
  const [showWelcome, setShowWelcome] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapModalData, setMapModalData] = useState(null);

  useOncePerSession("trace_welcome_popup", () => {
    setTimeout(() => setShowWelcome(true), 12000);
  });

  useEffect(() => {
    function onMouseLeave(e) {
      if (e.clientY < 40 && window.innerWidth > 768 && !sessionStorage.getItem("trace_exit_popup")) {
        setShowExit(true);
        sessionStorage.setItem("trace_exit_popup", "shown");
      }
    }
    window.addEventListener("mouseout", onMouseLeave);
    return () => window.removeEventListener("mouseout", onMouseLeave);
  }, []);

  useEffect(() => {
    function onScroll() {
      if (showSticky) return;
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0 && scrollY / docHeight > 0.75 && !sessionStorage.getItem("trace_sticky_popup")) {
        setShowSticky(true);
        sessionStorage.setItem("trace_sticky_popup", "shown");
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [showSticky]);

  function handleMapClick(place) {
    setMapModalData(place);
    setShowMapModal(true);
  }

  const problems = [
    { title: t.notSure, desc: t.notSureDesc },
    { title: t.planningRoutes, desc: t.planningRoutesDesc },
    { title: t.noOneToTalk, desc: t.noOneToTalkDesc },
    { title: t.safety, desc: t.safetyDesc }
  ];
  const features = [
    { icon: "🧠", title: t.aiKnows, desc: t.aiKnowsDesc },
    { icon: "🗺️", title: t.notJustMaps, desc: t.notJustMapsDesc },
    { icon: "🗣️", title: t.liveLang, desc: t.liveLangDesc },
    { icon: "🧭", title: t.curated, desc: t.curatedDesc }
  ];
  const whatIsTrace = [
    { title: t.voiceAI, desc: t.voiceAIDesc },
    { title: t.personalizedRoutes, desc: t.personalizedRoutesDesc },
    { title: t.localRecs, desc: t.localRecsDesc }
  ];
  const howWorks = [
    { icon: "🧭", title: t.pickDest, desc: t.pickDestDesc },
    { icon: "🎙️", title: t.setVoice, desc: t.setVoiceDesc },
    { icon: "🔎", title: t.getTips, desc: t.getTipsDesc },
    { icon: "🚶", title: t.goLive, desc: t.goLiveDesc }
  ];
  const useCases = [
    { title: t.soloTrip, desc: t.soloTripDesc, btn: t.startExploring },
    { title: t.slowTravel, desc: t.slowTravelDesc, btn: t.tryItNow },
    { title: t.languageJourney, desc: t.languageJourneyDesc, btn: t.speakTravel }
  ];
  const testimonials = t.testimonialsList;

  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  function handleEmailSubmit(e) {
    e.preventDefault();
    setEmailSent(true);
    setTimeout(() => setShowExit(false), 1200);
    setTimeout(() => setShowSticky(false), 1200);
  }

  const popupAnim = "fixed inset-0 flex items-center justify-center z-[1000] bg-black/40 transition-all";
  const popupBox = "bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center scale-100 opacity-100 transition-all";

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  const emailPlaceholder = t.popupEmailPlaceholder || "Your email";
  const emailPlaceholderShort = t.popupEmailPlaceholderShort || "Email";

  return (
    <div className="min-h-screen bg-white text-black font-roboto relative overflow-x-hidden">
      {/* --- POPUPS --- */}
      {showWelcome && (
        <div className={popupAnim} style={{ animation: "fadeIn .3s" }}>
          <div className={popupBox + " relative"}>
            <button className="absolute top-3 right-4 text-2xl" onClick={() => setShowWelcome(false)}>&times;</button>
            <h2 className="text-2xl font-bold mb-4">{t.popupWelcomeTitle}</h2>
            <p className="mb-6">{t.popupWelcomeDesc}</p>
            <button
              className="bg-[#ffba01] text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-[#ffb000] transition"
              onClick={() => setShowWelcome(false)}
            >
              {t.popupWelcomeBtn}
            </button>
          </div>
        </div>
      )}
      {showExit && (
        <div className={popupAnim} style={{ animation: "fadeIn .3s" }}>
          <div className={popupBox + " relative"}>
            <button className="absolute top-3 right-4 text-2xl" onClick={() => setShowExit(false)}>&times;</button>
            <h2 className="text-xl font-bold mb-3">{t.popupExitTitle}</h2>
            <p className="mb-4">{t.popupExitDesc}</p>
            {emailSent ? (
              <div className="text-green-600 font-semibold py-4">{t.popupExitSent}</div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="flex flex-col items-center gap-3">
                <input
                  type="email"
                  required
                  placeholder={emailPlaceholder}
                  className="border rounded px-4 py-2 w-full"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-[#ffba01] text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-[#ffb000] transition"
                >
                  {t.popupExitBtn}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      {showSticky && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000]">
          <div className="bg-black text-white px-6 py-4 rounded-full shadow-lg flex items-center gap-4 animate-fadeInUp">
            <span className="font-semibold">{t.popupStickyTitle}</span>
            {emailSent ? (
              <span className="text-green-400 font-semibold">{t.popupStickyThanks}</span>
            ) : (
              <form onSubmit={handleEmailSubmit} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder={emailPlaceholderShort}
                  className="rounded px-2 py-1 text-black"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-[#ffba01] text-black font-semibold px-4 py-1 rounded-full hover:bg-[#ffb000] transition"
                >
                  {t.popupStickyBtn}
                </button>
              </form>
            )}
            <button className="ml-2 text-xl" onClick={() => setShowSticky(false)}>&times;</button>
          </div>
        </div>
      )}
      {showMapModal && mapModalData && (
        <div className={popupAnim} style={{ animation: "fadeIn .3s" }}>
          <div className={popupBox + " relative"}>
            <button className="absolute top-3 right-4 text-2xl" onClick={() => setShowMapModal(false)}>&times;</button>
            <h2 className="text-2xl font-bold mb-2">{mapModalData.name}</h2>
            <p className="mb-4">{mapModalData.desc}</p>
            <button
              className="bg-[#ffba01] text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-[#ffb000] transition"
              onClick={() => setShowMapModal(false)}
            >
              {t.popupMapBtn}
            </button>
          </div>
        </div>
      )}

      <div className="absolute top-4 right-4 z-50">
        <button
          className={`px-3 py-1 rounded-l ${lang === "en" ? "bg-black text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setLang("en")}
        >
          EN
        </button>
        <button
          className={`px-3 py-1 rounded-r ${lang === "ru" ? "bg-black text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setLang("ru")}
        >
          RU
        </button>
      </div>

      <div className="absolute top-0 left-0 w-full h-[700px] z-0">
        <img
          src="/fon-1.jpg"
          alt="Top background"
          className="w-full h-full object-cover opacity-30"
          style={{ backgroundAttachment: "fixed" }}
        />
      </div>
      <div className="absolute top-[700px] left-0 w-full h-[600px] z-0">
        <img
          src="/fon-2.jpg"
          alt="How TRACE looks background"
          className="w-full h-full object-cover opacity-20"
          style={{ backgroundAttachment: "fixed" }}
        />
      </div>
      <div
        className="absolute top-[700px] left-0 w-full h-10 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%)",
        }}
      />

      <div className="relative z-20">
        <header className="p-6 flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-2xl font-semibold">TRACE</div>
          <button
            className="px-6 py-2 rounded-lg font-semibold text-white transition"
            style={{ backgroundColor: "#ffba01" }}
          >
            {t.getEarlyAccess}
          </button>
        </header>

        {/* Hero section */}
        <section className="px-6 pt-20 pb-0 min-h-[700px] max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10">
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ whiteSpace: "pre-line" }}>
              {t.heroTitle}
            </h1>
            <p className="text-lg md:text-xl mb-6" style={{ whiteSpace: "pre-line" }}>
              {t.heroDesc}
            </p>
            <button
              className="text-lg px-8 py-3 rounded-xl shadow transition font-bold text-white"
              style={{ backgroundColor: "#ffba01" }}
            >
              {t.tryDemo}
            </button>
          </div>
          <div className="flex-1 flex justify-end items-end mt-10 md:mt-0 pr-6">
            <img
              src="/trace-app-mockup.png"
              alt="TRACE App"
              className="w-60 h-auto rounded-2xl shadow-2xl"
              style={{ background: "transparent" }}
            />
          </div>
        </section>

        {/* Problems block */}
        <section className="bg-[#F9FAFB] text-black py-16 px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t.soundsFamiliar}
            </h2>
            <p className="text-lg md:text-xl mb-10">
              {t.soundsFamiliarDesc}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {problems.map((item, idx) => (
                <ScrollReveal key={idx} offset={100 + idx * 40} delay={idx * 0.12}>
                  <div className="bg-white shadow-lg rounded-2xl p-6">
                    <h3 className="text-xl font-semibold mb-2 text-black">{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* What is TRACE */}
        <section className="bg-white text-black py-20 px-6 md:px-12">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.whatIsTrace}</h2>
            <p className="text-lg md:text-xl mb-12">
              {t.whatIsTraceDesc}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {whatIsTrace.map((item, idx) => (
                <ScrollReveal key={idx} offset={100 + idx * 40} delay={idx * 0.12}>
                  <div className="bg-white rounded-2xl p-6 shadow-md">
                    <h3 className="text-xl font-semibold mb-2 text-black">{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <div className="mt-16">
              <a href="#download" className="inline-block bg-[#ffba01] hover:bg-[#ffb000] text-white font-semibold py-3 px-8 rounded-full shadow transition">
                {t.tryTrace}
              </a>
            </div>
          </div>
        </section>

        {/* How does it work */}
        <section className="bg-[#F0F4F8] text-black py-20 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">{t.howWorks}</h2>
            <p className="text-lg md:text-xl text-center mb-12">
              {t.howWorksDesc}
            </p>
            <div className="grid md:grid-cols-4 gap-8">
              {howWorks.map((item, idx) => (
                <ScrollReveal key={idx} offset={100 + idx * 40} delay={idx * 0.12}>
                  <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <div className="text-center mt-16">
              <a
                href="#download"
                className="inline-block bg-[#ffba01] hover:bg-[#ffb000] text-white font-semibold py-3 px-8 rounded-full shadow transition"
              >
                {t.tryTraceFree}
              </a>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="bg-white text-black py-20 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">{t.useCases}</h2>
            <p className="text-lg md:text-xl text-center mb-12">
              {t.useCasesDesc}
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {useCases.map((item, idx) => (
                <ScrollReveal key={idx} offset={100 + idx * 40} delay={idx * 0.12}>
                  <div className="bg-[#F9FAFB] p-6 rounded-2xl shadow-sm hover:shadow-md">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="mb-4">{item.desc}</p>
                    <a href="#download" className="inline-block text-sm font-semibold text-white bg-[#ffba01] px-5 py-2 rounded-full hover:opacity-90 transition">
                      {item.btn}
                    </a>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why TRACE */}
        <section className="bg-gray-50 text-black py-20 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">{t.whyTrace}</h2>
            <p className="text-lg md:text-xl text-center mb-12">
              {t.whyTraceDesc}
            </p>
            <div className="grid md:grid-cols-2 gap-10">
              {features.map((item, idx) => (
                <ScrollReveal key={idx} offset={100 + idx * 40} delay={idx * 0.12}>
                  <div className="flex items-start space-x-4">
                    <div className="text-[#ffba01] text-3xl">{item.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-white text-black py-20 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.testimonials}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((item, idx) => (
                <ScrollReveal key={idx} offset={100 + idx * 40} delay={idx * 0.12}>
                  <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                    <p className="text-gray-700 text-lg italic mb-4">
                      “{item.text}”
                    </p>
                    <div className="flex items-center space-x-4">
                      <img src={item.img} alt="profile" className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.route}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-[#ffba01] text-black py-20 px-6 md:px-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {t.ready}
            </h2>
            <p className="text-lg md:text-xl mb-10">
              {t.readyDesc}
            </p>
            <a
              href="#"
              className="inline-block bg-black text-white text-lg font-semibold py-4 px-8 rounded-full shadow-lg hover:bg-gray-800 transition duration-300"
            >
              {t.getEarly}
            </a>
          </div>
        </section>

        <footer className="px-6 py-12 bg-gray-100 text-center text-sm text-gray-500">
          TRACE © {new Date().getFullYear()} | {t.copyright}
        </footer>
      </div>
    </div>
  );
}

/* Добавьте в глобальные стили или tailwind.config.js:
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.97);}
  to { opacity: 1; transform: scale(1);}
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px);}
  to { opacity: 1; transform: translateY(0);}
}
.animate-fadeInUp { animation: fadeInUp 0.4s;}
*/
