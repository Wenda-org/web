import React, { useState, useEffect } from 'react';
import { FaApple, FaGooglePlay, FaFacebookF, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import FarmRewards from '../components/landing/FarmRewards';

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLightbox = () => setIsLightboxOpen(!isLightboxOpen);

  // Dados para o slider
  const testimonials = [
    { name: 'Cooperativa Agrícola de Luanda', image: 'images/testimonial-1.jpg' },
    { name: 'Fazenda São José', image: 'images/testimonial-2.jpg' },
    { name: 'ONG Verde Angola', image: 'images/testimonial-3.jpg' },
    { name: 'Instituto de Pesquisa Agrícola', image: 'images/testimonial-4.jpg' },
    { name: 'Cooperativa de Benguela', image: 'images/testimonial-5.jpg' },
    { name: 'Fazenda Esperança', image: 'images/testimonial-6.jpg' },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="font-sans text-gray-700">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-100 p-4">
        <div className="container mx-auto sm:px-4 lg:px-8 flex flex-wrap items-center justify-between lg:flex-nowrap">
          <a href="/" className="inline-block mr-4 py-0.5 text-xl whitespace-nowrap no-underline">
            <img src="images/others/logo.png" alt="MapaZZZ" className="h-20" />
          </a>
          <button
            className="lg:hidden text-xl text-gray-400"
            onClick={toggleMenu}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className={`lg:flex lg:flex-grow lg:items-center ${isMenuOpen ? 'block' : 'hidden'} lg:block bg-gray-100 lg:bg-transparent w-full lg:w-auto`}>
            <ul className="pl-0 mt-3 mb-2 ml-auto flex flex-col list-none lg:mt-0 lg:mb-0 lg:flex-row">
                            <li><a className="nav-link px-2.5 py-2.5 text-gray-700 hover:text-green-600" href="#header">Página inicial</a></li>
              <li><a className="nav-link px-2.5 py-2.5 text-gray-700 hover:text-green-600" href="/videos">Conteúdo educativo</a></li>
              <li><a className="nav-link px-2.5 py-2.5 text-gray-700 hover:text-green-600" href="https://html-starter-mh5hs388j-nzolakiampavas-projects.vercel.app/" target="_blank">API</a></li>
              <li><a className="nav-link px-2.5 py-2.5 text-gray-700 hover:text-green-600" href="/login">Entrar</a></li>
              <li><a className="nav-link px-2.5 py-2.5 text-gray-700 hover:text-green-600" href="#download">Baixar</a></li>
            </ul>
            <span className="block lg:ml-3.5">
              <a href="#your-link" className="no-underline"><FaApple className="text-green-600 hover:text-green-800 text-xl mr-1.5 inline" /></a>
              <a href="#your-link" className="no-underline"><FaGooglePlay className="text-green-600 hover:text-green-800 text-xl inline" /></a>
            </span>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header id="header" className="py-28 text-center md:pt-36 lg:text-left xl:pt-44 xl:pb-32 bg-gradient-to-b from-green-100 to-white">
        <div className="container mx-auto px-4 sm:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
          <div className="mb-16 lg:mt-32 xl:mt-40 xl:mr-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-5 leading-tight">Farm Navigators Angola</h1>
            <p className="text-lg mb-8">Uma plataforma digital que fortalece a agricultura angolana através de dados da NASA e inovação</p>
            <a href="#your-link" className="inline-block px-11 py-6 border border-green-600 rounded-full bg-green-600 text-white font-semibold text-sm hover:bg-transparent hover:text-green-600 transition mr-2 mb-5"><FaApple className="mr-2 inline text-xl" />Baixar</a>
            <a href="#your-link" className="inline-block px-11 py-6 border border-green-500 rounded-full bg-green-500 text-white font-semibold text-sm hover:bg-transparent hover:text-green-500 transition mb-5"><FaGooglePlay className="mr-2 inline text-xl" />Baixar</a>
          </div>
          <div className="xl:text-right">
            <img src="images/others/introv1.svg" alt="alternative" className="inline" />
          </div>
        </div>
      </header>

      {/* Introduction */}
      <div className="pt-4 pb-14 text-center">
        <div className="container mx-auto px-4 sm:px-8 xl:px-4">
          <p className="mb-4 text-gray-800 text-3xl leading-10 lg:max-w-5xl lg:mx-auto">
            Criamos um ecossistema digital pensado para facilitar a atuação de ONGs, agricultores, pesquisadores e cidadãos no desenvolvimento da agricultura sustentável em Angola.
          </p>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="py-16 text-center">
        <div className="container mx-auto px-4 sm:px-8 xl:px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: 'images/features-icon-1.svg', title: 'Integração Inteligente', text: 'Sempre conectado, onde quer que você esteja' },
            { icon: 'images/features-icon-2.svg', title: 'Acesso Simples e Leve', text: 'Funciona bem até em celulares básicos e redes móveis' },
            { icon: 'images/features-icon-3.svg', title: 'Alta Performance', text: 'Rápido, fluido e estável em todos os dispositivos' },
            { icon: 'images/features-icon-4.svg', title: 'Multilíngue', text: 'A plataforma está disponível em vários idiomas' },
            { icon: 'images/features-icon-5.svg', title: 'Engajamento Contínuo', text: 'Receba atualizações, envie alertas importantes.' },
            { icon: 'images/features-icon-6.svg', title: 'Suporte Comunitário', text: 'Uma rede de colaboração entre instituições' },
          ].map((feature, index) => (
            <div key={index} className="bg-gray-100 rounded-2xl p-8">
              <div className="mb-6">
                <img src={feature.icon} alt="feature" className="w-16 h-16 mx-auto" />
              </div>
              <h5 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h5>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Details 1 */}
      <div id="details" className="pt-12 pb-16 lg:pt-16">
        <div className="container mx-auto px-4 sm:px-8 lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-5">
            <div className="mb-16 lg:mb-0 xl:mt-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Envolva-se. Participe. Ajude.</h2>
              <p className="mb-4">Usuários comuns, profissionais da saúde e pesquisadores podem se cadastrar, acompanhar projetos e colaborar com a causa.</p>
              <p className="mb-4">Com poucos cliques, você já faz parte da mudança</p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="xl:ml-14">
              <img src="images/others/usuario2.png" alt="alternative" className="inline" />
            </div>
          </div>
        </div>
      </div>

      {/* Details Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-5xl p-6 lg:grid lg:grid-cols-12 lg:gap-x-8 relative animate-fade-in">
            <button className="absolute top-0 right-0 text-4xl text-gray-600" onClick={toggleLightbox}>×</button>
            <div className="lg:col-span-8 mb-12 lg:mb-0 lg:text-left">
              <img src="images/others/introv2.png" alt="Cadastro de Instituições" className="inline rounded-lg w-3/4 mx-auto lg:mx-0" />
            </div>
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Cadastro de Instituições de Saúde</h3>
              <hr className="w-11 h-0.5 mt-0.5 mb-4 bg-indigo-600" />
              <p className="mb-4">Para se registrar na nossa plataforma, instituições de saúde devem entrar em contato diretamente conosco.</p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <FaPhoneAlt className="mr-2 text-indigo-600" />
                  <div><strong>Telefone:</strong> (XXX) XXXX-XXXX</div>
                </li>
                <li className="flex items-center">
                  <FaEnvelope className="mr-2 text-indigo-600" />
                  <div><strong>E-mail:</strong> contato@seudominio.com</div>
                </li>
                <li className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-indigo-600" />
                  <div><strong>Presencialmente:</strong> em um dos nossos postos de atendimento autorizados</div>
                </li>
              </ul>
              <p className="mb-6">Após o contato, nossa equipe explicará os próximos passos para o credenciamento da instituição.</p>
              <button className="px-9 py-5 border border-gray-900 rounded-full bg-transparent text-gray-900 font-semibold text-sm hover:bg-gray-900 hover:text-white transition" onClick={toggleLightbox}>Fechar</button>
            </div>
          </div>
        </div>
      )}

      {/* Details 3 */}
      <div className="pt-16 pb-12">
        <div className="container mx-auto px-4 sm:px-8 lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <div className="xl:ml-14">
              <img src="images/details-3.jpg" alt="Farm technology" className="inline" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="mb-16 lg:mb-0 xl:mt-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Faça Parte da Solução</h2>
              <p className="mb-4">Se você representa uma ONG, cooperativa agrícola, centro de pesquisa ou instituição pública, cadastre-se e ganhe acesso a uma plataforma personalizada para acompanhar ações, interagir com agricultores e contribuir com dados importantes para o desenvolvimento agrícola sustentável</p>
              <a href="#details-lightbox" className="inline-block px-9 py-5 border border-green-600 rounded-full bg-green-600 text-white font-semibold text-sm hover:bg-transparent hover:text-green-600 transition mr-1.5" onClick={toggleLightbox}>Registrar</a>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="py-8 text-center">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { value: 52, label: 'ONGs registradas' },
              { value: 1240, label: 'Fazendas Monitoradas' },
              { value: 89, label: 'Relatórios Gerados' },
              { value: 34, label: 'Campanhas Agrícolas' },
              { value: 456, label: 'Agricultores Ativos' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-5xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Farm Rewards */}
      <FarmRewards />

      {/* Testimonials */}
      <div className="py-32 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-8">
          <h2 className="text-3xl font-bold text-center lg:max-w-xl lg:mx-auto mb-12">Instituições de Saúde</h2>
          <div className="relative w-11/12 mx-auto">
            <div className="flex items-center justify-center">
              <div className="card bg-transparent border-none">
                <img src={testimonials[currentSlide].image} alt={testimonials[currentSlide].name} className="w-20 h-20 rounded-full mx-auto mb-5" />
                <p className="text-center font-bold text-gray-900">{testimonials[currentSlide].name}</p>
              </div>
            </div>
            <button className="absolute left-0 top-1/2 transform -translate-y-1/2 w-6 h-10 bg-gray-700 bg-opacity-50 text-white" onClick={prevSlide}>&lt;</button>
            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 w-6 h-10 bg-gray-700 bg-opacity-50 text-white" onClick={nextSlide}>&gt;</button>
          </div>
        </div>
      </div>

      {/* Conclusion */}
      <div id="download" className="py-16 text-center lg:text-left">
        <div className="container mx-auto px-4 sm:px-8 lg:grid lg:grid-cols-2">
          <div className="mb-16 lg:mb-0">
            <img src="images/others/left.png" alt="alternative" className="mx-auto" />
          </div>
          <div className="lg:mt-24 xl:mt-44 xl:ml-12">
            <p className="mb-9 text-gray-800 text-3xl leading-10">Segurança começa com informação. Baixe o app e ajude a mapear zonas de risco na sua região.</p>
            <a href="#your-link" className="inline-block px-11 py-6 border border-indigo-600 rounded-full bg-indigo-600 text-white font-semibold text-sm hover:bg-transparent hover:text-indigo-600 transition mr-2 mb-5"><FaApple className="mr-2 inline text-xl" />Download</a>
            <a href="#your-link" className="inline-block px-11 py-6 border border-green-500 rounded-full bg-green-500 text-white font-semibold text-sm hover:bg-transparent hover:text-green-500 transition mb-5"><FaGooglePlay className="mr-2 inline text-xl" />Download</a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-16 bg-gradient-to-b from-white to-blue-100 text-center">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="flex justify-center space-x-3">
            <a href="#your-link" className="relative inline-block w-8 h-8">
              <span className="absolute inset-0 flex items-center justify-center text-2xl text-white rounded-full bg-gray-900"><FaFacebookF className="text-base" /></span>
            </a>
            <a href="#your-link" className="relative inline-block w-8 h-8">
              <span className="absolute inset-0 flex items-center justify-center text-2xl text-white rounded-full bg-gray-900"><FaInstagram className="text-base" /></span>
            </a>
            <a href="#your-link" className="relative inline-block w-8 h-8">
              <span className="absolute inset-0 flex items-center justify-center text-2xl text-white rounded-full bg-gray-900"><FaYoutube className="text-base" /></span>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-6 bg-blue-200 text-center lg:text-left">
        <div className="container mx-auto px-4 sm:px-8 lg:grid lg:grid-cols-3">
          <ul className="mb-4 list-none text-sm">
            <li className="mb-2 inline-block mr-4"><a href="sarticle.html" className="no-underline">Article Details</a></li>
            <li className="mb-2 inline-block mr-4"><a href="sSterms.html" className="no-underline">Terms & Conditions</a></li>
            <li className="mb-2 inline-block"><a href="psSrivacy.html" className="no-underline">Privacy Policy</a></li>
          </ul>
          <p className="text-sm">Copyright © <a href="#your-link" className="no-underline">MapaZZZ</a></p>
        </div>
      </div>
    </div>
  );
};

export default Home;