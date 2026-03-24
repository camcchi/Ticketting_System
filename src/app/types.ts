export type TicketStatus = 'open' | 'pending' | 'resolved' | 'closed' | 'waiting_on_customer' | 'waiting_on_third_party';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'agent' | 'customer';
}

export interface Message {
  id: string;
  ticketId: string;
  sender: User;
  content: string;
  timestamp: Date;
  isInternal: boolean;
  attachments?: string[];
}

export interface Ticket {
  id: string;
  subject: string;
  status: TicketStatus;
  priority: TicketPriority;
  customer: User;
  assignedAgent?: User;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  tags: string[];
  messages: Message[];
  slaStatus?: 'on-time' | 'warning' | 'breached';
  initialSentiment?: 'positive' | 'neutral' | 'negative';
  currentSentiment?: 'positive' | 'neutral' | 'negative';
  state?: 'First response due' | 'Overdue';
  group?: string;
}

export interface FilterOptions {
  status?: TicketStatus[];
  priority?: TicketPriority[];
  agent?: string[];
  group?: string[];
  sentiment?: string[];
  created?: string;
  closedAt?: string;
  resolvedAt?: string;
  type?: string[];
  search?: string;
}

export type SortField = 
  | 'createdAt' 
  | 'dueDate' 
  | 'updatedAt' 
  | 'priority' 
  | 'status' 
  | 'subject'
  | 'firstResponseDue'
  | 'nextResponseDue'
  | 'closedTime';

export type SortOrder = 'asc' | 'desc';

export interface SortOptions {
  field: SortField;
  order: SortOrder;
}

export type LayoutType = 'card' | 'inbox' | 'table';

export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  title: string;
  company: string;
  email: string;
  mobilePhone: string;
  workPhone: string;
  socialHandle: string;
}

export interface ContactFilterOptions {
  search?: string;
  created?: string;
  timezone?: string;
  tags?: string[];
  companies?: string[];
  contactType?: string[];
}

export interface Company {
  id: number;
  name: string;
  contacts: number;
  color: string;
}
