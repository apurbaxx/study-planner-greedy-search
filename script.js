
let subjects = []; // Array to store all subjects
const DAILY_STUDY_LIMIT = 5; // Maximum hours per day


const subjectForm = document.getElementById('subjectForm');
const subjectsList = document.getElementById('subjectsList');
const generateScheduleBtn = document.getElementById('generateSchedule');
const scheduleOutput = document.getElementById('scheduleOutput');


subjectForm.addEventListener('submit', addSubject);
generateScheduleBtn.addEventListener('click', generateSchedule);

// Function to add a new subject
function addSubject(event) {
    event.preventDefault(); 

    const name = document.getElementById('subjectName').value.trim();
    const hours = parseInt(document.getElementById('hoursRequired').value);
    const difficulty = parseInt(document.getElementById('difficulty').value);
    const deadline = parseInt(document.getElementById('deadline').value);

    const priority = difficulty / deadline;

    // Create subject object
    const subject = {
        name: name,
        hours: hours,
        difficulty: difficulty,
        deadline: deadline,
        priority: priority.toFixed(2) // Round to 2 decimal places
    };


    subjects.push(subject);

    subjectForm.reset();


    displaySubjects();

    console.log('Added subject:', subject); // For debugging
}

// Function to display all subjects
function displaySubjects() {
    if (subjects.length === 0) {
        subjectsList.innerHTML = '<p>No subjects added yet.</p>';
        return;
    }

    let html = '';
    subjects.forEach((subject, index) => {
        html += `
            <div class="subject-item">
                <h3>${subject.name}</h3>
                <div class="subject-details">
                    <p><strong>Hours Required:</strong> ${subject.hours}h</p>
                    <p><strong>Difficulty:</strong> ${subject.difficulty}/5</p>
                    <p><strong>Deadline:</strong> ${subject.deadline} days</p>
                    <p class="priority-value"><strong>Priority:</strong> ${subject.priority}</p>
                </div>
            </div>
        `;
    });

    subjectsList.innerHTML = html;
}


function generateSchedule() {
    if (subjects.length === 0) {
        scheduleOutput.innerHTML = '<p>Please add some subjects first!</p>';
        return;
    }

    const sortedSubjects = [...subjects].sort((a, b) => b.priority - a.priority);

    console.log('Subjects sorted by priority:', sortedSubjects);

    // Step 2: Create schedule using greedy algorithm
    const schedule = createGreedySchedule(sortedSubjects);

    // Step 3: Display the schedule
    displaySchedule(schedule);
}


function createGreedySchedule(sortedSubjects) {
    const schedule = {}; // Object to store day-wise schedule
    let warnings = []; // Array to store any warnings

    // For each subject (in priority order)
    for (let subject of sortedSubjects) {
        let remainingHours = subject.hours;
        let scheduled = false;

        // Try to schedule this subject day by day
        for (let day = 1; day <= subject.deadline; day++) {
            // Initialize day if not exists
            if (!schedule[day]) {
                schedule[day] = [];
            }

            // Calculate how many hours are already scheduled for this day
            let hoursUsed = 0;
            for (let task of schedule[day]) {
                hoursUsed += task.hours;
            }

            // Calculate available hours for this day
            let availableHours = DAILY_STUDY_LIMIT - hoursUsed;

            // If we have available hours and remaining work
            if (availableHours > 0 && remainingHours > 0) {
                // Schedule as much as possible for this day
                let hoursToSchedule = Math.min(availableHours, remainingHours);

                schedule[day].push({
                    subject: subject.name,
                    hours: hoursToSchedule
                });

                remainingHours -= hoursToSchedule;
                scheduled = true;

                // If we've scheduled everything for this subject, break
                if (remainingHours === 0) {
                    break;
                }
            }
        }

        // Check if we couldn't schedule everything within deadline
        if (remainingHours > 0) {
            warnings.push(`⚠️ Cannot complete ${subject.name} within ${subject.deadline} days! ${remainingHours} hours remaining.`);
        }
    }

    return { schedule: schedule, warnings: warnings };
}

// Function to display the generated schedule
function displaySchedule(result) {
    const { schedule, warnings } = result;
    let html = '';

    // Show warnings if any
    if (warnings.length > 0) {
        html += '<div class="warning">';
        warnings.forEach(warning => {
            html += `<p>${warning}</p>`;
        });
        html += '</div>';
    } else {
        html += '<div class="success">✅ All subjects can be completed within their deadlines!</div>';
    }

    // Display day-wise schedule
    const days = Object.keys(schedule).sort((a, b) => parseInt(a) - parseInt(b));

    if (days.length === 0) {
        html += '<p>No schedule generated. Please check your inputs.</p>';
        scheduleOutput.innerHTML = html;
        return;
    }

    days.forEach(day => {
        const dayTasks = schedule[day];
        if (dayTasks.length > 0) {
            html += `
                <div class="schedule-day">
                    <h3>Day ${day}</h3>
                    <div class="schedule-subjects">
            `;

            let dayTotal = 0;
            dayTasks.forEach((task, index) => {
                dayTotal += task.hours;
                html += `${task.subject} (${task.hours}h)`;
                if (index < dayTasks.length - 1) {
                    html += ', ';
                }
            });

            html += `
                    </div>
                    <p><strong>Total: ${dayTotal}h / ${DAILY_STUDY_LIMIT}h</strong></p>
                </div>
            `;
        }
    });

    // Show algorithm explanation
    html += `
        <div class="success">
            <h3>How this schedule was created:</h3>
            <ol>
                <li><strong>Priority Calculation:</strong> Priority = Difficulty ÷ Deadline</li>
                <li><strong>Sorting:</strong> Subjects sorted by priority (highest first)</li>
                <li><strong>Greedy Scheduling:</strong> For each subject, schedule as many hours as possible each day within the 5-hour limit</li>
                <li><strong>Deadline Check:</strong> Ensure all tasks finish before their deadlines</li>
            </ol>
        </div>
    `;

    scheduleOutput.innerHTML = html;
}

// Optional: Clear all subjects function (can be called from console)
function clearAllSubjects() {
    subjects = [];
    displaySubjects();
    scheduleOutput.innerHTML = '<p>Add subjects and click "Generate Smart Schedule" to see your optimized study plan.</p>';
}