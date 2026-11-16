import express from 'express';
import { fetchUsers } from './fetchUsers';
import { groupUsersByDepartment } from './groupUsers';

const app = express();
app.get('/api/departments', async (_request, response) => {
  try {
    const users = await fetchUsers();
    response.json(groupUsersByDepartment(users));
  } catch (error) {
    console.error('Failed to retrieve department summaries:', error);
    response.status(502).json({ error: 'Unable to retrieve users from upstream API' });
  }
});

const port = Number(process.env.PORT ?? 3001);
app.listen(port, () => console.log(`API running at http://localhost:${port}/api/departments`));
