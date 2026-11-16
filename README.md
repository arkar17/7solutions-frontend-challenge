
# 7 Solutions — Frontend Coding Challenge

A coding challenge submission for 7 Solutions, featuring two assignments built with React, TypeScript, Node.js, and Express.

The project demonstrates frontend development, state management, asynchronous operations, REST API integration, data aggregation, performance optimization, and automated testing.

## Live Demonstrations

### Assignment 1 — Auto Delete Todo List

**Live Application:**  
https://7solutions-frontend-challenge.vercel.app/

**Hosting:** Vercel

A responsive React application that automatically categorizes todo items and returns them to the main list after five seconds.

### Assignment 2 — API Data Transformation (Optional)

**Live API:**  
https://sevensolutions-frontend-challenge.onrender.com/api/departments

**Hosting:** Render

A Node.js and Express API that retrieves user data from DummyJSON and transforms it into department-based summaries.

**Note:** The API runs on Render's free tier. The first request may take longer if the service has been inactive.

## Assignment 1 — Auto Delete Todo List

### Features

- Displays the provided 11 items in the main list.
- Categorizes items into Fruit and Vegetable columns.
- Moves items to their corresponding categories when clicked.
- Automatically returns items to the bottom of the main list after five seconds.
- Allows users to return categorized items immediately by clicking them.
- Supports multiple independent countdown timers.
- Cancels pending timers when items are manually returned.
- Clears active timers when the list is reset or the component unmounts.
- Provides a responsive interface for desktop and mobile devices.
- Includes a Reset button to restore the original list.

### Technologies

- React 19
- TypeScript
- Vite
- CSS
- Vitest
- React Testing Library

### Implementation Details

Each item has a unique numeric ID and a location indicating its current column.

React state manages the items, while a `Map` stores independent timeout references.

When an item moves to a category:

1. Its location is updated.
2. A five-second timer starts.
3. The item automatically returns to the bottom of the main list when the timer expires.

When the user manually returns an item, its pending timer is cancelled to prevent unexpected state updates.

The implementation also handles timer cleanup during component unmounting and list resets.

## Assignment 2 — Create Data from API (Optional)

### Live Endpoint

GET https://sevensolutions-frontend-challenge.onrender.com/api/departments

### Data Source

https://dummyjson.com/users?limit=0

### Features

- Fetches all available users from DummyJSON.
- Groups users by their company departments.
- Calculates male and female counts for each department.
- Determines the minimum and maximum ages.
- Summarizes users by hair color.
- Maps concatenated first and last names to postal codes.
- Validates API response structures.
- Handles upstream API failures.
- Returns structured JSON responses.
- Includes automated unit tests.

### Example Response

```json
{
  "Engineering": {
    "male": 1,
    "female": 1,
    "ageRange": "25-35",
    "hair": {
      "Black": 1,
      "Brown": 1
    },
    "addressUser": {
      "JohnSmith": "10100",
      "MaryJones": "10200"
    }
  }
}
```

The example above illustrates the expected response structure.

### Technologies

- Node.js
- TypeScript
- Express 5
- Fetch API
- Vitest

### Performance Optimization

The transformation uses a single-pass aggregation algorithm.

**Time Complexity:** O(n)

**Space Complexity:** O(n), including the generated output.

A JavaScript `Map` groups users efficiently by department.

Null-prototype objects prevent special property names from interfering with aggregation.

The transformation logic is implemented as a pure TypeScript function, making it independently testable.

### Design Considerations

- The API retrieves all users using `limit=0` instead of relying on the default paginated response.
- Age ranges include the minimum and maximum ages within each department.
- First and last names are concatenated without spaces, following the assignment requirements.
- Duplicate concatenated names overwrite earlier postal codes because the requested output uses an object mapping.
- The Express server returns HTTP 502 when the upstream API cannot be retrieved or validated.

## Project Structure

```text
seven-solutions-challenge/
├── api/
│   ├── fetchUsers.ts
│   ├── fetchUsers.test.ts
│   ├── groupUsers.ts
│   ├── groupUsers.test.ts
│   └── server.ts
├── src/
│   ├── App.tsx
│   ├── App.test.tsx
│   ├── data.ts
│   ├── data.test.ts
│   ├── main.tsx
│   ├── styles.css
│   └── useTodos.ts
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/arkar17/7solutions-frontend-challenge.git
cd 7solutions-frontend-challenge
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Frontend

```bash
npm run dev
```

Open:

http://localhost:5173

### 4. Start the API

Open another terminal and run:

```bash
npm run api
```

API endpoint:

http://localhost:3001/api/departments

The API requires an internet connection to retrieve data from DummyJSON.

## Testing

Run all automated tests:

```bash
npm test
```

### Verified Test Results

- Test files: 4 passed
- Automated tests: 12 passed
- Failed tests: 0

The tests cover:

**Frontend**
- Initial item data.
- Moving items between columns.
- Automatically returning items after five seconds.
- Immediately returning items when clicked.
- Cancelling timers when necessary.
- Resetting the todo list.

**Backend**
- Grouping users by department.
- Calculating gender counts.
- Calculating age ranges.
- Counting hair colors.
- Mapping names to postal codes.
- Handling empty input.
- Handling special department names.
- Validating API responses.
- Handling upstream API errors.
- Fetching all users rather than only the default page.

## Production Build

Run:

```bash
npm run build
```

### Verification Results

| Check | Result |
|-------|--------|
| Automated Tests | 12 Passed |
| TypeScript Compilation | Passed |
| Vite Production Build | Passed |
| npm Security Audit | 0 Vulnerabilities |
| Frontend Deployment | Successful |
| API Deployment | Successful |

## Deployment

### Frontend — Vercel

The React application is deployed as a static site on Vercel.

**Production URL:**  
https://7solutions-frontend-challenge.vercel.app/

Deployment configuration:

- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
- Environment Variables: None required

### Backend — Render

The Express API is deployed as a Node.js web service on Render.

**Production URL:**  
https://sevensolutions-frontend-challenge.onrender.com/api/departments

Deployment configuration:

- Runtime: Node.js
- Build Command: `npm ci --include=dev`
- Start Command: `npm run api`
- Database: Not required
- API Keys: Not required

The backend uses the port supplied by the hosting environment.

## Key Design Decisions

1. **Separation of Concerns**  
   The frontend and backend assignments are implemented independently while sharing the same repository.

2. **Stable Item Identification**  
   Todo items use unique numeric IDs to support reliable state updates and timer management.

3. **Independent Timer Management**  
   Individual timers are tracked using a Map to prevent interference between items.

4. **React State Management**  
   Immutable state updates ensure predictable rendering and maintain the correct item order.

5. **Efficient Data Aggregation**  
   The backend processes users in a single pass using an O(n) algorithm.

6. **Reusable and Testable Logic**  
   Data transformation and todo operations are separated from presentation and HTTP handling.

7. **Error Handling**  
   The backend validates upstream responses and returns meaningful HTTP error statuses.

8. **Automated Verification**  
   Unit and interaction tests verify the main functional requirements and important edge cases.

## Technology Stack

| Area | Technology |
|------|------------|
| Frontend | React 19 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | CSS |
| Backend | Node.js |
| HTTP Framework | Express 5 |
| External API | DummyJSON |
| Testing | Vitest, React Testing Library |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |
| Version Control | Git & GitHub |

## Author

**Arkar Myat Min**

GitHub: https://github.com/arkar17

---

Developed as a technical assessment submission for 7 Solutions.

