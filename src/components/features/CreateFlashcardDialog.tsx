
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Zap, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface FlashcardItem {
  front: string;
  back: string;
}

interface CreateFlashcardDialogProps {
  onSave: (setName: string, cards: FlashcardItem[]) => void;
  trigger?: React.ReactNode;
}

const CreateFlashcardDialog = ({ onSave, trigger }: CreateFlashcardDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [setName, setSetName] = useState("");
  const [cards, setCards] = useState<FlashcardItem[]>([
    { front: "", back: "" }
  ]);
  const { toast } = useToast();

  const handleAddCard = () => {
    setCards([...cards, { front: "", back: "" }]);
  };

  const handleRemoveCard = (index: number) => {
    if (cards.length > 1) {
      setCards(cards.filter((_, i) => i !== index));
    } else {
      toast({
        title: "Cannot remove card",
        description: "A flashcard set must have at least one card",
        variant: "destructive"
      });
    }
  };

  const handleCardChange = (index: number, field: "front" | "back", value: string) => {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;
    setCards(updatedCards);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!setName.trim()) {
      toast({
        title: "Set name required",
        description: "Please enter a name for your flashcard set",
        variant: "destructive"
      });
      return;
    }

    // Check if any card is empty
    const emptyCards = cards.filter(card => !card.front.trim() || !card.back.trim());
    if (emptyCards.length > 0) {
      toast({
        title: "Incomplete flashcards",
        description: "Please fill in both sides of all flashcards",
        variant: "destructive"
      });
      return;
    }

    // Save the flashcards
    onSave(setName, cards);
    
    // Reset form
    setSetName("");
    setCards([{ front: "", back: "" }]);
    setIsOpen(false);
    
    toast({
      title: "Flashcards created",
      description: `Created ${cards.length} new flashcards in "${setName}"`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="spark-button-primary button-click-effect">
            <Plus className="mr-2 h-4 w-4" /> Create New Set
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-spark-primary" />
            Create New Flashcard Set
          </DialogTitle>
          <DialogDescription>
            Create a set of flashcards to help you study
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-2">
          <div className="space-y-2">
            <Label htmlFor="setName">Set Name</Label>
            <Input
              id="setName"
              value={setName}
              onChange={(e) => setSetName(e.target.value)}
              placeholder="e.g., Biology Terms"
              className="w-full"
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Flashcards</h4>
              <span className="text-sm text-muted-foreground">{cards.length} cards</span>
            </div>
            
            {cards.map((card, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3 bg-muted/30">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-medium">Card {index + 1}</h5>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleRemoveCard(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`front-${index}`}>Front</Label>
                  <Input
                    id={`front-${index}`}
                    value={card.front}
                    onChange={(e) => handleCardChange(index, "front", e.target.value)}
                    placeholder="Question or term"
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`back-${index}`}>Back</Label>
                  <Textarea
                    id={`back-${index}`}
                    value={card.back}
                    onChange={(e) => handleCardChange(index, "back", e.target.value)}
                    placeholder="Answer or definition"
                    className="w-full min-h-[80px]"
                  />
                </div>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              className="w-full border-dashed"
              onClick={handleAddCard}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Card
            </Button>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Flashcard Set</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFlashcardDialog;
