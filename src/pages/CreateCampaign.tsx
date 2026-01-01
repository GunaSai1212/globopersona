import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { 
  ArrowLeft, 
  ArrowRight,
  Sparkles,
  FileText,
  Check,
  Users,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { emailLists, contacts } from '@/data/mockData';
import { AIStrategistModal } from '@/components/campaigns/AIStrategistModal';
import { useToast } from '@/hooks/use-toast';

export default function CreateCampaign() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignName, setCampaignName] = useState('');
  const [campaignType, setCampaignType] = useState<'ai_personalized' | 'manual'>('ai_personalized');
  const [selectedList, setSelectedList] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);

  const steps = [
    { number: 1, title: 'Campaign Setup' },
    { number: 2, title: 'Select Audience' },
  ];

  const listContacts = contacts.filter(c => c.listId === selectedList);

  const handleSelectAll = () => {
    if (selectedContacts.length === listContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(listContacts.map(c => c.id));
    }
  };

  const handleSelectContact = (contactId: string) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter(id => id !== contactId));
    } else {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && !campaignName.trim()) {
      toast({
        title: 'Campaign name required',
        description: 'Please enter a name for your campaign',
        variant: 'destructive',
      });
      return;
    }
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleContinueWithContacts = () => {
    if (selectedContacts.length === 0) {
      toast({
        title: 'No contacts selected',
        description: 'Please select at least one contact',
        variant: 'destructive',
      });
      return;
    }
    
    if (campaignType === 'ai_personalized') {
      setShowAIModal(true);
    } else {
      toast({
        title: 'Campaign created!',
        description: `"${campaignName}" has been created as a draft.`,
      });
      navigate('/campaigns');
    }
  };

  return (
    <AppLayout
      title="Create Campaign"
      description="Set up a new email campaign"
      action={
        <Button variant="ghost" onClick={() => navigate('/campaigns')} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Campaigns
        </Button>
      }
    >
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-all',
                    currentStep >= step.number
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-muted-foreground'
                  )}
                >
                  {currentStep > step.number ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={cn(
                    'mt-2 text-sm font-medium',
                    currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'mx-4 h-0.5 w-20 transition-colors',
                    currentStep > step.number ? 'bg-primary' : 'bg-border'
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Campaign Details
                </h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="campaignName">
                      Campaign Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="campaignName"
                      placeholder="e.g., Q1 Product Launch"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Campaign Type</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setCampaignType('ai_personalized')}
                        className={cn(
                          'relative flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all hover:border-primary/50',
                          campaignType === 'ai_personalized'
                            ? 'border-primary bg-primary/5'
                            : 'border-border'
                        )}
                      >
                        <div className={cn(
                          'flex h-12 w-12 items-center justify-center rounded-full',
                          campaignType === 'ai_personalized'
                            ? 'gradient-primary'
                            : 'bg-muted'
                        )}>
                          <Sparkles className={cn(
                            'h-6 w-6',
                            campaignType === 'ai_personalized'
                              ? 'text-primary-foreground'
                              : 'text-muted-foreground'
                          )} />
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-foreground">AI Personalized</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Let AI craft unique emails for each recipient
                          </p>
                        </div>
                        {campaignType === 'ai_personalized' && (
                          <div className="absolute top-3 right-3">
                            <Check className="h-5 w-5 text-primary" />
                          </div>
                        )}
                      </button>

                      <button
                        onClick={() => setCampaignType('manual')}
                        className={cn(
                          'relative flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all hover:border-primary/50',
                          campaignType === 'manual'
                            ? 'border-primary bg-primary/5'
                            : 'border-border'
                        )}
                      >
                        <div className={cn(
                          'flex h-12 w-12 items-center justify-center rounded-full',
                          campaignType === 'manual'
                            ? 'gradient-primary'
                            : 'bg-muted'
                        )}>
                          <FileText className={cn(
                            'h-6 w-6',
                            campaignType === 'manual'
                              ? 'text-primary-foreground'
                              : 'text-muted-foreground'
                          )} />
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-foreground">Manual</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Write and customize emails yourself
                          </p>
                        </div>
                        {campaignType === 'manual' && (
                          <div className="absolute top-3 right-3">
                            <Check className="h-5 w-5 text-primary" />
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Select Target Audience
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email List</Label>
                    <Select value={selectedList} onValueChange={(value) => {
                      setSelectedList(value);
                      setSelectedContacts([]);
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an email list" />
                      </SelectTrigger>
                      <SelectContent>
                        {emailLists.map((list) => (
                          <SelectItem key={list.id} value={list.id}>
                            {list.name} ({list.contactCount} contacts)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedList && (
                    <div className="rounded-lg border border-border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead className="w-12">
                              <Checkbox
                                checked={selectedContacts.length === listContacts.length && listContacts.length > 0}
                                onCheckedChange={handleSelectAll}
                              />
                            </TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Title</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {listContacts.map((contact) => (
                            <TableRow key={contact.id}>
                              <TableCell>
                                <Checkbox
                                  checked={selectedContacts.includes(contact.id)}
                                  onCheckedChange={() => handleSelectContact(contact.id)}
                                />
                              </TableCell>
                              <TableCell className="font-medium">{contact.email}</TableCell>
                              <TableCell>{contact.firstName} {contact.lastName}</TableCell>
                              <TableCell>{contact.company}</TableCell>
                              <TableCell>{contact.jobTitle}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              </div>

              {selectedContacts.length > 0 && (
                <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {selectedContacts.length} contacts selected
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Ready to create personalized emails
                      </p>
                    </div>
                  </div>
                  <Button onClick={handleContinueWithContacts} className="gap-2">
                    Continue with {selectedContacts.length} contacts
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : navigate('/campaigns')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </Button>
          
          {currentStep < 2 && (
            <Button onClick={handleNext} className="gap-2">
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* AI Strategist Modal */}
      <AIStrategistModal 
        open={showAIModal} 
        onClose={() => setShowAIModal(false)}
        campaignName={campaignName}
        contactCount={selectedContacts.length}
      />
    </AppLayout>
  );
}
