import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { KPICard } from '@/components/ui/kpi-card';
import { CampaignCard } from '@/components/campaigns/CampaignCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { dashboardStats, campaigns, Campaign } from '@/data/mockData';
import { 
  Plus, 
  Mail, 
  FileText, 
  Sparkles, 
  Users, 
  Eye, 
  MousePointer,
  LayoutGrid,
  List,
  Search,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    const matchesType = typeFilter === 'all' || campaign.type === typeFilter;
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  return (
    <AppLayout
      title="Dashboard"
      description="Overview of your email marketing performance"
      action={
        <Button onClick={() => navigate('/campaigns/new')} className="gap-2">
          <Plus className="h-4 w-4" />
          New Campaign
        </Button>
      }
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <KPICard
          title="Total Campaigns"
          value={dashboardStats.totalCampaigns}
          icon={Mail}
          variant="primary"
          trend={{ value: 12, isPositive: true }}
        />
        <KPICard
          title="Manual Campaigns"
          value={dashboardStats.manualCampaigns}
          icon={FileText}
        />
        <KPICard
          title="AI Campaigns"
          value={dashboardStats.aiCampaigns}
          icon={Sparkles}
          variant="primary"
        />
        <KPICard
          title="Total Recipients"
          value={dashboardStats.totalRecipients.toLocaleString()}
          icon={Users}
        />
        <KPICard
          title="Open Rate"
          value={`${dashboardStats.overallOpenRate}%`}
          icon={Eye}
          variant="success"
          trend={{ value: 3.2, isPositive: true }}
        />
        <KPICard
          title="Click Rate"
          value={`${dashboardStats.overallClickRate}%`}
          icon={MousePointer}
          variant="success"
          trend={{ value: 1.5, isPositive: true }}
        />
      </div>

      {/* Campaigns Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Campaigns</h2>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Filters */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="ai_personalized">AI Personalized</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="flex items-center border border-border rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Campaign Grid/List */}
        {filteredCampaigns.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' 
            : 'space-y-3'
          }>
            {filteredCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                onClick={() => navigate(`/campaigns/${campaign.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">No campaigns found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try adjusting your filters or create a new campaign
            </p>
            <Button onClick={() => navigate('/campaigns/new')} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Campaign
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
