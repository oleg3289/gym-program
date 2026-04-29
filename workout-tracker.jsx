import { useState, useEffect } from "react";

const STORAGE_KEY = "gym-program-state";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveState(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

const SITE = "https://www.muscleandstrength.com/exercises/";

const program = [
  {
    day: "Day 1 — Upper Body A",
    tag: "WED",
    color: "#E8553A",
    warmup: "Foam Roller грудний відділ 3 хв → Wall Slides 2×10",
    exercises: [
      { name: "Pull Up", url: `${SITE}pull-up`, sets: "3", reps: "6-12", note: null, weight: null },
      { name: "Dumbbell Bench Press", url: `${SITE}dumbbell-bench-press.html`, sets: "4", reps: "10", note: null, weight: [12, 16, 22, "кг/гант"] },
      { name: "Chest Press Machine", url: `${SITE}hammer-strength-bench-press.html`, sets: "3", reps: "10", note: "🆕 Додатковий жим — можна йти до відмови без спотера", weight: [25, 40, 55, "кг"] },
      { name: "Chest Supported DB Row", url: `${SITE}chest-supported-dumbbell-row`, sets: "3", reps: "10", note: "🔄 Замість Landmine T-Bar Row — chest support прибирає навантаження з хребта", weight: [10, 14, 20, "кг/гант"] },
      { name: "Single Arm Cable Lateral Raise", url: `${SITE}one-arm-cable-lateral-raise.html`, sets: "3", reps: "10", note: "🔄 Замість Landmine Press — ізоляція бічної дельти, безпечніше для плеча", weight: [4, 7, 10, "кг"] },
      { name: "Seated Cable Row", url: `${SITE}seated-row.html`, sets: "2", reps: "10", note: null, weight: [25, 35, 50, "кг"] },
      { name: "Seated Dumbbell Press", url: `${SITE}seated-dumbbell-press.html`, sets: "2", reps: "10", note: "⚡ З опорою спини — зберігає жимовий паттерн без ризику для плеча", weight: [8, 12, 16, "кг/гант"] },
      { name: "Preacher Curl", url: `${SITE}preacher-curl.html`, sets: "2", reps: "10", note: "🔄 Замість Barbell Curl — лікті зафіксовані, чиста ізоляція біцепса, симетрія для сколіозу", weight: [12, 18, 25, "кг"] },
      { name: "French Press", url: `${SITE}lying-tricep-extension.html`, sets: "2", reps: "10", note: null, weight: [12, 18, 25, "кг"] },
      { name: "Cable Face Pull", url: `${SITE}cable-face-pull`, sets: "3", reps: "15-20", note: "🔄 Замість Shrug — працює нижня трапеція і зовнішні ротатори", weight: [10, 15, 22, "кг"] },
      { name: "Pallof Press", url: `${SITE}pallof-press`, sets: "3", reps: "10", note: "⚡ Антиротація — стабілізація хребта при сколіозі", weight: [8, 12, 18, "кг"] },
      { name: "Cable Crunch", url: `${SITE}cable-crunch.html`, sets: "4", reps: "10", note: null, weight: [20, 30, 45, "кг"] },
    ],
  },
  {
    day: "Day 2 — Lower Body A",
    tag: "THU",
    color: "#2D8F6F",
    warmup: "Glute Bridge 2×10 → Cat-Cow 1 хв",
    exercises: [
      { name: "Leg Extension", url: `${SITE}leg-extension.html`, sets: "3", reps: "10", note: "🔄 Замість Goblet Squat — без осьового навантаження на хребет", weight: [20, 30, 45, "кг"] },
      { name: "Resistance Band Leg Curl", url: `${SITE}leg-curl.html`, sets: "2", reps: "10", note: "🔄 Замість Nordic Curl — лежачи з гумкою, без навантаження на поперек", weight: null },
      { name: "Seated Leg Curl", url: `${SITE}seated-leg-curl`, sets: "3", reps: "10", note: "🔄 Замість Romanian Deadlift — ізоляція задньої поверхні без навантаження на спину", weight: [20, 30, 45, "кг"] },
      { name: "Leg Press", url: `${SITE}45-degree-leg-press.html`, sets: "3", reps: "12", note: null, weight: [25, 50, 80, "кг"] },
      { name: "Hip Thrust Machine", url: `${SITE}barbell-hip-thrust`, sets: "2", reps: "10", note: "🔄 Замість Barbell Hip Thrust — без штанги через таз, фіксована траєкторія, безпечніше", weight: [25, 50, 80, "кг"] },
      { name: "Standing Calf Raise", url: `${SITE}standing-machine-calf-raise`, sets: "3", reps: "12", note: null, weight: [30, 50, 70, "кг"] },
      { name: "Machine Ab Crunch", url: `${SITE}weighted-crunch.html`, sets: "3", reps: "10-15", note: "🔄 Замість bodyweight Ab Crunch — селекторна машина, прогресивна вага", weight: [15, 25, 40, "кг"] },
      { name: "Hip Abduction Machine", url: `${SITE}hip-abduction-machine.html`, sets: "3", reps: "12", note: "⚡ Gluteus medius — ключовий м'яз для корекції APT", weight: [20, 30, 45, "кг"] },
      { name: "Hip Adductor Machine", url: `${SITE}hip-adduction-machine.html`, sets: "3", reps: "12", note: "⚡ Пара до Hip Abduction — баланс зовнішня/внутрішня сторона стегна", weight: [20, 30, 45, "кг"] },
    ],
    cooldown: [
      { name: "Kneeling Hip Flexor Stretch", url: "https://www.youtube.com/watch?v=Y7gvRhnV3iM&t=195", sets: "2", reps: "45-60s" },
      { name: "Child Pose Stretch", url: "https://www.youtube.com/watch?v=Y7gvRhnV3iM&t=195", sets: "2", reps: "45-60s" },
      { name: "Double Knee Chest Stretch", url: "https://www.youtube.com/watch?v=Y7gvRhnV3iM&t=195", sets: "2", reps: "45-60s" },
    ],
  },
  {
    day: "Day 3 — Upper Body B",
    tag: "SAT",
    color: "#3A6FD8",
    warmup: "Foam Roller грудний відділ 3 хв → Band Pull-Aparts 2×20",
    exercises: [
      { name: "Lat Pulldown", url: `${SITE}lat-pull-down.html`, sets: "3", reps: "10", note: null, weight: [30, 40, 55, "кг"] },
      { name: "Incline Dumbbell Bench Press", url: `${SITE}incline-dumbbell-bench-press.html`, sets: "3", reps: "10", note: null, weight: [10, 14, 20, "кг/гант"] },
      { name: "One Arm Dumbbell Row", url: `${SITE}one-arm-dumbbell-row.html`, sets: "3", reps: "10", note: "Унілатеральна тяга — вирівнює дисбаланс лівого/правого боку", weight: [12, 16, 22, "кг"] },
      { name: "Seated Dumbbell Press", url: `${SITE}seated-dumbbell-press.html`, sets: "3", reps: "10", note: "🔄 З опорою спини — безпечніше для хребта при сколіозі", weight: [8, 12, 16, "кг/гант"] },
      { name: "Cable Crossover", url: `${SITE}cable-crossovers.html`, sets: "3", reps: "12", note: "🔄 Замість Machine Fly — кращий ROM, можна міняти кути (high-to-low / mid)", weight: [10, 15, 22, "кг"] },
      { name: "Cable Rope Curl", url: `${SITE}rope-cable-curl.html`, sets: "2", reps: "10", note: null, weight: [10, 15, 22, "кг"] },
      { name: "Hammer Curl", url: `${SITE}standing-hammer-curl.html`, sets: "3", reps: "10", note: "🆕 Нейтральний хват — біцепс + brachialis (товщина руки)", weight: [8, 12, 16, "кг/гант"] },
      { name: "Cable Tricep Pushdown", url: `${SITE}rope-tricep-extension.html`, sets: "2", reps: "10", note: null, weight: [15, 22, 32, "кг"] },
      { name: "Cable Face Pull", url: `${SITE}cable-face-pull`, sets: "3", reps: "15-20", note: "⚡ Обов'язково кожен upper day — ключова вправа для твоєї лопатки", weight: [10, 15, 22, "кг"] },
      { name: "Reverse Pec Deck", url: `${SITE}machine-reverse-fly`, sets: "3", reps: "12-15", note: "🔄 Замість Reverse DB Curl — прямі задні дельти, критично для постави при сколіозі", weight: [15, 25, 40, "кг"] },
      { name: "Pallof Press", url: `${SITE}pallof-press`, sets: "3", reps: "10", note: "⚡ Антиротація — стабілізація хребта при сколіозі", weight: [8, 12, 18, "кг"] },
      { name: "Cable Crunch", url: `${SITE}cable-crunch.html`, sets: "4", reps: "10", note: null, weight: [20, 30, 45, "кг"] },
    ],
  },
  {
    day: "Day 4 — Lower Body B",
    tag: "SUN",
    color: "#8B5CF6",
    warmup: "Glute Bridge 2×10 → Cat-Cow 1 хв",
    exercises: [
      { name: "Hack Squat", url: `${SITE}hack-squat.html`, sets: "3", reps: "10", note: "🔄 Замість Trap Bar Deadlift — підтримка спини, без осьового навантаження", weight: [20, 40, 60, "кг"] },
      { name: "Seated Leg Curl", url: `${SITE}seated-leg-curl`, sets: "3", reps: "10", note: null, weight: [20, 30, 45, "кг"] },
      { name: "Leg Extension", url: `${SITE}leg-extension.html`, sets: "2", reps: "10", note: null, weight: [20, 30, 45, "кг"] },
      { name: "Cable Kickback", url: `${SITE}glute-kick-back.html`, sets: "2", reps: "12", note: "🔄 Замість Hyperextension — ізоляція сідниць без навантаження на поперек", weight: [8, 12, 18, "кг"] },
      { name: "Bulgarian Split Squat", url: `${SITE}one-leg-dumbbell-squat-aka-bulgarian-squat.html`, sets: "2", reps: "10", note: "⚠️ Не грузити максимум — вправа сама по собі брутальна, обережно з вагою", weight: [6, 10, 14, "кг/гант"] },
      { name: "Leg Press Calf Raise", url: `${SITE}45-degress-calf-press.html`, sets: "2", reps: "15", note: null, weight: [30, 50, 80, "кг"] },
      { name: "Plank", url: `${SITE}hover.html`, sets: "3", reps: "30s", note: null, weight: null },
      { name: "Hip Abduction Machine", url: `${SITE}hip-abduction-machine.html`, sets: "3", reps: "12", note: "⚡ Gluteus medius — ключовий м'яз для корекції APT", weight: [20, 30, 45, "кг"] },
    ],
    cooldown: [
      { name: "Kneeling Hip Flexor Stretch", url: "https://www.youtube.com/watch?v=Y7gvRhnV3iM&t=195", sets: "2", reps: "45-60s" },
      { name: "Child Pose Stretch", url: "https://www.youtube.com/watch?v=Y7gvRhnV3iM&t=195", sets: "2", reps: "45-60s" },
      { name: "Double Knee Chest Stretch", url: "https://www.youtube.com/watch?v=Y7gvRhnV3iM&t=195", sets: "2", reps: "45-60s" },
    ],
  },
];

const PROGRAM_URL = "https://www.muscleandstrength.com/workouts/4-day-advanced-upper-lower-workout-program-to-build-mass";

const TERM_LINKS = {
  "Foam Roller": `${SITE}thoracic-extension-on-foam-roller`,
  "Wall Slides": `${SITE}scapular-wall-slide`,
  "Standing DB Press": `${SITE}standing-dumbbell-press.html`,
  "Shrug": `${SITE}barbell-shrug.html`,
  "Shrugs": `${SITE}barbell-shrug.html`,
  "Band Pull-Aparts": `${SITE}band-pull-apart`,
  "Унілатеральна тяга": `https://en.wikipedia.org/wiki/Unilateral_training`,
  "Sumo Deadlift": `${SITE}sumo-deadlift`,
  "Face Pulls": `${SITE}cable-face-pull`,
  "Landmine": `${SITE}single-arm-landmine-press`,
  "Seated": `${SITE}seated-dumbbell-press.html`,
  "мінімум 2:1": `https://missionmvmt.com/push-pull-ratio-prevents-shoulder-injuries/`,
  "Upright Rows": `${SITE}upright-row.html`,
  "Glute Bridge": `${SITE}bodyweight-glute-bridge`,
  "Cat-Cow": `https://www.healthline.com/health/cat-cow-stretch`,
};

function linkify(text) {
  const terms = Object.keys(TERM_LINKS).sort((a, b) => b.length - a.length);
  const parts = [];
  let remaining = text;
  let keyIdx = 0;

  while (remaining) {
    let earliestIdx = Infinity;
    let matchedTerm = null;

    for (const term of terms) {
      const idx = remaining.indexOf(term);
      if (idx !== -1 && idx < earliestIdx) {
        earliestIdx = idx;
        matchedTerm = term;
      }
    }

    if (matchedTerm === null) {
      parts.push(remaining);
      break;
    }

    if (earliestIdx > 0) parts.push(remaining.slice(0, earliestIdx));
    parts.push(
      <a key={keyIdx++} href={TERM_LINKS[matchedTerm]} target="_blank" rel="noopener noreferrer" className="wt-term-link">{matchedTerm}</a>
    );
    remaining = remaining.slice(earliestIdx + matchedTerm.length);
  }

  return parts;
}

const TOTAL_WEEKS = 12;

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function WorkoutTracker() {
  const saved = loadState();
  const [checked, setChecked] = useState(saved?.checked ?? {});
  const [expanded, setExpanded] = useState({ 0: true, 1: false, 2: false, 3: false });
  const [week, setWeek] = useState(saved?.week ?? 1);
  const [extraSets, setExtraSets] = useState(saved?.extraSets ?? {});
  const [userWeights, setUserWeights] = useState(saved?.userWeights ?? {});
  const [plankTime, setPlankTime] = useState(30);
  const [plankRunning, setPlankRunning] = useState(false);

  useEffect(() => {
    saveState({ checked, week, extraSets, userWeights });
  }, [checked, week, extraSets, userWeights]);

  useEffect(() => {
    if (!plankRunning) return;
    if (plankTime <= 0) { setPlankRunning(false); return; }
    const id = setInterval(() => setPlankTime((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [plankRunning, plankTime]);

  const togglePlank = () => {
    if (plankTime <= 0) { setPlankTime(30); setPlankRunning(true); }
    else setPlankRunning((r) => !r);
  };
  const resetPlank = () => { setPlankRunning(false); setPlankTime(30); };

  const toggleSet = (dayIdx, exIdx, setIdx) => {
    const key = `${dayIdx}-${exIdx}-${setIdx}`;
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetAll = () => {
    setChecked({});
    setExtraSets({});
    setWeek((prev) => Math.min(prev + 1, TOTAL_WEEKS));
  };

  const toggleDay = (idx) => {
    setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const getEffectiveSets = (dayIdx, exIdx, baseSets) => {
    return baseSets + (extraSets[`${dayIdx}-${exIdx}`] || 0);
  };

  const addSet = (dayIdx, exIdx) => {
    const key = `${dayIdx}-${exIdx}`;
    setExtraSets((prev) => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
  };

  const removeSet = (dayIdx, exIdx, baseSets) => {
    const key = `${dayIdx}-${exIdx}`;
    const current = baseSets + (extraSets[key] || 0);
    if (current <= 1) return;
    const removedIdx = current - 1;
    setChecked((prev) => { const next = { ...prev }; delete next[`${dayIdx}-${exIdx}-${removedIdx}`]; return next; });
    setExtraSets((prev) => ({ ...prev, [key]: (prev[key] || 0) - 1 }));
  };

  const totalSets = program.reduce((s, d, dIdx) =>
    s + d.exercises.reduce((s2, ex, eIdx) => s2 + getEffectiveSets(dIdx, eIdx, parseInt(ex.sets)), 0), 0);
  const totalChecked = Object.values(checked).filter(Boolean).length;

  const getDayProgress = (dayIdx) => {
    const day = program[dayIdx];
    let done = 0, total = 0;
    day.exercises.forEach((ex, exIdx) => {
      const sets = getEffectiveSets(dayIdx, exIdx, parseInt(ex.sets));
      total += sets;
      for (let s = 0; s < sets; s++) {
        if (checked[`${dayIdx}-${exIdx}-${s}`]) done++;
      }
    });
    return { done, total };
  };

  const getExerciseDone = (dayIdx, exIdx, sets) => {
    let done = 0;
    for (let s = 0; s < sets; s++) {
      if (checked[`${dayIdx}-${exIdx}-${s}`]) done++;
    }
    return done;
  };

  return (
    <div style={{
      fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
      maxWidth: 720,
      margin: "0 auto",
      padding: "24px 16px",
      color: "var(--text, #e2e0dc)",
      background: "transparent",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        .wt-header { 
          margin-bottom: 28px; 
          border-bottom: 2px solid rgba(255,255,255,0.08);
          padding-bottom: 20px;
        }
        .wt-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.5px;
          color: var(--text, #e2e0dc);
          margin: 0 0 4px;
        }
        .wt-title-link {
          color: inherit;
          text-decoration: none;
          border-bottom: 1px dotted rgba(255,255,255,0.2);
          transition: all 0.15s;
        }
        .wt-title-link:hover {
          color: #5BA3F5;
          border-bottom-color: #5BA3F5;
        }
        .wt-sub {
          font-size: 12px;
          color: var(--text-secondary, #8a8780);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .wt-week-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 12px;
        }
        .wt-week-label {
          font-size: 12px;
          font-weight: 700;
          color: #3A6FD8;
          min-width: 80px;
        }
        .wt-week-dots {
          display: flex;
          gap: 4px;
          flex: 1;
        }
        .wt-week-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          flex: 1;
          max-width: 20px;
          border-radius: 3px;
          transition: all 0.3s;
        }
        .wt-week-dot.filled {
          background: rgba(58, 111, 216, 0.4);
        }
        .wt-week-dot.current {
          background: #3A6FD8;
          box-shadow: 0 0 6px rgba(58, 111, 216, 0.5);
        }
        .wt-stats {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 14px;
        }
        .wt-progress-bar {
          flex: 1;
          height: 6px;
          background: rgba(255,255,255,0.06);
          border-radius: 3px;
          overflow: hidden;
        }
        .wt-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #2D8F6F, #3A6FD8);
          border-radius: 3px;
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .wt-progress-text {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary, #8a8780);
          min-width: 50px;
          text-align: right;
        }
        .wt-reset {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          background: rgba(232, 85, 58, 0.1);
          color: #E8553A;
          border: 1px solid rgba(232, 85, 58, 0.25);
          border-radius: 6px;
          padding: 8px 16px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .wt-reset:hover {
          background: rgba(232, 85, 58, 0.2);
          border-color: rgba(232, 85, 58, 0.5);
        }

        .wt-day {
          margin-bottom: 12px;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .wt-day:hover {
          border-color: rgba(255,255,255,0.12);
        }
        .wt-day-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          cursor: pointer;
          user-select: none;
          background: rgba(255,255,255,0.02);
        }
        .wt-day-tag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          padding: 3px 8px;
          border-radius: 4px;
          color: #fff;
        }
        .wt-day-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 600;
          flex: 1;
          color: var(--text, #e2e0dc);
        }
        .wt-day-count {
          font-size: 12px;
          color: var(--text-secondary, #8a8780);
        }
        .wt-day-chevron {
          font-size: 14px;
          color: var(--text-secondary, #8a8780);
          transition: transform 0.2s;
        }
        .wt-day-chevron.open { transform: rotate(90deg); }

        .wt-warmup {
          margin: 0 16px 12px;
          padding: 10px 14px;
          background: rgba(255, 180, 50, 0.06);
          border: 1px dashed rgba(255, 180, 50, 0.2);
          border-radius: 8px;
          font-size: 12px;
          color: #d4a54a;
          line-height: 1.5;
        }
        .wt-warmup-label {
          font-weight: 700;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 4px;
          color: #c49538;
        }

        .wt-table {
          width: 100%;
          border-collapse: collapse;
        }
        .wt-row {
          display: flex;
          align-items: flex-start;
          padding: 10px 16px;
          gap: 10px;
          transition: background 0.15s;
          border-top: 1px solid rgba(255,255,255,0.03);
        }
        .wt-row:hover { background: rgba(255,255,255,0.02); }
        .wt-row.done { opacity: 0.45; }

        .wt-info { flex: 1; min-width: 0; }
        .wt-name {
          display: flex;
          align-items: baseline;
          gap: 8px;
          flex-wrap: wrap;
        }
        .wt-name a {
          font-size: 13px;
          font-weight: 600;
          color: var(--text, #e2e0dc);
          text-decoration: none;
          border-bottom: 1px dotted rgba(255,255,255,0.2);
          transition: all 0.15s;
        }
        .wt-name a:hover {
          color: #5BA3F5;
          border-bottom-color: #5BA3F5;
        }
        .wt-reps-label {
          font-size: 12px;
          color: var(--text-secondary, #8a8780);
        }
        .wt-sets-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 6px;
        }
        .wt-set-btn {
          width: 28px;
          height: 28px;
          min-width: 28px;
          border-radius: 6px;
          border: 2px solid rgba(255,255,255,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 11px;
          font-weight: 700;
          color: var(--text-secondary, #8a8780);
          background: rgba(255,255,255,0.03);
          user-select: none;
        }
        .wt-set-btn:hover {
          border-color: rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.06);
        }
        .wt-set-btn.active {
          background: #2D8F6F;
          border-color: #2D8F6F;
          color: #fff;
        }
        .wt-remove-set {
          width: 28px;
          height: 28px;
          min-width: 28px;
          border-radius: 6px;
          border: 2px dashed rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
          font-weight: 700;
          color: var(--text-secondary, #8a8780);
          background: transparent;
          user-select: none;
        }
        .wt-remove-set:hover {
          border-color: #E8553A;
          color: #E8553A;
          background: rgba(232, 85, 58, 0.08);
        }
        .wt-add-set {
          width: 28px;
          height: 28px;
          min-width: 28px;
          border-radius: 6px;
          border: 2px dashed rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
          font-weight: 700;
          color: var(--text-secondary, #8a8780);
          background: transparent;
          user-select: none;
        }
        .wt-add-set:hover {
          border-color: #3A6FD8;
          color: #3A6FD8;
          background: rgba(58, 111, 216, 0.08);
        }
        .wt-sets-label {
          font-size: 11px;
          color: var(--text-secondary, #8a8780);
          margin-left: 4px;
        }
        .wt-term-link {
          color: #5BA3F5;
          text-decoration: none;
          border-bottom: 1px dotted rgba(91, 163, 245, 0.3);
          transition: all 0.15s;
        }
        .wt-term-link:hover {
          color: #7db8f7;
          border-bottom-color: #7db8f7;
        }
        .wt-weight-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 4px;
          font-size: 11px;
        }
        .wt-weight-hint {
          color: var(--text-secondary, #8a8780);
          white-space: nowrap;
        }
        .wt-w-start { color: #2D8F6F; font-weight: 600; }
        .wt-w-mid { color: #d4a54a; font-weight: 600; }
        .wt-w-max { color: #E8553A; font-weight: 600; }
        .wt-w-sep { color: rgba(255,255,255,0.15); }
        .wt-w-unit { color: var(--text-secondary, #8a8780); font-size: 10px; }
        .wt-weight-input-wrap {
          display: flex;
          align-items: center;
          gap: 3px;
          margin-left: auto;
        }
        .wt-weight-input {
          width: 40px;
          padding: 2px 4px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px;
          color: var(--text, #e2e0dc);
          font-family: inherit;
          font-size: 11px;
          text-align: center;
          outline: none;
          transition: border-color 0.2s;
        }
        .wt-weight-input:focus {
          border-color: #3A6FD8;
        }
        .wt-weight-input::placeholder {
          color: rgba(255,255,255,0.15);
        }
        .wt-note {
          font-size: 11px;
          color: #d4a54a;
          margin-top: 6px;
          line-height: 1.4;
          padding: 4px 8px;
          background: rgba(255, 180, 50, 0.05);
          border-radius: 4px;
        }

        .wt-plank-timer {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
          padding: 7px 10px;
          background: rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 7px;
        }
        .wt-plank-time {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 1px;
          color: #c4b5fd;
          min-width: 42px;
        }
        .wt-plank-time.done { color: #2D8F6F; }
        .wt-plank-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 5px;
          border: 1px solid rgba(139, 92, 246, 0.4);
          background: rgba(139, 92, 246, 0.15);
          color: #c4b5fd;
          cursor: pointer;
          transition: all 0.2s;
        }
        .wt-plank-btn:hover {
          background: rgba(139, 92, 246, 0.3);
          border-color: rgba(139, 92, 246, 0.7);
        }
        .wt-plank-btn.running {
          background: rgba(232, 85, 58, 0.12);
          border-color: rgba(232, 85, 58, 0.4);
          color: #fca99a;
        }
        .wt-plank-btn.running:hover {
          background: rgba(232, 85, 58, 0.25);
        }
        .wt-plank-reset {
          font-size: 14px;
          background: none;
          border: none;
          color: rgba(255,255,255,0.2);
          cursor: pointer;
          padding: 2px 4px;
          transition: color 0.2s;
          line-height: 1;
        }
        .wt-plank-reset:hover { color: rgba(255,255,255,0.5); }

        .wt-cooldown-header {
          margin: 12px 16px 4px;
          padding: 8px 14px;
          background: rgba(100, 180, 255, 0.06);
          border: 1px dashed rgba(100, 180, 255, 0.2);
          border-radius: 8px;
        }
        .wt-cooldown-label {
          font-weight: 700;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #6bb8f0;
        }
        .wt-cooldown-row {
          opacity: 0.85;
        }
        .wt-meta-cooldown {
          font-size: 12px;
          color: var(--text-secondary, #8a8780);
          margin-top: 2px;
        }

        .wt-footer {
          margin-top: 20px;
          padding: 16px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
        }
        .wt-footer-title {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #E8553A;
          margin-bottom: 8px;
        }
        .wt-footer-text {
          font-size: 12px;
          color: var(--text-secondary, #8a8780);
          line-height: 1.6;
        }
      `}</style>

      <div className="wt-header">
        <h1 className="wt-title">
          <a href={PROGRAM_URL} target="_blank" rel="noopener noreferrer" className="wt-title-link">Advanced Upper / Lower</a>
        </h1>
        <div className="wt-sub">M&S Program · Adapted for Scoliosis</div>
        <div className="wt-week-bar">
          <span className="wt-week-label">Week {week}/{TOTAL_WEEKS}</span>
          <div className="wt-week-dots">
            {Array.from({ length: TOTAL_WEEKS }, (_, i) => (
              <div key={i} className={`wt-week-dot ${i < week ? "filled" : ""} ${i === week - 1 ? "current" : ""}`} />
            ))}
          </div>
        </div>
        <div className="wt-stats">
          <div className="wt-progress-bar">
            <div className="wt-progress-fill" style={{ width: `${totalSets ? (totalChecked / totalSets) * 100 : 0}%` }} />
          </div>
          <div className="wt-progress-text">{totalChecked}/{totalSets}</div>
          <button className="wt-reset" onClick={resetAll}>Reset · Week {week < TOTAL_WEEKS ? week + 1 : week}</button>
        </div>
      </div>

      {program.map((day, dayIdx) => {
        const { done, total } = getDayProgress(dayIdx);
        const isOpen = expanded[dayIdx];
        return (
          <div className="wt-day" key={dayIdx}>
            <div className="wt-day-header" onClick={() => toggleDay(dayIdx)}>
              <span className="wt-day-tag" style={{ background: day.color }}>{day.tag}</span>
              <span className="wt-day-name">{day.day}</span>
              <span className="wt-day-count">{done}/{total}</span>
              <span className={`wt-day-chevron ${isOpen ? "open" : ""}`}>▶</span>
            </div>
            {isOpen && (
              <div style={{ paddingBottom: 8 }}>
                {day.warmup && (
                  <div className="wt-warmup">
                    <div className="wt-warmup-label">🔥 Розминка перед тренуванням</div>
                    {linkify(day.warmup)}
                  </div>
                )}
                {day.exercises.map((ex, exIdx) => {
                  const sets = getEffectiveSets(dayIdx, exIdx, parseInt(ex.sets));
                  const doneSets = getExerciseDone(dayIdx, exIdx, sets);
                  const allDone = doneSets === sets;
                  return (
                    <div className={`wt-row ${allDone ? "done" : ""}`} key={exIdx}>
                      <div className="wt-info">
                        <div className="wt-name">
                          <a href={ex.url} target="_blank" rel="noopener noreferrer">{ex.name}</a>
                          <span className="wt-reps-label">× {ex.reps}</span>
                        </div>
                        {ex.weight && (
                          <div className="wt-weight-row">
                            <div className="wt-weight-hint">
                              <span className="wt-w-start">{ex.weight[0]}</span>
                              <span className="wt-w-sep"> · </span>
                              <span className="wt-w-mid">{ex.weight[1]}</span>
                              <span className="wt-w-sep"> · </span>
                              <span className="wt-w-max">{ex.weight[2]}</span>
                              <span className="wt-w-unit"> {ex.weight[3]}</span>
                            </div>
                            <div className="wt-weight-input-wrap">
                              <input
                                className="wt-weight-input"
                                type="text"
                                inputMode="decimal"
                                placeholder="—"
                                value={userWeights[ex.name] || ""}
                                onChange={(e) => setUserWeights((prev) => ({ ...prev, [ex.name]: e.target.value }))}
                              />
                              <span className="wt-w-unit">{ex.weight[3]}</span>
                            </div>
                          </div>
                        )}
                        <div className="wt-sets-row">
                          {Array.from({ length: sets }, (_, setIdx) => {
                            const isSetDone = !!checked[`${dayIdx}-${exIdx}-${setIdx}`];
                            return (
                              <div
                                key={setIdx}
                                className={`wt-set-btn ${isSetDone ? "active" : ""}`}
                                onClick={() => toggleSet(dayIdx, exIdx, setIdx)}
                              >
                                {isSetDone ? <CheckIcon /> : setIdx + 1}
                              </div>
                            );
                          })}
                          {sets > 1 && <div className="wt-remove-set" onClick={() => removeSet(dayIdx, exIdx, parseInt(ex.sets))}>−</div>}
                          <div className="wt-add-set" onClick={() => addSet(dayIdx, exIdx)}>+</div>
                          <span className="wt-sets-label">{doneSets}/{sets}</span>
                        </div>
                        {ex.note && <div className="wt-note">{linkify(ex.note)}</div>}
                        {ex.name === "Plank" && (
                          <div className="wt-plank-timer">
                            <span className={`wt-plank-time ${plankTime <= 0 ? "done" : ""}`}>
                              {plankTime <= 0 ? "✓" : `${plankTime}s`}
                            </span>
                            <button className={`wt-plank-btn ${plankRunning ? "running" : ""}`} onClick={togglePlank}>
                              {plankRunning ? "Stop" : plankTime <= 0 ? "Again" : "Start"}
                            </button>
                            {(plankTime < 30 || plankRunning) && (
                              <button className="wt-plank-reset" onClick={resetPlank} title="Reset">↺</button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                {day.cooldown && (
                  <>
                    <div className="wt-cooldown-header">
                      <div className="wt-cooldown-label">🧊 Cooldown — APT Correction</div>
                    </div>
                    {day.cooldown.map((ex, cIdx) => (
                      <div className="wt-row wt-cooldown-row" key={`cd-${cIdx}`}>
                        <div className="wt-info">
                          <div className="wt-name">
                            <a href={ex.url} target="_blank" rel="noopener noreferrer">{ex.name}</a>
                            <span className="wt-reps-label">× {ex.reps}</span>
                          </div>
                          <div className="wt-meta-cooldown">{ex.sets} sets</div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}

      <div className="wt-footer">
        <div className="wt-footer-title">⚠️ Ключові правила</div>
        <div className="wt-footer-text">
          • {linkify("Face Pulls")} — кожен upper day, без виключень<br />
          • Жими над головою — тільки {linkify("Landmine")} або {linkify("Seated")} з опорою<br />
          • Якщо плече болить при вправі — зупинись і заміни<br />
          • Тяги : Жими = {linkify("мінімум 2:1")}<br />
          • Ніяких {linkify("Shrugs")} / {linkify("Upright Rows")} — верхня трапеція і так перевантажена
        </div>
      </div>
    </div>
  );
}
