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

  phase3: {
    name: "Phase 3: Hypertrophy & Peak",
    weeks: [9, 10, 11, 12],
    description: "Maximum muscle tension - Final push",
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
};

// App State
let appState = {
  currentWeek: 1,
  completedWorkouts: 0,
  streak: 0,
  voiceEnabled: true,
  notificationsEnabled: true,
  lastWorkoutDate: null,
  weeklyCompletion: {},
  workoutInProgress: false,
  currentExerciseIndex: 0,
  timerRunning: false,
  timerSeconds: 0,
  timerInterval: null,
  currentWorkoutData: null,
};

// Initialize
function init() {
  loadState();
  updateDisplay();
  renderTodayWorkout();
  checkMorningNotification();

  // Check for notifications every minute
  setInterval(checkMorningNotification, 60000);
}

// State Management
function loadState() {
  const saved = localStorage.getItem("workoutAppState");
  if (saved) {
    appState = { ...appState, ...JSON.parse(saved) };
  }
}

function saveState() {
  localStorage.setItem("workoutAppState", JSON.stringify(appState));
}

function updateDisplay() {
  document.getElementById("currentWeek").textContent = appState.currentWeek;
  const phase = getCurrentPhase();
  document.getElementById("currentPhase").textContent = phase;
  document.getElementById("completedWorkouts").textContent =
    appState.completedWorkouts;
  document.getElementById("streak").textContent = appState.streak + "🔥";
}

function getCurrentPhase() {
  if (appState.currentWeek <= 4) return 1;
  if (appState.currentWeek <= 8) return 2;
  return 3;
}

function getCurrentPhaseData() {
  const phase = getCurrentPhase();
  if (phase === 1) return workoutProgram.phase1;
  if (phase === 2) return workoutProgram.phase2;
  return workoutProgram.phase3;
}

// Date Management
function getDayOfWeek() {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return days[new Date().getDay()];
}

function getWorkoutDay() {
  const dayMap = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 0,
    sunday: 0,
  };
  return dayMap[getDayOfWeek()];
}

// Render Today's Workout
function renderTodayWorkout() {
  const workoutDay = getWorkoutDay();
  const phaseData = getCurrentPhaseData();
  const container = document.getElementById("todayWorkout");

  if (workoutDay === 0) {
    container.innerHTML = `
            <div class="warmup-section">
                <h3>🌟 Rest Day / Active Recovery</h3>
                <p>Light stretching, walking, or mobility work. Your muscles need recovery to grow!</p>
            </div>
        `;
    return;
  }

  const dayWorkout = phaseData.days[workoutDay];

  let html = `
        <div style="margin-bottom: 20px;">
            <span class="phase-badge">${phaseData.name}</span>
            <h3 style="margin: 15px 0 5px 0;">Day ${workoutDay}: ${dayWorkout.name}</h3>
            <p style="color: #c7d2fe; font-size: 0.9rem;">${phaseData.description}</p>
        </div>

        <div class="warmup-section">
            <h3>🔥 Warm-up (8-10 mins)</h3>
            <ul class="exercise-list">
    `;

  workoutProgram.warmup.forEach((ex) => {
    if (ex.type === "timed") {
      html += `<li class="exercise-item">${ex.name} - ${ex.duration}s</li>`;
    } else {
      html += `<li class="exercise-item">${ex.name} - ${ex.reps} reps</li>`;
    }
  });

  html += `
            </ul>
        </div>

        <h3 style="margin: 20px 0 15px 0;">💪 Main Workout</h3>
        <ul class="exercise-list">
    `;

  dayWorkout.exercises.forEach((ex) => {
    let detail = "";
    if (ex.type === "circuit") {
      detail = ex.reps;
    } else if (ex.duration) {
      detail = `${ex.sets} sets × ${ex.duration}`;
    } else {
      detail = `${ex.sets} sets × ${ex.reps} reps`;
    }

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

  html += "</ul>";
  container.innerHTML = html;
}

// Workout Session
function startWorkout() {
  const workoutDay = getWorkoutDay();
  if (workoutDay === 0) {
    alert("Today is a rest day! Recovery is important for muscle growth.");
    return;
  }

  const phaseData = getCurrentPhaseData();
  const dayWorkout = phaseData.days[workoutDay];

  appState.workoutInProgress = true;
  appState.currentExerciseIndex = -1; // Start with warmup
  appState.currentWorkoutData = {
    warmup: workoutProgram.warmup,
    main: dayWorkout.exercises,
    totalExercises: workoutProgram.warmup.length + dayWorkout.exercises.length,
  };

  showView("workout");
  nextExercise();
}

function nextExercise() {
  appState.currentExerciseIndex++;
  const data = appState.currentWorkoutData;
  const totalExercises = data.totalExercises;

  if (appState.currentExerciseIndex >= totalExercises) {
    completeWorkout();
    return;
  }

  // Update progress
  const progress = (appState.currentExerciseIndex / totalExercises) * 100;
  document.getElementById("progressBar").style.width = progress + "%";

  // Get current exercise
  let exercise;
  let isWarmup = appState.currentExerciseIndex < data.warmup.length;

  if (isWarmup) {
    exercise = data.warmup[appState.currentExerciseIndex];
  } else {
    exercise = data.main[appState.currentExerciseIndex - data.warmup.length];
  }

  // Display exercise
  const display = document.getElementById("currentExerciseDisplay");
  const queueContainer = document.getElementById("exerciseQueue");

  let exerciseText = "";
  if (exercise.type === "circuit") {
    exerciseText = exercise.name;
  } else if (exercise.duration) {
    exerciseText = exercise.duration;
  } else if (exercise.reps) {
    exerciseText =
      exercise.reps + (typeof exercise.reps === "number" ? " reps" : "");
  }

  let noteHTML = exercise.note
    ? `<p style="font-size: 0.9rem; margin-top: 10px; font-style: italic; opacity: 0.85;">💡 ${exercise.note}</p>`
    : "";

  display.innerHTML = `
        <h3>${isWarmup ? "🔥 Warm-up" : "💪 Main Set"}</h3>
        <h2 style="font-size: 1.8rem; margin: 15px 0;">${exercise.name}</h2>
        <p style="font-size: 1.3rem;">${exerciseText}</p>
        ${
          exercise.sets
            ? `<p style="opacity: 0.8;">Sets: ${exercise.sets}</p>`
            : ""
        }
        ${noteHTML}
    `;

  // Show upcoming exercises
  let queueHTML =
    '<h3 style="margin-bottom: 10px;">Up Next:</h3><ul class="exercise-list">';
  for (
    let i = appState.currentExerciseIndex + 1;
    i < Math.min(appState.currentExerciseIndex + 4, totalExercises);
    i++
  ) {
    let nextEx =
      i < data.warmup.length
        ? data.warmup[i]
        : data.main[i - data.warmup.length];
    queueHTML += `<li class="exercise-item" style="font-size: 0.9rem;">${nextEx.name}</li>`;
  }
  queueHTML += "</ul>";
  queueContainer.innerHTML = queueHTML;

  // Voice announcement
  if (appState.voiceEnabled) {
    let voiceText = `${isWarmup ? "Warm up. " : ""}${
      exercise.name
    }. ${exerciseText}`;
    if (exercise.note) {
      voiceText += `. ${exercise.note}`;
    }
    speak(voiceText);
  }

  // Reset timer
  stopTimer();
  appState.timerSeconds = 0;
  updateTimerDisplay();

  // Auto-start timer for timed exercises
  if (exercise.duration || exercise.type === "timed") {
    const seconds =
      typeof exercise.duration === "number"
        ? exercise.duration
        : parseInt(exercise.duration);
    if (!isNaN(seconds)) {
      appState.timerSeconds = seconds;
      updateTimerDisplay();
      startTimer();
    }
  }
}

function completeWorkout() {
  stopTimer();
  appState.workoutInProgress = false;

  // Update stats
  appState.completedWorkouts++;
  const today = new Date().toDateString();

  // Check streak
  if (appState.lastWorkoutDate) {
    const lastDate = new Date(appState.lastWorkoutDate);
    const daysDiff = Math.floor(
      (new Date() - lastDate) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff === 1) {
      appState.streak++;
    } else if (daysDiff > 1) {
      appState.streak = 1;
    }
  } else {
    appState.streak = 1;
  }

  appState.lastWorkoutDate = today;

  // Mark day as completed
  const workoutDay = getWorkoutDay();
  const weekKey = `week${appState.currentWeek}`;
  if (!appState.weeklyCompletion[weekKey]) {
    appState.weeklyCompletion[weekKey] = {};
  }
  appState.weeklyCompletion[weekKey][workoutDay] = true;

  // Check if week is complete (4 workouts)
  const completedThisWeek = Object.keys(
    appState.weeklyCompletion[weekKey] || {}
  ).length;
  if (completedThisWeek >= 4 && appState.currentWeek < 12) {
    appState.currentWeek++;
  }

  saveState();
  updateDisplay();

  if (appState.voiceEnabled) {
    speak("Workout complete! Great job!");
  }

  showNotification(
    "🎉 Workout Complete!",
    "Excellent work! Your muscles are growing."
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

// Timer Functions
function toggleTimer() {
  if (appState.timerRunning) {
    stopTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  if (appState.timerRunning) return;

  appState.timerRunning = true;
  document.getElementById("startPauseBtn").textContent = "Pause";

  appState.timerInterval = setInterval(() => {
    appState.timerSeconds++;
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  appState.timerRunning = false;
  document.getElementById("startPauseBtn").textContent = "Start";

  if (appState.timerInterval) {
    clearInterval(appState.timerInterval);
    appState.timerInterval = null;
  }
}

function updateTimerDisplay() {
  const minutes = Math.floor(appState.timerSeconds / 60);
  const seconds = appState.timerSeconds % 60;
  document.getElementById("timerDisplay").textContent = `${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Voice Synthesis
function speak(text) {
  if (!appState.voiceEnabled || !window.speechSynthesis) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

// Settings
function toggleVoice() {
  appState.voiceEnabled = !appState.voiceEnabled;
  document
    .getElementById("voiceToggle")
    .classList.toggle("active", appState.voiceEnabled);
  saveState();
}

function toggleNotifications() {
  appState.notificationsEnabled = !appState.notificationsEnabled;
  document
    .getElementById("notifToggle")
    .classList.toggle("active", appState.notificationsEnabled);
  saveState();
}

// Notifications
function checkMorningNotification() {
  if (!appState.notificationsEnabled) return;

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // 5:30 AM prep notification
  if (hours === 5 && minutes === 30) {
    showNotification(
      "⏰ Wake Up!",
      "It's 5:30 AM. Time to prepare for your workout!"
    );
    if (appState.voiceEnabled) {
      speak("Good morning! It's 5:30 AM. Time to prepare for your workout.");
    }
  }

  // 6:00 AM start notification
  if (hours === 6 && minutes === 0) {
    showNotification(
      "💪 Workout Time!",
      "It's 6:00 AM. Let's start your workout!"
    );
    if (appState.voiceEnabled) {
      speak("It's 6 AM. Time to start your workout. Let's go!");
    }
  }
}

function showNotification(title, message) {
  const notif = document.createElement("div");
  notif.className = "notification";
  notif.innerHTML = `
        <h3 style="color: #818cf8; margin-bottom: 10px;">${title}</h3>
        <p style="color: #e0e7ff;">${message}</p>
    `;
  document.body.appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 5000);

  // Try browser notification API
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, { body: message, icon: "💪" });
  }
}

// View Management
function showView(view) {
  document.getElementById("mainView").classList.add("hidden");
  document.getElementById("workoutView").classList.add("hidden");
  document.getElementById("scheduleView").classList.add("hidden");

  document.getElementById(view + "View").classList.remove("hidden");

  if (view === "schedule") {
    renderSchedule();
  }
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

    html += `
            <button class="${className}" onclick="showDayDetails(${i})">
                <div style="font-size: 0.8rem; opacity: 0.8;">${
                  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i]
                }</div>
                <div style="margin-top: 5px;">${dayNames[i]}</div>
                ${isCompleted ? '<div style="margin-top: 5px;">✓</div>' : ""}
            </button>
        `;
  }

  scheduleContainer.innerHTML = html;
}

function showDayDetails(day) {
  if (day === 0 || day === 3 || day === 6) {
    document.getElementById("selectedDayWorkout").innerHTML = `
            <h2>Rest Day</h2>
            <div class="warmup-section">
                <h3>🌟 Active Recovery</h3>
                <p>Light stretching, walking, or mobility work. Your muscles grow during rest!</p>
            </div>
        `;
    return;
  }

  const phaseData = getCurrentPhaseData();
  const dayWorkout = phaseData.days[day];

  let html = `
        <h2>Day ${day}: ${dayWorkout.name}</h2>
        <p style="color: #c7d2fe; margin-bottom: 20px;">${phaseData.description}</p>
        <ul class="exercise-list">
    `;

  dayWorkout.exercises.forEach((ex) => {
    let detail = "";
    if (ex.type === "circuit") {
      detail = ex.reps;
    } else if (ex.duration) {
      detail = `${ex.sets} sets × ${ex.duration}`;
    } else {
      detail = `${ex.sets} sets × ${ex.reps} reps`;
    }

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

  html += "</ul>";
  document.getElementById("selectedDayWorkout").innerHTML = html;
}

// Request notification permission on load
if ("Notification" in window && Notification.permission === "default") {
  Notification.requestPermission();
}

// Initialize app
init();
