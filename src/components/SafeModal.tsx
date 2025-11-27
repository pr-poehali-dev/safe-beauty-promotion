import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface SafeModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  code: string[];
  onCodeInput: (index: number, value: string) => void;
  onTryCode: () => void;
  onWhatsAppClick: () => void;
}

const SafeModal = ({ isOpen, onOpenChange, code, onCodeInput, onTryCode, onWhatsAppClick }: SafeModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-cormorant text-3xl text-center">Взлом сейфа</DialogTitle>
        </DialogHeader>
        
        <div className="py-8">
          <div className="bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-600 rounded-2xl p-8 mb-6">
            <div className="flex justify-center mb-6">
              <Icon name="LockKeyhole" size={60} className="text-white" />
            </div>
            
            <div className="flex justify-center gap-3 mb-6">
              {code.map((digit, index) => (
                <Input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => onCodeInput(index, e.target.value)}
                  className="w-14 h-14 text-center text-2xl font-bold bg-white/90"
                />
              ))}
            </div>
            
            <Button 
              onClick={onTryCode}
              className="w-full bg-white text-amber-600 hover:bg-white/90 font-inter font-semibold"
              disabled={code.some(d => !d)}
            >
              Попробовать код
            </Button>
          </div>
          
          <div className="bg-muted rounded-xl p-6 text-center">
            <p className="text-sm text-muted-foreground font-inter mb-4">
              Это демо-режим для примера.<br />
              Чтобы получить настоящие попытки, запишитесь на процедуры!
            </p>
            <Button 
              onClick={() => {
                onOpenChange(false);
                onWhatsAppClick();
              }}
              className="w-full font-inter bg-green-600 hover:bg-green-700 text-white"
            >
              <Icon name="MessageCircle" className="mr-2" size={18} />
              Записаться через WhatsApp
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SafeModal;
