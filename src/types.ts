export type ProjectType =
  | 'Hotel Management'
  | 'Banking/Finance'
  | 'CRM'
  | 'Billing'
  | 'Inventory'
  | 'E-commerce'
  | 'Hospital Management'
  | 'Education'
  | 'AI Application'
  | 'Custom Software'
  | 'Other';

export type EnquiryStatus =
  | 'New'
  | 'Contacted'
  | 'Planning'
  | 'In Progress'
  | 'Completed'
  | 'Closed';

export interface ServiceItem {
  id: string;
  title: string;
  category: 'core' | 'enterprise' | 'industry' | 'backend';
  icon: string;
  shortDescription: string;
  fullDescription: string;
  keyCapabilities: string[];
  deliverables: string[];
}

export interface ProjectSample {
  id: string;
  title: string;
  projectType: ProjectType;
  typeLabel: 'Sample Project' | 'Example Solution';
  shortDescription: string;
  fullOverview: string;
  businessProblem: string;
  solution: string;
  keyFeatures: string[];
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    devops?: string[];
  };
  developmentProcess: string[];
  projectStatus: 'Architecture Prototype' | 'Sample Specification' | 'Reference Implementation' | 'Example Solution';
  previewStats: { label: string; value: string }[];
  uiMockup: {
    headline: string;
    metrics: { label: string; value: string; change: string }[];
    recentActivity: string[];
    keyModules: string[];
  };
}

export interface TeamMemberRole {
  id: string;
  role: string;
  count?: string;
  isFounder?: boolean;
  name?: string;
  email?: string;
  focusArea: string;
  responsibilities: string[];
  coreSkills: string[];
}

export interface ProjectEnquiry {
  id: string;
  referenceNumber: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  projectType: ProjectType;
  businessType: string;
  projectDescription: string;
  requiredFeatures: string;
  preferredTechnology: string;
  estimatedBudget: string;
  expectedTimeline: string;
  additionalRequirements: string;
  status: EnquiryStatus;
  createdAt: string;
  notes?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}
