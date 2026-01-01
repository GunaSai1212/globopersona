import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { KPICard } from '@/components/ui/kpi-card';
import { EmailListCard } from '@/components/email-lists/EmailListCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { emailLists } from '@/data/mockData';
import { 
  Plus, 
  Users, 
  UserPlus, 
  BarChart3,
  Search,
  Upload,
  LayoutGrid,
  List,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EmailLists() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const totalContacts = emailLists.reduce((acc, list) => acc + list.contactCount, 0);
  const avgQuality = Math.round(
    emailLists.reduce((acc, list) => acc + list.dataQualityScore, 0) / emailLists.length
  );

  const filteredLists = emailLists.filter((list) => {
    const matchesStatus = statusFilter === 'all' || list.status === statusFilter;
    const matchesSearch = list.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <AppLayout
      title="Email Lists"
      description="Manage your contact lists and segments"
      action={
        <Button onClick={() => navigate('/email-lists/upload')} className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Email List
        </Button>
      }
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KPICard
          title="Total Lists"
          value={emailLists.length}
          icon={Users}
          variant="primary"
        />
        <KPICard
          title="Total Contacts"
          value={totalContacts.toLocaleString()}
          icon={Users}
          trend={{ value: 8.4, isPositive: true }}
        />
        <KPICard
          title="New This Month"
          value="2,450"
          icon={UserPlus}
          variant="success"
        />
        <KPICard
          title="Data Quality Score"
          value={`${avgQuality}%`}
          icon={BarChart3}
          variant="success"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-lg font-semibold text-foreground">Your Lists</h2>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search lists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="poor">Poor Quality</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
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

      {/* Email Lists Grid */}
      {filteredLists.length > 0 ? (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' 
          : 'space-y-3'
        }>
          {filteredLists.map((list) => (
            <EmailListCard
              key={list.id}
              list={list}
              onClick={() => navigate(`/email-lists/${list.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">No lists found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Try adjusting your filters or upload a new list
          </p>
          <Button onClick={() => navigate('/email-lists/upload')} className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Email List
          </Button>
        </div>
      )}
    </AppLayout>
  );
}
