export type SkillSourceType =
  | 'instagram_reel'
  | 'tiktok'
  | 'facebook_reel'
  | 'youtube'
  | 'pdf'
  | 'web_page'
  | 'seed_course';

export interface SkillSourceItem {
  id: string;
  title: string;
  url: string;
  sourceType: SkillSourceType;
  creator: string;
  addedAt: string;
  rawTranscript: string;
  screenOcrFindings: string[];
  deepResearchNotes: string[];
  extractedStepsCount: number;
  versionCreated: string;
}

export interface SkillStep {
  id: string;
  order: number;
  title: string;
  actionDescription: string;
  exactCommandsOrClicks: string[];
  proTip?: string;
  sourceAttribution: string;
  completed?: boolean;
}

export interface SkillResourceLink {
  id: string;
  name: string;
  url: string;
  category:
    | 'government_portal'
    | 'skip_tracing'
    | 'comps_data'
    | 'crm_dialer'
    | 'contract_template'
    | 'educational';
  isFree: boolean;
  howToUse: string;
  discoveredVia: 'video_audio' | 'screen_ocr' | 'deep_research' | 'seed';
}

export interface SkillScriptOrTemplate {
  id: string;
  title: string;
  type:
    | 'cold_call_script'
    | 'sms_template'
    | 'foia_request'
    | 'contract_clause'
    | 'negotiation_anchor';
  content: string;
  whenToUse: string;
}

export interface VersionChangelog {
  version: string;
  date: string;
  summaryOfNewKnowledge: string;
  sourceTitle: string;
  sourceType: SkillSourceType;
}

export type SkillExecutorType =
  | 'county_gov_finder'
  | 'deal_calculator'
  | 'skip_trace_hub'
  | 'contract_generator'
  | 'ai_playbook_runner';

export interface SkillModule {
  id: string;
  slug: string;
  title: string;
  category:
    | 'Market & Foundations'
    | 'Government Lists'
    | 'Lead Gen & D4D'
    | 'Skip Tracing & Outreach'
    | 'Deal Analysis & Offers'
    | 'Contracts & Dispo'
    | 'Custom Strategy';
  version: string;
  lastUpdated: string;
  masteryScore: number;
  summary: string;
  whyItWorks: string;
  steps: SkillStep[];
  resources: SkillResourceLink[];
  scriptsAndTemplates: SkillScriptOrTemplate[];
  sources: SkillSourceItem[];
  changelog: VersionChangelog[];
  executorType: SkillExecutorType;
  agyExportedPath?: string;
}

export interface VerifiedCashBuyer {
  id: string;
  name: string;
  companyOrGroup: string;
  platform:
    | 'facebook_group'
    | 'reddit'
    | 'biggerpockets'
    | 'builder_database'
    | 'reel_buyer'
    | 'web_directory';
  market: string;
  buyBoxType:
    | 'Fix & Flip'
    | 'Section 8 Rental'
    | 'Land / Home Builder'
    | 'Multifamily / Creative';
  maxPrice: string;
  contactInfo: string;
  sourceUrl: string;
  notes: string;
  verified: boolean;
  // Deep Buyer & Creator Intelligence Fields (Module 3 Upgrade)
  creatorHandle?: string;
  finderPayoutOffer?: string;
  dealRequirementMode?: 'contract_signed' | 'lead_only_birddog' | 'both_accepted';
  dealRequirementLabel?: string;
  dealRequirementDetails?: string;
  propertySpecsWanted?: string;
  priceAndArvRange?: string;
  directContactChannels?: {
    dealPortalUrl?: string;
    socialDmUrl?: string;
    emailOrPhone?: string;
    communityUrl?: string;
  };
  readyPitchMessage?: string;
}

export interface MotivatedSellerLead {
  id: string;
  ownerName: string;
  propertyAddress: string;
  cityState: string;
  phone: string;
  email: string;
  leadSource:
    | 'Tax Foreclosure GIS'
    | 'Pre-Foreclosure Auction'
    | 'Zillow FSBO'
    | 'Code Violation'
    | 'Vacant Land'
    | 'Zillow Assumable 2.8%';
  estimatedArv: number;
  taxOrMortgageArrears: number;
  askingOrAssessedPrice: number;
  recommendedMaoOffer: number;
  lowball60Offer: number;
  status:
    | 'new'
    | 'contacted_sms_email'
    | 'in_call'
    | 'deal_agreed_yes'
    | 'contract_signed'
    | 'renegotiation_pending'
    | 'cancelled_mutual_release'
    | 'dead_dnc';
  notes?: string;
  agreedPrice?: number;
  signedContractText?: string;
  priceAddendumText?: string;
  mutualReleaseText?: string;
  assignedBuyerName?: string;
  assignmentFeeProjected?: number;
}

export interface InstagramCreatorPartner {
  id: string;
  handle: string;
  fullName: string;
  profileUrl: string;
  reelsCount: number;
  reelUrls: string[];
  role: string;
  marketsTheyBuy: string;
  whatTheyLookFor: string;
  dealStructurePreference: string;
  customDmEnglish: string;
  customDmSpanish: string;
  outreachStatus: 'pending' | 'dm_sent' | 'replied_buybox' | 'active_partner';
}

export interface SkillDatabase {
  skills: SkillModule[];
  cashBuyers?: VerifiedCashBuyer[];
  sellerLeads?: MotivatedSellerLead[];
  igCreators?: InstagramCreatorPartner[];
  ingestionHistory: {
    id: string;
    timestamp: string;
    inputUrlOrFile: string;
    sourceType: SkillSourceType;
    targetSkillSlug: string;
    targetSkillTitle: string;
    oldVersion: string;
    newVersion: string;
    summary: string;
    screenOcrDetected: string[];
    webResearchAdded: string[];
  }[];
  settings: {
    autoExportToAntigravity: boolean;
    exportGlobalSkills: boolean;
    preferredModel: string;
  };
}
