import { RefObject } from 'react';

interface TimerAndStatsSectionProps {
  timeLeft: { days: number; hours: number; minutes: number; seconds: number };
  attemptsCount: number;
  statsRef: RefObject<HTMLDivElement>;
}

const TimerAndStatsSection = ({ timeLeft, attemptsCount, statsRef }: TimerAndStatsSectionProps) => {
  return (
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
  );
};

export default TimerAndStatsSection;
