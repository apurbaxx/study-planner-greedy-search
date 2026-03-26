# Smart Study Planner (Using Greedy Search Algorithm)

A web application that helps you organize your study schedule using a priority-based algorithm.

## What it does

The Smart Study Planner creates an optimized study schedule based on your subjects, their difficulty, and deadlines. It automatically calculates which subjects need more urgent attention and schedules them accordingly.

## How to use

1. **Add subjects**: Fill in the form with:
   - Subject name
   - Hours required to study (1-50 hours)
   - Difficulty level (1 = very easy, 5 = very hard)
   - Deadline (how many days you have)

2. **Review your subjects**: All added subjects appear in a list showing their details and calculated priority

3. **Generate schedule**: Click "Generate Smart Schedule" to create your study plan

## How the scheduling works

The app uses a priority system where:
- **Priority = Difficulty ÷ Deadline**
- Higher priority subjects get scheduled first
- Harder subjects with shorter deadlines get priority over easier ones with longer deadlines

The scheduling algorithm:
1. Sorts all subjects by priority (highest first)
2. For each subject, tries to schedule study time day by day
3. Respects the 5-hour daily study limit
4. Ensures subjects finish before their deadlines
5. Warns you if any subject cannot be completed in time

## Features

- Maximum 5 hours of study time per day
- Priority-based scheduling algorithm
- Deadline tracking and warnings
- Clear day-by-day schedule output
- Explanation of how the schedule was created

## Screenshots

### Main Interface
![Smart Study Planner UI](screenshots/Smart%20Study%20Planner%20UI.png)

### Added Subjects View
![Added Subjects](screenshots/Added%20Subjects.png)

### Generated Schedule Output
![Generated Schedule](screenshots/Generated%20Schedule.png)

## Files

- `index.html` - Main webpage with the interface
- `script.js` - Contains the scheduling algorithm and logic
- `style.css` - Styling for the application

## Example

If you add:
- Math (20 hours, difficulty 4, deadline 7 days) → Priority: 0.57
- History (10 hours, difficulty 2, deadline 3 days) → Priority: 0.67

History gets scheduled first because it has higher priority (harder to finish in the available time).

## Getting Started

Simply open `index.html` in any modern web browser to start using the planner.