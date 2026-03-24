import { Ticket, User, Message, Contact, Company } from '../types';

export const mockAgents: User[] = [
  { id: 'a1', name: 'Sarah Chen', email: 'sarah.chen@company.com', role: 'agent' },
  { id: 'a2', name: 'Michael Torres', email: 'michael.torres@company.com', role: 'agent' },
  { id: 'a3', name: 'Emily Watson', email: 'emily.watson@company.com', role: 'agent' },
  { id: 'a4', name: 'David Kim', email: 'david.kim@company.com', role: 'agent' },
];

export const mockCustomers: User[] = [
  { id: 'c1', name: 'Alex Johnson', email: 'alex.johnson@client.com', role: 'customer' },
  { id: 'c2', name: 'Maria Garcia', email: 'maria.garcia@client.com', role: 'customer' },
  { id: 'c3', name: 'James Smith', email: 'james.smith@client.com', role: 'customer' },
  { id: 'c4', name: 'Lisa Anderson', email: 'lisa.anderson@client.com', role: 'customer' },
  { id: 'c5', name: 'Robert Brown', email: 'robert.brown@client.com', role: 'customer' },
  { id: 'c6', name: 'Jennifer Lee', email: 'jennifer.lee@client.com', role: 'customer' },
];

const generateMessages = (ticketId: string, customer: User, agent?: User): Message[] => {
  const messages: Message[] = [
    {
      id: `${ticketId}-m1`,
      ticketId,
      sender: customer,
      content: 'I am experiencing issues with the payment gateway integration. The transactions are failing intermittently.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      isInternal: false,
    },
  ];

  if (agent) {
    messages.push({
      id: `${ticketId}-m2`,
      ticketId,
      sender: agent,
      content: 'Thank you for reaching out. I\'ve reviewed the logs and noticed some API timeout errors. Could you provide more details about when this occurs?',
      timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000),
      isInternal: false,
    });

    messages.push({
      id: `${ticketId}-m3`,
      ticketId,
      sender: customer,
      content: 'It usually happens during peak hours, around 2-4 PM EST. The error message says "Gateway timeout - please try again later".',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      isInternal: false,
      attachments: ['error-screenshot.png'],
    });

    messages.push({
      id: `${ticketId}-m4`,
      ticketId,
      sender: agent,
      content: 'Internal note: Need to check load balancer configuration during peak hours.',
      timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000),
      isInternal: true,
    });
  }

  return messages;
};

export const mockTickets: Ticket[] = [
  {
    id: 'T-1001',
    subject: 'Payment gateway integration failing',
    status: 'open',
    priority: 'urgent',
    customer: mockCustomers[0],
    assignedAgent: mockAgents[0],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 20 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 4 * 60 * 60 * 1000),
    tags: ['payment', 'integration', 'bug'],
    messages: generateMessages('T-1001', mockCustomers[0], mockAgents[0]),
    slaStatus: 'warning',
    initialSentiment: 'negative',
    currentSentiment: 'negative',
    state: 'First response due',
    group: '--',
  },
  {
    id: 'T-1002',
    subject: 'Unable to access account dashboard',
    status: 'pending',
    priority: 'high',
    customer: mockCustomers[1],
    assignedAgent: mockAgents[1],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    tags: ['access', 'dashboard'],
    messages: [
      {
        id: 'T-1002-m1',
        ticketId: 'T-1002',
        sender: mockCustomers[1],
        content: 'I cannot log in to my account dashboard. Getting a 403 error.',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        isInternal: false,
      },
      {
        id: 'T-1002-m2',
        ticketId: 'T-1002',
        sender: mockAgents[1],
        content: 'I\'ve reset your permissions. Please try clearing your cache and logging in again.',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        isInternal: false,
      },
    ],
    slaStatus: 'on-time',
    initialSentiment: 'neutral',
    currentSentiment: 'neutral',
    group: '--',
  },
  {
    id: 'T-1003',
    subject: 'Feature request: Dark mode support',
    status: 'open',
    priority: 'low',
    customer: mockCustomers[2],
    assignedAgent: mockAgents[2],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    tags: ['feature', 'ui'],
    messages: [
      {
        id: 'T-1003-m1',
        ticketId: 'T-1003',
        sender: mockCustomers[2],
        content: 'Would love to see a dark mode option for the application.',
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        isInternal: false,
      },
    ],
    slaStatus: 'on-time',
    initialSentiment: 'neutral',
    currentSentiment: 'neutral',
    group: '--',
  },
  {
    id: 'T-1004',
    subject: 'Data export not working',
    status: 'resolved',
    priority: 'medium',
    customer: mockCustomers[3],
    assignedAgent: mockAgents[0],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    tags: ['export', 'data'],
    messages: [
      {
        id: 'T-1004-m1',
        ticketId: 'T-1004',
        sender: mockCustomers[3],
        content: 'The CSV export feature is not generating the file.',
        timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        isInternal: false,
      },
      {
        id: 'T-1004-m2',
        ticketId: 'T-1004',
        sender: mockAgents[0],
        content: 'This has been fixed in the latest release. Please update and try again.',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        isInternal: false,
      },
    ],
    slaStatus: 'on-time',
    initialSentiment: 'positive',
    currentSentiment: 'positive',
    group: '--',
  },
  {
    id: 'T-1005',
    subject: 'API rate limit exceeded',
    status: 'open',
    priority: 'high',
    customer: mockCustomers[4],
    assignedAgent: mockAgents[3],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 18 * 60 * 60 * 1000),
    tags: ['api', 'rate-limit'],
    messages: [
      {
        id: 'T-1005-m1',
        ticketId: 'T-1005',
        sender: mockCustomers[4],
        content: 'Our application is receiving 429 errors from your API. Need immediate assistance.',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        isInternal: false,
      },
      {
        id: 'T-1005-m2',
        ticketId: 'T-1005',
        sender: mockAgents[3],
        content: 'Checking your current usage and limits now.',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        isInternal: false,
      },
    ],
    slaStatus: 'on-time',
    initialSentiment: 'negative',
    currentSentiment: 'neutral',
    group: '--',
  },
  {
    id: 'T-1006',
    subject: 'Mobile app crashes on iOS 18',
    status: 'pending',
    priority: 'urgent',
    customer: mockCustomers[5],
    assignedAgent: mockAgents[1],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
    tags: ['mobile', 'ios', 'crash'],
    messages: [
      {
        id: 'T-1006-m1',
        ticketId: 'T-1006',
        sender: mockCustomers[5],
        content: 'App crashes immediately after login on iOS 18 devices.',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        isInternal: false,
      },
    ],
    slaStatus: 'breached',
    initialSentiment: 'negative',
    currentSentiment: 'negative',
    state: 'Overdue',
    group: '--',
  },
  {
    id: 'T-1007',
    subject: 'Email notifications not received',
    status: 'open',
    priority: 'medium',
    customer: mockCustomers[0],
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    tags: ['email', 'notifications'],
    messages: [
      {
        id: 'T-1007-m1',
        ticketId: 'T-1007',
        sender: mockCustomers[0],
        content: 'I am not receiving email notifications for my account.',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        isInternal: false,
      },
    ],
    slaStatus: 'on-time',
    initialSentiment: 'neutral',
    currentSentiment: 'neutral',
    group: '--',
  },
  {
    id: 'T-1008',
    subject: 'Billing discrepancy in invoice',
    status: 'closed',
    priority: 'high',
    customer: mockCustomers[2],
    assignedAgent: mockAgents[2],
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
    tags: ['billing', 'invoice'],
    messages: [
      {
        id: 'T-1008-m1',
        ticketId: 'T-1008',
        sender: mockCustomers[2],
        content: 'There is a discrepancy in my latest invoice.',
        timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        isInternal: false,
      },
      {
        id: 'T-1008-m2',
        ticketId: 'T-1008',
        sender: mockAgents[2],
        content: 'I\'ve reviewed your account and issued a corrected invoice. Please check your email.',
        timestamp: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
        isInternal: false,
      },
    ],
    slaStatus: 'on-time',
    initialSentiment: 'neutral',
    currentSentiment: 'positive',
    group: '--',
  },
];

export const currentAgent: User = mockAgents[0];

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Bob Tree',
    title: 'CEO',
    company: 'Freshworks',
    email: 'bob.tree@supportdesk.com',
    mobilePhone: '--',
    workPhone: '8295701297',
    socialHandle: '--',
    avatar: 'https://i.pravatar.cc/150?u=1'
  },
  {
    id: '2',
    name: 'Emily Garcia',
    title: 'Associate Director',
    company: 'Acme Inc',
    email: 'emily.garcia@acme.com',
    mobilePhone: '--',
    workPhone: '+1448081698824',
    socialHandle: '--',
    avatar: 'https://i.pravatar.cc/150?u=2'
  },
  {
    id: '3',
    name: 'Emily Dean',
    title: 'Chartered Accountant',
    company: 'Global Learning Inc',
    email: 'emily.dean@globallearning.org',
    mobilePhone: '--',
    workPhone: '257715491',
    socialHandle: '--',
    avatar: 'https://i.pravatar.cc/150?u=3'
  },
  {
    id: '4',
    name: 'Johnny Appleseed',
    title: 'Manager Customer Support',
    company: 'Jet Propulsion Laboratory, NASA',
    email: 'johnny.appleseed@jpl.gov',
    mobilePhone: '--',
    workPhone: '123412834',
    socialHandle: '--',
    avatar: 'https://i.pravatar.cc/150?u=4'
  },
  {
    id: '5',
    name: 'Sarah James',
    title: 'Manager Public relations',
    company: 'Advanced Machinery',
    email: 'sarah.james@advancedmachinery.com',
    mobilePhone: '--',
    workPhone: '1855747676',
    socialHandle: '--',
    avatar: 'https://i.pravatar.cc/150?u=5'
  }
];

export const mockCompanies: Company[] = [
  { id: 1, name: "Acme Inc", contacts: 1, color: "bg-teal-100 text-teal-600" },
  { id: 2, name: "Advanced Machinery", contacts: 1, color: "bg-teal-100 text-teal-600" },
  { id: 3, name: "Freshworks", contacts: 1, color: "bg-teal-100 text-teal-600" },
  { id: 4, name: "Global Learning Inc", contacts: 1, color: "bg-teal-100 text-teal-600" },
  { id: 5, name: "Jet Propulsion Laboratory , NASA", contacts: 1, color: "bg-teal-100 text-teal-600" },
];
