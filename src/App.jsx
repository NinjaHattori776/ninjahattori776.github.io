import { useState, useEffect, useRef } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const PROJECTS = [
  // Cybersecurity
  { name: "azure-honeypot-siem", cat: "cybersecurity", desc: "Azure T-Pot honeypot + Terraform IaC + Kibana SIEM dashboard — captures live attacks in real time", tech: ["Azure", "Terraform", "Kibana", "HCL"], url: "https://github.com/NinjaHattori776/azure-honeypot-siem", featured: true },
  { name: "retail-cybersecurity-toolkit", cat: "cybersecurity", desc: "Flask cybersecurity training app + automated firewall script for retail environments", tech: ["Python", "Flask", "Bash"], url: "https://github.com/NinjaHattori776/retail-cybersecurity-toolkit", featured: true },

  // Java / OOP
  { name: "hospital-management-system", cat: "java", desc: "Full Java HMS — 7 UML diagrams, 15 classes, clinical/lab/pharmaceutical/financial modules, MySQL schema", tech: ["Java", "MySQL", "UML"], url: "https://github.com/NinjaHattori776/hospital-management-system", featured: true },
  { name: "course-grades-java", cat: "java", desc: "Java OOP showcase — inheritance, interfaces, polymorphism for a student grade management system", tech: ["Java", "OOP"], url: "https://github.com/NinjaHattori776/course-grades-java" },
  { name: "balancebit-app", cat: "java", desc: "Wearable activity tracker — UML design + Java DailyRecord implementation + JUnit test suite", tech: ["Java", "JUnit", "UML"], url: "https://github.com/NinjaHattori776/balancebit-app" },
  { name: "cyberhash-ecommerce", cat: "java", desc: "ASP.NET Core MVC e-commerce platform — Repository Pattern, EF Core, ASP.NET Identity, SQL Server", tech: ["C#", "ASP.NET", "SQL Server"], url: "https://github.com/NinjaHattori776/cyberhash-ecommerce" },

  // Python / ML
  { name: "boston-housing-ml", cat: "python", desc: "ML model comparison — Linear Regression vs Decision Tree on Boston housing data, 10-fold cross-validation", tech: ["Python", "Scikit-learn", "Pandas"], url: "https://github.com/NinjaHattori776/boston-housing-ml", featured: true },
  { name: "sf-film-locations-analysis", cat: "python", desc: "Geospatial EDA — San Francisco film locations mapped with Folium and analysed with Pandas", tech: ["Python", "Folium", "Pandas"], url: "https://github.com/NinjaHattori776/sf-film-locations-analysis" },
  { name: "big-data-analysis-python", cat: "python", desc: "XML data pipeline — parsing, transformation, and visualisation with Pandas and Matplotlib", tech: ["Python", "Pandas", "Matplotlib"], url: "https://github.com/NinjaHattori776/big-data-analysis-python" },
  { name: "data-science-projects", cat: "python", desc: "ML dataset collection — IPL cricket, SFO air traffic, NYPD hate crimes EDA and modelling", tech: ["Python", "Jupyter", "Scikit-learn"], url: "https://github.com/NinjaHattori776/data-science-projects" },

  // Web
  { name: "ks-esslingen-website", cat: "web", desc: "9-page Bootstrap 5 site for a German construction company — responsive, multilingual-ready", tech: ["HTML", "Bootstrap 5", "CSS"], url: "https://github.com/NinjaHattori776/ks-esslingen-website" },
  { name: "onecare-trainer-platform", cat: "web", desc: "Laravel 8 fitness trainer booking platform — multi-role auth, booking panel, admin dashboards", tech: ["Laravel", "PHP", "MySQL"], url: "https://github.com/NinjaHattori776/onecare-trainer-platform" },
  { name: "car-rental-website", cat: "web", desc: "Responsive Bootstrap car rental landing page with booking UI", tech: ["HTML", "Bootstrap", "CSS"], url: "https://github.com/NinjaHattori776/car-rental-website" },
  { name: "course-hero-clone", cat: "web", desc: "Multi-page HTML/CSS frontend clone of Course Hero", tech: ["HTML", "CSS", "Bootstrap"], url: "https://github.com/NinjaHattori776/course-hero-clone" },

  // Database
  { name: "school-management-system", cat: "database", desc: "Full school SaaS MySQL schema — 240+ tables covering timetables, attendance, finance, and exams", tech: ["MySQL", "ERD"], url: "https://github.com/NinjaHattori776/school-management-system", featured: true },
  { name: "hr-analytics-nosql", cat: "database", desc: "NoSQL data modelling for HR analytics — JSON schema design and entity relationship diagrams", tech: ["NoSQL", "JSON", "ERD"], url: "https://github.com/NinjaHattori776/hr-analytics-nosql" },
  { name: "abudhabi-court-templates", cat: "database", desc: "Bilingual Arabic/English legal document templates for Abu Dhabi Judicial Department", tech: ["Word", "Legal Tech"], url: "https://github.com/NinjaHattori776/abudhabi-court-templates" },

  // UML / Architecture
  { name: "patient-monitoring-system", cat: "uml", desc: "Enterprise healthcare architecture — 37 UML diagrams, Kerberos auth, ML risk estimation modules", tech: ["UML", "Visual Paradigm", "Enterprise Design"], url: "https://github.com/NinjaHattori776/patient-monitoring-system", featured: true },
  { name: "food-bank-app", cat: "uml", desc: "50+ use cases for a hunger relief/food bank platform — full system architecture", tech: ["UML", "Use Cases"], url: "https://github.com/NinjaHattori776/food-bank-app" },
  { name: "uml-logbook", cat: "uml", desc: "8-week progressive UML portfolio — 6 real-world systems with full diagram suites", tech: ["UML", "Visual Paradigm"], url: "https://github.com/NinjaHattori776/uml-logbook" },
  { name: "hazardous-transport-system", cat: "uml", desc: "11 UML diagrams for a French hazardous materials logistics system (TMD compliance)", tech: ["UML", "Systems Design"], url: "https://github.com/NinjaHattori776/hazardous-transport-system" },
  { name: "event-management-system", cat: "uml", desc: "UML with Composite pattern, MVP architecture, and Jacobson stereotypes", tech: ["UML", "Design Patterns"], url: "https://github.com/NinjaHattori776/event-management-system" },
  { name: "smart-fridge-system", cat: "uml", desc: "IoT UML — SmartFridgeX with barcode inventory tracking and automated shopping list generation", tech: ["UML", "IoT Design"], url: "https://github.com/NinjaHattori776/smart-fridge-system" },
];

const CATS = [
  { key: "all", label: "All Projects" },
  { key: "cybersecurity", label: "🔐 Cybersecurity" },
  { key: "java", label: "☕ Java / OOP" },
  { key: "python", label: "🐍 Python / ML" },
  { key: "web", label: "🌐 Web Dev" },
  { key: "database", label: "🗄️ Database" },
  { key: "uml", label: "🏗️ Architecture" },
];

const SKILLS = {
  "Languages & Core": ["Python", "Java", "C", "PHP", "JavaScript", "SQL", "Bash", "C#", "HTML5", "CSS3"],
  "Frameworks & Libraries": ["React.js", "Angular.js", "Laravel", "Flask", "Bootstrap 5", "ASP.NET Core", "Pandas", "Matplotlib", "Scikit-learn", "Node.js"],
  "Databases & Data": ["MySQL", "MySQL Workbench", "NoSQL / JSON", "MongoDB", "Firebase", "SQL Server", "ER Diagram Design"],
  "Cybersecurity & Cloud": ["Azure", "Terraform (IaC)", "Kibana / SIEM", "Wireshark", "T-Pot Honeypot", "Suricata IDS", "Cloud Security", "Threat Analytics"],
  "Design & Architecture": ["UML (all diagram types)", "Visual Paradigm", "Figma", "Balsamiq", "Framer", "MS Visio", "Proteus (DLD)"],
  "Dev Tools & Practices": ["Git / GitHub", "Selenium (QA)", "JUnit", "MS Project", "Trello", "Slack", "Unity (Game Dev)", "Protégé (Semantic Web)", "WordPress / Weebly / Squarespace", "Canva"],
  "Office & Productivity": ["Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint", "Microsoft Access"],
};

const CERTS = [
  "Full Stack Web Development",
  "Database SQL Server",
  "Learning C#",
  "Build Real World E-Commerce Website with .NET Core 7",
  "Wireshark Essential Training",
];

const EXPERIENCE = [
  { role: "Employability Assistant", org: "Nottingham Trent University", period: "Sept 2024 – Apr 2025", desc: "Supported students with career guidance, CV reviews, and campus orientation. Organised university events including enrolment and graduation ceremonies." },
  { role: "Transport Key Colleague", org: "Asda", period: "July 2024 – Present", desc: "Inventory management, stocking, labelling, and warehouse operations using Walmart device technology." },
  { role: "UML Designer & Full Stack Developer", org: "Fiverr (Freelance)", period: "Nov 2020 – Present", desc: "Level 1 Seller. 100+ projects including UML diagrams, full-stack web apps, React.js, e-commerce, and house floor plans." },
  { role: "Web Developer", org: "CbSol", period: "Nov 2021 – Feb 2022", desc: "MERN stack development — e-commerce site with React.js and Firebase backend integration." },
  { role: "Junior Web Developer", org: "Bravemind Studios", period: "Jun 2021 – Aug 2021", desc: "Angular.js, React.js, Laravel — delivered multiple client projects as lead team member." },
  { role: "Web Developer Intern", org: "Venturetech Computer Education", period: "Nov 2019 – Nov 2020", desc: "HTML5, CSS3, JavaScript, PHP — built and deployed client websites and dynamic web applications." },
];

const EDUCATION = [
  { deg: "MSc Cybersecurity", school: "Nottingham Trent University", period: "2024 – 2026" },
  { deg: "Master of Software Engineering", school: "University of Management & Technology", period: "2021 – 2023" },
  { deg: "Bachelor of Software Engineering", school: "COMSATS University Islamabad", period: "2017 – 2021" },
];

// ─── HOOK: TYPING EFFECT ───────────────────────────────────────────────────────

function useTyping(phrases, speed = 80) {
  const [text, setText] = useState("");
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phaseIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800);
        } else {
          setCharIdx(c => c + 1);
        }
      } else {
        setText(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setCharIdx(0);
          setPhaseIdx(i => (i + 1) % phrases.length);
        } else {
          setCharIdx(c => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, charIdx, phaseIdx, phrases, speed]);

  return text;
}

// ─── COMPONENTS ────────────────────────────────────────────────────────────────

function Nav({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["home", "about", "projects", "skills", "contact"];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => {
    setActive(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(8,10,16,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,255,136,0.12)" : "none",
      transition: "all 0.3s ease",
      padding: "0 2rem",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", color: "#00ff88", fontSize: "1.1rem", letterSpacing: 2 }}>
          &lt;NinjaHattori776/&gt;
        </span>
        {/* Desktop */}
        <div style={{ display: "flex", gap: "2rem" }} className="nav-desktop">
          {links.map(l => (
            <button key={l} onClick={() => go(l)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Share Tech Mono', monospace",
              color: active === l ? "#00ff88" : "rgba(255,255,255,0.6)",
              fontSize: "0.85rem", letterSpacing: 1, textTransform: "uppercase",
              transition: "color 0.2s",
              borderBottom: active === l ? "1px solid #00ff88" : "1px solid transparent",
              paddingBottom: 2,
            }}>{l}</button>
          ))}
        </div>
        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(m => !m)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "#00ff88", fontSize: "1.4rem" }} className="nav-burger">☰</button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: "rgba(8,10,16,0.98)", padding: "1rem 2rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {links.map(l => (
            <button key={l} onClick={() => go(l)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Share Tech Mono', monospace", color: active === l ? "#00ff88" : "rgba(255,255,255,0.7)", fontSize: "1rem", textAlign: "left", letterSpacing: 1, textTransform: "uppercase" }}>{l}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  const typed = useTyping(["MSc Cybersecurity", "Software Engineer", "Full-Stack Developer", "UML Architect", "ML Practitioner"]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "01アイウエオカキク";
    const cols = Math.floor(canvas.width / 18);
    const drops = Array(cols).fill(0);

    const draw = () => {
      ctx.fillStyle = "rgba(8,10,16,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0,255,136,0.08)";
      ctx.font = "13px 'Share Tech Mono'";
      drops.forEach((y, i) => {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 18, y * 18);
        if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        else drops[i]++;
      });
    };

    const interval = setInterval(draw, 45);
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { clearInterval(interval); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, opacity: 0.6 }} />
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 1.5rem" }}>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", color: "#00ff88", fontSize: "0.85rem", letterSpacing: 4, marginBottom: "1.2rem", opacity: 0.8 }}>
          {'>'} INITIALISING PORTFOLIO...
        </div>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.5rem, 10vw, 7rem)", color: "#fff", margin: 0, letterSpacing: 4, lineHeight: 1 }}>
          HASHIR TARIQ
        </h1>
        <div style={{ height: "3rem", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "0.8rem" }}>
          <span style={{ fontFamily: "'Share Tech Mono', monospace", color: "#00ff88", fontSize: "clamp(1rem, 2.5vw, 1.4rem)", letterSpacing: 2 }}>
            {typed}<span style={{ animation: "blink 1s step-end infinite" }}>█</span>
          </span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.85rem", letterSpacing: 2, marginTop: "1rem" }}>
          🇬🇧 Nottingham, UK &nbsp;|&nbsp; Open to Cybersecurity & Software Engineering roles
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2.5rem", flexWrap: "wrap" }}>
          <a href="https://github.com/NinjaHattori776" target="_blank" rel="noreferrer" style={btnStyle("#00ff88", "#000")}>GitHub ↗</a>
          <a href="https://www.linkedin.com/in/hashirtariq/" target="_blank" rel="noreferrer" style={btnStyle("transparent", "#00ff88", "#00ff88")}>LinkedIn ↗</a>
          <a href="mailto:hashirsheikh94@gmail.com" style={btnStyle("transparent", "#fff", "rgba(255,255,255,0.4)")}>Contact Me</a>
        </div>
        <div style={{ marginTop: "4rem", animation: "bounce 2s infinite" }}>
          <span style={{ color: "rgba(0,255,136,0.4)", fontSize: "1.5rem" }}>↓</span>
        </div>
      </div>
    </section>
  );
}

function btnStyle(bg, color, border = bg) {
  return {
    background: bg, color, border: `1px solid ${border}`,
    padding: "0.7rem 1.8rem", fontFamily: "'Share Tech Mono', monospace",
    fontSize: "0.8rem", letterSpacing: 2, cursor: "pointer",
    textDecoration: "none", display: "inline-block", transition: "all 0.2s",
    textTransform: "uppercase",
  };
}

function SectionTitle({ children, tag = "02" }) {
  return (
    <div style={{ marginBottom: "3rem" }}>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", color: "#00ff88", fontSize: "0.75rem", letterSpacing: 4, marginBottom: "0.5rem", opacity: 0.7 }}>
        [{tag}]
      </div>
      <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#fff", margin: 0, letterSpacing: 3 }}>
        {children}
      </h2>
      <div style={{ width: 60, height: 2, background: "#00ff88", marginTop: "0.8rem" }} />
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about" style={sectionStyle}>
      <div style={inner}>
        <SectionTitle tag="01">ABOUT ME</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }} className="about-grid">
          <div>
            <p style={bodyText}>
              I'm a software engineer with an MSc in Cybersecurity from Nottingham Trent University. Over 9 years of industry experience spanning full-stack development, system design, cloud security, and data engineering — built across freelance projects, client work, and research.
            </p>
            <p style={bodyText}>
              I specialise in designing secure, scalable systems and translating complex requirements into clean, well-documented solutions. 100+ freelance projects completed on Fiverr as a Level 1 Seller, ranging from UML architectures to full-stack web applications.
            </p>
            <div style={{ marginTop: "2rem" }}>
              <h3 style={subhead}>Education</h3>
              {EDUCATION.map(e => (
                <div key={e.deg} style={{ marginBottom: "1rem" }}>
                  <div style={{ color: "#00ff88", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.8rem" }}>{e.period}</div>
                  <div style={{ color: "#fff", fontWeight: 600, marginTop: 2 }}>{e.deg}</div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>{e.school}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 style={subhead}>Experience</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {EXPERIENCE.map(e => (
                <div key={e.role} style={{ borderLeft: "2px solid rgba(0,255,136,0.3)", paddingLeft: "1rem" }}>
                  <div style={{ color: "#00ff88", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem", letterSpacing: 1 }}>{e.period}</div>
                  <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem", marginTop: 2 }}>{e.role}</div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginBottom: 4 }}>{e.org}</div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem", lineHeight: 1.6 }}>{e.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p }) {
  const catColors = { cybersecurity: "#ff3864", java: "#f5a623", python: "#7ed321", web: "#00c8ff", database: "#bd10e0", uml: "#00ff88" };
  const c = catColors[p.cat] || "#00ff88";
  return (
    <a href={p.url} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
      <div style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid rgba(255,255,255,0.08)`,
        padding: "1.4rem",
        cursor: "pointer",
        transition: "all 0.2s",
        position: "relative",
        overflow: "hidden",
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = c; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
      >
        {p.featured && <div style={{ position: "absolute", top: 10, right: 10, background: c, color: "#000", fontSize: "0.6rem", padding: "2px 6px", fontFamily: "'Share Tech Mono', monospace", letterSpacing: 1 }}>FEATURED</div>}
        <div style={{ fontFamily: "'Share Tech Mono', monospace", color: c, fontSize: "0.65rem", letterSpacing: 2, marginBottom: "0.5rem", textTransform: "uppercase" }}>{p.cat}</div>
        <h3 style={{ color: "#fff", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.9rem", margin: "0 0 0.6rem", lineHeight: 1.4 }}>{p.name}</h3>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8rem", lineHeight: 1.6, margin: "0 0 1rem" }}>{p.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {p.tech.map(t => (
            <span key={t} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: c, border: `1px solid ${c}30`, padding: "2px 8px", letterSpacing: 1 }}>{t}</span>
          ))}
        </div>
      </div>
    </a>
  );
}

function ProjectsSection() {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? PROJECTS : PROJECTS.filter(p => p.cat === active);

  return (
    <section id="projects" style={{ ...sectionStyle, background: "rgba(0,0,0,0.3)" }}>
      <div style={inner}>
        <SectionTitle tag="02">PROJECTS</SectionTitle>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "2.5rem" }}>
          {CATS.map(c => (
            <button key={c.key} onClick={() => setActive(c.key)} style={{
              background: active === c.key ? "#00ff88" : "transparent",
              color: active === c.key ? "#000" : "rgba(255,255,255,0.6)",
              border: "1px solid " + (active === c.key ? "#00ff88" : "rgba(255,255,255,0.15)"),
              padding: "0.4rem 1rem", fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.72rem", cursor: "pointer", letterSpacing: 1, transition: "all 0.2s",
            }}>{c.label}</button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "1rem" }}>
          {filtered.map(p => <ProjectCard key={p.name} p={p} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <a href="https://github.com/NinjaHattori776?tab=repositories" target="_blank" rel="noreferrer" style={btnStyle("transparent", "#00ff88", "#00ff88")}>
            View All Repositories ↗
          </a>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" style={sectionStyle}>
      <div style={inner}>
        <SectionTitle tag="03">SKILLS & CERTIFICATIONS</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          {Object.entries(SKILLS).map(([cat, items]) => (
            <div key={cat} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,255,136,0.12)", padding: "1.4rem" }}>
              <h3 style={{ fontFamily: "'Share Tech Mono', monospace", color: "#00ff88", fontSize: "0.75rem", letterSpacing: 2, marginBottom: "1rem", textTransform: "uppercase" }}>{cat}</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {items.map(s => (
                  <span key={s} style={{ background: "rgba(0,255,136,0.08)", color: "rgba(255,255,255,0.75)", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem", padding: "4px 10px", letterSpacing: 0.5 }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h3 style={{ ...subhead, marginBottom: "1.2rem" }}>Certifications</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {CERTS.map(c => (
            <div key={c} style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.2)", padding: "0.7rem 1.2rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span style={{ color: "#00ff88" }}>✓</span>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.78rem", color: "rgba(255,255,255,0.8)", letterSpacing: 0.5 }}>{c}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "3rem" }}>
          <h3 style={{ ...subhead, marginBottom: "1.2rem" }}>Awards</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {["Cash Award for Matriculation Excellence", "Matric-based Academic Scholarship", "Full Merit-based Academic Scholarship", "Merit-based Laptop Award from Chief Minister Punjab", "University-based Laptop Award from Chief Minister Punjab"].map(a => (
              <div key={a} style={{ background: "rgba(245,166,35,0.06)", border: "1px solid rgba(245,166,35,0.2)", padding: "0.7rem 1.2rem", display: "flex", gap: "0.6rem", alignItems: "center" }}>
                <span style={{ color: "#f5a623" }}>🏆</span>
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.75rem", color: "rgba(255,255,255,0.75)" }}>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" style={{ ...sectionStyle, background: "rgba(0,0,0,0.4)" }}>
      <div style={{ ...inner, textAlign: "center" }}>
        <SectionTitle tag="04">GET IN TOUCH</SectionTitle>
        <p style={{ ...bodyText, maxWidth: 520, margin: "0 auto 2.5rem" }}>
          Open to cybersecurity and software engineering roles in the UK. Feel free to reach out via email or connect on LinkedIn.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", marginBottom: "3rem" }}>
          <a href="mailto:hashirsheikh94@gmail.com" style={btnStyle("#00ff88", "#000")}>✉ hashirsheikh94@gmail.com</a>
          <a href="https://www.linkedin.com/in/hashirtariq/" target="_blank" rel="noreferrer" style={btnStyle("transparent", "#00ff88", "#00ff88")}>LinkedIn ↗</a>
          <a href="https://github.com/NinjaHattori776" target="_blank" rel="noreferrer" style={btnStyle("transparent", "#fff", "rgba(255,255,255,0.3)")}>GitHub ↗</a>
          <a href="https://medium.com/@hashirsheikh93" target="_blank" rel="noreferrer" style={btnStyle("transparent", "rgba(255,255,255,0.6)", "rgba(255,255,255,0.15)")}>Medium ↗</a>
        </div>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(0,255,136,0.4)", fontSize: "0.75rem", letterSpacing: 2, marginTop: "4rem" }}>
          © 2025 Hashir Tariq · Built with React · Hosted on GitHub Pages
        </div>
      </div>
    </section>
  );
}

const sectionStyle = { padding: "6rem 1.5rem" };
const inner = { maxWidth: 1100, margin: "0 auto" };
const bodyText = { color: "rgba(255,255,255,0.62)", lineHeight: 1.8, fontSize: "0.92rem", marginBottom: "1rem" };
const subhead = { fontFamily: "'Bebas Neue', sans-serif", color: "#fff", fontSize: "1.4rem", letterSpacing: 2, marginBottom: "1rem", marginTop: "1.5rem" };

// ─── APP ROOT ──────────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = ["home", "about", "projects", "skills", "contact"];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.4 });
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #080a10; color: #fff; font-family: 'Share Tech Mono', monospace; overflow-x: hidden; }
        a { color: inherit; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
        @media(max-width:700px) {
          .nav-desktop { display: none !important; }
          .nav-burger { display: block !important; }
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Nav active={activeSection} setActive={setActiveSection} />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
