// Workout Data Structure
const workoutProgram = {
  warmup: [
    { name: "Jumping jacks", duration: 30, type: "timed" },
    { name: "Arm circles (each direction)", reps: 10, type: "reps" },
    { name: "Hip circles", reps: 10, type: "reps" },
    { name: "Leg swings per leg", reps: 10, type: "reps" },
    { name: "Slow push-ups", reps: 10, type: "reps" },
    { name: "Bodyweight squats (3 sec down)", reps: 10, type: "reps" },
    { name: "Plank", duration: 20, type: "timed" },
  ],

  phase1: {
    name: "Phase 1: Base Building",
    weeks: [1, 2, 3, 4],
    description: "Build foundation - Focus on form and control",
    days: {
      1: {
        name: "Heavy Push (Chest, Shoulders, Triceps)",
        exercises: [
          {
            name: "Decline Push-ups (feet on bed)",
            sets: 4,
            reps: "8-12",
            rest: 90,
            note: "3 sec down, 1 sec pause",
          },
          { name: "Archer Push-ups", sets: 3, reps: "6-8 each side", rest: 90 },
          { name: "Pseudo Planche Push-ups", sets: 3, reps: "6-8", rest: 90 },
          { name: "Chair Dips", sets: 3, reps: "8-12", rest: 90 },
          {
            name: "Pike Push-ups (hips high)",
            sets: 3,
            reps: "8-10",
            rest: 90,
            note: "Last set near failure - you should shake",
          },
        ],
      },
      2: {
        name: "Legs (Make It Hurt)",
        exercises: [
          {
            name: "Bulgarian Split Squats (back foot on chair)",
            sets: 4,
            reps: "8-10 each leg",
            rest: 90,
            note: "4 sec down",
          },
          {
            name: "Assisted Pistol Squats (hold doorway)",
            sets: 3,
            reps: "6 each leg",
            rest: 90,
          },
          { name: "Jump Squats", sets: 3, reps: "10", rest: 90 },
          {
            name: "Single-leg Glute Bridges",
            sets: 3,
            reps: "12 each",
            rest: 75,
          },
          {
            name: "Single-leg Calf Raises",
            sets: 4,
            reps: "20",
            rest: 60,
            note: "You should struggle walking after this",
          },
        ],
      },
      3: {
        name: "Rest / Mobility",
        exercises: [
          {
            name: "Light stretching or yoga",
            duration: "20-30 min",
            type: "active_recovery",
          },
          { name: "Walking", duration: "20-30 min", type: "active_recovery" },
        ],
      },
      4: {
        name: "Back + Core (No Bar Version)",
        exercises: [
          {
            name: "Feet-Elevated Towel Rows (under table/doorway)",
            sets: 4,
            reps: "8-12",
            rest: 90,
            note: "4 sec down, 2 sec squeeze at top",
          },
          {
            name: "Isometric Row Hold",
            sets: 3,
            duration: "20s",
            rest: 90,
            note: "Hold at contraction",
          },
          { name: "Reverse Snow Angels (slow)", sets: 3, reps: "12", rest: 75 },
          { name: "Superman Hold", sets: 3, duration: "30s", rest: 75 },
          {
            name: "Lying Leg Raises",
            sets: 3,
            reps: "12-15",
            rest: 75,
            note: "Pull elbows back. Squeeze shoulder blades.",
          },
        ],
      },
      5: {
        name: "Full Body Tension",
        exercises: [
          {
            name: "Circuit (3-4 rounds): 8 Decline Pushups → 8 Bulgarian each leg → 8 Rows → 10 Pike Pushups → 12 Leg Raises",
            sets: "3-4 rounds",
            reps: "Complete circuit",
            rest: 0,
            type: "circuit",
            note: "Minimal rest between exercises. Drives growth + conditioning.",
          },
        ],
      },
    },
  },

  phase2: {
    name: "Phase 2: Strength Building",
    weeks: [5, 6, 7, 8],
    description: "Increase intensity - Progressive overload",
    days: {},
  },

  phase3: {
    name: "Phase 3: Hypertrophy & Peak",
    weeks: [9, 10, 11, 12],
    description: "Maximum muscle tension - Final push",
    days: {},
  },
};

// For brevity, reuse phase1 days for phase2/3 in this cleaned version
workoutProgram.phase2.days = JSON.parse(
  JSON.stringify(workoutProgram.phase1.days),
);
workoutProgram.phase3.days = JSON.parse(
  JSON.stringify(workoutProgram.phase1.days),
);

// App State
let appState = {
  currentWeek: 1,
  completedWorkouts: 0,
  streak: 0,
  voiceEnabled: true,
  notificationsEnabled: true,
  alarmTime: "05:30",
  lastWorkoutDate: null,
  lastCheckedDate: null,
  weeklyCompletion: {},
  workoutInProgress: false,
  pausedWorkout: null,
  currentExerciseIndex: 0,
  currentSetIndex: 0,
  isResting: false,
  timerRunning: false,
  timerSeconds: 0,
  timerStartTimestamp: null,
  timerTargetSeconds: null,
  timerEndTime: null,
  timerInterval: null,
  currentWorkoutData: null,
  programStartDate: null,
  weekStartDate: null,
  userName: null,
};

// Initialize
function init() {
  loadState();

  updateDisplay();

  // Only run week progression and render workout after onboarding
  if (appState.userName) {
    checkWeekProgression();
    renderTodayWorkout();
    checkMorningNotification();
    setInterval(checkMorningNotification, 60000);
    showView("main");
  } else {
    showView("landing");
  }
}

// State Management
function loadState() {
  const saved = localStorage.getItem("workoutAppState");
  if (saved) {
    try {
      appState = { ...appState, ...JSON.parse(saved) };
    } catch (e) {
      console.error("Failed to parse saved state", e);
    }
  }

  const alarmInput = document.getElementById("alarmTime");
  if (alarmInput) alarmInput.value = appState.alarmTime || "05:30";

  const nameInput = document.getElementById("userNameInput");
  if (nameInput && appState.userName) nameInput.value = appState.userName;
}

function saveState() {
  localStorage.setItem("workoutAppState", JSON.stringify(appState));
}

// Display
function updateDisplay() {
  const displayWeek =
    !appState.userName || !appState.programStartDate ? 1 : appState.currentWeek;
  document.getElementById("currentWeek").textContent = displayWeek;
  const phase = getCurrentPhase(displayWeek);
  document.getElementById("currentPhase").textContent = phase;
  document.getElementById("completedWorkouts").textContent =
    appState.completedWorkouts;
  document.getElementById("streak").textContent = appState.streak + "🔥";

  const greetingEl = document.getElementById("userGreeting");
  if (greetingEl) {
    if (appState.userName)
      greetingEl.textContent = `Welcome, ${appState.userName}`;
    else greetingEl.textContent = "Your Progressive Home Workout Journey";
  }

  updateWeekInfo();

  // If a paused workout exists, show a resume banner in the main view
  const mainView = document.getElementById("mainView");
  if (mainView) {
    let resumeBanner = document.getElementById("resumeBanner");
    if (appState.pausedWorkout) {
      if (!resumeBanner) {
        resumeBanner = document.createElement("div");
        resumeBanner.id = "resumeBanner";
        resumeBanner.style.cssText =
          "margin-bottom:12px;padding:10px;background:rgba(253,224,71,0.08);border-radius:8px;display:flex;justify-content:space-between;align-items:center;";
        mainView.prepend(resumeBanner);
      }
      resumeBanner.innerHTML = `<div style=\"font-weight:600;color:#fde68a;\">Paused workout available</div><div><button class=\"btn\" onclick=\"resumeWorkout()\">▶️ Resume Workout</button></div>`;
    } else if (resumeBanner) {
      resumeBanner.remove();
    }
  }
}

function updateWeekInfo() {
  let daysInWeek, daysInProgram, displayWeek;
  if (!appState.userName || !appState.programStartDate) {
    daysInWeek = 0;
    daysInProgram = 0;
    displayWeek = 1;
  } else {
    daysInWeek = getDaysInCurrentWeek();
    daysInProgram = getDaysInProgram();
    displayWeek = appState.currentWeek;
  }

  let infoDiv = document.getElementById("weekInfo");
  if (!infoDiv) {
    const header = document.querySelector(".header");
    infoDiv = document.createElement("div");
    infoDiv.id = "weekInfo";
    infoDiv.style.cssText =
      "margin-top: 15px; padding: 15px; background: rgba(79, 70, 229, 0.1); border-radius: 10px; font-size: 0.9rem; color: #c7d2fe;";
    header.appendChild(infoDiv);
  }

  const weekKey = `week${displayWeek}`;
  const workoutsThisWeek = Object.keys(
    appState.weeklyCompletion[weekKey] || {},
  ).length;

  infoDiv.innerHTML = `
    <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
      <div>📅 Day ${daysInWeek + 1} of Week ${displayWeek}</div>
      <div>💪 ${workoutsThisWeek}/4 workouts this week</div>
      <div>🗓️ Total: ${daysInProgram} days in program</div>
    </div>
  `;
}

function getCurrentPhase(displayWeek) {
  const week = displayWeek || appState.currentWeek;
  if (week <= 4) return 1;
  if (week <= 8) return 2;
  return 3;
}

function getCurrentPhaseData() {
  const phase = getCurrentPhase();
  if (phase === 1) return workoutProgram.phase1;
  if (phase === 2) return workoutProgram.phase2;
  return workoutProgram.phase3;
}

// Week/day helpers
function checkWeekProgression() {
  if (!appState.userName) return;
  if (!appState.weekStartDate) return;

  const now = new Date();
  const weekStart = new Date(appState.weekStartDate);
  const daysSinceWeekStart = Math.floor(
    (now - weekStart) / (1000 * 60 * 60 * 24),
  );

  if (daysSinceWeekStart >= 7 && appState.currentWeek < 12) {
    appState.currentWeek++;
    appState.weekStartDate = new Date().toISOString();
    appState.weeklyCompletion[`week${appState.currentWeek}`] = {};
    saveState();
    showNotification(
      "📅 New Week!",
      `Welcome to Week ${appState.currentWeek}!`,
    );
  }
}

function getDaysInCurrentWeek() {
  if (!appState.weekStartDate) return 0;
  const now = new Date();
  const weekStart = new Date(appState.weekStartDate);
  return Math.floor((now - weekStart) / (1000 * 60 * 60 * 24));
}

function getDaysInProgram() {
  if (!appState.programStartDate) return 0;
  const now = new Date();
  const programStart = new Date(appState.programStartDate);
  return Math.floor((now - programStart) / (1000 * 60 * 60 * 24));
}

// Date helpers
function getDayOfWeek() {
  return new Date().getDay();
}

function getWorkoutDay() {
  const today = getDayOfWeek();
  const dayMap = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 0 };
  return dayMap[today];
}

// Render
function renderTodayWorkout() {
  const workoutDay = getWorkoutDay();
  const phaseData = getCurrentPhaseData();
  const container = document.getElementById("todayWorkout");
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const todayName = dayNames[getDayOfWeek()];

  if (workoutDay === 0) {
    container.innerHTML = `
      <div class="warmup-section">
        <h3>🌟 Rest Day / Active Recovery</h3>
        <p style="margin-bottom: 10px;"><strong>Today is ${todayName}</strong></p>
        <p>Light stretching, walking, or mobility work. Your muscles need recovery to grow!</p>
      </div>
    `;
    return;
  }

  const dayWorkout = phaseData.days[workoutDay];
  let html = `
    <div style="margin-bottom: 20px;">
      <p style="color: #a5b4fc; font-size: 0.9rem; margin-bottom: 10px;">📅 <strong>${todayName}</strong> - Workout Day ${workoutDay}</p>
      <span class="phase-badge">${phaseData.name}</span>
      <h3 style="margin: 15px 0 5px 0;">Day ${workoutDay}: ${dayWorkout.name}</h3>
      <p style="color: #c7d2fe; font-size: 0.9rem;">${phaseData.description}</p>
    </div>

    <div class="warmup-section">
      <h3>🔥 Warm-up (8-10 mins)</h3>
      <ul class="exercise-list">
  `;

  workoutProgram.warmup.forEach((ex) => {
    if (ex.type === "timed")
      html += `<li class="exercise-item">${ex.name} - ${ex.duration}s</li>`;
    else html += `<li class="exercise-item">${ex.name} - ${ex.reps} reps</li>`;
  });

  html += `</ul></div><h3 style="margin: 20px 0 15px 0;">💪 Main Workout</h3><ul class="exercise-list">`;

  dayWorkout.exercises.forEach((ex) => {
    let detail = "";
    if (ex.type === "circuit") detail = ex.reps;
    else if (ex.duration) detail = `${ex.sets} sets × ${ex.duration}`;
    else detail = `${ex.sets} sets × ${ex.reps} reps`;

    const restInfo = ex.rest ? ` - ${ex.rest}s rest` : "";
    const note = ex.note
      ? `<div style="font-size: 0.85rem; opacity: 0.8; margin-top: 5px; font-style: italic;">💡 ${ex.note}</div>`
      : "";
    html += `
      <li class="exercise-item">
        <strong>${ex.name}</strong>
        ${detail}${restInfo}
        ${note}
      </li>
    `;
  });

  html += `</ul>`;
  container.innerHTML = html;
}

// Workout session
function startWorkout() {
  const workoutDay = getWorkoutDay();
  if (workoutDay === 0) {
    alert("Today is a rest day! Recovery is important for muscle growth.");
    return;
  }

  const phaseData = getCurrentPhaseData();
  const dayWorkout = phaseData.days[workoutDay];

  appState.workoutInProgress = true;
  appState.currentExerciseIndex = 0;
  appState.currentSetIndex = 0;
  appState.isResting = false;
  appState.currentWorkoutData = {
    exercises: dayWorkout.exercises,
    totalExercises: dayWorkout.exercises.length,
    warmupComplete: false,
  };

  if (!appState.programStartDate) {
    appState.programStartDate = new Date().toISOString();
    appState.weekStartDate = new Date().toISOString();
    saveState();
  }

  showView("workout");
  showCurrentExercise();
}

function showCurrentExercise() {
  const data = appState.currentWorkoutData;
  if (!data) return;
  if (appState.currentExerciseIndex >= data.totalExercises) {
    completeWorkout();
    return;
  }

  const exercise = data.exercises[appState.currentExerciseIndex];
  const totalSets = parseInt(exercise.sets) || 1;
  const currentSet = appState.currentSetIndex + 1;

  const overallProgress =
    ((appState.currentExerciseIndex + currentSet / totalSets) /
      data.totalExercises) *
    100;
  const progressBar = document.getElementById("progressBar");
  if (progressBar) progressBar.style.width = overallProgress + "%";

  const display = document.getElementById("currentExerciseDisplay");
  let exerciseText = "";
  if (exercise.type === "circuit") exerciseText = "Complete the circuit";
  else if (exercise.duration) exerciseText = exercise.duration;
  else if (exercise.reps)
    exerciseText =
      exercise.reps + (typeof exercise.reps === "number" ? " reps" : "");

  let noteHTML = exercise.note
    ? `<p style="font-size: 0.9rem; margin-top: 10px; font-style: italic; opacity: 0.85;">💡 ${exercise.note}</p>`
    : "";

  display.innerHTML = `
    <h3>Exercise ${appState.currentExerciseIndex + 1}/${data.totalExercises}</h3>
    <h2 style="font-size: 1.8rem; margin: 15px 0;">${exercise.name}</h2>
    <p style="font-size: 1.5rem; color: #fbbf24;">Set ${currentSet}/${totalSets}</p>
    <p style="font-size: 1.3rem; margin-top: 10px;">${exerciseText}</p>
    ${noteHTML}
  `;

  stopTimer();
  appState.timerSeconds = 0;
  updateTimerDisplay();
  const timerEl = document.getElementById("timerDisplay");
  if (timerEl) timerEl.style.color = "#818cf8";

  updateWorkoutButtons("exercise");
  if (appState.voiceEnabled && currentSet === 1) speak(`${exercise.name}`);
}

function markSetComplete() {
  const data = appState.currentWorkoutData;
  if (!data) return;
  const exercise = data.exercises[appState.currentExerciseIndex];
  const totalSets = parseInt(exercise.sets) || 1;

  appState.currentSetIndex++;
  if (appState.currentSetIndex >= totalSets) startExerciseRest();
  else startSetRest();
}

function startSetRest() {
  const exercise =
    appState.currentWorkoutData.exercises[appState.currentExerciseIndex];
  const restTime = exercise.rest || 90;

  appState.isResting = true;
  appState.timerSeconds = restTime;
  appState.timerStartTimestamp = null;
  appState.timerTargetSeconds = restTime;

  const display = document.getElementById("currentExerciseDisplay");
  display.innerHTML = `
    <h3>💨 Rest Between Sets</h3>
    <h2 style="font-size: 1.8rem; margin: 15px 0;">${exercise.name}</h2>
    <p style="font-size: 1.3rem;">Set ${appState.currentSetIndex + 1}/${parseInt(exercise.sets)} coming up...</p>
  `;

  const timerEl = document.getElementById("timerDisplay");
  if (timerEl) timerEl.style.color = "#10b981";
  updateTimerDisplay();
  updateWorkoutButtons("rest");
  startTimer();
}

function startExerciseRest() {
  const EXERCISE_REST_TIME = 180;
  const currentExercise =
    appState.currentWorkoutData.exercises[appState.currentExerciseIndex];
  const nextExerciseIndex = appState.currentExerciseIndex + 1;

  appState.isResting = true;
  appState.timerSeconds = EXERCISE_REST_TIME;
  appState.timerStartTimestamp = null;
  appState.timerTargetSeconds = EXERCISE_REST_TIME;

  const display = document.getElementById("currentExerciseDisplay");
  if (nextExerciseIndex < appState.currentWorkoutData.totalExercises) {
    const nextExercise =
      appState.currentWorkoutData.exercises[nextExerciseIndex];
    display.innerHTML = `
      <h3>✅ ${currentExercise.name} Complete!</h3>
      <h2 style="font-size: 1.8rem; margin: 15px 0;">Rest Before Next Exercise</h2>
      <p style="font-size: 1.3rem;">Up Next: ${nextExercise.name}</p>
    `;
  } else {
    display.innerHTML = `
      <h3>✅ ${currentExercise.name} Complete!</h3>
      <h2 style="font-size: 1.8rem; margin: 15px 0;">Final Rest</h2>
      <p style="font-size: 1.3rem;">Almost done! 💪</p>
    `;
  }

  const timerEl = document.getElementById("timerDisplay");
  if (timerEl) timerEl.style.color = "#8b5cf6";
  updateTimerDisplay();
  updateWorkoutButtons("rest");
  startTimer();
}

function skipRest() {
  stopTimer();
  handleRestComplete();
}

function handleRestComplete() {
  const data = appState.currentWorkoutData;
  if (!data) return;
  if (
    appState.currentSetIndex >=
    parseInt(data.exercises[appState.currentExerciseIndex].sets)
  ) {
    appState.currentExerciseIndex++;
    appState.currentSetIndex = 0;
  }

  appState.isResting = false;
  showCurrentExercise();
}

function updateWorkoutButtons(mode) {
  const controls = document.querySelector(".controls");
  if (!controls) return;

  if (mode === "exercise") {
    controls.innerHTML = `
      <button class="btn btn-success" onclick="markSetComplete()">✓ Set Done</button>
      <button class="btn" onclick="pauseWorkout()">⏸️ Pause</button>
      <button class="btn btn-danger" onclick="endWorkout()">End Workout</button>
    `;
  } else if (mode === "rest") {
    controls.innerHTML = `
      <button class="btn" onclick="skipRest()">⏭️ Skip Rest</button>
      <button class="btn" onclick="pauseWorkout()">⏸️ Pause</button>
      <button class="btn btn-danger" onclick="endWorkout()">End Workout</button>
    `;
  }

  // If a workout is paused, show Resume instead
  if (appState.pausedWorkout) {
    controls.innerHTML = `
      <button class="btn btn-success" onclick="resumeWorkout()">▶️ Resume</button>
      <button class="btn btn-danger" onclick="endWorkout()">End Workout</button>
    `;
  }
}

function playBeep() {
  try {
    const audioContext = new (
      window.AudioContext || window.webkitAudioContext
    )();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = 800;
    oscillator.type = "sine";
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.3,
    );
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (e) {
    // ignore
  }
}

function completeWorkout() {
  stopTimer();
  appState.workoutInProgress = false;
  appState.completedWorkouts++;
  const today = new Date().toDateString();

  if (appState.lastWorkoutDate) {
    const lastDate = new Date(appState.lastWorkoutDate);
    const daysDiff = Math.floor(
      (new Date() - lastDate) / (1000 * 60 * 60 * 24),
    );
    if (daysDiff === 1) appState.streak++;
    else if (daysDiff > 1) appState.streak = 1;
  } else {
    appState.streak = 1;
  }

  appState.lastWorkoutDate = today;
  const workoutDay = getWorkoutDay();
  const weekKey = `week${appState.currentWeek}`;
  if (!appState.weeklyCompletion[weekKey])
    appState.weeklyCompletion[weekKey] = {};
  appState.weeklyCompletion[weekKey][workoutDay] = true;

  checkWeekProgression();
  saveState();
  updateDisplay();

  if (appState.voiceEnabled) speak("Workout complete! Great job!");
  const weeklyCount = Object.keys(
    appState.weeklyCompletion[weekKey] || {},
  ).length;
  showNotification(
    "🎉 Workout Complete!",
    `Excellent work! ${weeklyCount}/4 workouts this week.`,
  );
  showView("main");
  renderTodayWorkout();
}

function endWorkout() {
  if (confirm("Are you sure you want to end this workout early?")) {
    stopTimer();
    appState.workoutInProgress = false;
    showView("main");
  }
}

// Timer functions (timestamp-based)
function toggleTimer() {
  if (appState.timerRunning) stopTimer();
  else startTimer();
}

function startTimer() {
  if (appState.timerRunning) return;
  appState.timerRunning = true;
  appState.timerStartTimestamp = Date.now();
  appState.timerTargetSeconds = appState.timerSeconds;

  appState.timerInterval = setInterval(() => {
    const elapsed = Math.floor(
      (Date.now() - appState.timerStartTimestamp) / 1000,
    );
    const remaining = appState.timerTargetSeconds - elapsed;
    appState.timerSeconds = remaining;
    updateTimerDisplay();

    if (remaining <= 0 && appState.isResting) {
      stopTimer();
      playBeep();
      speak("Time's up. Start next set.");
      setTimeout(() => handleRestComplete(), 2000);
    }
  }, 500);
}

function stopTimer() {
  appState.timerRunning = false;
  if (appState.timerInterval) {
    clearInterval(appState.timerInterval);
    appState.timerInterval = null;
  }
  appState.timerStartTimestamp = null;
  appState.timerTargetSeconds = null;
}

// Pause / Resume functions
function pauseWorkout() {
  // compute remaining seconds
  const remainingSeconds =
    appState.timerRunning && appState.timerStartTimestamp
      ? Math.max(
          0,
          appState.timerTargetSeconds -
            Math.floor((Date.now() - appState.timerStartTimestamp) / 1000),
        )
      : appState.timerSeconds || 0;

  appState.pausedWorkout = {
    currentWorkoutData: appState.currentWorkoutData,
    currentExerciseIndex: appState.currentExerciseIndex,
    currentSetIndex: appState.currentSetIndex,
    isResting: appState.isResting,
    remainingSeconds: remainingSeconds,
    timerEndTime:
      remainingSeconds > 0 ? Date.now() + remainingSeconds * 1000 : null,
  };

  appState.timerEndTime = appState.pausedWorkout.timerEndTime;
  saveState();

  stopTimer();

  // update buttons to show resume
  updateWorkoutButtons(appState.isResting ? "rest" : "exercise");
}

function resumeWorkout() {
  if (!appState.pausedWorkout) return;
  const p = appState.pausedWorkout;

  appState.currentWorkoutData = p.currentWorkoutData;
  appState.currentExerciseIndex = p.currentExerciseIndex || 0;
  appState.currentSetIndex = p.currentSetIndex || 0;
  appState.isResting = !!p.isResting;

  let remaining = p.remainingSeconds || 0;
  if (p.timerEndTime) {
    remaining = Math.ceil((p.timerEndTime - Date.now()) / 1000);
    if (remaining < 0) remaining = 0;
  }

  appState.timerSeconds = remaining;
  appState.timerTargetSeconds = remaining;
  appState.timerStartTimestamp = Date.now();
  appState.timerEndTime = null;
  appState.pausedWorkout = null;
  saveState();

  showView("workout");
  showCurrentExercise();
  if (remaining > 0 && appState.isResting) startTimer();
}

function updateTimerDisplay() {
  const minutes = Math.floor(Math.abs(appState.timerSeconds) / 60);
  const seconds = Math.abs(appState.timerSeconds) % 60;
  const sign = appState.timerSeconds < 0 ? "+" : "";
  const el = document.getElementById("timerDisplay");
  if (el)
    el.textContent = `${sign}${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Voice
function speak(text) {
  if (!appState.voiceEnabled || !window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

// Settings toggles
function toggleVoice() {
  appState.voiceEnabled = !appState.voiceEnabled;
  document
    .getElementById("voiceToggle")
    ?.classList.toggle("active", appState.voiceEnabled);
  saveState();
}
function toggleNotifications() {
  appState.notificationsEnabled = !appState.notificationsEnabled;
  document
    .getElementById("notifToggle")
    ?.classList.toggle("active", appState.notificationsEnabled);
  saveState();
}

// Notifications
function checkMorningNotification() {
  if (!appState.notificationsEnabled) return;
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const [alarmHour, alarmMinute] = (appState.alarmTime || "05:30")
    .split(":")
    .map(Number);
  if (hours === alarmHour && minutes === alarmMinute) {
    showNotification(
      "⏰ Wake Up!",
      `It's ${appState.alarmTime}. Time to prepare for your workout!`,
    );
    if (appState.voiceEnabled)
      speak(
        `Good morning! It's ${appState.alarmTime}. Time to prepare for your workout.`,
      );
  }
  const workoutHour = alarmHour + (alarmMinute + 30 >= 60 ? 1 : 0);
  const workoutMinute = (alarmMinute + 30) % 60;
  if (hours === workoutHour && minutes === workoutMinute) {
    showNotification("💪 Workout Time!", "Time to start your workout!");
    if (appState.voiceEnabled) speak("Time to start your workout. Let's go!");
  }
}

function updateAlarmTime() {
  const alarmInput = document.getElementById("alarmTime");
  if (!alarmInput) return;
  appState.alarmTime = alarmInput.value;
  saveState();
  showNotification(
    "✅ Alarm Updated",
    `Your alarm is now set for ${appState.alarmTime}`,
  );
}
function testAlarm() {
  showNotification(
    "🔔 Test Alarm",
    "If you can see this notification and hear the voice, your alarm is working!",
  );
  if (appState.voiceEnabled)
    speak(
      "This is a test alarm. If you can hear this, your alarm notifications are working correctly!",
    );
}

function resetProgress() {
  if (
    !confirm(
      "⚠️ Are you sure you want to reset ALL progress? This will:\n\n• Reset to Week 1\n• Clear all workout history\n• Reset your streak\n• Keep your settings (alarm time, voice, etc.)\n\nThis cannot be undone!",
    )
  )
    return;
  appState.currentWeek = 1;
  appState.completedWorkouts = 0;
  appState.streak = 0;
  appState.lastWorkoutDate = null;
  appState.weeklyCompletion = {};
  appState.programStartDate = new Date().toISOString();
  appState.weekStartDate = new Date().toISOString();
  saveState();
  updateDisplay();
  renderTodayWorkout();
  showNotification(
    "🔄 Progress Reset",
    "Starting fresh from Week 1. Good luck! 💪",
  );
}

function showNotification(title, message) {
  const notif = document.createElement("div");
  notif.className = "notification";
  notif.innerHTML = `<h3 style="color: #818cf8; margin-bottom: 10px;">${title}</h3><p style="color: #e0e7ff;">${message}</p>`;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 5000);
  if ("Notification" in window && Notification.permission === "granted")
    new Notification(title, { body: message, icon: "💪" });
}

// View management + onboarding
function showView(view) {
  const views = ["mainView", "workoutView", "scheduleView", "landingView"];
  views.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });
  const target = document.getElementById(view + "View");
  if (target) target.classList.remove("hidden");
  if (view === "schedule") renderSchedule();
}

function proceedFromLanding() {
  const input = document.getElementById("userNameInput");
  if (!input) return;
  const name = input.value.trim();
  if (!name) {
    alert("Please enter your name to proceed.");
    input.focus();
    return;
  }
  appState.userName = name;
  saveState();
  updateDisplay();
  renderTodayWorkout();
  showView("main");
}

function renderSchedule() {
  const phaseData = getCurrentPhaseData();
  const scheduleContainer = document.getElementById("weekSchedule");
  const weekKey = `week${appState.currentWeek}`;
  const completed = appState.weeklyCompletion[weekKey] || {};
  const dayNames = [
    "Rest",
    "Heavy Push",
    "Legs",
    "Rest/Mobility",
    "Back+Core",
    "Full Body",
    "Rest",
  ];
  let html = "";
  for (let i = 0; i <= 6; i++) {
    const isCompleted = completed[i] || false;
    const className =
      i === 0 || i === 3 || i === 6
        ? "day-btn"
        : isCompleted
          ? "day-btn completed"
          : "day-btn";
    html += `\n      <button class="${className}" onclick="showDayDetails(${i})">\n        <div style=\"font-size:0.8rem; opacity:0.8;\">${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i]}</div>\n        <div style=\"margin-top:5px;\">${dayNames[i]}</div>\n        ${isCompleted ? '<div style=\"margin-top:5px;\">✓</div>' : ""}\n      </button>`;
  }
  if (scheduleContainer) scheduleContainer.innerHTML = html;
}

function showDayDetails(day) {
  if (day === 0 || day === 3 || day === 6) {
    document.getElementById("selectedDayWorkout").innerHTML =
      `<h2>Rest Day</h2><div class="warmup-section"><h3>🌟 Active Recovery</h3><p>Light stretching, walking, or mobility work. Your muscles grow during rest!</p></div>`;
    return;
  }
  const phaseData = getCurrentPhaseData();
  const dayWorkout = phaseData.days[day];
  let html = `<h2>Day ${day}: ${dayWorkout.name}</h2><p style="color:#c7d2fe; margin-bottom:20px;">${phaseData.description}</p><ul class="exercise-list">`;
  dayWorkout.exercises.forEach((ex) => {
    let detail = "";
    if (ex.type === "circuit") detail = ex.reps;
    else if (ex.duration) detail = `${ex.sets} sets × ${ex.duration}`;
    else detail = `${ex.sets} sets × ${ex.reps} reps`;
    const restInfo = ex.rest ? ` - ${ex.rest}s rest` : "";
    const note = ex.note
      ? `<div style="font-size:0.85rem; opacity:0.8; margin-top:5px; font-style:italic;">💡 ${ex.note}</div>`
      : "";
    html += `<li class="exercise-item"><strong>${ex.name}</strong>${detail}${restInfo}${note}</li>`;
  });
  html += "</ul>";
  document.getElementById("selectedDayWorkout").innerHTML = html;
}

// Request permission
if ("Notification" in window && Notification.permission === "default")
  Notification.requestPermission();

// Start
init();
