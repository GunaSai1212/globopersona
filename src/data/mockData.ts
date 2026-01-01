// Mock data for the application

export interface Campaign {
  id: string;
  name: string;
  status: 'draft' | 'running' | 'completed' | 'paused';
  type: 'ai_personalized' | 'manual';
  recipientCount: number;
  openRate: number;
  clickRate: number;
  createdAt: string;
  sentAt?: string;
}

export interface EmailList {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'poor' | 'processing';
  contactCount: number;
  dataQualityScore: number;
  createdAt: string;
  lastUpdated: string;
}

export interface Contact {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
  website: string;
  listId: string;
}

export interface EmailAccount {
  id: string;
  email: string;
  provider: 'gmail' | 'outlook' | 'smtp';
  status: 'connected' | 'disconnected' | 'error';
  dailyLimit: number;
  sentToday: number;
}

export interface DashboardStats {
  totalCampaigns: number;
  manualCampaigns: number;
  aiCampaigns: number;
  totalRecipients: number;
  overallOpenRate: number;
  overallClickRate: number;
}

export const dashboardStats: DashboardStats = {
  totalCampaigns: 24,
  manualCampaigns: 8,
  aiCampaigns: 16,
  totalRecipients: 12450,
  overallOpenRate: 42.5,
  overallClickRate: 8.3,
};

export const campaigns: Campaign[] = [
  {
    id: '1',
    name: 'Q4 Product Launch',
    status: 'running',
    type: 'ai_personalized',
    recipientCount: 2500,
    openRate: 45.2,
    clickRate: 12.8,
    createdAt: '2024-01-15',
    sentAt: '2024-01-16',
  },
  {
    id: '2',
    name: 'Winter Sale Announcement',
    status: 'completed',
    type: 'ai_personalized',
    recipientCount: 5200,
    openRate: 38.7,
    clickRate: 9.4,
    createdAt: '2024-01-10',
    sentAt: '2024-01-11',
  },
  {
    id: '3',
    name: 'New Feature Release',
    status: 'draft',
    type: 'manual',
    recipientCount: 1800,
    openRate: 0,
    clickRate: 0,
    createdAt: '2024-01-18',
  },
  {
    id: '4',
    name: 'Customer Feedback Survey',
    status: 'running',
    type: 'ai_personalized',
    recipientCount: 3100,
    openRate: 52.1,
    clickRate: 15.3,
    createdAt: '2024-01-12',
    sentAt: '2024-01-13',
  },
  {
    id: '5',
    name: 'Webinar Invitation',
    status: 'paused',
    type: 'manual',
    recipientCount: 890,
    openRate: 28.4,
    clickRate: 6.2,
    createdAt: '2024-01-08',
    sentAt: '2024-01-09',
  },
  {
    id: '6',
    name: 'Partnership Outreach',
    status: 'draft',
    type: 'ai_personalized',
    recipientCount: 450,
    openRate: 0,
    clickRate: 0,
    createdAt: '2024-01-19',
  },
];

export const emailLists: EmailList[] = [
  {
    id: '1',
    name: 'Enterprise Prospects',
    description: 'Fortune 500 decision makers',
    status: 'active',
    contactCount: 2450,
    dataQualityScore: 94,
    createdAt: '2024-01-05',
    lastUpdated: '2024-01-18',
  },
  {
    id: '2',
    name: 'SMB Leads Q4',
    description: 'Small and medium business leads from Q4 campaigns',
    status: 'active',
    contactCount: 5680,
    dataQualityScore: 87,
    createdAt: '2023-12-15',
    lastUpdated: '2024-01-15',
  },
  {
    id: '3',
    name: 'Newsletter Subscribers',
    description: 'Weekly newsletter opt-ins',
    status: 'active',
    contactCount: 12340,
    dataQualityScore: 91,
    createdAt: '2023-10-01',
    lastUpdated: '2024-01-19',
  },
  {
    id: '4',
    name: 'Conference Attendees 2024',
    description: 'Contacts from SaaS Connect 2024',
    status: 'poor',
    contactCount: 890,
    dataQualityScore: 62,
    createdAt: '2024-01-10',
    lastUpdated: '2024-01-10',
  },
  {
    id: '5',
    name: 'Partner Network',
    description: 'Technology and reseller partners',
    status: 'active',
    contactCount: 340,
    dataQualityScore: 98,
    createdAt: '2023-11-20',
    lastUpdated: '2024-01-17',
  },
];

export const contacts: Contact[] = [
  {
    id: '1',
    email: 'john.smith@techcorp.com',
    firstName: 'John',
    lastName: 'Smith',
    jobTitle: 'VP of Marketing',
    company: 'TechCorp Inc.',
    website: 'techcorp.com',
    listId: '1',
  },
  {
    id: '2',
    email: 'sarah.johnson@innovate.io',
    firstName: 'Sarah',
    lastName: 'Johnson',
    jobTitle: 'Head of Growth',
    company: 'Innovate.io',
    website: 'innovate.io',
    listId: '1',
  },
  {
    id: '3',
    email: 'mike.chen@startup.co',
    firstName: 'Mike',
    lastName: 'Chen',
    jobTitle: 'CEO',
    company: 'Startup.co',
    website: 'startup.co',
    listId: '2',
  },
  {
    id: '4',
    email: 'emily.davis@enterprise.com',
    firstName: 'Emily',
    lastName: 'Davis',
    jobTitle: 'Marketing Director',
    company: 'Enterprise Solutions',
    website: 'enterprise.com',
    listId: '1',
  },
  {
    id: '5',
    email: 'alex.wilson@growth.io',
    firstName: 'Alex',
    lastName: 'Wilson',
    jobTitle: 'Sales Manager',
    company: 'Growth.io',
    website: 'growth.io',
    listId: '2',
  },
];

export const emailAccounts: EmailAccount[] = [
  {
    id: '1',
    email: 'sales@company.com',
    provider: 'gmail',
    status: 'connected',
    dailyLimit: 500,
    sentToday: 245,
  },
  {
    id: '2',
    email: 'outreach@company.com',
    provider: 'outlook',
    status: 'connected',
    dailyLimit: 300,
    sentToday: 89,
  },
  {
    id: '3',
    email: 'marketing@company.com',
    provider: 'smtp',
    status: 'error',
    dailyLimit: 1000,
    sentToday: 0,
  },
];

export const analyticsData = {
  totalOpens: 15420,
  totalClicks: 3845,
  openRate: 42.5,
  clickRate: 8.3,
  weeklyData: [
    { day: 'Mon', opens: 2100, clicks: 520 },
    { day: 'Tue', opens: 2450, clicks: 610 },
    { day: 'Wed', opens: 1980, clicks: 480 },
    { day: 'Thu', opens: 2680, clicks: 720 },
    { day: 'Fri', opens: 2340, clicks: 590 },
    { day: 'Sat', opens: 1890, clicks: 445 },
    { day: 'Sun', opens: 1980, clicks: 480 },
  ],
};
