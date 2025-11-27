import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  onScrollToForm: () => void;
}

const HeroSection = ({ onScrollToForm }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/projects/4dc239ac-5532-4d98-8627-7ae12682aa01/files/3ef126d8-283a-4944-8a5a-654497719e4f.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.6)'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background z-0" />
      
      <div className="relative z-10 container mx-auto px-4 text-center text-white animate-fade-in">
        <h1 className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          Взломай сейф<br />и выиграй год<br />ухода за кожей!
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 font-light">
          Получи шанс открыть сейф с абонементом на премиальные<br />процедуры за каждые 5 000 рублей в нашем кабинете
        </p>
        <Button 
          onClick={onScrollToForm}
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-white text-lg px-12 py-6 rounded-full shadow-2xl animate-pulse-glow font-inter font-medium"
        >
          Узнать подробности
          <Icon name="ChevronDown" className="ml-2" size={24} />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
