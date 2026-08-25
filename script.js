/* ==========================================================================
   KOPI SENJA — JAVASCRIPT LOGIC ENGINE
   Vanilla JS implementation for Client Demo Package Switcher, ScrollSpy,
   WhatsApp Reservation Engine, and Simulated AI Assistant & Recommendation.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. STATE MANAGEMENT & PACKAGE SWITCHER
  // ------------------------------------------------------------------------
  let currentPackage = 'starter'; // Allowed: 'starter' | 'growth' | 'premium'

  const demoStatusText = document.getElementById('demo-status-text');
  const pkgButtons = {
    starter: document.getElementById('pkg-btn-starter'),
    growth: document.getElementById('pkg-btn-growth'),
    premium: document.getElementById('pkg-btn-premium')
  };

  const valueBanner = {
    title: document.getElementById('value-banner-title'),
    desc: document.getElementById('value-banner-desc'),
    icon: document.getElementById('value-banner-icon')
  };

  const heroButtons = {
    primary: document.getElementById('hero-primary-btn'),
    secondary: document.getElementById('hero-secondary-btn')
  };

  // Package Data Dictionary
  const packageMeta = {
    starter: {
      name: 'STARTER PACKAGE',
      bannerTitle: 'STARTER PACKAGE — Presensi Online Profesional',
      bannerDesc: 'Sangat cocok untuk cafe yang membutuhkan website bersih & profesional agar pelanggan dapat dengan cepat menemukan menu, lokasi, jam buka, dan kontak WhatsApp.',
      bannerIcon: 'fa-lightbulb',
      heroPrimaryText: '<i class="fa-solid fa-book-open"></i> Explore Menu',
      heroPrimaryHref: 'menu.html',
      heroSecondaryText: '<i class="fa-solid fa-compass"></i> Visit Us',
      heroSecondaryHref: '#location'
    },
    growth: {
      name: 'GROWTH PACKAGE',
      bannerTitle: 'GROWTH PACKAGE — Konversi Pengunjung Jadi Pelanggan',
      bannerDesc: 'Dirancang untuk bisnis yang ingin websitenya bertindak aktif. Pelanggan dapat reservasi meja via WhatsApp, melihat promo menarik, dan membaca testimoni pembeli.',
      bannerIcon: 'fa-chart-line',
      heroPrimaryText: '<i class="fa-solid fa-calendar-check"></i> Reserve a Table',
      heroPrimaryHref: '#reservation',
      heroSecondaryText: '<i class="fa-solid fa-book-open"></i> Explore Menu',
      heroSecondaryHref: 'menu.html'
    },
    premium: {
      name: 'PREMIUM PACKAGE',
      bannerTitle: 'PREMIUM PACKAGE — Pengalaman Pelanggan Berteknologi AI',
      bannerDesc: 'Solusi digital tingkat lanjut. Dilengkapi Asisten AI 24/7 untuk menjawab pertanyaan pelanggan secara instan, dan paket AI Knowledge Integration penuh untuk bisnis kuliner Anda.',
      bannerIcon: 'fa-sparkles',
      heroPrimaryText: '<i class="fa-solid fa-robot"></i> Ask Our AI Assistant',
      heroPrimaryHref: '#ai-assistant',
      heroSecondaryText: '<i class="fa-solid fa-calendar-check"></i> Reserve a Table',
      heroSecondaryHref: '#reservation'
    }
  };

  // Global Package Setter Function
  function setPackage(packageName) {
    if (!packageMeta[packageName]) return;

    currentPackage = packageName;
    document.body.setAttribute('data-active-package', currentPackage);

    // Simpan pilihan paket supaya tetap "diingat" walau pindah halaman (index.html <-> menu.html)
    try {
      localStorage.setItem('kopisenja_active_package', currentPackage);
    } catch (e) {
      // localStorage tidak tersedia (misal mode private browsing) — abaikan, cukup lanjut tanpa persist
    }

    // 1. Update Header Status Text
    if (demoStatusText) {
      demoStatusText.textContent = packageMeta[currentPackage].name;
    }

    // 2. Update Active Switcher Cards
    Object.keys(pkgButtons).forEach(key => {
      if (pkgButtons[key]) {
        if (key === currentPackage) {
          pkgButtons[key].classList.add('active');
          const indicator = pkgButtons[key].querySelector('.select-indicator');
          if (indicator) indicator.innerHTML = '<i class="fa-solid fa-circle-check"></i> Mode Aktif';
        } else {
          pkgButtons[key].classList.remove('active');
          const indicator = pkgButtons[key].querySelector('.select-indicator');
          if (indicator) indicator.innerHTML = '<i class="fa-solid fa-circle"></i> Pilih Paket';
        }
      }
    });

    // 2b. Update Top Header Switcher Buttons
    const topButtons = {
      starter: document.getElementById('top-btn-starter'),
      growth: document.getElementById('top-btn-growth'),
      premium: document.getElementById('top-btn-premium')
    };

    Object.keys(topButtons).forEach(key => {
      if (topButtons[key]) {
        if (key === currentPackage) {
          topButtons[key].classList.add('active');
        } else {
          topButtons[key].classList.remove('active');
        }
      }
    });

    // 3. Update Value Banner
    if (valueBanner.title) valueBanner.title.textContent = packageMeta[currentPackage].bannerTitle;
    if (valueBanner.desc) valueBanner.desc.textContent = packageMeta[currentPackage].bannerDesc;
    if (valueBanner.icon) valueBanner.icon.className = `fa-solid ${packageMeta[currentPackage].bannerIcon}`;

    // 4. Update Hero Buttons
    if (heroButtons.primary) {
      heroButtons.primary.innerHTML = packageMeta[currentPackage].heroPrimaryText;
      heroButtons.primary.setAttribute('href', packageMeta[currentPackage].heroPrimaryHref);
    }
    if (heroButtons.secondary) {
      heroButtons.secondary.innerHTML = packageMeta[currentPackage].heroSecondaryText;
      heroButtons.secondary.setAttribute('href', packageMeta[currentPackage].heroSecondaryHref);
    }

    // Comparison table styling sekarang statis lewat CSS (hanya kolom Growth yang ditonjolkan),
    // jadi tidak perlu di-update mengikuti demo switcher.
  }

  // Top Header Demo Switcher Click Listener (STARTER / GROWTH / PREMIUM AI buttons)
  document.querySelectorAll('.demo-pkg-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetPkg = e.currentTarget.getAttribute('data-switch-to');
      if (targetPkg) setPackage(targetPkg);
    });
  });

  // Floating WhatsApp Button — scroll to #reservation for Growth & Premium packages
  const floatingWaBtn = document.getElementById('floating-wa-btn');
  if (floatingWaBtn) {
    floatingWaBtn.addEventListener('click', (e) => {
      if (currentPackage === 'growth' || currentPackage === 'premium') {
        e.preventDefault();
        const resSection = document.getElementById('reservation');
        if (resSection) {
          resSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
      // For 'starter' package: default href opens WhatsApp directly
    });
  }

  // Switcher Package Cards Click Listener
  document.querySelectorAll('.package-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const targetPkg = card.getAttribute('data-switch-to');
      
      // Check if click was specifically on the "Reservasi Sekarang" button
      const resBtn = e.target.closest('.pkg-card-res-btn');
      if (resBtn) {
        const resTarget = resBtn.getAttribute('data-res-target');
        setPackage(targetPkg);
        
        if (resTarget === 'section') {
          e.preventDefault();
          const targetSection = document.getElementById('reservation');
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
        // If data-res-target === 'wa', let default link open WhatsApp in new tab
        return;
      }

      // Normal card click -> switch package
      setPackage(targetPkg);
    });
  });

  // Initialize State — ambil paket terakhir yang dipilih dari localStorage (kalau ada & valid),
  // supaya paket tetap konsisten walau pindah halaman (misal dari index.html ke menu.html)
  let savedPackage = 'starter';
  try {
    const stored = localStorage.getItem('kopisenja_active_package');
    if (stored && packageMeta[stored]) {
      savedPackage = stored;
    }
  } catch (e) {
    // localStorage tidak tersedia — pakai default 'starter'
  }
  setPackage(savedPackage);

  // ------------------------------------------------------------------------
  // 2. SCROLLSPY NAVIGATION ENGINE & MOBILE NAVBAR TOGGLE
  // ------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarHeader = document.getElementById('navbar-header');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // ScrollSpy Implementation
  const sections = document.querySelectorAll('section[id]');

  function handleScrollSpy() {
    const scrollPosition = window.scrollY + 120; // 120px offset for sticky navbar

    // Header Shadow effect on scroll
    if (window.scrollY > 30) {
      navbarHeader?.classList.add('header-scrolled');
    } else {
      navbarHeader?.classList.remove('header-scrolled');
    }

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      // Check if section is visible (not hidden via package visibility)
      if (section.offsetWidth > 0 && section.offsetHeight > 0) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      }
    });
  }

  window.addEventListener('scroll', handleScrollSpy, { passive: true });
  handleScrollSpy(); // Initial check


  // ------------------------------------------------------------------------
  // 3. DIGITAL MENU FILTERING
  // ------------------------------------------------------------------------
  const menuTabs = document.querySelectorAll('.menu-tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      menuCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 4. RESERVATION FORM → WHATSAPP INTEGRATION ENGINE
  // ------------------------------------------------------------------------
  const reservationForm = document.getElementById('reservation-form');
  const demoWA = '6281234567890'; // Target WhatsApp demo number

  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Form Controls
      const nameInput = document.getElementById('res-name');
      const phoneInput = document.getElementById('res-phone');
      const dateInput = document.getElementById('res-date');
      const timeInput = document.getElementById('res-time');
      const guestsInput = document.getElementById('res-guests');
      const seatingInput = document.getElementById('res-seating');
      const notesInput = document.getElementById('res-notes');

      let isValid = true;

      // Simple Validation Helper
      function validateField(input, errId) {
        const errEl = document.getElementById(errId);
        if (!input.value.trim()) {
          input.classList.add('invalid');
          if (errEl) errEl.style.display = 'block';
          isValid = false;
        } else {
          input.classList.remove('invalid');
          if (errEl) errEl.style.display = 'none';
        }
      }

      validateField(nameInput, 'err-res-name');
      validateField(phoneInput, 'err-res-phone');
      validateField(dateInput, 'err-res-date');
      validateField(timeInput, 'err-res-time');

      if (!isValid) return;

      // Construct WhatsApp Message
      const messageText = `Halo Kopi Senja, saya ingin melakukan reservasi tempat.

*Detail Reservasi Pelanggan:*
- Nama Lengkap: ${nameInput.value.trim()}
- Nomor WhatsApp: ${phoneInput.value.trim()}
- Tanggal Kunjungan: ${dateInput.value}
- Jam Kunjungan: ${timeInput.value} WIB
- Jumlah Tamu: ${guestsInput.value}
- Area Tempat Duduk: ${seatingInput.value}
- Catatan Khusus: ${notesInput.value.trim() || '-'}

Mohon konfirmasi ketersediaan tempat. Terima kasih!`;

      const encodedMsg = encodeURIComponent(messageText);
      const waUrl = `https://wa.me/${demoWA}?text=${encodedMsg}`;

      // Open WhatsApp in new tab
      window.open(waUrl, '_blank');
    });
  }

  // Set default min date for reservation to today
  const resDateInput = document.getElementById('res-date');
  if (resDateInput) {
    const today = new Date().toISOString().split('T')[0];
    resDateInput.setAttribute('min', today);
  }

  // ------------------------------------------------------------------------
  // 5. RULE-BASED INDONESIAN AI CUSTOMER ASSISTANT CHATBOT
  // ------------------------------------------------------------------------
  const chatbotForm = document.getElementById('chatbot-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chatbot-messages');
  const chatTyping = document.getElementById('chat-typing');

  // Rule-based Indonesian QA Knowledge Engine
  const aiKnowledge = [
    {
      keywords: ['jam', 'buka', 'tutup', 'operasional', 'hari apa'],
      response: 'Kopi Senja buka setiap hari (Senin – Minggu) pukul 08.00 – 22.00 WIB.'
    },
    {
      keywords: ['wifi', 'wi-fi', 'internet', 'koneksi', 'kecepatan'],
      response: 'Iya! Kopi Senja menyediakan Wi-Fi gratis berkecepatan tinggi (up to 100 Mbps) serta colokan listrik melimpah di setiap meja indoor.'
    },
    {
      keywords: ['parkir', 'parkiran', 'mobil', 'motor', 'kendaraan'],
      response: 'Kami memiliki area parkir gratis yang luas dan aman untuk mobil maupun motor tepat di depan area cafe.'
    },
    {
      keywords: ['outdoor', 'rokok', 'smoking', 'merokok', 'taman'],
      response: 'Kami memiliki Outdoor Garden Area yang asri dan sejuk. Area terbuka ini juga difungsikan khusus sebagai smoking area.'
    },
    {
      keywords: ['pahit', 'manis', 'creamy', 'ringan', 'soft', 'enggan', 'nggak suka', 'tidak suka'],
      response: 'Jika Anda kurang menyukai kopi pahit, kami sangat merekomendasikan **Caramel Latte** (Rp28.000) yang manis dan creamy, atau **Cafe Latte** (Rp26.000) yang rasa kopinya lebih ringan.'
    },
    {
      keywords: ['strong', 'kuat', 'kopi murni', 'hitam', 'espresso'],
      response: 'Untuk rasa kopi murni khas Nusantara yang mantap dan kuat, kami merekomendasikan **Americano** (Rp22.000) atau **Cappuccino** (Rp28.000).'
    },
    {
      keywords: ['rekomendasi', 'saran', 'terfavorit', 'bestseller', 'populer'],
      response: 'Menu terfavorit pengunjung kami adalah **Caramel Latte** untuk varian kopi, **Matcha Latte** Kyoto untuk non-kopi, serta **Butter Croissant** hangat!'
    },
    {
      keywords: ['non coffee', 'non-coffee', 'tanpa kopi', 'bukan kopi', 'matcha', 'cokelat', 'coklat'],
      response: 'Kami punya varian non-kopi favorit: **Matcha Latte** Jepang manis creamy (Rp28.000) dan **Signature Chocolate** hangat (Rp26.000).'
    },
    {
      keywords: ['makanan', 'makan', 'snack', 'pastry', 'laper', 'lapar', 'croissant', 'rice bowl'],
      response: 'Untuk makanan, kami menyediakan **Butter Croissant** renyah (Rp22.000), **Chicken Rice Bowl** lezat (Rp35.000), dan **Classic French Toast** (Rp30.000).'
    },
    {
      keywords: ['kerja', 'laptop', 'wfh', 'nugas', 'colokan', 'stopkontak', 'meeting'],
      response: 'Kopi Senja sangat cocok untuk kerja/nugas! Kami menyediakan meja luas, kursi ergonomis, colokan di tiap meja, Wi-Fi kencang, dan suasana yang tenang.'
    },
    {
      keywords: ['lokasi', 'alamat', 'dimana', 'tempat', 'daerah', 'posisi', 'gading serpong'],
      response: 'Kopi Senja berlokasi di **Jl. Boulevard Gading Serpong No. 18, Tangerang, Banten** (hanya 5 menit dari Summarecon Mall Serpong).'
    },
    {
      keywords: ['reservasi', 'booking', 'pesan meja', 'meja', 'booking tempat'],
      response: 'Bisa banget! Anda dapat mengisi Formulir Reservasi pada website ini, dan detail booking Anda akan langsung diformat secara otomatis ke WhatsApp Kopi Senja.'
    },
    {
      keywords: ['harga', 'murah', 'mahal', 'biaya', 'bayar'],
      response: 'Harga menu di Kopi Senja sangat terjangkau, berkisar antara Rp22.000 hingga Rp35.000 per porsi.'
    },
    {
      keywords: ['halo', 'hai', 'pagi', 'siang', 'sore', 'malam', 'permisi'],
      response: 'Halo! Selamat datang di Kopi Senja. Ada yang ingin Anda tanyakan seputar menu, lokasi, atau fasilitas kami hari ini?'
    }
  ];

  function getAIReply(userText) {
    const cleanText = userText.toLowerCase().trim();

    for (const item of aiKnowledge) {
      if (item.keywords.some(kw => cleanText.includes(kw))) {
        return item.response;
      }
    }

    return "Maaf, aku belum punya informasi spesifik untuk pertanyaan tersebut. Untuk bantuan lebih lanjut, Anda dapat langsung menghubungi tim Kopi Senja via WhatsApp di 081234567890.";
  }

  function appendChatMessage(sender, text) {
    if (!chatMessages) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}-message`;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const avatarIcon = sender === 'ai' ? 'fa-mug-hot' : 'fa-user';

    msgDiv.innerHTML = `
      <div class="msg-avatar"><i class="fa-solid ${avatarIcon}"></i></div>
      <div class="msg-content">
        <p>${text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
        <span class="msg-time">${timeStr}</span>
      </div>
    `;

    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function processUserQuery(queryText) {
    if (!queryText.trim()) return;

    // 1. Add User Message
    appendChatMessage('user', queryText);

    // 2. Show Typing Indicator
    if (chatTyping) chatTyping.classList.remove('hidden');
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // 3. Simulate AI Delay
    setTimeout(() => {
      if (chatTyping) chatTyping.classList.add('hidden');
      const aiReply = getAIReply(queryText);
      appendChatMessage('ai', aiReply);
    }, 600);
  }

  if (chatbotForm && chatInput) {
    chatbotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = chatInput.value;
      chatInput.value = '';
      processUserQuery(val);
    });
  }

  // Suggestion Chips Click Handlers
  document.querySelectorAll('.chat-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      const q = e.currentTarget.getAttribute('data-question');
      if (q) processUserQuery(q);
    });
  });

  // ------------------------------------------------------------------------
  // 6. "FIND YOUR PERFECT DRINK" AI RECOMMENDATION MATCHING ENGINE
  // ------------------------------------------------------------------------
  const btnGetRec = document.getElementById('btn-get-rec');
  const recResultCard = document.getElementById('rec-result-card');

  const recResultElements = {
    img: document.getElementById('rec-res-img'),
    title: document.getElementById('rec-res-title'),
    price: document.getElementById('rec-res-price'),
    desc: document.getElementById('rec-res-desc'),
    reason: document.getElementById('rec-res-reason')
  };

  // Recommendation Database
  const drinkRecommendations = {
    caramelLatte: {
      title: 'Caramel Latte',
      price: 'Rp 28.000',
      desc: 'Espresso segar dipadu susu creamy dan sirup karamel gurih manis yang melepaskan penat.',
      img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80',
      reason: 'AI memadukan rasa manis karamel dengan kehangatan susu segar untuk momen santai & kencan.'
    },
    cafeLatte: {
      title: 'Cafe Latte',
      price: 'Rp 26.000',
      desc: 'Perpaduan seimbang espresso lembut dan microfoam milk segar yang menenangkan pikiran.',
      img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80',
      reason: 'Rasa kopi yang seimbang & creamy memberikan dorongan fokus tanpa berlebihan.'
    },
    americano: {
      title: 'Americano Murni',
      price: 'Rp 22.000',
      desc: 'Double shot espresso murni tanpa gula dengan rasa kopi mantap yang membakar semangat.',
      img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
      reason: 'Ekstrak espresso murni kaya antioksidan memberikan dorongan energi maksimal untuk nugas.'
    },
    matchaLatte: {
      title: 'Matcha Latte Kyoto',
      price: 'Rp 28.000',
      desc: 'Matcha Jepang asli berpadu manis creamy dengan susu segar yang kaya rasa.',
      img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
      reason: 'Pilihan non-kopi sempurna yang memberikan ketenangan dan kesegaran rasa manis alami.'
    },
    chocolate: {
      title: 'Signature Chocolate',
      price: 'Rp 26.000',
      desc: 'Cokelat pekat kental manis hangat yang memberikan kenyamanan ekstra.',
      img: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80',
      reason: 'Cokelat kaya rasa yang menenangkan dan membangkitkan suasana hati bahagia.'
    }
  };

  if (btnGetRec) {
    btnGetRec.addEventListener('click', () => {
      const taste = document.getElementById('rec-taste').value;
      const pref = document.getElementById('rec-pref').value;
      const occasion = document.getElementById('rec-occasion').value;

      let matchedDrink;

      if (pref === 'non-coffee') {
        if (taste === 'sweet' || occasion === 'date') {
          matchedDrink = drinkRecommendations.matchaLatte;
        } else {
          matchedDrink = drinkRecommendations.chocolate;
        }
      } else {
        // Coffee
        if (taste === 'sweet' || occasion === 'date') {
          matchedDrink = drinkRecommendations.caramelLatte;
        } else if (taste === 'strong') {
          matchedDrink = drinkRecommendations.americano;
        } else {
          matchedDrink = drinkRecommendations.cafeLatte;
        }
      }

      // Populate Result Card
      if (recResultElements.img) recResultElements.img.src = matchedDrink.img;
      if (recResultElements.title) recResultElements.title.textContent = matchedDrink.title;
      if (recResultElements.price) recResultElements.price.textContent = matchedDrink.price;
      if (recResultElements.desc) recResultElements.desc.textContent = matchedDrink.desc;
      if (recResultElements.reason) recResultElements.reason.textContent = matchedDrink.reason;

      if (recResultCard) {
        recResultCard.classList.remove('hidden');
        recResultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

});
