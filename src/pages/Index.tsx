import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState(['', '', '', '']);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [attemptsCount, setAttemptsCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 14, hours: 5, minutes: 30, seconds: 0 });
  const statsRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            let count = 0;
            const target = 156;
            const duration = 2000;
            const increment = target / (duration / 16);
            const counter = setInterval(() => {
              count += increment;
              if (count >= target) {
                setAttemptsCount(target);
                clearInterval(counter);
              } else {
                setAttemptsCount(Math.floor(count));
              }
            }, 16);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const handleCodeInput = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleTryCode = () => {
    setTimeout(() => {
      toast({
        title: "Неверный код! 🔒",
        description: "Чтобы получить настоящие попытки, запишитесь на процедуры!",
        variant: "destructive"
      });
    }, 1500);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Здравствуйте! Хочу записаться на процедуру и поучаствовать в акции "Сейф с красотой"');
    window.open(`https://wa.me/79181352147?text=${message}`, '_blank');
  };

  const scrollToForm = () => {
    document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
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
            onClick={scrollToForm}
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white text-lg px-12 py-6 rounded-full shadow-2xl animate-pulse-glow font-inter font-medium"
          >
            Узнать подробности
            <Icon name="ChevronDown" className="ml-2" size={24} />
          </Button>
        </div>
      </section>

      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-primary via-primary/90 to-primary text-white rounded-3xl p-8 md:p-12 shadow-2xl" ref={statsRef}>
            <h2 className="font-cormorant text-3xl md:text-5xl font-bold text-center mb-4">Акция заканчивается через:</h2>
            <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto mb-8">
              {[
                { value: timeLeft.days, label: 'Дней' },
                { value: timeLeft.hours, label: 'Часов' },
                { value: timeLeft.minutes, label: 'Минут' },
                { value: timeLeft.seconds, label: 'Секунд' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 mb-2">
                    <span className="font-cormorant text-3xl md:text-5xl font-bold">{String(item.value).padStart(2, '0')}</span>
                  </div>
                  <p className="text-white/90 text-sm md:text-base font-inter">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="text-center border-t border-white/20 pt-6">
              <p className="font-inter text-xl mb-2">Попыток уже разыграно:</p>
              <p className="font-cormorant text-5xl md:text-6xl font-bold">{attemptsCount}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-cormorant text-4xl md:text-6xl font-bold text-center mb-16 text-foreground">
            Как это работает?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: 'Sparkles',
                title: 'Посещай процедуры',
                description: 'Приходи на процедуры и покупай косметику в нашем кабинете'
              },
              {
                icon: 'Gift',
                title: 'Получай попытки',
                description: 'За каждые 5 000 руб. получай 3 попытки подобрать код'
              },
              {
                icon: 'Lock',
                title: 'Подойди к сейфу',
                description: 'Вводи комбинации и пробуй открыть сейф с призом'
              },
              {
                icon: 'Trophy',
                title: 'Выиграй абонемент',
                description: 'Открой сейф и получи годовой абонемент на уход!'
              }
            ].map((step, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-8 text-center">
                  <div className="bg-secondary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <Icon name={step.icon} size={40} className="text-primary" />
                  </div>
                  <h3 className="font-cormorant text-2xl font-semibold mb-4 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground font-inter">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-cormorant text-4xl md:text-6xl font-bold text-center mb-8 text-foreground">
              Что в сейфе?
            </h2>
            <p className="text-center text-xl md:text-2xl mb-12 text-muted-foreground font-inter">
              Внутри сейфа — твой Годовой абонемент на красоту!<br />
              <span className="text-primary font-semibold">Общая стоимость приза превышает 100 000 рублей</span>
            </p>
            
            <Card className="border-2 border-primary/20">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-4">
                  {[
                    'Курс биоревитализации (3 процедуры)',
                    'Процедура БТА (ботулотоксин типа А)',
                    'Ежемесячные уходы по типу кожи',
                    'Пилинги и маски',
                    'Персональная консультация и подбор домашней косметики'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="bg-primary/10 rounded-full p-2 group-hover:bg-primary/20 transition-colors">
                        <Icon name="Check" size={20} className="text-primary" />
                      </div>
                      <p className="text-lg font-inter text-foreground pt-1">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-cormorant text-4xl md:text-6xl font-bold text-center mb-4 text-foreground">
            Отзывы наших клиентов
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg font-inter">
            Узнайте, что говорят те, кто уже побывал у нас
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {[
              {
                name: 'Анна Морозова',
                text: 'Потрясающая атмосфера и профессиональный подход! После курса биоревитализации кожа просто сияет. Акция с сейфом добавляет азарта — обязательно попробую свою удачу!',
                rating: 5
              },
              {
                name: 'Екатерина Волкова',
                text: 'Лана — мастер своего дела! Процедуры проходят комфортно, результат виден сразу. А акция — это просто гениально! Уже копила на процедуры, теперь ещё и шанс выиграть абонемент!',
                rating: 5
              },
              {
                name: 'Мария Соколова',
                text: 'Хожу в студию уже год. Качество процедур на высоте, цены адекватные. Сейф с призом — отличная мотивация! Надеюсь, мне повезёт открыть его первой 😊',
                rating: 5
              }
            ].map((review, index) => (
              <Card key={index} className="border-2 hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={20} className="text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground font-inter mb-6 italic">"{review.text}"</p>
                  <div className="text-center">
                    <p className="font-cormorant text-xl font-semibold text-foreground">{review.name}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="font-cormorant text-4xl md:text-6xl font-bold text-center mb-8 text-foreground">
            Попробуй свои силы!
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg font-inter max-w-2xl mx-auto">
            Хочешь увидеть, как выглядит наш настоящий сейф?<br />
            Попробуй демо-режим прямо сейчас!
          </p>
          
          <div className="max-w-md mx-auto">
            <div 
              className="relative bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-600 rounded-3xl p-12 shadow-2xl cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30 rounded-3xl" />
              
              <div className="relative text-center">
                <Icon name="LockKeyhole" size={80} className="text-white/90 mx-auto mb-6" />
                <h3 className="font-cormorant text-3xl font-bold text-white mb-4">
                  Сейф с мечтой
                </h3>
                <p className="text-white/80 font-inter mb-6">
                  Нажми, чтобы попробовать взломать
                </p>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <Icon name="MousePointer2" size={24} className="text-white animate-bounce mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="booking-form" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-cormorant text-4xl md:text-6xl font-bold text-center mb-8 text-foreground">
              Начни свой путь к призу<br />прямо сейчас!
            </h2>
            <p className="text-center text-muted-foreground mb-12 text-lg font-inter">
              Запишись на процедуру и получи свои первые попытки открыть сейф
            </p>
            
            <Card className="border-2 border-primary/20 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-6 py-3 rounded-full mb-6">
                      <Icon name="MessageCircle" size={24} className="text-green-600" />
                      <span className="font-inter font-medium">Быстрая запись через WhatsApp</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleWhatsAppClick}
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6 rounded-full font-inter font-medium shadow-lg"
                    size="lg"
                  >
                    <Icon name="MessageCircle" className="mr-2" size={24} />
                    Записаться через WhatsApp
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground font-inter">
                      Нажмите на кнопку, и мы откроем чат в WhatsApp<br />
                      для быстрой записи на процедуру
                    </p>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <p className="text-center text-sm text-muted-foreground font-inter mb-3">
                      Или свяжитесь с нами по телефону:
                    </p>
                    <a href="tel:+79181352147" className="block text-center">
                      <Button variant="outline" size="lg" className="font-inter text-lg">
                        <Icon name="Phone" className="mr-2" size={20} />
                        +7 (918) 135-21-47
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-cormorant text-2xl font-bold mb-4">
                Эстетик-студия<br />Ланы Рудневой<br />«Мой косметолог»
              </h3>
            </div>
            
            <div>
              <h4 className="font-inter font-semibold mb-3">Контакты</h4>
              <div className="space-y-2 text-white/80 font-inter">
                <p className="flex items-center gap-2">
                  <Icon name="MapPin" size={18} />
                  г. Краснодар, ул. Рылеева 179/1
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={18} />
                  +7 (918) 135-21-47
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-inter font-semibold mb-3">Мы в соцсетях</h4>
              <div className="flex gap-4">
                <a 
                  href="https://t.me/lana_cosmetology" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                  aria-label="Telegram"
                >
                  <Icon name="Send" size={20} />
                </a>
                <a 
                  href="https://vk.com/kosmetologiya_krd" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                  aria-label="ВКонтакте"
                >
                  <Icon name="Share2" size={20} />
                </a>
                <a 
                  href="https://wa.me/79181352147" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                  aria-label="WhatsApp"
                >
                  <Icon name="MessageCircle" size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-6 text-center text-white/60 font-inter text-sm">
            <p>© 2024 Эстетик-студия Ланы Рудневой. Все права защищены.</p>
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
          </div>
        </div>
      </footer>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
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
                    onChange={(e) => handleCodeInput(index, e.target.value)}
                    className="w-14 h-14 text-center text-2xl font-bold bg-white/90"
                  />
                ))}
              </div>
              
              <Button 
                onClick={handleTryCode}
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
                  setIsModalOpen(false);
                  handleWhatsAppClick();
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
    </div>
  );
};

export default Index;