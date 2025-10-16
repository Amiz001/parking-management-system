Short, actionable instructions to help AI agents work productively on this repository.

- Project layout
  - This is a full-stack JavaScript project with two primary folders at the repo root: `client/` (React + Vite front-end) and `server/` (Express + Mongoose back-end).
  - The server is the API owner and listens on port 5000 by default (`server/server.js`). Routes are mounted under both top-level paths (e.g. `/users`, `/slots`) and `/api/*` for features like feedback, complaint, refund, and ticketing.
  - The client calls the API using `src/lib/api.js` which sets `baseURL` from `VITE_API_URL` or `http://localhost:5000`.

- Key files to inspect when making changes
  - Back-end entry: `server/server.js` — route mounting and middleware.
  - DB config: `server/config/db.js` — establishes Mongoose connection string (currently hard-coded to a MongoDB Atlas URL).
  - Auth: `server/middleware/authMiddleware.js` — JWT verification expects `Authorization: Bearer <token>` and `process.env.JWT_SECRET`.
  - Routes and controllers: `server/routes/*.js` and `server/controllers/*.js` — follow the pattern Route -> Controller -> Model.
  - Front-end API wrapper: `client/src/lib/api.js` — centralized axios instance and response error shaping; update it when API error formats change.

- How the app runs (developer workflows)
  - Server: from `server/` run `npm run dev` (uses `nodemon server.js`) or `npm start` to run once. Server listens on port 5000.
  - Client: from `client/` run `npm run dev` to start Vite (default dev server). Build with `npm run build` and preview with `npm run preview`.
  - Typical local dev: run both client and server in parallel (e.g., two terminals). The repository doesn’t include a workspace-level orchestrator; maintainers often use `concurrently` in each package when needed.

- Environment and secrets
  - Back-end reads `process.env` (see `server/server.js` and `server/middleware/authMiddleware.js`). Expect variables such as `JWT_SECRET` and any Stripe / Mongo connection env vars. The DB connection in `server/config/db.js` is currently an embedded connection string — prefer moving it to `process.env.MONGO_URI` for safety.

- Patterns and conventions specific to this repo
  - Route naming: most feature routes are plural nouns (e.g., `/users`, `/slots`, `/zones`). API features (feedback/complaint/refund/ticket) are mounted under `/api/*` — keep this separation when adding new user-facing features.
  - Controllers export functions used by routes; follow the existing naming style (e.g., `complaintController.js` exports handlers used by `complaintRoutes.js`).
  - Mongoose models live under `server/models/` and often use lowercase filenames (e.g., `users.js`, `slots.js`). When adding models, export the model at the bottom with `module.exports = mongoose.model('Name', schema)` to match existing usage.
  - Front-end uses React functional components and performs API calls via the `api` axios instance. Use `import api from 'src/lib/api'` or relative import to it and rely on interceptors for consistent error messages.

- Integration and external dependencies
  - MongoDB Atlas (Mongoose). Connection string appears in `server/config/db.js` (replace with env var when modifying).
  - Stripe is used (server dependencies include `stripe` and client uses `@stripe/react-stripe-js`) — check `server/controllers/OnlinePayController.js` and `server/controllers/PaymentController.js` for payment flows.
  - Authentication: JWT tokens signed with `JWT_SECRET`. Routes that require auth use `server/middleware/authMiddleware.js`.

- Code-change guidance and examples
  - When changing an API route, update both `server/routes/<feature>Routes.js` and `server/controllers/<feature>Controller.js`. Example: to add a complaint endpoint, add route in `server/routes/complaintRoutes.js` and handler in `server/controllers/complaintController.js`.
  - When adding client API calls, use the `client/src/lib/api.js` axios instance. Example usage:
    const res = await api.post('/api/complaint', { message });

- Tests, linting, and quality gates
  - There are no test suites present in the repository. The client has ESLint configured and a `lint` script (`client/package.json`). Run `npm run lint` in `client/` to check lint issues.
  - Before finalizing API changes, run the server locally (`server/npm run dev`) and exercise endpoints using the client or a tool like Postman.

- Safety and secret handling
  - Do not commit secrets. Replace hard-coded credentials (like the MongoDB URI) with environment variables in `server/config/db.js` and `process.env` references.

- Quick todo for agents contributing code
  1. Read `server/server.js` to learn mounted routes and ports.
 2. Pick the relevant `routes/*.js`, `controllers/*.js`, and `models/*.js` files to edit. Mimic naming and export patterns.
 3. Update `client/src/lib/api.js` usage if endpoint paths change; set `VITE_API_URL` in `.env` for dev when needed.

If anything here is unclear or you'd like more examples (e.g., adding a new route + client call end-to-end), tell me which feature to document and I'll expand this file.
