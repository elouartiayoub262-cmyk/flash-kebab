import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ShoppingBag, 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  Twitter, 
  ChevronRight, 
  Star, 
  Zap, 
  Smartphone,
  ArrowRight,
  Info,
  UtensilsCrossed,
  Truck,
  ShieldCheck,
  RefreshCw,
  Plus,
  Trash2,
  Edit2,
  LogOut,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import DishImage from './components/DishImage';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Constants & Data ---
const IMAGES = {
  logo: '/fotos/flash.jpeg',
  heroBurger: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc31whJO0I2z1iCa42o1M7iO9U_43dmW54YHwaVdaPxuFcl5uLMiG4DCoOK7OJPEB-Pd2Avyph0FR7-HMXmlgJjTMeTBQ0ZjkboHRtPSoQHvGVQp84bBCMEKLsoIjeTg1DfHJAhPZzbWhGzh1xCj0NG5ZznEs_s947qPXovaSbwqV7zTHNVTUOuQR8ZzrMgVwTH4Fpj5hM5tokPe7RmlXYmGThb1GK04d1wkODj4Y-nYDA8AFpr9XSyYZrQhR2J2Fq8xj5zewdEK_M',
  combos: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuACmzuFMgpxGC2XnPMfFp2Lph-CFPVSd475ToDv9atCL5aeECTrwMyXBDZfKbmT7_kRlRfBbafBMG5albB1dvJzskRH_FpfMHCdltWXx2Q03dkEHkT1kHMIMeUYsKBGP5NzenMBXVIumn4W3lF9yD9WiTqZGS8DkcPvpDYo85GwVBuQ3l8i84qOugnTMJs_mFcdFajj_6PSjqK2-9RRfy0Mj328Z_-0nbbnOzD0Jpute5ESQtrVq6lS3wIq3cEoP3RcjcTh2tHDst8s',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCHuefpLILCtJbO1j50_2IwNonTyLN_EeUA1SRJ3LMmy2FblOzN8pe5nO4PhoCqAs8_ujoF8U2s64I-BSQEArG6hkH9TcbnbGSJz8ket5tXRja04OrKAzbDAqc-uVoFXhrIq7NklGYtnf2oAOLiJgCJ_ImqSN3k3RghCoUIxQVKWef8GYSM_XuIemD7JbL8CV-vg7wV7ivD6ed_N-YJO6gcsqz_nU4eqQ843rU4f3vvFxnzpgHgO6K2h9W_0KPZ1_1mrVivmJ6w2ul8',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBU90wVfwLjFkyYWkgYe42XbAZ5cI198RBNuasOI7HtyS4XmbA8u6dBbl_jSsfAFqGZ1RKqnX9ExsoOgQyjpvDw75DU9KW4i9XdVxJDzpLftRIS3v9KO84S3V0Ef4e7qeSu8Lv1Zpbro8ZBfebuoO87mcvdP3md9kHu7VJvUjZ_TWwXCy7iaaI3UjCrLpL1eb72zT2Q9wkT4Eh0KoeqKEt91IP3Qt98a8VDvzqXNZo893DJSXy76DZXr7wsZyLUiWqLGUoDRrSovZGL'
  ],
  menuItems: [],
  appMockup: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8ajMxalgncAwl_BD5y2Gktmv58otqlTres9DQFkBvvbV4YYjUv8L9S31xi_U9FOT_pZgE-kChaKsMmbKcYZOb-evih5_cMPxES8PaKv2OfGhACPSKaU5GV1fen9CX-mAX1iGOsw_hVijArKeYWcRuigcGXrnlv9Pj7_4Bo3wa8CJ3MINVB_khBZh-OoOfDcWhjv3Ndj5SYMzqNVb_pzSDfWHt5nnkJTZ5cT8LHwbglR52-K6MVt_J8q6mgcFtYpwiRrfpYdfsZjWq',
  map: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNEXp-SFzLwhT6o0ycblFJQNBYGk32xtBHNiNK8DH35SyYi-J10-RU5KlL-nGTTA0116UazrdPJKE4v2_N6a7_4LcqKE0cl0qkPxtW4Io2-VcoVu243YYCX4B4dddmIOxSr3Kf2Ak94sIbWLaNCL-Tr9cAV2TvfALjshy6xYJ4IiMnKH61aCmc8CjO_zMyaX0xl8UT-LyX4Qo3276X8iKvMY314kmZhdpVRjpvSP6ff5vBTTDzZSwSC6ojpIk3oMpH0m455IOMzzq0'
};

const CATEGORIES = [
  { name: 'Todos', icon: UtensilsCrossed },
  { name: 'Kebab & Durum', icon: UtensilsCrossed },
  { name: 'Hamburguesas', icon: UtensilsCrossed },
  { name: 'Tacos', icon: UtensilsCrossed },
  { name: 'Pizzas', icon: UtensilsCrossed },
  { name: 'Camperos & Sandwich', icon: UtensilsCrossed },
  { name: 'Ensaladas', icon: UtensilsCrossed },
  { name: 'Entrantes & Croquetas', icon: UtensilsCrossed },
  { name: 'Bebidas', icon: UtensilsCrossed },
  { name: 'Postres', icon: UtensilsCrossed }
];

const COMBOS_AHORRO = [
  { name: '3 Kebabs + Patatas', price: '15,00€', includes: 'Incluye Coca Cola 2L', img: '/fotos/Kebab Pollo.jpg' },
  { name: '5 Kebabs + Patatas', price: '23,00€', includes: 'Incluye Coca Cola 2L', img: '/fotos/Kebab Mixto.jpg' },
  { name: 'Kebab + Durum + Plato + Patatas', price: '18,00€', includes: 'Incluye Coca Cola 2L', img: '/fotos/Plato Kebab.jpg' },
  { name: 'Kebab + Durum + Patatas', price: '12,00€', includes: 'Incluye Coca Cola 2L', img: '/fotos/Durum Pollo.jpg' },
  { name: '4 Durums + Patatas', price: '21,00€', includes: 'Incluye Coca Cola 2L', img: '/fotos/Durum Ternera.jpg' },
  { name: '3 Durums + Patatas', price: '15,50€', includes: 'Incluye Coca Cola 2L', img: '/fotos/Durum Mixto.jpg' },
  { name: '2 Durums + Patatas', price: '10,00€', includes: 'Incluye Coca Cola 2L', img: '/fotos/Durum Pollo.jpg' },
  { name: '3 Box', price: '14,00€', includes: 'Incluye Coca Cola 2L', img: '/fotos/Taco Flash.jpg' },
  { name: '2 Pizzas Turcas + Patatas', price: '13,00€', includes: 'Incluye Coca Cola 2L', img: '/fotos/Pizza Turca (Lahmacun).jpg' },
  { name: '3 Platos', price: '18,00€', includes: 'Incluye Coca Cola 2L', img: '/fotos/Plato Kebab.jpg' },
  { name: '2 Pizzas (2 ingredientes a elegir)', price: '15,00€', includes: 'Incluye Coca Cola 2L', img: '/fotos/Pizza Flash.jpg' }
];

// --- Components ---

const Navbar = ({ currentView, setView }: { currentView: string, setView: (v: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', id: 'home' },
    { name: 'Carta', id: 'menu' },
    { name: 'Ofertas', id: 'offers' },
    { name: 'Sobre Nosotros', id: 'about' },
    { name: 'Contacto', id: 'contact' },
    { name: 'Admin', id: 'admin' }
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setView('home')}
        >
          <img src={IMAGES.logo} alt="Flash Kebab Logo" className="h-10 w-auto" referrerPolicy="no-referrer" />
          <span className="font-bold text-xl tracking-tight text-orange-600">FLASH KEBAB</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setView(link.id)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-orange-500",
                currentView === link.id ? "text-orange-600" : "text-gray-700"
              )}
            >
              {link.name}
            </button>
          ))}
          <button className="bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-orange-700 transition-all flex items-center gap-2 shadow-lg shadow-orange-200">
            <ShoppingBag size={18} />
            Pedir Ahora
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gray-800" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 p-6 flex flex-col gap-4 shadow-xl md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setView(link.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "text-lg font-medium text-left py-2",
                  currentView === link.id ? "text-orange-600" : "text-gray-700"
                )}
              >
                {link.name}
              </button>
            ))}
            <button className="bg-orange-600 text-white w-full py-4 rounded-xl font-bold mt-2">
              Pedir Ahora
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ setView }: { setView: (v: string) => void }) => {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-orange-50/50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-xs font-bold mb-6">
            <Zap size={14} fill="currentColor" />
            ENTREGA EN MENOS DE 30 MINUTOS
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-6">
            Sabor que llega <br />
            <span className="text-orange-600 italic">a la velocidad</span> <br />
            del rayo.
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-md">
            Disfruta de los mejores kebabs, burgers y pizzas de la ciudad. Ingredientes frescos, recetas auténticas y el servicio más rápido.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setView('menu')}
              className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-orange-700 transition-all shadow-xl shadow-orange-200"
            >
              Ver la Carta
              <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => setView('about')}
              className="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all"
            >
              Saber más
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <img 
                  key={i} 
                  src={`https://i.pravatar.cc/100?u=${i}`} 
                  className="w-10 h-10 rounded-full border-2 border-white" 
                  alt="User" 
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-yellow-500">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-xs text-gray-500 font-medium">+2,500 clientes satisfechos</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-orange-400/20 blur-[100px] rounded-full" />
          <DishImage 
            name="Smash Burguer" 
            description="Doble carne de ternera smash, cheddar, cebolla caramelizada y salsa secreta." 
            category="Hamburguesas"
            src="/fotos/Smash Burguer.jpg"
            className="relative z-10 w-full h-auto drop-shadow-2xl rounded-[3rem]" 
          />
          
          {/* Floating badges */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-4 -right-4 z-20 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
          >
            <div className="bg-green-100 text-green-600 p-2 rounded-xl">
              <Truck size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Envío Gratis</p>
              <p className="text-[10px] text-gray-500">En pedidos +20€</p>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-10 -left-10 z-20 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
          >
            <div className="bg-orange-100 text-orange-600 p-2 rounded-xl">
              <Star size={20} fill="currentColor" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">4.9 Rating</p>
              <p className="text-[10px] text-gray-500">Calidad Suprema</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { icon: Clock, title: "Entrega Flash", desc: "Tu comida caliente en tu puerta en menos de 30 minutos." },
    { icon: UtensilsCrossed, title: "Sabor Auténtico", desc: "Recetas tradicionales con un toque moderno y fresco." },
    { icon: ShieldCheck, title: "Calidad Premium", desc: "Solo utilizamos los mejores ingredientes locales seleccionados." }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="p-8 rounded-3xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all group">
            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <f.icon size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
            <p className="text-gray-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const MenuSection = ({ isFullPage = false, products = [], setView }: { isFullPage?: boolean, products?: any[], setView?: (v: string) => void }) => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  
  const filteredItems = activeCategory === 'Todos' 
    ? products 
    : products.filter(item => item.category === activeCategory);

  return (
    <section className={cn("py-20 px-6", isFullPage ? "pt-32 bg-white" : "bg-gray-50")}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Nuestra Carta</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Explora nuestra amplia variedad de platos preparados al momento con los mejores ingredientes.</p>
        </div>

        <div className="flex overflow-x-auto pb-8 gap-4 no-scrollbar mb-12 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all",
                activeCategory === cat.name 
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-200" 
                  : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300"
              )}
            >
              <cat.icon size={16} />
              {cat.name}
            </button>
          ))}
        </div>

        {isFullPage && (
          <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100 flex items-center gap-4">
              <div className="bg-orange-600 text-white p-3 rounded-2xl">
                <Info size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Suplementos</h4>
                <p className="text-sm text-gray-600">Taco Gratinado (+1,00€) • Extra ingredientes (+0,50€)</p>
              </div>
            </div>
            <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-center gap-4">
              <div className="bg-blue-600 text-white p-3 rounded-2xl">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Envío a Domicilio</h4>
                <p className="text-sm text-gray-600">Pedidos por teléfono o App. ¡Rápido y caliente!</p>
              </div>
            </div>
          </div>
        )}

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-[2.5rem] p-4 shadow-sm hover:shadow-xl transition-all group border border-gray-100"
              >
                <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-4 bg-gray-100">
                  <DishImage 
                    name={item.name} 
                    description={item.desc} 
                    category={item.category}
                    src={item.img}
                    className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-orange-600">
                    {item.category}
                  </div>
                </div>
                <div className="px-2">
                  <h4 className="font-bold text-gray-900 text-lg mb-1">{item.name}</h4>
                  {item.desc && <p className="text-gray-500 text-xs mb-3 line-clamp-2">{item.desc}</p>}
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-xl font-black text-orange-600">{item.price}</span>
                    <button className="bg-gray-900 text-white p-3 rounded-2xl hover:bg-orange-600 transition-colors">
                      <ShoppingBag size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {!isFullPage && setView && (
          <div className="mt-16 text-center">
            <button 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setView('menu');
              }}
              className="inline-flex items-center gap-2 bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-sm"
            >
              Ver toda la carta
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const OffersSection = () => {
  return (
    <section className="py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="bg-orange-600 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full -mr-20 -mt-20 blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400 rounded-full -ml-20 -mb-20 blur-3xl opacity-30" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-md text-white px-4 py-1 rounded-full text-xs font-bold mb-6">
                OFERTA POR TIEMPO LIMITADO
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                ¡Combo Familiar <br /> con 20% de Descuento!
              </h2>
              <p className="text-orange-100 text-lg mb-8">
                Llévate 2 Durums, 2 Patatas y una Bebida de 2L por solo 19.90€. Solo esta semana.
              </p>
              <button className="bg-white text-orange-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-orange-50 transition-all shadow-2xl">
                Aprovechar Oferta
              </button>
            </div>
            <div className="relative">
              <DishImage 
                name="Combo Familiar Ahorro" 
                description="2 Durums, 2 Patatas y una Bebida de 2L" 
                category="Combos"
                className="w-full h-auto drop-shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 rounded-[3rem]" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AppDownload = () => {
  return (
    <section className="py-20 px-6 bg-gray-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative order-2 md:order-1">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-600/20 blur-[120px] rounded-full" />
          <img 
            src={IMAGES.appMockup} 
            alt="App Mockup" 
            className="relative z-10 w-full max-w-sm mx-auto h-auto" 
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            Pide más rápido <br /> con nuestra App
          </h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Descarga la app de Flash Kebab y disfruta de ofertas exclusivas, seguimiento en tiempo real de tu pedido y pagos seguros en un solo clic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-100 transition-all">
              <Smartphone size={24} />
              App Store
            </button>
            <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-100 transition-all">
              <Smartphone size={24} />
              Google Play
            </button>
          </div>
          
          <div className="mt-12 grid grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-black text-orange-500 mb-1">50k+</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Descargas</p>
            </div>
            <div>
              <p className="text-3xl font-black text-orange-500 mb-1">4.8</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Rating</p>
            </div>
            <div>
              <p className="text-3xl font-black text-orange-500 mb-1">15m</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Avg. Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutView = () => {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-black text-gray-900 mb-6">Nuestra Historia</h1>
          <p className="text-gray-600 text-xl leading-relaxed">
            Flash Kebab nació de una idea simple: la comida rápida no tiene por qué ser de baja calidad. Desde 2015, hemos estado sirviendo los mejores sabores con un compromiso inquebrantable con la frescura y la rapidez.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-orange-50 p-10 rounded-[3rem]">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h3>
            <p className="text-gray-600 leading-relaxed">
              Brindar una experiencia gastronómica excepcional a través de ingredientes de primera calidad, un servicio al cliente impecable y una entrega que desafía el tiempo.
            </p>
          </div>
          <div className="bg-gray-50 p-10 rounded-[3rem]">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Visión</h3>
            <p className="text-gray-600 leading-relaxed">
              Convertirnos en el referente de comida rápida de calidad en todo el país, manteniendo siempre la esencia de lo artesanal y lo auténtico.
            </p>
          </div>
        </div>

        <div className="rounded-[3rem] overflow-hidden mb-20">
          <img 
            src="https://picsum.photos/seed/restaurant/1200/600" 
            alt="Our Kitchen" 
            className="w-full h-auto" 
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-8">Valores que nos definen</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Frescura', icon: UtensilsCrossed },
              { label: 'Rapidez', icon: Zap },
              { label: 'Calidad', icon: Star },
              { label: 'Pasión', icon: ShoppingBag }
            ].map((v, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-white border border-gray-100 shadow-sm rounded-2xl flex items-center justify-center text-orange-600">
                  <v.icon size={32} />
                </div>
                <span className="font-bold text-gray-900">{v.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const OffersView = () => {
  return (
    <div className="pt-32 pb-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-gray-900 mb-4">Combos Ahorro</h1>
          <p className="text-gray-500">Ahorra a lo grande con nuestros combos familiares. ¡Todos incluyen Coca Cola 2L!</p>
        </div>

        <div className="bg-yellow-400 p-4 rounded-2xl mb-12 flex items-center justify-center gap-3 font-bold text-gray-900">
          <Zap size={20} fill="currentColor" />
          ¡PROMOCIÓN! Bebida de 2L incluida en todos los combos ahorro
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {COMBOS_AHORRO.map((combo, i) => (
            <div key={i} className="bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col">
              <div className="aspect-video bg-gray-100 relative">
                <DishImage 
                  name={combo.name} 
                  description={combo.includes} 
                  category="Combos"
                  src={combo.img}
                  className="w-full h-full"
                />
                <div className="absolute top-4 right-4 bg-orange-600 text-white px-4 py-1 rounded-full text-xs font-black shadow-lg">
                  OFERTA
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{combo.name}</h3>
                  <p className="text-orange-600 text-sm font-bold">{combo.includes}</p>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-3xl font-black text-gray-900">{combo.price}</span>
                  <button className="bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-orange-700 transition-all">
                    Pedir Ahora
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactView = () => {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h1 className="text-5xl font-black text-gray-900 mb-8">Contáctanos</h1>
            <p className="text-gray-500 text-lg mb-12">Estamos aquí para escucharte. Si tienes alguna duda, sugerencia o simplemente quieres saludar, no dudes en escribirnos.</p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">Visítanos</h4>
                  <p className="text-gray-500">Calle Principal 123, Málaga, España</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">Llámanos</h4>
                  <p className="text-gray-500">+34 951 234 567</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Clock size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">Horario</h4>
                  <p className="text-gray-500">Lun - Dom: 12:00 - 00:00</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <button className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-orange-600 hover:text-white transition-all">
                <Instagram size={20} />
              </button>
              <button className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-orange-600 hover:text-white transition-all">
                <Facebook size={20} />
              </button>
              <button className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-orange-600 hover:text-white transition-all">
                <Twitter size={20} />
              </button>
            </div>
          </div>

          <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Envíanos un mensaje</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Nombre</label>
                  <input type="text" className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all" placeholder="Tu nombre" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Email</label>
                  <input type="email" className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all" placeholder="tu@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Asunto</label>
                <input type="text" className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all" placeholder="¿En qué podemos ayudarte?" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Mensaje</label>
                <textarea rows={4} className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none" placeholder="Escribe aquí tu mensaje..."></textarea>
              </div>
              <button className="w-full bg-orange-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-xl shadow-orange-200">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>

        <div className="mt-20 rounded-[3rem] overflow-hidden h-[400px] border border-gray-100">
          <img src={IMAGES.map} alt="Map Location" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </div>
    </div>
  );
};

const Footer = ({ setView }: { setView: (v: string) => void }) => {
  return (
    <footer className="bg-white pt-20 pb-10 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <img src={IMAGES.logo} alt="Flash Kebab Logo" className="h-8 w-auto" referrerPolicy="no-referrer" />
              <span className="font-bold text-lg tracking-tight text-orange-600">FLASH KEBAB</span>
            </div>
            <p className="text-gray-500 mb-8 leading-relaxed">
              La mejor comida rápida de la ciudad, preparada con pasión y entregada con rapidez.
            </p>
            <div className="flex gap-4">
              <Instagram size={20} className="text-gray-400 hover:text-orange-600 cursor-pointer transition-colors" />
              <Facebook size={20} className="text-gray-400 hover:text-orange-600 cursor-pointer transition-colors" />
              <Twitter size={20} className="text-gray-400 hover:text-orange-600 cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-4 text-gray-500">
              <li><button onClick={() => setView('home')} className="hover:text-orange-600 transition-colors">Inicio</button></li>
              <li><button onClick={() => setView('menu')} className="hover:text-orange-600 transition-colors">Carta</button></li>
              <li><button onClick={() => setView('offers')} className="hover:text-orange-600 transition-colors">Ofertas</button></li>
              <li><button onClick={() => setView('about')} className="hover:text-orange-600 transition-colors">Sobre Nosotros</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Soporte</h4>
            <ul className="space-y-4 text-gray-500">
              <li><button onClick={() => setView('contact')} className="hover:text-orange-600 transition-colors">Contacto</button></li>
              <li><button className="hover:text-orange-600 transition-colors">Preguntas Frecuentes</button></li>
              <li><button className="hover:text-orange-600 transition-colors">Términos y Condiciones</button></li>
              <li><button className="hover:text-orange-600 transition-colors">Política de Privacidad</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Newsletter</h4>
            <p className="text-gray-500 mb-6 text-sm">Suscríbete para recibir ofertas exclusivas y novedades.</p>
            <div className="flex gap-2 mb-6">
              <input type="email" placeholder="Tu email" className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 w-full" />
              <button className="bg-orange-600 text-white p-3 rounded-xl hover:bg-orange-700 transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
            <button 
              onClick={() => {
                const keys = Object.keys(localStorage);
                keys.forEach(key => {
                  if (key.startsWith('dish-image-')) localStorage.removeItem(key);
                });
                window.location.reload();
              }}
              className="text-[10px] font-bold text-gray-400 hover:text-orange-600 flex items-center gap-2 transition-colors uppercase tracking-widest"
            >
              <RefreshCw size={12} />
              Regenerar todas las fotos
            </button>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 flex flex-col md:row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© 2024 Flash Kebab. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-30" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 opacity-30" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4 opacity-30" />
          </div>
        </div>
      </div>
    </footer>
  );
};

const LoginView = ({ onLogin }: { onLogin: (token: string) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success) {
      onLogin(data.token);
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 flex items-center justify-center min-h-[70vh]">
      <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-orange-100 p-4 rounded-2xl text-orange-600">
            <Lock size={32} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-8">Panel de Administración</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Usuario</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              placeholder="ayoub"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              placeholder="ayoub123"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-200">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

const AdminView = ({ products, onRefresh, onLogout }: { products: any[], onRefresh: () => void, onLogout: () => void }) => {
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', price: '', category: 'Kebab & Durum', desc: '', img: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({ ...product });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      onRefresh();
      setDeletingId(null);
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Error al eliminar el producto');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error('Failed to save product');
      
      setEditingProduct(null);
      setFormData({ name: '', price: '', category: 'Kebab & Durum', desc: '', img: '' });
      onRefresh();
    } catch (err) {
      console.error('Error saving product:', err);
      alert('Error al guardar el producto');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-black text-gray-900">Gestión de Productos</h1>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-gray-500 hover:text-red-600 font-bold transition-colors"
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 sticky top-32">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                {editingProduct ? <Edit2 size={20} /> : <Plus size={20} />}
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Nombre</label>
                  <input 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Precio</label>
                  <input 
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Categoría</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  >
                    {CATEGORIES.filter(c => c.name !== 'Todos').map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Descripción</label>
                  <textarea 
                    value={formData.desc}
                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500/20 resize-none"
                    rows={3}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Imagen URL</label>
                  <input 
                    value={formData.img}
                    onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    placeholder="https://picsum.photos/..."
                  />
                </div>
                <div className="pt-4 flex gap-2">
                  <button 
                    disabled={isSubmitting}
                    className="flex-1 bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Guardando...' : (editingProduct ? 'Guardar Cambios' : 'Añadir Producto')}
                  </button>
                  {editingProduct && (
                    <button 
                      type="button"
                      onClick={() => {
                        setEditingProduct(null);
                        setFormData({ name: '', price: '', category: 'Kebab & Durum', desc: '', img: '' });
                      }}
                      className="px-4 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Producto</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Categoría</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Precio</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                            <DishImage 
                              name={p.name} 
                              category={p.category} 
                              src={p.img} 
                              className="w-full h-full" 
                            />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{p.name}</p>
                            <p className="text-xs text-gray-500 line-clamp-1">{p.desc}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold bg-orange-50 text-orange-600 px-2 py-1 rounded-md">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900">{p.price}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {deletingId === p.id ? (
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => handleDelete(p.id)}
                                className="text-xs font-bold text-red-600 hover:underline"
                              >
                                Confirmar
                              </button>
                              <button 
                                onClick={() => setDeletingId(null)}
                                className="text-xs font-bold text-gray-400 hover:underline"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <>
                              <button 
                                onClick={() => handleEdit(p)}
                                className="p-2 text-gray-400 hover:text-orange-600 transition-colors"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button 
                                onClick={() => setDeletingId(p.id)}
                                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 size={18} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState('home');
  const [products, setProducts] = useState<any[]>([]);
  const [token, setToken] = useState(localStorage.getItem('admin-token'));

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('admin-token', token);
    } else {
      localStorage.removeItem('admin-token');
    }
  }, [token]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const renderView = () => {
    switch(view) {
      case 'home':
        return (
          <>
            <Hero setView={setView} />
            <Features />
            <MenuSection products={products.slice(0, 12)} setView={setView} />
            <OffersSection />
            <AppDownload />
          </>
        );
      case 'menu':
        return <MenuSection isFullPage products={products} />;
      case 'offers':
        return <OffersView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'admin':
        return token ? (
          <AdminView 
            products={products} 
            onRefresh={fetchProducts} 
            onLogout={() => setToken(null)} 
          />
        ) : (
          <LoginView onLogin={setToken} />
        );
      default:
        return <Hero setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-orange-100 selection:text-orange-600">
      <Navbar currentView={view} setView={setView} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer setView={setView} />
    </div>
  );
}
