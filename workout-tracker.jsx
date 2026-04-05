import { useState } from "react";

const SITE = "https://www.muscleandstrength.com/exercises/";

const program = [
  {
    day: "Day 1 — Upper Body A",
    tag: "WED",
    color: "#E8553A",
    warmup: "Foam Roller грудний відділ 3 хв → Wall Slides 2×10",
    exercises: [
      { name: "Pull Up", url: `${SITE}pull-up`, sets: "3", reps: "6-12", note: null },
      { name: "Dumbbell Bench Press", url: `${SITE}dumbbell-bench-press.html`, sets: "4", reps: "10", note: null },
      { name: "Landmine T-Bar Row", url: `${SITE}landmine-t-bar-row`, sets: "3", reps: "10", note: null },
      { name: "Landmine Press", url: `${SITE}single-arm-landmine-press`, sets: "3", reps: "10", note: "🔄 Замість Standing DB Press — менше стресу на плечовий суглоб і хребет" },
      { name: "Seated Cable Row", url: `${SITE}seated-cable-row.html`, sets: "2", reps: "10", note: null },
      { name: "Dumbbell Lateral Raise", url: `${SITE}dumbbell-lateral-raise.html`, sets: "2", reps: "12", note: null },
      { name: "Barbell Curl", url: `${SITE}standing-barbell-curl.html`, sets: "2", reps: "10", note: null },
      { name: "French Press", url: `${SITE}lying-tricep-extension.html`, sets: "2", reps: "10", note: null },
      { name: "Cable Face Pull", url: `${SITE}cable-face-pull`, sets: "3", reps: "15-20", note: "🔄 Замість Shrug — працює нижня трапеція і зовнішні ротатори" },
    ],
  },
  {
    day: "Day 2 — Lower Body A",
    tag: "THU",
    color: "#2D8F6F",
    warmup: null,
    exercises: [
      { name: "Dumbbell Goblet Squat", url: `${SITE}dumbbell-goblet-squat`, sets: "4", reps: "10", note: null },
      { name: "Banded Nordic Hamstring Curl", url: `${SITE}nordic-hamstring-curl`, sets: "2", reps: "10", note: null },
      { name: "Romanian Deadlift", url: `${SITE}romanian-deadlift.html`, sets: "3", reps: "10", note: null },
      { name: "Leg Press", url: `${SITE}leg-press.html`, sets: "3", reps: "12", note: null },
      { name: "Barbell Hip Thrust", url: `${SITE}barbell-hip-thrust.html`, sets: "2", reps: "10", note: null },
      { name: "Standing Calf Raise", url: `${SITE}standing-machine-calf-raise.html`, sets: "3", reps: "12", note: null },
      { name: "Hanging Leg Raise", url: `${SITE}hanging-leg-raise.html`, sets: "2", reps: "15", note: null },
      { name: "Exercise Ball Crunch", url: `${SITE}exercise-ball-crunch.html`, sets: "2", reps: "15", note: null },
    ],
  },
  {
    day: "Day 3 — Upper Body B",
    tag: "SAT",
    color: "#3A6FD8",
    warmup: "Foam Roller грудний відділ 3 хв → Band Pull-Aparts 2×20",
    exercises: [
      { name: "Lat Pulldown", url: `${SITE}lat-pull-down.html`, sets: "3", reps: "10", note: null },
      { name: "Incline Dumbbell Bench Press", url: `${SITE}incline-dumbbell-bench-press.html`, sets: "3", reps: "10", note: null },
      { name: "One Arm Dumbbell Row", url: `${SITE}one-arm-dumbbell-row.html`, sets: "3", reps: "10", note: "Унілатеральна тяга — вирівнює дисбаланс лівого/правого боку" },
      { name: "Seated Dumbbell Press", url: `${SITE}seated-dumbbell-press.html`, sets: "3", reps: "10", note: "🔄 З опорою спини — безпечніше для хребта при сколіозі" },
      { name: "Machine Fly", url: `${SITE}machine-fly.html`, sets: "2", reps: "12", note: null },
      { name: "Cable Rope Curl", url: `${SITE}cable-rope-hammer-curl`, sets: "2", reps: "10", note: null },
      { name: "Cable Tricep Pushdown", url: `${SITE}tricep-rope-pushdown.html`, sets: "2", reps: "10", note: null },
      { name: "Cable Face Pull", url: `${SITE}cable-face-pull`, sets: "3", reps: "15-20", note: "⚡ Обов'язково кожен upper day — ключова вправа для твоєї лопатки" },
      { name: "Reverse Dumbbell Curl", url: `${SITE}standing-dumbbell-reverse-curl.html`, sets: "2", reps: "10", note: null },
    ],
  },
  {
    day: "Day 4 — Lower Body B",
    tag: "SUN",
    color: "#8B5CF6",
    warmup: null,
    exercises: [
      { name: "Trap Bar Deadlift", url: `${SITE}trap-bar-deadlift`, sets: "4", reps: "10", note: "🔄 Замість Sumo Deadlift — симетричніше навантаження при сколіозі" },
      { name: "Front Squat", url: `${SITE}front-squat.html`, sets: "3", reps: "10", note: "✅ Вертикальний корпус — менше навантаження на поперек" },
      { name: "Exercise Ball Leg Curl", url: `${SITE}exercise-ball-leg-curl.html`, sets: "3", reps: "10", note: null },
      { name: "Leg Extension", url: `${SITE}leg-extension.html`, sets: "3", reps: "10", note: null },
      { name: "Hyperextension (Glute Focus)", url: `${SITE}hyperextension.html`, sets: "2", reps: "12", note: null },
      { name: "Bulgarian Split Squat", url: `${SITE}dumbbell-bulgarian-split-squat`, sets: "2", reps: "10", note: null },
      { name: "Seated Calf Raise", url: `${SITE}seated-calf-raise.html`, sets: "2", reps: "15", note: null },
      { name: "Plank", url: `${SITE}front-plank.html`, sets: "3", reps: "30s", note: null },
    ],
  },
];

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function WorkoutTracker() {
  const [checked, setChecked] = useState({});
  const [expanded, setExpanded] = useState({ 0: true, 1: false, 2: false, 3: false });

  const toggleSet = (dayIdx, exIdx, setIdx) => {
    const key = `${dayIdx}-${exIdx}-${setIdx}`;
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetAll = () => setChecked({});

  const toggleDay = (idx) => {
    setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const totalSets = program.reduce((s, d) => s + d.exercises.reduce((s2, ex) => s2 + parseInt(ex.sets), 0), 0);
  const totalChecked = Object.values(checked).filter(Boolean).length;

  const getDayProgress = (dayIdx) => {
    const day = program[dayIdx];
    let done = 0, total = 0;
    day.exercises.forEach((ex, exIdx) => {
      const sets = parseInt(ex.sets);
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
        .wt-sub {
          font-size: 12px;
          color: var(--text-secondary, #8a8780);
          letter-spacing: 0.5px;
          text-transform: uppercase;
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
        .wt-sets-label {
          font-size: 11px;
          color: var(--text-secondary, #8a8780);
          margin-left: 4px;
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
        <h1 className="wt-title">Advanced Upper / Lower</h1>
        <div className="wt-sub">M&S Program · Adapted for Scoliosis</div>
        <div className="wt-stats">
          <div className="wt-progress-bar">
            <div className="wt-progress-fill" style={{ width: `${totalSets ? (totalChecked / totalSets) * 100 : 0}%` }} />
          </div>
          <div className="wt-progress-text">{totalChecked}/{totalSets}</div>
          <button className="wt-reset" onClick={resetAll}>Reset</button>
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
                    {day.warmup}
                  </div>
                )}
                {day.exercises.map((ex, exIdx) => {
                  const sets = parseInt(ex.sets);
                  const doneSets = getExerciseDone(dayIdx, exIdx, sets);
                  const allDone = doneSets === sets;
                  return (
                    <div className={`wt-row ${allDone ? "done" : ""}`} key={exIdx}>
                      <div className="wt-info">
                        <div className="wt-name">
                          <a href={ex.url} target="_blank" rel="noopener noreferrer">{ex.name}</a>
                          <span className="wt-reps-label">× {ex.reps}</span>
                        </div>
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
                          <span className="wt-sets-label">{doneSets}/{sets}</span>
                        </div>
                        {ex.note && <div className="wt-note">{ex.note}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      <div className="wt-footer">
        <div className="wt-footer-title">⚠️ Ключові правила</div>
        <div className="wt-footer-text">
          • Face Pulls — кожен upper day, без виключень<br />
          • Жими над головою — тільки Landmine або Seated з опорою<br />
          • Якщо плече болить при вправі — зупинись і заміни<br />
          • Тяги : Жими = мінімум 2:1<br />
          • Ніяких Shrugs / Upright Rows — верхня трапеція і так перевантажена
        </div>
      </div>
    </div>
  );
}
