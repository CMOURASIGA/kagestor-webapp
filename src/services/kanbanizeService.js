export async function fetchCards(token, boardId) {
  // Simulated API call; ignore token and boardId for mock data
  const cards = [
    {
      card_id: 101,
      title: 'Implement login page',
      description: 'Create login form and integrate authentication.',
      column: 'To Do',
      lane: 'Frontend',
      assignee_id: 1,
      due_date: '2025-07-10',
    },
    {
      card_id: 102,
      title: 'Design database schema',
      description: 'Define tables and relationships for project data.',
      column: 'Doing',
      lane: 'Backend',
      assignee_id: 2,
      due_date: '2025-07-12',
    },
    {
      card_id: 103,
      title: 'Set up CI/CD pipeline',
      description: 'Automate tests and deployments.',
      column: 'To Do',
      lane: 'DevOps',
      assignee_id: 3,
      due_date: '2025-07-08',
    },
    {
      card_id: 104,
      title: 'Write documentation',
      description: 'Prepare user guide and technical docs.',
      column: 'Done',
      lane: 'Documentation',
      assignee_id: 4,
      due_date: '2025-07-05',
    },
    {
      card_id: 105,
      title: 'User profile page',
      description: 'Implement user profile with avatar upload.',
      column: 'Doing',
      lane: 'Frontend',
      assignee_id: 5,
      due_date: '2025-07-11',
    },
  ];
  return cards;
}