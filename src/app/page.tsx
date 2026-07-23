"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDownRight,
  ArrowRight,
  CaretDown,
  Check,
  Play,
  Sparkle,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const episodes = [
  { title: "The art of staying curious", length: "42:18", score: "+24%", peak: "96%" },
  { title: "A useful kind of obsession", length: "35:09", score: "+18%", peak: "91%" },
  { title: "What ambition costs", length: "51:44", score: "+12%", peak: "88%" },
];

const timeline = [
  ["00:00", 100],
  ["08:12", 86],
  ["16:24", 78],
  ["24:36", 71],
  ["32:48", 65],
  ["42:18", 58],
];

export default function Home() {
  const page = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      const heroItems = gsap.utils.toArray<HTMLElement>(".hero-reveal");
      gsap.fromTo(
        heroItems,
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: "power3.out" },
      );

      gsap.fromTo(
        ".dashboard-shell",
        { y: 72, opacity: 0, rotateX: 8 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.3,
          delay: 0.28,
          ease: "power4.out",
        },
      );

      const story = document.querySelector(".story-section");
      if (story) {
        ScrollTrigger.create({
          trigger: story,
          start: "top top",
          end: "+=1150",
          pin: ".story-copy",
          pinSpacing: true,
        });
      }

      gsap.utils.toArray<HTMLElement>(".story-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 120, opacity: 0.1, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              end: "top 30%",
              scrub: true,
            },
          },
        );
        if (index < 2) {
          gsap.to(card, {
            y: -70,
            opacity: 0.25,
            scrollTrigger: {
              trigger: card,
              start: "bottom 62%",
              end: "bottom 18%",
              scrub: true,
            },
          });
        }
      });

      gsap.to(".ticker-track", { xPercent: -50, repeat: -1, duration: 26, ease: "none" });
    },
    { scope: page },
  );

  function submitWaitlist(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  return (
    <main ref={page} className="site-shell">
      <nav className="nav-wrap" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Axion home">
          <span className="brand-mark"><i /><i /><i /></span>
          axion
        </a>
        <div className="nav-links">
          <a href="#product">Product</a>
          <a href="#insight">Insights</a>
          <a href="#waitlist">For sponsors</a>
        </div>
        <a className="nav-cta" href="#waitlist">Join waitlist <ArrowRight size={15} weight="bold" /></a>
      </nav>

      <section className="hero" id="top">
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <p className="eyebrow hero-reveal"><span className="live-dot" /> The intelligent operating system for podcasts</p>
        <h1 className="hero-title hero-reveal">
          Know your listeners. <span className="inline-wave" aria-hidden="true" /> Keep them.
        </h1>
        <p className="hero-copy hero-reveal">
          The clearest way to understand what happens after you press publish. Axion turns every listen into a better next episode.
        </p>
        <div className="hero-actions hero-reveal">
          <a className="button button-light" href="#waitlist">Get early access <ArrowDownRight size={18} weight="bold" /></a>
          <a className="text-link" href="#product"><span className="play-mini"><Play size={11} weight="fill" /></span> See the signal</a>
        </div>

        <div className="dashboard-shell" aria-label="Axion analytics dashboard preview">
          <div className="dashboard-topbar">
            <div className="window-controls"><i /><i /><i /></div>
            <p>the curious operator <span>/</span> episode intelligence</p>
            <span className="dashboard-avatar">MC</span>
          </div>
          <div className="dashboard-body">
            <aside className="dashboard-side">
              <span className="side-logo">a</span>
              <span className="side-item active" />
              <span className="side-item" />
              <span className="side-item" />
              <span className="side-item" />
            </aside>
            <div className="dash-content">
              <div className="dash-heading"><div><p>Episode intelligence</p><h2>The art of staying curious</h2></div><button className="export">Export report <ArrowUpRightIcon /></button></div>
              <div className="metric-row"><Metric label="LISTENS" value="48,203" trend="+12.4%" /><Metric label="AVG. RETENTION" value="72.8%" trend="+5.1%" /><Metric label="FOLLOWERS" value="1,892" trend="+18.6%" /></div>
              <div className="dash-grid">
                <div className="retention-card"><div className="card-heading"><div><p>Listener retention</p><strong>72.8<span>%</span></strong></div><button>All listeners <CaretDown size={13} /></button></div><RetentionChart /><div className="chart-key"><span><i /> This episode</span><span><i /> Your average</span></div></div>
                <div className="drop-card"><div className="card-heading"><div><p>Drop-off moments</p><strong>3 <span>to inspect</span></strong></div><Sparkle size={17} weight="fill" /></div><div className="drop-list"><Drop time="08:14" text="Long pause after intro" value="-8.2%" /><Drop time="24:36" text="Topic transition" value="-5.4%" /><Drop time="36:08" text="Mid-roll placement" value="-4.1%" /></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ticker" aria-label="Supported platforms"><div className="ticker-track"><span>Spotify</span><span>Apple Podcasts</span><span>YouTube</span><span>Amazon Music</span><span>Overcast</span><span>Spotify</span><span>Apple Podcasts</span><span>YouTube</span><span>Amazon Music</span><span>Overcast</span></div></section>

      <section className="signal-section" id="product">
        <div className="section-head"><p className="eyebrow">Every platform. One signal.</p><h2>Make your next episode<br />your best one.</h2><p>Axion brings your audience signals into focus, then makes the implications impossible to miss.</p></div>
        <div className="bento-grid">
          <article className="bento retention-bento"><div className="bento-label">Retention, in living color</div><h3>See precisely where attention becomes intention.</h3><div className="heatmap"><div className="heat-row"><span>Intro</span><i /><i /><i /><i /><i /><i /><i /></div><div className="heat-row"><span>Story</span><i /><i /><i /><i /><i /><i /><i /></div><div className="heat-row"><span>Interview</span><i /><i /><i /><i /><i /><i /><i /></div><div className="heat-row"><span>Close</span><i /><i /><i /><i /><i /><i /><i /></div></div><div className="heatmap-note"><span>High attention</span><div /><span>Drop-off</span></div></article>
          <article className="bento episode-bento"><div className="bento-label">Episode comparison</div><div className="record-stack"><span>NEW</span><strong>What ambition costs</strong><em>51 min</em></div><div className="record-stack second"><span>TOP</span><strong>The art of staying curious</strong><em>42 min</em></div><p>Find the repeatable choices behind your most magnetic work.</p></article>
          <article className="bento audience-bento"><div className="bento-label">Audience makeup</div><h3>The audience you imagined, finally quantified.</h3><div className="audience-rings"><div className="ring ring-a"><b>62%</b><span>25–34</span></div><div className="ring ring-b"><b>48%</b><span>US</span></div><div className="ring ring-c"><b>71%</b><span>Mobile</span></div></div></article>
          <article className="bento sponsor-bento"><div><div className="bento-label">Sponsor-ready reports</div><h3>Numbers that make a persuasive case.</h3></div><div className="report-sheet"><div /><p>Audience report</p><strong>44,892</strong><span>qualified listens</span><button>Download PDF <ArrowDownRight size={13} /></button></div></article>
        </div>
      </section>

      <section className="story-section" id="insight">
        <div className="story-copy"><p className="eyebrow">The insight layer</p><h2>Analytics that<br />speak human.</h2><p>Axion does more than flag the moment listeners leave. It connects the dots, so every decision has a reason behind it.</p><a href="#waitlist" className="text-link light-link">Meet your co-producer <ArrowRight size={16} /></a></div>
        <div className="story-cards">
          <article className="story-card story-retention"><div className="story-card-top"><span>AXION INSIGHT</span><Sparkle size={17} weight="fill" /></div><h3>Your conversational opening is working.</h3><p>Listeners who reach minute 4 are 23% more likely to finish this episode than your category average.</p><div className="mini-chart"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div></article>
          <article className="story-card story-benchmark"><div className="story-card-top"><span>BENCHMARK</span><span className="up">TOP 12%</span></div><h3>Better than 88% of shows in your category.</h3><div className="benchmark-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i className="you" /></div><div className="benchmark-labels"><span>All shows</span><strong>You</strong><span>Top 1%</span></div></article>
          <article className="story-card story-clip"><div className="story-card-top"><span>RECOMMENDED CLIP</span><span>00:14:12</span></div><div className="clip-art"><div className="clip-circles" /><button aria-label="Play recommended clip"><Play size={20} weight="fill" /></button></div><h3>The question that made everyone stop scrolling.</h3></article>
        </div>
      </section>

      <section className="episode-section"><div className="episode-intro"><p className="eyebrow">Your entire back catalogue, alive</p><h2>Find the story<br />between episodes.</h2></div><div className="episode-table"><div className="table-head"><span>EPISODE</span><span>LENGTH</span><span>RETENTION</span><span>PERFORMANCE</span></div>{episodes.map((episode, index) => <div className="episode-row" key={episode.title}><span className="episode-number">0{index + 1}</span><span className="episode-name">{episode.title}</span><span>{episode.length}</span><span className="retention-score"><i style={{ width: episode.peak }} />{episode.peak}</span><span className="performance">{episode.score}</span><ArrowRight size={18} /></div>)}</div></section>

      <section className="cta-section" id="waitlist"><div className="cta-glow" /><p className="eyebrow">The waitlist is open</p><h2>Make every<br />listen <em>count.</em></h2><p>Join the first wave of podcasters turning audience attention into their unfair advantage.</p><form onSubmit={submitWaitlist} className="waitlist-form">{submitted ? <div className="success"><Check size={18} weight="bold" /> You’re on the list. We’ll be in touch.</div> : <><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@yourshow.com" aria-label="Email address" required /><button type="submit">Join the waitlist <ArrowRight size={17} weight="bold" /></button></>}</form></section>

      <footer><a className="brand" href="#top"><span className="brand-mark"><i /><i /><i /></span>axion</a><p>Podcast intelligence for people who care about the next episode.</p><div><a href="#product">Product</a><a href="#insight">Insights</a><a href="#waitlist">Waitlist</a></div></footer>
    </main>
  );
}

function Metric({ label, value, trend }: { label: string; value: string; trend: string }) { return <div className="metric"><p>{label}</p><strong>{value}</strong><span>{trend}</span></div>; }
function Drop({ time, text, value }: { time: string; text: string; value: string }) { return <div className="drop"><span>{time}</span><p>{text}</p><strong>{value}</strong></div>; }
function ArrowUpRightIcon() { return <span className="arrow-up">↗</span>; }
function RetentionChart() { return <div className="chart-wrap"><svg viewBox="0 0 520 170" fill="none" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#c7ff4a" stopOpacity=".32" /><stop offset="1" stopColor="#c7ff4a" stopOpacity="0" /></linearGradient></defs><path d="M0 30C26 32 39 38 59 43C83 49 95 34 121 50C151 67 164 42 191 63C218 83 242 68 267 91C288 109 318 72 341 103C368 138 386 102 414 121C445 143 473 112 520 150V170H0V30Z" fill="url(#area)" /><path d="M0 30C26 32 39 38 59 43C83 49 95 34 121 50C151 67 164 42 191 63C218 83 242 68 267 91C288 109 318 72 341 103C368 138 386 102 414 121C445 143 473 112 520 150" stroke="#d5ff6b" strokeWidth="3" /><path d="M0 51C80 59 112 67 170 70C245 80 323 98 410 112C467 122 492 126 520 130" stroke="#849080" strokeWidth="2" strokeDasharray="5 5" /></svg><div className="chart-times">{timeline.map(([time]) => <span key={time}>{time}</span>)}</div></div>; }
