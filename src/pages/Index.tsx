import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import HeroSection from '@/components/HeroSection';
import TimerAndStatsSection from '@/components/TimerAndStatsSection';
import SafeModal from '@/components/SafeModal';
import Footer from '@/components/Footer';

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState(['', '', '', '']);
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
      <HeroSection onScrollToForm={scrollToForm} />

      <TimerAndStatsSection 
        timeLeft={timeLeft} 
        attemptsCount={attemptsCount} 
        statsRef={statsRef} 
      />

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
                    'Курс биоревитализации (3 процедуры для идеального сияния и увлажнения кожи)',
                    'Процедура БТА для коррекции морщин',
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
                  <div className="text-center mb-4">
                    <h3 className="font-inter font-semibold text-lg text-foreground mb-2">Выберите удобный способ записи:</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button 
                      onClick={handleWhatsAppClick}
                      className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6 rounded-xl font-inter font-medium shadow-lg"
                      size="lg"
                    >
                      <Icon name="MessageCircle" className="mr-2" size={24} />
                      WhatsApp
                    </Button>
                    
                    <Button 
                      onClick={() => window.open('https://t.me/lana_kosmetolog_krd', '_blank')}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg py-6 rounded-xl font-inter font-medium shadow-lg"
                      size="lg"
                    >
                      <Icon name="Send" className="mr-2" size={24} />
                      Telegram
                    </Button>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground font-inter">
                      Нажмите на кнопку для быстрой записи на процедуру<br />
                      через WhatsApp или Telegram
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

      <Footer />

      <SafeModal 
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        code={code}
        onCodeInput={handleCodeInput}
        onTryCode={handleTryCode}
        onWhatsAppClick={handleWhatsAppClick}
      />
    </div>
  );
};

export default Index;