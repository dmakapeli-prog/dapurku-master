"use client";

import { useState } from 'react';
import { Menu, X, MapPin, Clock, CheckCircle2, ShoppingCart, Plus, Minus, Trash2, MessageCircle, Utensils, Star } from 'lucide-react';
import Image from 'next/image';

const menuData = [
  // MAKANAN
  { 
    id: 1, name: "Ayam Suwir (Rice Bowl)", category: "Makanan", description: "Nasi hangat dengan ayam suwir. Tersedia pilihan level Pedas / Sedang.", image: "/produk/ayam-suwir.png",
    variants: [{ name: "Sedang", price: 16000 }, { name: "Pedas", price: 16000 }] 
  },
  { id: 2, name: "Sapi Mercon (Rice Bowl)", category: "Makanan", price: 17000, description: "Nasi hangat dengan sapi mercon.", image: "/produk/sapi-mercon.png" },
  { id: 3, name: "Cumi Cabe Ijo (Rice Bowl)", category: "Makanan", price: 17000, description: "Nasi hangat dengan cumi cabe ijo.", image: "/produk/cumi-cabe-ijo.png" },

  // CEMILAN
  { 
    id: 6, name: "Dimsum Original", category: "Cemilan", description: "Pilihan isi 3pcs (tanpa chili oil) atau 6pcs (free chili oil).", image: "/produk/dimsum-ori.png",
    variants: [{ name: "3pcs", note: "Tanpa Chili Oil", price: 13000 }, { name: "6pcs", note: "Free Chili Oil", price: 25000 }]
  },
  { 
    id: 8, name: "Dimsum Premium", category: "Cemilan", description: "Tersedia saos Mentai/Tartar. 3pcs tanpa Chili Oil, 6pcs free Chili Oil.", image: "/produk/dimsum-premium.png",
    variants: [
      { name: "3pcs - Mentai", note: "Tanpa Chili Oil", price: 15000 }, 
      { name: "3pcs - Tartar", note: "Tanpa Chili Oil", price: 15000 },
      { name: "6pcs - Mentai", note: "Free Chili Oil", price: 28000 }, 
      { name: "6pcs - Tartar", note: "Free Chili Oil", price: 28000 }
    ]
  },
  { 
    id: 10, name: "Seblak Jadul", category: "Cemilan", description: "Seblak jadul khas. Tersedia pilihan Kerupuk / Mie.", image: "/produk/seblak.png",
    variants: [{ name: "Seblak Kerupuk", price: 10000 }, { name: "Seblak Mie", price: 10000 }]
  },
  { 
    id: 11, name: "Bakso Kuah Mercon", category: "Cemilan", description: "Bakso dengan kuah pedas mercon. Bisa tambah Mie.", image: "/produk/bakso-mercon.png",
    variants: [{ name: "Tanpa Mie", price: 10000 }, { name: "Tambah Mie", price: 13000 }]
  },
  { id: 13, name: "Salad Sayur", category: "Cemilan", price: 25000, description: "Salad sayur segar.", image: "/produk/salad-sayur.png" },

  // MINUMAN
  { id: 14, name: "Teh Poci (Besar)", category: "Minuman", price: 5000, description: "Teh poci segar ukuran besar.", image: "/produk/teh-poci.png" },
  { 
    id: 15, name: "Dark Choco", category: "Minuman", description: "Tersedia ukuran Kecil & Besar", image: "/produk/dark-choco.png",
    variants: [{ name: "Kecil", price: 7000 }, { name: "Besar", price: 12000 }] 
  },
  { 
    id: 16, name: "Matcha Late", category: "Minuman", description: "Tersedia ukuran Kecil & Besar", image: "/produk/matcha-latte.png",
    variants: [{ name: "Kecil", price: 7000 }, { name: "Besar", price: 12000 }] 
  },
  { 
    id: 17, name: "Thaitea", category: "Minuman", description: "Tersedia ukuran Kecil & Besar", image: "/produk/thaithea.png",
    variants: [{ name: "Kecil", price: 7000 }, { name: "Besar", price: 12000 }] 
  },
  { 
    id: 18, name: "Strawberry Yoghurt", category: "Minuman", description: "Tersedia ukuran Kecil & Besar", image: "/produk/strawberry-yoghurt.png",
    variants: [{ name: "Kecil", price: 7000 }, { name: "Besar", price: 12000 }] 
  },
  { 
    id: 19, name: "Coffe Palm Sugar Latte", category: "Minuman", description: "Tersedia ukuran Kecil & Besar", image: "/produk/coffe-palm-sugar.png",
    variants: [{ name: "Kecil", price: 8000 }, { name: "Besar", price: 15000 }] 
  }
];

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
};

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Semua');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItemForVariant, setSelectedItemForVariant] = useState(null);
  const [notes, setNotes] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const addToCart = (item, variant = null) => {
    if (item.variants && !variant) {
      setSelectedItemForVariant(item);
      return;
    }

    setCart(prevCart => {
      const cartItemId = variant ? `${item.id}-${variant.name}` : item.id;
      const existingItem = prevCart.find(cartItem => cartItem.cartId === cartItemId);
      
      if (existingItem) {
        return prevCart.map(cartItem => 
          cartItem.cartId === cartItemId 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      }
      
      return [...prevCart, { 
        ...item, 
        cartId: cartItemId,
        cartName: variant ? `${item.name} (${variant.name})` : item.name,
        cartPrice: variant ? variant.price : item.price,
        quantity: 1 
      }];
    });

    if (variant) {
      setSelectedItemForVariant(null);
    }
  };

  const updateQuantity = (cartId, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.cartId === cartId) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      });
    });
  };

  const removeFromCart = (cartId) => {
    setCart(prevCart => prevCart.filter(item => item.cartId !== cartId));
  };

  const totalCartPrice = cart.reduce((total, item) => total + (item.cartPrice * item.quantity), 0);
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const checkoutWA = () => {
    if (cart.length === 0) return;
    let message = "Halo DapurKu, saya ingin memesan:\n\n";
    cart.forEach(item => {
      message += `- ${item.cartName} (${item.quantity}x) - ${formatRupiah(item.cartPrice * item.quantity)}\n`;
    });
    message += `\n*Total: ${formatRupiah(totalCartPrice)}*\n`;
    
    if (notes.trim()) {
      message += `\n*Catatan:*\n${notes.trim()}\n`;
    }

    message += `\nMohon konfirmasinya ya. Terima kasih!`;
    const waUrl = `https://wa.me/6285659098914?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  const filteredMenu = activeTab === 'Semua' 
    ? menuData 
    : menuData.filter(item => item.category === activeTab);

  const tabs = ['Semua', 'Makanan', 'Minuman', 'Cemilan'];

  const getDisplayPrice = (item) => {
    if (item.variants) {
      const prices = item.variants.map(v => v.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      if (minPrice === maxPrice) {
        return formatRupiah(minPrice);
      }
      return `${formatRupiah(minPrice)} - ${formatRupiah(maxPrice)}`;
    }
    return formatRupiah(item.price);
  };

  return (
    <main className="min-h-screen relative">
      {/* Sticky Navbar */}
      <nav className="fixed w-full z-40 glassmorphism border-b border-stone-200/50 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="#home" className="flex-shrink-0 flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                <Image src="/logo-dapurku.png" alt="Logo" fill className="object-contain" priority />
              </div>
              <span className="text-2xl md:text-3xl tracking-wide drop-shadow-sm" style={{ fontFamily: 'var(--font-chewy), cursive' }}>
                <span className="text-[#E82A2A]">Dapur</span><span className="text-[#25A5A5]">Ku</span>
              </span>
            </a>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-stone-600 hover:text-primary transition-colors font-medium">Home</a>
              <a href="#menu" className="text-stone-600 hover:text-primary transition-colors font-medium">Menu</a>
              <a href="#lokasi" className="text-stone-600 hover:text-primary transition-colors font-medium">Lokasi</a>
              <button onClick={() => setIsCartOpen(true)} className="relative text-stone-600 hover:text-primary transition-colors flex items-center cursor-pointer">
                <ShoppingCart className="w-6 h-6" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalCartItems}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button onClick={() => setIsCartOpen(true)} className="relative text-stone-600 hover:text-primary transition-colors cursor-pointer">
                <ShoppingCart className="w-6 h-6" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalCartItems}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-stone-600 hover:text-primary focus:outline-none p-2 cursor-pointer"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className={`md:hidden absolute w-full glassmorphism border-b border-stone-200 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 visible h-auto py-4' : 'opacity-0 invisible h-0 overflow-hidden'}`}>
          <div className="px-4 space-y-3 flex flex-col">
            <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-stone-600 font-medium hover:bg-primary/10 hover:text-primary rounded-md">Home</a>
            <a href="#menu" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-stone-600 font-medium hover:bg-primary/10 hover:text-primary rounded-md">Menu</a>
            <a href="#lokasi" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-stone-600 font-medium hover:bg-primary/10 hover:text-primary rounded-md">Lokasi</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-20 pb-32 flex items-center min-h-[90vh]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/background-dapurku.png"
            alt="Sajian Dapurku Gunung Walat"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-stone-900/60 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mt-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 drop-shadow-md leading-tight">
            Sajian Khas DapurKu <br className="hidden sm:block" />
            <span className="text-[#a4ccb3]">Gunung Walat</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto font-light text-stone-200 drop-shadow mb-10">
            Hidangan lezat buatan rumah (handmade) dari hati, disajikan segar dengan bahan pilihan terbaik untuk Anda.
          </p>
          <div className="flex justify-center">
            <a 
              href="#menu" 
              className="bg-primary hover:bg-primary-dark text-white text-lg font-medium px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              Lihat Menu
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full mb-6">
            <Utensils className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-stone-800 mb-6">Kisah DapurKu</h2>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed font-medium">
            Berawal dari dapur hangat seorang ibu di rumah, DapurKu hadir menyajikan hidangan buatan tangan <span className="text-primary italic">(handmade)</span> yang autentik. Dari kehangatan Ayam Suwir hingga kelezatan Dimsum Premium kami, setiap porsi dimasak dengan bahan pilihan dan kasih sayang layaknya masakan ibu, khusus untuk Anda.
          </p>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-4">Daftar Menu</h2>
            <div className="h-1 w-20 bg-accent mx-auto rounded-full"></div>
          </div>

          {/* Filter Tabs */}
          <div className="flex overflow-x-auto hide-scrollbar sm:flex-wrap sm:justify-center gap-2 sm:gap-3 mb-12 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap flex-shrink-0 px-5 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base rounded-full font-medium transition-all duration-300 cursor-pointer ${
                  activeTab === tab 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-primary hover:text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMenu.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-stone-100 hover:border-primary/20"
              >
                <div 
                  className={`relative aspect-[4/3] overflow-hidden bg-stone-100 flex items-center justify-center ${item.image ? 'cursor-pointer group/img' : ''}`}
                  onClick={() => { if (item.image) setSelectedImage(item.image) }}
                >
                  {item.image ? (
                    <>
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover/img:opacity-100 z-10">
                        <div className="bg-white/95 backdrop-blur-sm text-stone-800 px-4 py-2 rounded-full text-sm font-bold shadow-lg transform translate-y-2 group-hover/img:translate-y-0 transition-all duration-300 pointer-events-none">
                          Lihat Foto
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-stone-400 flex flex-col items-center gap-2">
                      <Utensils className="w-8 h-8 opacity-50" />
                      <span className="text-xs font-medium uppercase tracking-wider">Foto Menyusul</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                    {item.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-stone-800 mb-2">{item.name}</h3>
                  <p className="text-stone-500 text-sm mb-6 flex-grow leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-y-2 mt-auto">
                    <span className="text-primary font-bold text-base xl:text-lg leading-tight">
                      {getDisplayPrice(item)}
                    </span>
                    <button 
                      onClick={() => addToCart(item)}
                      className="flex items-center gap-1.5 bg-stone-100 hover:bg-primary hover:text-white text-stone-700 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full transition-all duration-300 font-medium text-xs sm:text-sm group/btn cursor-pointer shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:scale-110 transition-transform" />
                      Tambah
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* Contact & Footer Section */}
      <section id="lokasi" className="border-t border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Contact Info */}
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-stone-800 mb-8">Informasi & Kontak</h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-stone-50 transition-colors">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-800 text-lg mb-1">Alamat Lengkap</h3>
                    <p className="text-stone-600 leading-relaxed">
                      Perumahan Gunung Walat Greenhill Blok B5 No&nbsp;12.
                    </p>
                  </div>
                </div>
 
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-stone-50 transition-colors">
                  <div className="bg-accent/10 p-3 rounded-full text-accent shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-800 text-lg mb-1">Jam Buka</h3>
                    <p className="text-stone-600">Buka Setiap Hari</p>
                    <p className="text-stone-600 font-medium mt-1">09.00 - 21.00 WIB</p>
                  </div>
                </div>
 
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-stone-50 transition-colors">
                  <div className="bg-green-100 p-3 rounded-full text-green-600 shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-800 text-lg mb-1">WhatsApp</h3>
                    <p className="text-stone-600 font-medium">0856-5909-8914</p>
                  </div>
                </div>
 
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-stone-50 transition-colors">
                  <div className="bg-orange-100 p-3 rounded-full text-orange-500 shrink-0">
                    <Utensils className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-800 text-lg mb-1">Pesan Antar</h3>
                    <p className="text-stone-600 text-sm mb-3">Tersedia juga pemesanan online melalui:</p>
                    <div className="flex flex-wrap gap-3">
                      <a href="https://r.grab.com/g/6-20260617_192229_46dca4d7c1e8436392204a8ea1a3aeed_MEXMPS-6-C3WHLCDTVJDDE6" target="_blank" rel="noopener noreferrer" className="bg-white border border-[#00B14F] text-[#00B14F] hover:bg-[#00B14F] hover:text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-colors cursor-pointer">
                        GrabFood
                      </a>
                    </div>
                  </div>
                </div>

              </div>

              <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 mt-6">
                <p className="text-stone-500 text-sm font-medium mb-3">Metode Pembayaran</p>
                <div className="w-full flex items-center justify-between bg-white border border-stone-200 p-4 rounded-xl">
                  <div className="text-left">
                    <p className="font-bold text-stone-800 text-lg tracking-wider">QRIS</p>
                    <p className="text-stone-500 text-sm leading-relaxed mt-1">Admin akan mengirimkan barcode QRIS via WhatsApp setelah pesanan dikonfirmasi.</p>
                  </div>
                  <div className="shrink-0 bg-primary/10 p-2 rounded-lg ml-3">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Maps Asli */}
            <div className="order-1 lg:order-2 h-[400px] w-full rounded-3xl overflow-hidden shadow-lg border-4 border-white relative group bg-stone-100">
              <iframe 
                src="https://maps.google.com/maps?q=-6.904809,106.828453&z=15&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              ></iframe>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-4">Kata Mereka</h2>
            <div className="h-1 w-20 bg-accent mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4 text-accent">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-stone-600 italic mb-6">"Dimsum premiumnya juara! Dagingnya kerasa banget, saos mentainya lumer di mulut. Bakal sering order sih ini."</p>
              <div className="font-bold text-stone-800">— Indah</div>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4 text-accent">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-stone-600 italic mb-6">"Seblak jadulnya ngingetin masa kecil, pedesnya pas dan bumbunya lekoh. Ayam suwirnya juga enak buat makan siang."</p>
              <div className="font-bold text-stone-800">— Rangga</div>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4 text-accent">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-stone-600 italic mb-6">"Pengiriman cepat dan packaging aman. Praktis banget pesan lewat web langsung nyambung ke WA. Top DapurKu!"</p>
              <div className="font-bold text-stone-800">— Rabina</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-8 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm tracking-wide">
            © 2026 DapurKu. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Floating Cart Button (Mobile Only) */}
      <div className="fixed bottom-6 right-6 md:hidden z-40">
        <button 
          onClick={() => setIsCartOpen(true)}
          className="bg-primary text-white p-4 rounded-full shadow-2xl hover:bg-primary-dark hover:scale-105 transition-all relative cursor-pointer border-2 border-white"
        >
          <ShoppingCart className="w-6 h-6" />
          {totalCartItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-md border-2 border-white">
              {totalCartItems}
            </span>
          )}
        </button>
      </div>

      {/* Cart Sidebar Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          ></div>
          
          {/* Sidebar */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-stone-100">
              <h2 className="text-2xl font-bold text-stone-800">Keranjang Pesanan</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 p-2 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-stone-400">
                  <ShoppingCart className="w-16 h-16 mb-4 opacity-50 text-stone-300" />
                  <p className="text-lg font-medium text-stone-500">Keranjang masih kosong</p>
                  <p className="text-sm">Yuk pilih menu favoritmu dulu!</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 px-6 py-2 bg-stone-100 text-stone-700 rounded-full font-medium hover:bg-stone-200 transition-colors cursor-pointer"
                  >
                    Mulai Belanja
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.cartId} className="flex gap-4 items-center bg-stone-50 p-4 rounded-2xl border border-stone-100">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.cartName} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-stone-800 text-sm leading-tight mb-1">{item.cartName}</h4>
                      <p className="text-primary font-bold text-sm mb-3">
                        {formatRupiah(item.cartPrice)}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-white border border-stone-200 rounded-lg">
                          <button 
                            onClick={() => updateQuantity(item.cartId, -1)}
                            className="p-1 hover:bg-stone-100 text-stone-600 rounded-l-lg transition-colors cursor-pointer"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.cartId, 1)}
                            className="p-1 hover:bg-stone-100 text-stone-600 rounded-r-lg transition-colors cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.cartId)}
                          className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-auto cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cart.length > 0 && (
              <div className="border-t border-stone-100 p-6 bg-white shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
                <div className="mb-4">
                  <label htmlFor="notes" className="block text-sm font-medium text-stone-600 mb-2">Catatan Tambahan (Opsional)</label>
                  <textarea 
                    id="notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Contoh: Sambal dipisah, dll..."
                    className="w-full border border-stone-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                  ></textarea>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-stone-500 font-medium">Subtotal Harga</span>
                  <span className="text-2xl font-bold text-primary">{formatRupiah(totalCartPrice)}</span>
                </div>
                <button 
                  onClick={checkoutWA}
                  className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white flex justify-center items-center gap-2 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
                >
                  <MessageCircle className="w-6 h-6" />
                  Checkout via WhatsApp
                </button>
                <p className="text-center text-stone-400 text-xs mt-3">
                  Kamu akan diarahkan ke aplikasi WhatsApp.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Variant Selection Modal */}
      {selectedItemForVariant && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedItemForVariant(null)}
          ></div>
          <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-stone-800">Pilih Pilihan</h3>
                  <p className="text-stone-500 text-sm mt-1">{selectedItemForVariant.name}</p>
                </div>
                <button 
                  onClick={() => setSelectedItemForVariant(null)}
                  className="text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 p-2 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3 mt-6">
                {selectedItemForVariant.variants.map((variant, idx) => (
                  <button 
                    key={idx}
                    onClick={() => addToCart(selectedItemForVariant, variant)}
                    className="w-full flex items-center justify-between p-4 rounded-xl border border-stone-200 hover:border-primary hover:bg-primary/5 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex flex-col items-start gap-1 sm:gap-0 sm:flex-row sm:items-center">
                      <span className="font-bold text-stone-700 group-hover:text-primary">{variant.name}</span>
                      {variant.note && (
                        <span className="text-[11px] sm:text-xs font-medium text-stone-400 sm:ml-2">({variant.note})</span>
                      )}
                    </div>
                    <span className="text-primary font-medium">{formatRupiah(variant.price)}</span>
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => setSelectedItemForVariant(null)}
                className="mt-6 w-full py-3 text-stone-500 font-medium hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8" 
          onClick={() => setSelectedImage(null)}
        >
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 z-10 bg-white/10 text-white p-3 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full h-full max-w-5xl flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <Image 
              src={selectedImage}
              alt="Full screen preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

    </main>
  );
}
