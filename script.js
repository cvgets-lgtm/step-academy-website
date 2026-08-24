const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const navLinks = [...document.querySelectorAll('.main-nav a')];
const homeNavLink = document.querySelector('.main-nav a[href="#home"]');
const sections = [...document.querySelectorAll('main section[id], header[id]')];

if (homeNavLink) {
  homeNavLink.addEventListener('click', event => {
    event.preventDefault();
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* STEP Math Hub — WhatsApp Mathematics Channel — FINAL COMPACT CENTERED */
const learningSection = document.querySelector('#learning');

if (learningSection) {
  const channelStyles = document.createElement('style');
  channelStyles.textContent = `
    .math-channel {
      position: relative;
      overflow: hidden;
      padding: 78px 0;
      background: #fbfaf7;
    }

    .math-channel::before {
      content: "";
      position: absolute;
      width: 520px;
      height: 520px;
      right: -210px;
      top: -250px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(24,158,97,.08), rgba(24,158,97,0) 69%);
      pointer-events: none;
    }

    .math-channel-card {
      position: relative;
      display: grid;
      grid-template-columns: 1.25fr .75fr;
      gap: 56px;
      align-items: center;
      min-height: 610px;
      padding: 46px 52px;
      overflow: hidden;
      border: 1px solid #dfe5ee;
      border-radius: 24px;
      background: #fff;
      box-shadow: 0 24px 60px rgba(7,21,47,.08);
    }

    .math-channel-card::after {
      content: "∑";
      position: absolute;
      left: 49%;
      bottom: -90px;
      color: rgba(7,21,47,.024);
      font-family: Georgia, serif;
      font-size: 255px;
      line-height: 1;
      transform: rotate(-8deg);
      pointer-events: none;
    }

    .math-channel-copy {
      position: relative;
      z-index: 1;
      align-self: center;
    }

    .math-channel-kicker {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 17px;
      color: #178655;
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: .16em;
    }

    .math-channel-kicker::before {
      content: "";
      width: 29px;
      height: 2px;
      border-radius: 99px;
      background: #189e61;
    }

    .math-channel-copy h2 {
      max-width: 690px;
      margin: 0;
      color: #07152f;
      font-family: "Playfair Display", serif;
      font-size: clamp(38px, 4vw, 55px);
      line-height: 1.04;
      letter-spacing: -.038em;
    }

    .math-channel-copy h2 em {
      color: #178655;
      font-style: normal;
    }

    .math-channel-copy > p {
      max-width: 650px;
      margin: 22px 0 0;
      color: #657187;
      font-size: 12px;
      line-height: 1.82;
    }

    .math-channel-topics {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      max-width: 660px;
      margin-top: 25px;
    }

    .math-channel-topics span {
      padding: 8px 11px;
      border: 1px solid #e2e7ed;
      border-radius: 999px;
      background: #f7f9fb;
      color: #42516a;
      font-size: 8px;
      font-weight: 700;
    }

    .math-channel-note {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 32px;
      color: #778397;
      font-size: 9px;
      line-height: 1.55;
    }

    .math-channel-note i {
      width: 7px;
      height: 7px;
      flex: 0 0 7px;
      border-radius: 50%;
      background: #189e61;
      box-shadow: 0 0 0 4px rgba(24,158,97,.10);
    }

    .math-channel-action {
      position: relative;
      z-index: 2;
      width: 100%;
      max-width: 360px;
      justify-self: center;
      align-self: center;
      padding: 22px;
      border-radius: 20px;
      background: linear-gradient(145deg, #06152f, #0a244c);
      color: #fff;
      box-shadow: 0 22px 50px rgba(7,21,47,.18);
    }

    .math-channel-action-head {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 17px;
    }

    .math-channel-icon {
      width: 40px;
      height: 40px;
      flex: 0 0 40px;
      display: grid;
      place-items: center;
      border-radius: 11px;
      background: #189e61;
    }

    .math-channel-icon svg {
      width: 21px;
      height: 21px;
      fill: none;
      stroke: #fff;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .math-channel-action-head div {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .math-channel-action-head strong {
      font-size: 11.5px;
    }

    .math-channel-action-head small {
      color: #93a2ba;
      font-size: 7px;
      text-transform: uppercase;
      letter-spacing: .09em;
    }

    .math-channel-qr-wrap {
      padding: 13px;
      border-radius: 15px;
      background: #fff;
    }

    .math-channel-qr-wrap img {
      width: 100%;
      max-width: 245px;
      aspect-ratio: 1 / 1;
      display: block;
      margin: 0 auto;
      object-fit: contain;
    }

    .math-channel-scan {
      margin-top: 14px;
      text-align: center;
    }

    .math-channel-scan strong {
      display: block;
      font-family: "Playfair Display", serif;
      font-size: 18px;
    }

    .math-channel-scan span {
      display: block;
      margin-top: 4px;
      color: #98a7bd;
      font-size: 7.5px;
      line-height: 1.45;
    }

    .math-channel-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
      margin-top: 16px;
      padding: 13px 15px;
      border-radius: 10px;
      background: #189e61;
      color: #fff;
      font-size: 9.5px;
      font-weight: 800;
      transition: transform .25s ease, background .25s ease;
    }

    .math-channel-btn:hover {
      transform: translateY(-2px);
      background: #138552;
    }

    .footer-channel-link {
      color: #7fd6a9 !important;
      font-weight: 700;
    }

    .footer-channel-link:hover {
      color: #a5e7c4 !important;
    }

    @media (max-width: 900px) {
      .math-channel-card {
        grid-template-columns: 1fr;
        gap: 34px;
        min-height: 0;
      }

      .math-channel-action {
        width: min(360px, 100%);
        justify-self: start;
      }
    }

    @media (max-width: 640px) {
      .math-channel {
        padding: 58px 0;
      }

      .math-channel-card {
        padding: 32px 22px;
        border-radius: 18px;
      }

      .math-channel-copy h2 {
        font-size: 36px;
      }

      .math-channel-action {
        width: 100%;
        padding: 20px;
      }

      .math-channel-qr-wrap {
        padding: 11px;
      }

      .math-channel-qr-wrap img {
        max-width: 235px;
      }
    }
  `;
  document.head.appendChild(channelStyles);

  const channelSection = document.createElement('section');
  channelSection.className = 'math-channel';
  channelSection.id = 'math-channel';
  channelSection.setAttribute('aria-label', 'STEP Math Hub WhatsApp Mathematics Channel');

  channelSection.innerHTML = `
    <div class="container">
      <div class="math-channel-card reveal">
        <div class="math-channel-copy">
          <span class="math-channel-kicker">STEP Math Hub • WhatsApp Channel</span>
          <h2>Learn Mathematics <em>Beyond the Classroom.</em></h2>
          <p>
            Follow STEP Math Hub for conceptual explanations, solved questions, visual learning resources,
            practice activities and lecture follow-ups — created to help Matric, FSc and ICS students
            understand mathematics more deeply.
          </p>

          <div class="math-channel-topics" aria-label="Mathematics channel resources">
            <span>Concept Explanations</span>
            <span>Solved Questions</span>
            <span>Visual Mathematics</span>
            <span>Practice MCQs</span>
            <span>Graphs & Animations</span>
            <span>Lecture Follow-ups</span>
          </div>

          <div class="math-channel-note">
            <i></i>
            <span>Open the channel on your phone, or scan the QR code from another device.</span>
          </div>
        </div>

        <div class="math-channel-action">
          <div class="math-channel-action-head">
            <div class="math-channel-icon" aria-hidden="true">
              <svg viewBox="0 0 32 32">
                <path d="M7 24.5 8.4 20A10.5 10.5 0 1 1 12 24l-5 1.5Z"/>
                <path d="M12 12.2c.7 3.7 3.4 6.4 7.1 7.1"/>
                <path d="M12.1 12.2c.2-.5.5-.8.9-.9M19.2 19.3c-.4.4-.8.7-1.2.8"/>
              </svg>
            </div>
            <div>
              <strong>STEP Math Hub</strong>
              <small>Thokar Niaz Baig • Mathematics</small>
            </div>
          </div>

          <div class="math-channel-qr-wrap">
            <img src="assets/images/math-hub-whatsapp-qr.png"
                 alt="QR code to follow STEP Math Hub WhatsApp Channel">
          </div>

          <div class="math-channel-scan">
            <strong>Scan to Follow</strong>
            <span>Point your phone camera at the QR code</span>
          </div>

          <a class="math-channel-btn"
             href="https://whatsapp.com/channel/0029VbDPNNMDzgT78LeRyf2L"
             target="_blank"
             rel="noopener noreferrer"
             aria-label="Follow STEP Math Hub WhatsApp Channel">
            <span>Follow on WhatsApp</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </div>
  `;

  learningSection.insertAdjacentElement('afterend', channelSection);

  const connectColumn = [...document.querySelectorAll('.footer-col')]
    .find(col => col.querySelector('strong')?.textContent.trim() === 'Connect');

  if (connectColumn) {
    const channelLink = document.createElement('a');
    channelLink.className = 'footer-channel-link';
    channelLink.href = 'https://whatsapp.com/channel/0029VbDPNNMDzgT78LeRyf2L';
    channelLink.target = '_blank';
    channelLink.rel = 'noopener noreferrer';
    channelLink.textContent = 'STEP Math Hub WhatsApp Channel ↗';
    connectColumn.appendChild(channelLink);
  }
}

/* Leadership & Academic Direction */
const whyStepSection = document.querySelector('#about');

if (whyStepSection) {
  const leadershipStyles = document.createElement('style');
  leadershipStyles.textContent = `
    .leadership-section {
      position: relative;
      padding: 92px 0;
      overflow: hidden;
      background: #fff;
    }

    .leadership-section::before {
      content: "";
      position: absolute;
      width: 520px;
      height: 520px;
      left: -310px;
      top: -230px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(14,53,111,.07), rgba(14,53,111,0) 70%);
      pointer-events: none;
    }

    .leadership-card {
      position: relative;
      display: grid;
      grid-template-columns: .72fr 1.28fr;
      gap: 58px;
      align-items: center;
      padding: 42px;
      border: 1px solid #dfe5ee;
      border-radius: 24px;
      background: #fbfaf7;
      box-shadow: 0 22px 54px rgba(7,21,47,.07);
    }

    .leadership-photo {
      position: relative;
      min-height: 440px;
      overflow: hidden;
      border-radius: 19px;
      background: linear-gradient(145deg, #07152f, #0e356f);
      box-shadow: 0 22px 46px rgba(7,21,47,.16);
    }

    .leadership-photo img {
      width: 100%;
      height: 100%;
      min-height: 440px;
      display: block;
      object-fit: cover;
      object-position: 50% 18%;
      transform: scale(1.42);
      transform-origin: 42% 22%;
    }

    .leadership-placeholder {
      position: absolute;
      inset: 0;
      display: none;
      place-items: center;
      align-content: center;
      gap: 12px;
      text-align: center;
      color: #fff;
      background:
        radial-gradient(circle at 70% 22%, rgba(255,255,255,.08), transparent 30%),
        linear-gradient(145deg, #07152f, #0e356f);
    }

    .leadership-placeholder strong {
      display: grid;
      place-items: center;
      width: 112px;
      height: 112px;
      border: 1px solid rgba(255,255,255,.22);
      border-radius: 50%;
      font-family: "Playfair Display", serif;
      font-size: 40px;
      background: rgba(255,255,255,.07);
    }

    .leadership-placeholder span {
      color: #b8c5d9;
      font-size: 9px;
      letter-spacing: .12em;
      text-transform: uppercase;
    }

    .leadership-copy {
      position: relative;
      z-index: 1;
    }

    .leadership-kicker {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 16px;
      color: #db243a;
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: .16em;
    }

    .leadership-kicker::before {
      content: "";
      width: 29px;
      height: 2px;
      border-radius: 99px;
      background: #db243a;
    }

    .leadership-copy h2 {
      margin: 0;
      color: #07152f;
      font-family: "Playfair Display", serif;
      font-size: clamp(38px, 4vw, 55px);
      line-height: 1.04;
      letter-spacing: -.038em;
    }

    .leadership-name {
      margin-top: 21px;
      color: #07152f;
      font-family: "Playfair Display", serif;
      font-size: 25px;
      font-weight: 700;
    }

    .leadership-role {
      margin-top: 7px;
      color: #db243a;
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: .11em;
    }

    .leadership-copy > p {
      max-width: 720px;
      margin: 21px 0 0;
      color: #657187;
      font-size: 12px;
      line-height: 1.85;
    }

    .leadership-philosophy {
      margin-top: 18px !important;
      color: #394761 !important;
    }

    .leadership-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-top: 29px;
    }

    .leadership-stat {
      min-height: 98px;
      padding: 16px;
      border: 1px solid #e0e5ed;
      border-radius: 13px;
      background: #fff;
    }

    .leadership-stat strong {
      display: block;
      color: #07152f;
      font-family: "Playfair Display", serif;
      font-size: 21px;
      line-height: 1.08;
    }

    .leadership-stat span {
      display: block;
      margin-top: 7px;
      color: #778397;
      font-size: 8px;
      line-height: 1.5;
    }

    @media (max-width: 900px) {
      .leadership-card {
        grid-template-columns: 1fr;
        gap: 34px;
      }

      /* Mobile/tablet: show the leadership text first, then the portrait.
         Desktop order remains unchanged. */
      .leadership-copy {
        order: 1;
      }

      .leadership-photo {
        order: 2;
        min-height: 390px;
        max-width: 520px;
      }

      .leadership-photo img {
        min-height: 390px;
        object-position: 50% 16%;
        transform: scale(1.36);
        transform-origin: 42% 20%;
      }
    }

    @media (max-width: 640px) {
      .leadership-section {
        padding: 66px 0;
      }

      .leadership-card {
        padding: 22px;
        border-radius: 18px;
      }

      .leadership-photo,
      .leadership-photo img {
        min-height: 340px;
      }

      .leadership-photo img {
        object-position: 50% 14%;
        transform: scale(1.32);
        transform-origin: 42% 18%;
      }

      .leadership-copy h2 {
        font-size: 36px;
      }

      .leadership-name {
        font-size: 23px;
      }

      .leadership-stats {
        grid-template-columns: 1fr;
      }

      .leadership-stat {
        min-height: 0;
      }
    }
  `;
  document.head.appendChild(leadershipStyles);

  const leadershipSection = document.createElement('section');
  leadershipSection.className = 'leadership-section';
  leadershipSection.id = 'leadership';
  leadershipSection.setAttribute('aria-label', 'Leadership and Academic Direction');

  leadershipSection.innerHTML = `
    <div class="container">
      <div class="leadership-card reveal">
        <div class="leadership-photo">
          <img src="assets/images/dr-shahid-bashir.jpg"
               alt="Prof. Dr. Shahid Bashir"
               onerror="this.style.display='none';this.nextElementSibling.style.display='grid';">
          <div class="leadership-placeholder" aria-label="Prof. Dr. Shahid Bashir portrait placeholder">
            <strong>SB</strong>
            <span>Prof. Dr. Shahid Bashir</span>
          </div>
        </div>

        <div class="leadership-copy">
          <span class="leadership-kicker">Leadership & Academic Direction</span>
          <h2>Academic leadership shaped by experience.</h2>

          <div class="leadership-name">Prof. Dr. Shahid Bashir</div>
          <div class="leadership-role">PhD Mathematics • Educationist • Franchise Owner</div>

          <p>
            With over two decades of association with Punjab Colleges, Prof. Dr. Shahid Bashir brings
            extensive experience in teaching, academic leadership and student development. His academic
            associations have also included FAST–NUCES and the University of Central Punjab (UCP).
          </p>

          <p class="leadership-philosophy">
            At STEP Academy Thokar Niaz Baig, the academic direction remains focused on concept-based learning,
            disciplined classroom culture, meaningful testing and consistent student development.
          </p>

          <div class="leadership-stats" aria-label="Academic experience">
            <div class="leadership-stat">
              <strong>20+ Years</strong>
              <span>Association with Punjab Colleges</span>
            </div>
            <div class="leadership-stat">
              <strong>FAST–NUCES</strong>
              <span>Academic association</span>
            </div>
            <div class="leadership-stat">
              <strong>UCP</strong>
              <span>University of Central Punjab</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  whyStepSection.parentNode.insertBefore(leadershipSection, whyStepSection);
}

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  navLinks.forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 8);
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      const target = link.getAttribute('href');
      link.classList.toggle('active', target === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

sections.forEach(section => sectionObserver.observe(section));

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

/* Session-scoped admissions announcement */
const admissionsPopup = document.getElementById('admissions-popup');

if (admissionsPopup) {
  const popupDialog = admissionsPopup.querySelector('[role="dialog"]');
  const closeTriggers = [...admissionsPopup.querySelectorAll('[data-popup-close]')];
  const popupActions = [...admissionsPopup.querySelectorAll('.admissions-popup__actions a')];
  const popupSessionKey = 'stepAdmissionsAnnouncementClosed';
  let previouslyFocused = null;
  let closeTimer = null;

  const getFocusableElements = () => [...popupDialog.querySelectorAll('a[href], button:not([disabled])')];

  const closeAdmissionsPopup = () => {
    if (admissionsPopup.hidden) return;
    window.sessionStorage.setItem(popupSessionKey, 'true');
    admissionsPopup.classList.remove('is-visible');
    closeTimer = window.setTimeout(() => {
      admissionsPopup.hidden = true;
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    }, 300);
  };

  const openAdmissionsPopup = () => {
    if (window.sessionStorage.getItem(popupSessionKey) === 'true') return;
    previouslyFocused = document.activeElement;
    admissionsPopup.hidden = false;
    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(() => {
      admissionsPopup.classList.add('is-visible');
      admissionsPopup.querySelector('.admissions-popup__close')?.focus();
    });
  };

  closeTriggers.forEach(trigger => trigger.addEventListener('click', closeAdmissionsPopup));
  popupActions.forEach(action => action.addEventListener('click', closeAdmissionsPopup));

  admissionsPopup.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeAdmissionsPopup();
      return;
    }

    if (event.key !== 'Tab') return;
    const focusable = getFocusableElements();
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  if (window.sessionStorage.getItem(popupSessionKey) !== 'true') {
    window.setTimeout(openAdmissionsPopup, 2000);
  }

  window.addEventListener('pagehide', () => window.clearTimeout(closeTimer));
}
