import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { 
  Sparkles, 
  Loader2, 
  Check, 
  RefreshCw, 
  ThumbsUp, 
  ThumbsDown,
  Edit3,
  X,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AIStrategistModalProps {
  open: boolean;
  onClose: () => void;
  campaignName: string;
  contactCount: number;
}

type ModalStep = 'generating' | 'review';

// Mock AI-generated email
const mockGeneratedEmail = {
  subject: "{{firstName}}, Quick Question About {{company}}'s Growth Strategy",
  body: `Hi {{firstName}},

I noticed that {{company}} has been making impressive strides in the market lately. As someone in the {{jobTitle}} role, you're probably dealing with the challenge of scaling operations while maintaining quality.

I wanted to reach out because we've helped similar companies in your space achieve 40% faster growth by streamlining their outreach processes.

Would you be open to a quick 15-minute chat this week to explore if there might be a fit?

Best regards,
John`,
  confidence: 87,
  tokens: 156,
};

export function AIStrategistModal({
  open,
  onClose,
  campaignName,
  contactCount,
}: AIStrategistModalProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<ModalStep>('generating');
  const [generationProgress, setGenerationProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(1);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const phases = [
    'Analyzing recipient profiles...',
    'Understanding company context...',
    'Identifying pain points...',
    'Crafting personalization hooks...',
    'Generating subject line...',
    'Composing email body...',
    'Optimizing for engagement...',
    'Finalizing email...',
  ];

  useEffect(() => {
    if (open && step === 'generating') {
      setGenerationProgress(0);
      setCurrentPhase(1);
      
      const interval = setInterval(() => {
        setGenerationProgress((prev) => {
          const next = prev + 2;
          setCurrentPhase(Math.min(Math.ceil(next / 12.5), 8));
          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setStep('review');
              setSubject(mockGeneratedEmail.subject);
              setBody(mockGeneratedEmail.body);
            }, 500);
          }
          return Math.min(next, 100);
        });
      }, 80);

      return () => clearInterval(interval);
    }
  }, [open, step]);

  const handleRegenerate = () => {
    setStep('generating');
    setGenerationProgress(0);
    setCurrentPhase(1);
  };

  const handleApprove = () => {
    toast({
      title: 'Campaign approved!',
      description: `"${campaignName}" is now ready to send to ${contactCount} recipients.`,
    });
    onClose();
    navigate('/campaigns');
  };

  const handleReject = () => {
    toast({
      title: 'Email rejected',
      description: 'The AI will generate a new version.',
    });
    handleRegenerate();
  };

  const handleClose = () => {
    setStep('generating');
    setGenerationProgress(0);
    setCurrentPhase(1);
    onClose();
  };

  // Highlight personalization tokens
  const highlightTokens = (text: string) => {
    return text.split(/(\{\{[^}]+\}\})/).map((part, i) => {
      if (part.match(/\{\{[^}]+\}\}/)) {
        return (
          <span key={i} className="bg-primary/20 text-primary px-1 rounded font-medium">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden">
        {/* Gradient Header */}
        <div className="gradient-primary p-6 text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/20">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-primary-foreground">
                AI Email Strategist
              </DialogTitle>
              <p className="text-primary-foreground/80 text-sm mt-0.5">
                Crafting personalized emails for {contactCount} recipients
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 'generating' && (
              <motion.div
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Step {currentPhase} of 8
                    </span>
                    <span className="font-medium text-foreground">
                      {generationProgress}%
                    </span>
                  </div>
                  <Progress value={generationProgress} className="h-2" />
                </div>

                {/* Current Phase */}
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <span className="text-sm text-foreground">
                    {phases[currentPhase - 1]}
                  </span>
                </div>

                {/* Skeleton Preview */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                    <div className="h-10 w-full bg-muted animate-pulse rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-muted animate-pulse rounded" />
                      <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                      <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
                      <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'review' && (
              <motion.div
                key="review"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Confidence & Tokens */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-success" />
                      <span className="text-sm text-muted-foreground">
                        AI Confidence:
                      </span>
                      <span className="font-semibold text-success">
                        {mockGeneratedEmail.confidence}%
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Tokens: {mockGeneratedEmail.tokens}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="gap-1.5"
                  >
                    <Edit3 className="h-4 w-4" />
                    {isEditing ? 'Preview' : 'Edit'}
                  </Button>
                </div>

                {/* Subject Line */}
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Subject Line</Label>
                  {isEditing ? (
                    <Input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="font-medium"
                    />
                  ) : (
                    <div className="p-3 rounded-lg border border-border bg-muted/30">
                      <p className="font-medium text-foreground">
                        {highlightTokens(subject)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Email Body */}
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Email Body</Label>
                  {isEditing ? (
                    <Textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      rows={10}
                      className="font-mono text-sm"
                    />
                  ) : (
                    <div className="p-4 rounded-lg border border-border bg-muted/30 max-h-64 overflow-y-auto">
                      <div className="whitespace-pre-wrap text-sm text-foreground leading-relaxed">
                        {highlightTokens(body)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <Button
                    onClick={handleApprove}
                    className="flex-1 gap-2"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleRegenerate}
                    className="gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Regenerate
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleReject}
                    className="text-destructive hover:text-destructive gap-2"
                  >
                    <ThumbsDown className="h-4 w-4" />
                    Reject
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
