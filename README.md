# 7 Solutions Frontend Assignment

Two assignments, one repository:

1. **Auto Delete Todo List** — responsive React + TypeScript frontend with independent 5-second return timers. Click an item in the main list to categorize it; click a categorized item to return it immediately to the bottom of the main list.
2. **Create Data from API (optional)** — Express + TypeScript HTTP endpoint that fetches all users from DummyJSON, groups them by department, and returns gender counts, age range, hair-color counts and name-to-postal-code mappings.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173).

Run the optional API in another terminal:

```bash
npm run api
```

GET `http://localhost:3001/api/departments` returns a JSON object with one entry per department. This server requires internet access to fetch `https://dummyjson.com/users?limit=0`. For each department, `ageRange` uses minimum and maximum ages inclusive; `addressUser` concatenates first and last name without spaces, matching the assignment. Duplicate concatenated names will overwrite earlier postal codes, as implied by the requested object format.

## Test and build

```bash
npm test
npm run build
```

## Design decisions

- Every item has a stable numeric ID; its location determines the column.
- Items are appended to the destination order on every move, so returning items appear at the **bottom** of the main list.
- A `Map<id, timeout>` tracks independent timers. Manual return, reset and unmount clear outstanding timers; no timers are recreated by unrelated state updates.
- The API transformation is a pure function operating in one pass, O(n) time. A `Map` and null-prototype objects protect against special department/color keys.
- The API is separate from the frontend because the second assignment specifically requests an HTTP framework; the todo app itself needs no network calls.

## Deploy

Deploy the repository as a **Vite static site** on Vercel, Netlify or another static host. Build command: `npm run build`; output directory: `dist`. The optional API is a separate Node process (`npm run api`) and is not automatically deployed as part of the static frontend. Its tested TypeScript source is included in this repository for review. If a hosted API is desired, deploy it separately on a Node-capable service.

## Technology

React 19, TypeScript, Vite, Express 5, Vitest, React Testing Library.
