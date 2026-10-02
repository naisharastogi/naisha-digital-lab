import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Terminal, Sparkles, X } from "lucide-react";
import "./styles.css";

const projects = [
  {
    id: "gazette",
    number: "01",
    title: "Genesis Gazette",
    tag: "EDITORIAL / STEAM / LEADERSHIP",
    description:
      "A youth-led global publication exploring science, tech, and future frontiers with contributors worldwide.",
    stats: ["Editor-in-Chief", "50+ team members across 11+ countries", "Global reach, raising", "Raised ₹67,963 for Educate Girls", "Awarded GYAF Grant USD 1000"],
    symbol: "GG"
  },
  {
    id: "tennis-kinetics",
    number: "02",
    title: "Tennis Kinetics",
    tag: "PHYSICS / COMPUTATIONAL SIMULATION",
    description:
      "Interactive 2D physics engine modeling Magnus downforce, topspin trajectory, and aerodynamic drag in real time.",
    stats: ["Canvas API", "Euler method", "Magnus effect"],
    symbol: "🎾"
  },
  {
    id: "ecotherm",
    number: "03",
    title: "EcoTherm",
    tag: "MATERIALS / SUSTAINABILITY / LAB",
    description:
      "Fabrication and testing of biodegradable passive daytime radiative cooling membranes to cut cooling energy demands.",
    stats: ["Biopolymers", "Thermal optics", "Spectrophotometry"],
    symbol: "❄"
  },
  {
    id: "nyas-energy",
    number: "04",
    title: "NYAS Clean Energy Grid",
    tag: "ENGINEERING / APPLIED RESEARCH",
    description:
      "Architecting decentralized energy storage systems and microgrid distribution models with NYAS Junior Academy.",
    stats: ["NYAS", "Grid modeling", "Energy storage"],
    symbol: "⚡"
  }
];

const academicsAndAwards = [
  {
    id: "ibdp-academics",
    number: "01",
    title: "DPS International Edge",
    tag: "IB DIPLOMA PROGRAMME / 2027",
    description:
      "HL: Math Analysis & Approaches HL, Physics HL, Chemistry HL. SL: Economics SL, English Lang & Lit SL, French B SL. School Distinction Award for Genesis Gazette. CAS Summit, DPSI Techathlon & Aurelia MUN Lead.",
    stats: ["MYP: 55/56 (Cohort Top)", "4× Roll of Honour", "Peer Academic Mentor (2 Yrs)", "CAS & Media Lead"],
    symbol: "🎓"
  },
  {
    id: "fellowships-initiatives",
    number: "02",
    title: "Fellowships & Initiatives",
    tag: "IMPACT / LAB SCHOLAR / LEADERSHIP",
    description:
      "EPFL Nature in Code scholar modeling evolutionary genetics via JavaScript. Selected as IB x HundrED Youth Ambassador leading the EcoPower WaterWise initiative. Former Director of Operations & Web Designer at Prisit.",
    stats: ["EPFL Summer Scholar", "IB x HundrED Ambassador", "EcoPower WaterWise Lead", "Prisit Web Operations"],
    symbol: "🌐"
  },
  {
    id: "testing-certs",
    number: "03",
    title: "Skills & Certifications",
    tag: "LANGUAGES / CLOUD / AI / HKUST",
    description:
      "Calculus for Engineers (HKUST). JavaScript (ES6+), C# (Microsoft/freeCodeCamp certified), Python, PHP, MySQL, MongoDB, HTML5 Canvas API, and Figma UI/UX prototyping.",
    stats: ["IELTS: 8.5 (Overall)", "DELF French: B1", "AWS Cloud Practitioner", "IBM AI & Cybersecurity", "Duke Univ Leadership"],
    symbol: "📑"
  },
  {
    id: "comps-honors",
    number: "04",
    title: "Honors & Competitions",
    tag: "GLOBAL ESSAY / MAA / CONTESTS",
    description:
      "Shortlisted for John Locke Institute Global Essay Prize (Economics, 100k+ entries). Rank 4 in Math Around Us. AMC 12 Certificate of Merit (School Rank 3). HPE CodeWars top rank & ACER IBT High Distinction.",
    stats: ["John Locke Shortlist", "Math Around Us: Rank 4", "AMC 12 Merit (Rank 3)", "HPE CodeWars (Top 1%)", "ACER High Distinction"],
    symbol: "🏆"
  }
];

function PixelCharacter({ onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [bubble, setBubble] = useState("✨");

  const handleClick = (e) => {
    const emojis = ["⚡", "💻", "🎾", "🚀", "🔬", "✨"];
    setBubble(emojis[Math.floor(Math.random() * emojis.length)]);
    setClicked(true);
    setTimeout(() => setClicked(false), 600);
    if (onClick) onClick(e);
  };

  return (
    <div 
      className="char-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Interactive character avatar"
    >
      <AnimatePresence>
        {(isHovered || clicked) && (
          <motion.div 
            className="thought-bubble"
            initial={{ opacity: 0, y: 10, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {bubble}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="pixel-avatar"
        animate={clicked ? { y: [-4, -18, -4] } : { y: [0, -3, 0] }}
        transition={clicked ? { duration: 0.45, ease: "easeOut" } : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="px-hair-back" />

        <div className="px-head">
          <div className="px-hair-fringe" />
          <div className="px-hair-side left" />
          <div className="px-hair-side right" />
          
          <div className="px-eyes">
            <span className={`px-eye left ${isHovered ? "happy" : ""}`} />
            <span className={`px-eye right ${isHovered ? "happy" : ""}`} />
          </div>
          <div className="px-blush left" />
          <div className="px-blush right" />
        </div>

        <div className="px-torso">
          <div className="px-hoodie-zipper" />
        </div>

        <div className={`px-arm left ${isHovered ? "wave" : "typing"}`} />
        <div className="px-arm right typing" />

        <div className="px-legs">
          <span className="px-leg left" />
          <span className="px-leg right" />
        </div>
      </motion.div>
    </div>
  );
}

function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        top: `${(i * 61) % 100}%`,
        size: 2 + (i % 3)
      })),
    []
  );

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [0, -18, 0], opacity: [0.15, 0.8, 0.15] }}
          transition={{
            duration: 3 + (p.id % 4),
            delay: (p.id % 5) * 0.35,
            repeat: Infinity
          }}
        />
      ))}
    </div>
  );
}

function MiniTerminal({ onClose }) {
  const [lines, setLines] = useState([
    "NAISHA_OS v2.6",
    "type `help` to see available commands."
  ]);
  const [input, setInput] = useState("");

  const run = (event) => {
    event.preventDefault();
    const command = input.trim().toLowerCase();
    if (!command) return;

    const output = {
      help: "about   projects   research   stack   genesis   secret",
      about: "IB DP student / researcher / full-stack builder / editor",
      projects: "4 live builds loaded: Tennis Kinetics, Genesis, EcoTherm, NYAS Grid.",
      research: "Magnus effect trajectories, Cu-EDTA kinetics, passive cooling.",
      stack: "React, Node, Python, C#, Canvas API, MongoDB, AWS.",
      genesis: "Genesis Gazette // STEM insights, youth voices, ideas that move.",
      secret: "you found the tiny terminal. nice."
    }[command] || `command not found: ${command}`;

    setLines((old) => [...old, `> ${command}`, output]);
    setInput("");
  };

  return (
    <motion.div
      className="terminal-window"
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 20 }}
    >
      <div className="terminal-head">
        <span>NAISHA_TERMINAL</span>
        <button onClick={onClose} aria-label="Close terminal"><X size={16} /></button>
      </div>
      <div className="terminal-body">
        {lines.map((line, i) => <div key={i}>{line}</div>)}
        <form onSubmit={run} className="terminal-input">
          <span>&gt;</span>
          <input autoFocus value={input} onChange={(e) => setInput(e.target.value)} />
        </form>
      </div>
    </motion.div>
  );
}

function App() {
  const [terminal, setTerminal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [secret, setSecret] = useState(false);
  const clickCount = useRef(0);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "`") setTerminal(true);
      if (e.key === "Escape") {
        setTerminal(false);
        setSelected(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const characterClick = () => {
    clickCount.current += 1;
    if (clickCount.current >= 5) {
      setSecret(true);
      clickCount.current = 0;
    }
  };

  return (
    <div className="site">
      <Particles />

      <nav className="nav">
        <a href="#top" className="logo">NR<span>.</span></a>
        <div className="nav-links">
          <a href="#work">work</a>
          <a href="#academics">academics</a>
          <a href="#about">about</a>
          <a href="#now">now</a>
          <button onClick={() => setTerminal(true)}><Terminal size={15} /> terminal</button>
        </div>
      </nav>

      <main id="top">
        <section className="hero section">
          <div className="hero-grid">
            <div>
              <div className="eyebrow"><span className="status-dot" /> DIGITAL LAB / 2026</div>
              <h1>
                hi, i'm<br />
                <span>naisha.</span>
              </h1>
              <p className="hero-copy">
                I build things where <b>code × research × creativity</b> overlap.
                High school researcher, developer, editor, and curious builder.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#work">explore work <ArrowDown size={16} /></a>
                <button className="button ghost" onClick={() => setTerminal(true)}>
                  <Terminal size={16} /> open terminal
                </button>
              </div>
            </div>

            <div className="scene">
              <div className="scene-label">LIVE SCENE <span>●</span></div>
              <div className="room">
                <div className="stars">✦ · ✧   · ✦</div>
                <div className="shelf"><span>👨‍🚀</span><span>📖</span><span>🎾</span></div>
                <div className="desk">
                  <div className="screen">010<br />101<br />001</div>
                  <div className="desk-top" />
                  <div className="desk-leg" />
                </div>
                <PixelCharacter onClick={characterClick} />
                <div className="floor-grid" />
                <div className="scene-tip">hover & click avatar</div>
              </div>
            </div>
          </div>

          <div className="scroll-note"><ArrowDown size={14} /> scroll to enter the lab</div>
        </section>

        <section id="work" className="section work" style={{ paddingBottom: '40px' }}>
          <div className="section-heading">
            <div>
              <span className="eyebrow">SELECTED EXPERIMENTS</span>
              <h2>things i've<br /><em>made / studied.</em></h2>
            </div>
            <p>Hover, click, explore. This portfolio is meant to be interacted with.</p>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <motion.button
                className="project-card"
                key={project.id}
                onClick={() => setSelected(project)}
                whileHover={{ y: -8, rotate: project.id === "tennis-kinetics" ? -1 : 0.5 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <div className="card-top">
                  <span>{project.number}</span>
                  <ArrowUpRight size={17} />
                </div>
                <div className="card-symbol">{project.symbol}</div>
                <div className="card-content">
                  <span className="tag">{project.tag}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <div className="card-footer">{project.stats.map((s) => <span key={s}>{s}</span>)}</div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Academics Section */}
        <section id="academics" className="section work" style={{ paddingTop: '60px', paddingBottom: '100px' }}>
          <div className="section-heading">
            <div>
              <span className="eyebrow">ACADEMIC PROFILE</span>
              <h2>academics.</h2>
            </div>
            <p>Coursework, international honors, research fellowships, and verified technical credentials.</p>
          </div>

          <div className="project-grid">
            {academicsAndAwards.map((item) => (
              <motion.button
                className="project-card"
                key={item.id}
                onClick={() => setSelected(item)}
                whileHover={{ y: -8, rotate: 0.5 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <div className="card-top">
                  <span>{item.number}</span>
                  <ArrowUpRight size={17} />
                </div>
                <div className="card-symbol">{item.symbol}</div>
                <div className="card-content">
                  <span className="tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="card-footer">{item.stats.map((s) => <span key={s}>{s}</span>)}</div>
              </motion.button>
            ))}
          </div>
        </section>

        <section id="about" className="section about">
          <div className="about-character"><PixelCharacter onClick={characterClick} /></div>
          <div>
            <span className="eyebrow">ABOUT / 001</span>
            <h2>curious by default.</h2>
            <p>
              I like turning questions into experiments, experiments into stories,
              and stories into things people can actually interact with.
            </p>
            <p>
              My work spans full-stack software development, computational physics simulations,
              materials science research, youth journalism, and clean-tech engineering systems.
            </p>
          </div>
        </section>

        <section id="now" className="section now">
          <div>
            <span className="eyebrow">CURRENTLY</span>
            <h2>loading...</h2>
          </div>
          <div className="now-list">
            {[
              "building computational physics engines",
              "writing & publishing Genesis Gazette",
              "modeling tennis ball flight aerodynamics",
              "exploring radiative cooling membranes",
              "refining full-stack web applications"
            ].map((item, i) => (
              <div className="now-row" key={item}>
                <span>0{i + 1}</span><span>{item}</span><span className="pulse">●</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
  <span>NAISHA RASTOGI / DIGITAL LAB</span>
  <span>
    <a 
      href="https://github.com/naisharastogi" 
      target="_blank" 
      rel="noreferrer" 
      style={{ textDecoration: "underline" }}
    >
      github
    </a>
    {" / "}
    <a 
      href="https://www.linkedin.com/in/naisha-rastogi" 
      target="_blank" 
      rel="noreferrer" 
      style={{ textDecoration: "underline" }}
    >
      linkedin 
    </a>
     {" ⋮ "} made with curiosity + code
  </span>
</footer>

      <AnimatePresence>
        {terminal && <MiniTerminal onClose={() => setTerminal(false)} />}
        {selected && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.div className="project-modal" initial={{ y: 30, scale: .96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, scale: .96 }} onClick={(e) => e.stopPropagation()}>
              <button className="close" onClick={() => setSelected(null)}><X /></button>
              <span className="eyebrow">{selected.tag}</span>
              <div className="modal-symbol">{selected.symbol}</div>
              <h2>{selected.title}</h2>
              <p>{selected.description}</p>
              <div className="modal-stats">{selected.stats.map((s) => <span key={s}>{s}</span>)}</div>
              <div className="fake-progress"><span style={{ width: "78%" }} /></div>
              <small>interactive case study coming next.</small>
            </motion.div>
          </motion.div>
        )}
        {secret && (
          <motion.div className="secret-toast" initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}>
            <Sparkles size={16} />
            <span>you found the tiny pixel character!!</span>
            <button onClick={() => setSecret(false)}>×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
