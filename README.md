# SHOCKWAVE: Live Ideathon Event System

Shockwave is a high-performance, real-time event management system designed for live ideathons, hackathons, and pitch competitions. It features a brutalist, high-contrast UI tailored for projector displays, dual-sided Crossfire scoring, a 3-judge scoring matrix, and instantaneous multi-screen synchronization without the need for a backend server.

## 🎛 System Panels & Endpoints

The system is strictly segmented into several robust, purpose-built panels accessible via dedicated routes:

### 1. Admin Control Dashboard (`/#/admin`)
The central nerve center for event administrators and judges.
- **Presentation Control:** Select the active presenting team, manage the live 5-minute countdown timer, and broadcast global announcements.
- **Crossfire Log:** Review, approve, or reject incoming questions from the audience/teams in real-time. Approved questions are pushed to the live public arena.
- **Crossfire Scoring:** Dual-sided scoring system allowing judges to award points to both the team that asked the question (up to 10 points) and the team that answered (up to 10 points).
- **Judging Matrix:** A comprehensive tabulation grid to enter physical scorecard results. Accepts Pitch scores from 3 independent judges, mathematically averages them, and securely commits them to the global leaderboard.
- **Team Management:** Add, edit, or remove participating teams, view credentials, and handle access control.

### 2. Participant Terminal (`/#/team/team-id`)
The secure dashboard for participating teams.
- **Profile Overview:** View team metrics, total accumulated score, and the exact breakdown of Pitch vs. Crossfire points.
- **Crossfire Terminal:** A secure transmission line allowing teams to submit live questions to any other team during the event. Teams select a target team from the dropdown and submit their query for Admin review.

### 3. Public Crossfire Arena (`/#/crossfire`)
The live Q&A display intended for the secondary projector.
- Displays a continuous, real-time stream of all Admin-approved questions.
- Shows the target defending team and the exact question being asked. 
- Updates instantaneously as the Admin approves questions or scores them.

### 4. Main Projector Display (`/#/display`)
The primary visual feed for the audience.
- Shows the currently active presenting team in massive, high-contrast typography.
- Features the live synchronized countdown timer (5:00) that flashes and plays alerts during the final 30 seconds.
- Displays high-priority global announcements broadcasted by the Admin.

### 5. Global Leaderboard (`/#/leaderboard`)
The live ranking system.
- Sorts and ranks all teams based on their total combined score.
- High-contrast brutalist design meant to be displayed periodically during breaks to build tension.

### 6. Registration & Landing (`/` & `/#/register`)
- Public-facing landing page and team registration form.
- Automatically generates secure access credentials (`SW-XXX`) for newly registered teams.

---

## 🚀 Architecture & Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS (configured for high-contrast, brutalist aesthetics with custom fonts)
- **State Management:** Context API
- **Real-Time Sync:** `BroadcastChannel` API + `localStorage` Event Listeners. The system synchronizes state across multiple windows and tabs completely serverlessly (zero-latency).
- **Icons:** Lucide React

## ⚙️ Running Locally

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start the Development Server:**
   ```bash
   npm run dev
   ```

3. **Multi-Window Setup (Important):**
   To simulate the live event locally, open your browser and open multiple tabs to the **same local port** (e.g. `http://localhost:5173`). Do not mix ports or use Incognito tabs alongside regular tabs, as browser security models will block the real-time sync.

## 📡 Deployment

Since Shockwave operates entirely on client-side state and browser APIs for its current hackathon format, it can be deployed as a static site to any platform (Vercel, Netlify, GitHub Pages) for use by a single admin machine driving multiple displays.

Build for production:
```bash
npm run build
```
