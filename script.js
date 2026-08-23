const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const navLinks = [...document.querySelectorAll('.main-nav a')];
const sections = [...document.querySelectorAll('main section[id], header[id]')];

/* Mathematics WhatsApp Channel */
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
      width: 430px;
      height: 430px;
      right: -180px;
      top: -210px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(24,158,97,.10), rgba(24,158,97,0) 68%);
      pointer-events: none;
    }

    .math-channel-card {
      position: relative;
      display: grid;
      grid-template-columns: 1.28fr .72fr;
      gap: 56px;
      align-items: center;
      padding: 46px 50px;
      overflow: hidden;
      border: 1px solid #dfe5ee;
      border-radius: 24px;
      background: #fff;
      box-shadow: 0 22px 58px rgba(7,21,47,.08);
    }

    .math-channel-card::after {
      content: "∑";
      position: absolute;
      right: 38%;
      bottom: -76px;
      color: rgba(7,21,47,.025);
      font-family: Georgia, serif;
      font-size: 250px;
      line-height: 1;
      transform: rotate(-8deg);
      pointer-events: none;
    }

    .math-channel-kicker {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;
      color: #178655;
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: .16em;
    }

    .math-channel-kicker::before {
      content: "";
      width: 28px;
      height: 2px;
      border-radius: 99px;
      background: #189e61;
    }

    .math-channel-copy h2 {
      max-width: 720px;
      margin: 0;
      color: #07152f;
      font-family: "Playfair Display", serif;
      font-size: clamp(34px, 3.8vw, 52px);
      line-height: 1.04;
      letter-spacing: -.035em;
    }

    .math-channel-copy h2 em {
      color: #178655;
      font-style: normal;
    }

    .math-channel-copy > p {
      max-width: 690px;
      margin: 18px 0 0;
      color: #657187;
      font-size: 12px;
      line-height: 1.82;
    }

    .math-channel-topics {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 24px;
    }

    .math-channel-topics span {
      padding: 8px 10px;
      border: 1px solid #e2e7ed;
      border-radius: 999px;
      background: #f7f9fb;
      color: #42516a;
      font-size: 8px;
      font-weight: 700;
    }

    .math-channel-action {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 28px;
      border-radius: 18px;
      background: #07152f;
      color: #fff;
    }

    .math-channel-icon {
      width: 48px;
      height: 48px;
      display: grid;
      place-items: center;
      margin-bottom: 20px;
      border-radius: 14px;
      background: #189e61;
    }

    .math-channel-icon svg {
      width: 25px;
      height: 25px;
      fill: none;
      stroke: #fff;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .math-channel-action strong {
      font-family: "Playfair Display", serif;
      font-size: 23px;
      line-height: 1.12;
    }

    .math-channel-action small {
      margin-top: 9px;
      color: #9daac0;
      font-size: 9px;
      line-height: 1.6;
    }

    .math-channel-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
      margin-top: 22px;
      padding: 14px 16px;
      border-radius: 10px;
      background: #189e61;
      color: #fff;
      font-size: 10px;
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
        gap: 30px;
      }

      .math-channel-action {
        max-width: 520px;
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
        padding: 24px 20px;
      }
    }
  `;
  document.head.appendChild(channelStyles);

  const channelSection = document.createElement('section');
  channelSection.className = 'math-channel';
  channelSection.id = 'math-channel';
  channelSection.setAttribute('aria-label', 'Mathematics WhatsApp Channel');
  channelSection.innerHTML = `
    <div class="container">
      <div class="math-channel-card reveal">
        <div class="math-channel-copy">
          <span class="math-channel-kicker">Mathematics Learning Channel</span>
          <h2>Learn Mathematics <em>Beyond the Classroom.</em></h2>
          <p>
            Follow our WhatsApp Mathematics Channel for conceptual explanations, solved questions,
            visual learning resources, practice activities and lecture follow-ups for Matric, FSc and ICS students.
          </p>
          <div class="math-channel-topics" aria-label="Channel resources">
            <span>Concept Explanations</span>
            <span>Solved Questions</span>
            <span>Visual Mathematics</span>
            <span>Practice MCQs</span>
            <span>Lecture Follow-ups</span>
          </div>
        </div>

        <div class="math-channel-action">
          <div class="math-channel-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32">
              <path d="M7 24.5 8.4 20A10.5 10.5 0 1 1 12 24l-5 1.5Z"/>
              <path d="M12 12.2c.7 3.7 3.4 6.4 7.1 7.1"/>
              <path d="M12.1 12.2c.2-.5.5-.8.9-.9M19.2 19.3c-.4.4-.8.7-1.2.8"/>
            </svg>
          </div>
          <strong>Mathematics on WhatsApp</strong>
          <small>Focused academic resources delivered directly through our Mathematics Channel.</small>
          <a class="math-channel-btn" href="https://whatsapp.com/channel/0029VbDPNNMDzgT78LeRyf2L" target="_blank" rel="noopener noreferrer" aria-label="Follow STEP Academy Mathematics WhatsApp Channel">
            <span>Follow the Channel</span><span aria-hidden="true">↗</span>
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
    channelLink.textContent = 'Mathematics WhatsApp Channel ↗';
    connectColumn.appendChild(channelLink);
  }
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
