import { useState, useCallback } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { 
  ArrowLeft, 
  ArrowRight,
  Upload,
  FileText,
  Check,
  X,
  AlertCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface FieldMapping {
  csvColumn: string;
  systemField: string;
  isRequired: boolean;
}

const systemFields = [
  { value: 'email', label: 'Email', required: true },
  { value: 'firstName', label: 'First Name', required: false },
  { value: 'lastName', label: 'Last Name', required: false },
  { value: 'jobTitle', label: 'Job Title', required: false },
  { value: 'company', label: 'Company Name', required: false },
  { value: 'website', label: 'Website', required: false },
  { value: 'skip', label: 'Skip this column', required: false },
];

// Mock CSV data for preview
const mockCsvColumns = ['Email Address', 'First', 'Last', 'Title', 'Company', 'URL'];
const mockCsvData = [
  { 'Email Address': 'john@example.com', 'First': 'John', 'Last': 'Smith', 'Title': 'CEO', 'Company': 'Acme Inc', 'URL': 'acme.com' },
  { 'Email Address': 'sarah@startup.io', 'First': 'Sarah', 'Last': 'Jones', 'Title': 'CTO', 'Company': 'Startup.io', 'URL': 'startup.io' },
  { 'Email Address': 'mike@tech.co', 'First': 'Mike', 'Last': 'Chen', 'Title': 'VP Sales', 'Company': 'Tech Co', 'URL': 'tech.co' },
];

export default function UploadEmailList() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [listName, setListName] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fieldMappings, setFieldMappings] = useState<Record<string, string>>({});

  const steps = [
    { number: 1, title: 'List Information' },
    { number: 2, title: 'Upload CSV' },
    { number: 3, title: 'Map Fields' },
  ];

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      setUploadedFile(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && !listName.trim()) {
      toast({
        title: 'List name required',
        description: 'Please enter a name for your email list',
        variant: 'destructive',
      });
      return;
    }
    if (currentStep === 2 && !uploadedFile) {
      toast({
        title: 'File required',
        description: 'Please upload a CSV file',
        variant: 'destructive',
      });
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    // Check if email is mapped
    const emailMapped = Object.values(fieldMappings).includes('email');
    if (!emailMapped) {
      toast({
        title: 'Email field required',
        description: 'Please map a column to the Email field',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Email list created!',
      description: `"${listName}" has been uploaded successfully with ${mockCsvData.length} contacts.`,
    });
    navigate('/email-lists');
  };

  const isEmailMapped = Object.values(fieldMappings).includes('email');

  return (
    <AppLayout
      title="Upload Email List"
      description="Import your contacts from a CSV file"
      action={
        <Button variant="ghost" onClick={() => navigate('/email-lists')} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Lists
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
      <div className="max-w-2xl mx-auto">
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
                  List Information
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="listName">
                      List Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="listName"
                      placeholder="e.g., Q1 Enterprise Leads"
                      value={listName}
                      onChange={(e) => setListName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Add a description for this list..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                    />
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
                  Upload CSV File
                </h3>
                
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={cn(
                    'relative rounded-xl border-2 border-dashed p-12 text-center transition-all',
                    isDragging
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50',
                    uploadedFile && 'border-success bg-success/5'
                  )}
                >
                  {uploadedFile ? (
                    <div className="space-y-3">
                      <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-success/10">
                        <FileText className="h-7 w-7 text-success" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{uploadedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(uploadedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setUploadedFile(null)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-muted">
                        <Upload className="h-7 w-7 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          Drag and drop your CSV file here
                        </p>
                        <p className="text-sm text-muted-foreground">
                          or click to browse
                        </p>
                      </div>
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileSelect}
                        className="absolute inset-0 cursor-pointer opacity-0"
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Map Fields
                  </h3>
                  {!isEmailMapped && (
                    <div className="flex items-center gap-2 text-warning text-sm">
                      <AlertCircle className="h-4 w-4" />
                      Email field is required
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {mockCsvColumns.map((column) => (
                    <div
                      key={column}
                      className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm text-foreground">{column}</p>
                        <p className="text-xs text-muted-foreground">
                          Sample: {mockCsvData[0][column as keyof typeof mockCsvData[0]]}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      <Select
                        value={fieldMappings[column] || ''}
                        onValueChange={(value) =>
                          setFieldMappings({ ...fieldMappings, [column]: value })
                        }
                      >
                        <SelectTrigger className="w-44">
                          <SelectValue placeholder="Select field" />
                        </SelectTrigger>
                        <SelectContent>
                          {systemFields.map((field) => (
                            <SelectItem key={field.value} value={field.value}>
                              {field.label}
                              {field.required && ' *'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Data Preview
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        {mockCsvColumns.map((column) => (
                          <th
                            key={column}
                            className="px-3 py-2 text-left font-medium text-muted-foreground"
                          >
                            {fieldMappings[column] || column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockCsvData.map((row, i) => (
                        <tr key={i} className="border-b border-border last:border-0">
                          {mockCsvColumns.map((column) => (
                            <td key={column} className="px-3 py-2 text-foreground">
                              {row[column as keyof typeof row]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          
          {currentStep < 3 ? (
            <Button onClick={handleNext} className="gap-2">
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleComplete} className="gap-2">
              <Check className="h-4 w-4" />
              Complete Upload
            </Button>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
