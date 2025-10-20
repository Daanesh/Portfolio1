// main.js — Daanesh Potnuri portfolio wiring

document.addEventListener('DOMContentLoaded', function () {
  const cursorDot = document.getElementById('cursor-dot');
  const header = document.getElementById('inner-header');
  const sectionContainer = document.getElementById('section-container');
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  let currentSectionId = 'home';

  // Custom cursor logic
  if (window.matchMedia('(min-width: 768px)').matches) {
    window.addEventListener('mousemove', (e) => {
      if (!cursorDot) return;
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
    });
  } else if (cursorDot) {
    cursorDot.style.display = 'none';
  }

  // Mobile menu toggle
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Global navigation hook (called by onclick in index.html)
  window.showSection = function (sectionId) {
    if (currentSectionId === sectionId && sectionId !== 'home') return;

    const isHome = sectionId === 'home';
    const homeEl = document.getElementById('home');
    if (homeEl) homeEl.classList.toggle('hidden', !isHome);
    if (header) header.classList.toggle('-translate-y-full', isHome);

    if (isHome) {
      sectionContainer.innerHTML = '';
    } else {
      sectionContainer.innerHTML = sections[sectionId] || '';
      // Trigger reveal animation
      setTimeout(() => {
        const revealElements = document.querySelectorAll('#' + sectionId + ' .reveal');
        revealElements.forEach((el) => el.classList.add('visible'));
      }, 50);
    }

    // Close mobile menu
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
    }

    // Update active nav link (desktop)
    const navLinksToUpdate = document.querySelectorAll('#nav-links a');
    navLinksToUpdate.forEach((link) => {
      link.classList.toggle('active', link.dataset.section === sectionId);
    });

    currentSectionId = sectionId;
  };

  // ---------------------------
  // SECTION CONTENT (from resume)
  // ---------------------------
  const sections = {
    about: `
      <section id="about" class="content-section pt-32" style="background-color: var(--section-bg-about);">
        <div class="container mx-auto px-6 py-16 reveal">
          <h2 class="section-heading text-3xl md:text-4xl font-bold text-center mb-12">About</h2>
          <div class="max-w-4xl mx-auto space-y-10">
            <div class="reveal">
              <h3 class="text-2xl font-bold nav-link-dark mb-3">Summary</h3>
              <p class="text-slate-700 text-lg leading-relaxed">
                Full-stack engineer experienced in building scalable web applications using <strong>Java, Python, React, Node.js, and Spring Boot</strong> across <strong>AWS/GCP</strong>.
                Skilled in designing <strong>RESTful APIs</strong>, optimizing data models/queries, and integrating <strong>AI/LLM pipelines</strong> to enhance performance and user experience.
              </p>
            </div>
            <div class="reveal" style="transition-delay:.1s">
              <h3 class="text-2xl font-bold nav-link-dark mb-3">Education</h3>
              <div class="space-y-4">
                <div>
                  <p class="text-slate-900 font-semibold">Penn State University — M.S., Computer Science</p>
                  <p class="text-slate-500 text-sm">Aug 2023 – May 2025</p>
                </div>
                <div>
                  <p class="text-slate-900 font-semibold">Visvesvaraya Technological University — B.Tech, CSE</p>
                  <p class="text-slate-500 text-sm">Jul 2018 – Aug 2022</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer class="text-center py-4 border-t border-neutral-200"><p class="text-sm text-slate-500 font-medium">© ${new Date().getFullYear()} Daanesh Potnuri</p></footer>
      </section>
    `,

    skills: `
      <section id="skills" class="content-section pt-32" style="background-color: var(--section-bg-skills);">
        <div class="container mx-auto px-6 py-16 reveal">
          <h2 class="section-heading text-3xl md:text-4xl font-bold text-center mb-12">Skills</h2>
          <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            <div class="card p-6 rounded-lg reveal">
              <h3 class="text-lg font-semibold nav-link-dark mb-2">Languages & Frontend</h3>
              <p class="text-slate-700">Java, TypeScript/JavaScript, Python, SQL • React, Next.js, HTML/CSS, Tailwind • SPA state mgmt, server-side pagination, form validation</p>
              <h3 class="text-lg font-semibold nav-link-dark mt-5 mb-2">Backend & APIs</h3>
              <p class="text-slate-700">Spring Boot (REST, JPA/Hibernate), Node.js/Express, FastAPI • API design, JWT/RBAC, caching</p>
              <h3 class="text-lg font-semibold nav-link-dark mt-5 mb-2">Data & Storage</h3>
              <p class="text-slate-700">PostgreSQL, Oracle, MySQL, MongoDB, Redis • schema design, indexing, query optimization • ORMs (Hibernate, SQLAlchemy)</p>
            </div>
            <div class="card p-6 rounded-lg reveal" style="transition-delay:.1s">
              <h3 class="text-lg font-semibold nav-link-dark mb-2">Cloud & DevOps</h3>
              <p class="text-slate-700">Docker, Kubernetes, Jenkins, GitHub Actions • AWS (EC2, S3, RDS, IAM), Vercel • CI/CD, env promotion, IaC (Terraform – basics)</p>
              <h3 class="text-lg font-semibold nav-link-dark mt-5 mb-2">Quality & Observability</h3>
              <p class="text-slate-700">JUnit, Selenium, PyTest, Postman • performance/load testing, coverage, regression • Splunk, Prometheus/Grafana, Sentry, GA4</p>
              <h3 class="text-lg font-semibold nav-link-dark mt-5 mb-2">AI/ML & Security</h3>
              <p class="text-slate-700">TensorFlow/Keras, scikit-learn, Pandas/NumPy • time-series (Transformer + BiLSTM) • ETL, evaluation (RMSE/MAE/MAPE/R²) • OAuth2/JWT, RBAC, rate limiting</p>
            </div>
          </div>
        </div>
        <footer class="text-center py-4 border-t border-neutral-200"><p class="text-sm text-slate-500 font-medium">© ${new Date().getFullYear()} Daanesh Potnuri</p></footer>
      </section>
    `,

    experience: `
      <section id="experience" class="content-section pt-32" style="background-color: var(--section-bg-experience);">
        <div class="container mx-auto px-6 py-16 reveal">
          <h2 class="section-heading text-3xl md:text-4xl font-bold text-center mb-12">Experience</h2>
          <div class="max-w-4xl mx-auto space-y-8">
            <div class="card rounded-lg p-6 reveal">
              <p class="text-xs text-slate-500">Jan 2025 – Oct 2025</p>
              <h3 class="text-xl font-semibold nav-link-dark">Full-Stack Software Developer — World Disaster Center</h3>
              <ul class="list-disc pl-5 mt-3 text-slate-700 space-y-2">
                <li>Built a responsive roster (React + Node/Express + PostgreSQL) with server-side pagination, Redis caching; cut data load by <strong>35%</strong> and admin updates by <strong>30%</strong>.</li>
                <li>Created a modular CMS with role-based access and draft→review→publish (JWT-secured APIs), increasing throughput by <strong>40%</strong> and enabling same-day publishing.</li>
                <li>Refactored legacy endpoints to REST services with normalized schemas, indexing, and pooling; lowered median response time by <strong>25%</strong>, error rate by <strong>60%</strong>, and sustained <strong>99.9%</strong> uptime.</li>
                <li>Integrated GA4 + custom events and KPI dashboard (page views, CTR, active users); insights improved session duration by <strong>+20%</strong> and solution CTR by <strong>+15%</strong>.</li>
              </ul>
            </div>

            <div class="card rounded-lg p-6 reveal" style="transition-delay:.1s">
              <p class="text-xs text-slate-500">Aug 2024 – May 2025</p>
              <h3 class="text-xl font-semibold nav-link-dark">Graduate Research Assistant & Software Developer — Penn State University</h3>
              <ul class="list-disc pl-5 mt-3 text-slate-700 space-y-2">
                <li>Architected a Python full-stack app (FastAPI, PostgreSQL/SQLAlchemy, Docker, JWT) with bulk CSV ingest, file uploads, and RBAC admin; reduced manual prep ~<strong>50%</strong>.</li>
                <li>Spearheaded a React + Node/Express portal for coursework (server-side pagination, advanced filters, role views); reduced TA overhead ~<strong>30%</strong>.</li>
                <li>Co-developed a Transformer + BiLSTM forecasting pipeline (NYC) in TensorFlow/Keras; achieved <strong>RMSE 34.1</strong>, <strong>MAE 23.7</strong>, <strong>MAPE 4.1%</strong>, <strong>R² 0.92</strong>.</li>
              </ul>
            </div>

            <div class="card rounded-lg p-6 reveal" style="transition-delay:.2s">
              <p class="text-xs text-slate-500">Jul 2021 – Aug 2024</p>
              <h3 class="text-xl font-semibold nav-link-dark">Software Engineer — Mphasis</h3>
              <ul class="list-disc pl-5 mt-3 text-slate-700 space-y-2">
                <li>Built & optimized Java REST services (Spring Boot, Hibernate) on Oracle/PostgreSQL; improved ingestion and cut API latency by <strong>25%</strong>.</li>
                <li>Containerized <strong>12</strong> microservices with Docker/Kubernetes and automated CI/CD via Jenkins/GitHub Actions/Argo CD; deployment failures −<strong>40%</strong>, env drift −<strong>50%</strong>.</li>
                <li>Strengthened reliability with Splunk + Prometheus/Grafana observability; incident response −<strong>35%</strong>, uptime <strong>99.9%</strong>; automated <strong>200+</strong> tests (JUnit/Selenium).</li>
              </ul>
            </div>
          </div>
        </div>
        <footer class="text-center py-4 border-t border-neutral-200"><p class="text-sm text-slate-500 font-medium">© ${new Date().getFullYear()} Daanesh Potnuri</p></footer>
      </section>
    `,

    work: `
      <section id="work" class="content-section pt-32" style="background-color: var(--section-bg-work);">
        <div class="container mx-auto px-6 py-16 reveal">
          <h2 class="section-heading text-3xl md:text-4xl font-bold text-center mb-12">Projects</h2>
          <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            <div class="card p-6 rounded-lg reveal">
              <h3 class="text-lg font-semibold nav-link-dark">RAG-Based QA Bot (E-commerce)</h3>
              <p class="text-xs text-slate-500 mb-2">PyTorch, DistilBERT, FAISS, FastAPI, LangChain, Ollama</p>
              <p class="text-slate-700">Developed a domain-specific RAG chatbot on Amazon Reviews 2023 (213K+ products); sentiment-aware responses, <strong>2–3s</strong> latency, <strong>95%</strong> off-topic filtering.</p>
              <a class="mt-3 inline-block text-sm nav-link-dark" target="_blank" href="https://github.com/your-user/rag-bot">View Code →</a>
            </div>

            <div class="card p-6 rounded-lg reveal" style="transition-delay:.1s">
              <h3 class="text-lg font-semibold nav-link-dark">Decentralized File-Sharing dApp</h3>
              <p class="text-xs text-slate-500 mb-2">Ethereum, Solidity, IPFS (Pinata), React, Web3.js</p>
              <p class="text-slate-700">Designed & implemented a secure P2P dApp; onboarding time −<strong>80%</strong>, uptime <strong>99.99%</strong>, and <strong>95%</strong> smart-contract test coverage.</p>
              <a class="mt-3 inline-block text-sm nav-link-dark" target="_blank" href="https://github.com/your-user/defi-files">View Code →</a>
            </div>

            <div class="card p-6 rounded-lg reveal" style="transition-delay:.2s">
              <h3 class="text-lg font-semibold nav-link-dark">Automated Examination System (NLP)</h3>
              <p class="text-xs text-slate-500 mb-2">Python, Flask, NLP</p>
              <p class="text-slate-700"><strong>Operationalized</strong> an NLP pipeline to auto-generate & grade MCQs integrated into a Flask app; published in IJITEE (2020); −<strong>30%</strong> manual authoring time.</p>
              <a class="mt-3 inline-block text-sm nav-link-dark" target="_blank" href="https://github.com/your-user/exam-nlp">View Code →</a>
            </div>
          </div>
        </div>
        <footer class="text-center py-4 border-t border-neutral-200"><p class="text-sm text-slate-500 font-medium">© ${new Date().getFullYear()} Daanesh Potnuri</p></footer>
      </section>
    `,

    resume: `
      <section id="resume" class="content-section pt-32" style="background-color: var(--section-bg-resume);">
        <div class="container mx-auto px-6 py-16 flex flex-col items-center reveal">
          <h2 class="section-heading text-3xl md:text-4xl font-bold text-center mb-4">Resume</h2>
          <p class="text-slate-600 text-center max-w-xl mb-6">Download a concise PDF of my resume with experience, projects, and skills.</p>
          <a href="./Daanesh_ReResume.pdf" target="_blank" class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg shadow">
            <i class="fa-solid fa-download"></i> Download Resume (PDF)
          </a>
        </div>
        <footer class="text-center py-4 border-t border-neutral-200"><p class="text-sm text-slate-500 font-medium">© ${new Date().getFullYear()} Daanesh Potnuri</p></footer>
      </section>
    `,

    contact: `
      <section id="contact" class="content-section pt-32" style="background-color: var(--section-bg-contact);">
        <div class="container mx-auto px-6 py-16 flex items-center justify-center reveal" style="min-height: calc(100vh - 96px);">
          <div class="max-w-2xl w-full text-center">
            <h2 class="section-heading text-3xl md:text-4xl font-bold mb-4">Let's Connect</h2>
            <p class="text-slate-600 mb-10">Open to software engineering roles and collaborations. Reach out via email or LinkedIn.</p>
            <div class="flex justify-center gap-8 text-3xl">
              <a href="mailto:daaneshpotnuri.3690@gmail.com" class="hover:scale-110 transition-transform" aria-label="Email"><i class="fas fa-envelope" style="color:#DB4437;"></i></a>
              <a href="https://github.com/Daanesh" target="_blank" class="hover:scale-110 transition-transform" aria-label="GitHub"><i class="fab fa-github" style="color:#181717;"></i></a>
              <a href="https://www.linkedin.com/in/daanesh-potnuri" target="_blank" class="hover:scale-110 transition-transform" aria-label="LinkedIn"><i class="fab fa-linkedin" style="color:#0A66C2;"></i></a>
            </div>
          </div>
        </div>
        <footer class="text-center py-4 border-t border-neutral-200"><p class="text-sm text-slate-500 font-medium">© ${new Date().getFullYear()} Daanesh Potnuri</p></footer>
      </section>
    `,
  };
});
