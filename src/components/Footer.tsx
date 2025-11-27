import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
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
  );
};

export default Footer;
