import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { 
  Map, 
  Users, 
  BarChart3, 
  Globe, 
  Shield, 
  Sparkles, 
  TrendingUp,
  Sun,
  Moon,
  Languages
} from 'lucide-react';
import LogoFull from '../public/images/logo/logo.png';

export function Landing() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { theme, setTheme, effectiveTheme } = useTheme();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'pt' ? 'en' : 'pt';
    i18n.changeLanguage(newLang);
  };

  const features = [
    {
      icon: BarChart3,
      title: t('landing.features.analytics.title', 'Analytics Avançado'),
      description: t('landing.features.analytics.description', 'Visualize KPIs em tempo real e tome decisões baseadas em dados'),
    },
    {
      icon: Map,
      title: t('landing.features.destinations.title', 'Gestão de Destinos'),
      description: t('landing.features.destinations.description', 'Gerencie destinos turísticos com interface intuitiva e visual'),
    },
    {
      icon: Users,
      title: t('landing.features.users.title', 'Controle de Usuários'),
      description: t('landing.features.users.description', 'Administre usuários, perfis e permissões de acesso'),
    },
    {
      icon: Sparkles,
      title: t('landing.features.ml.title', 'Recomendações IA'),
      description: t('landing.features.ml.description', 'Sistema de recomendações inteligente com machine learning'),
    },
    {
      icon: Globe,
      title: t('landing.features.i18n.title', 'Multilíngue'),
      description: t('landing.features.i18n.description', 'Suporte completo para português e inglês'),
    },
    {
      icon: Shield,
      title: t('landing.features.security.title', 'Segurança'),
      description: t('landing.features.security.description', 'Autenticação robusta e controle de acesso granular'),
    },
  ];

  const stats = [
    { value: '10K+', label: t('landing.stats.users', 'Usuários Ativos') },
    { value: '500+', label: t('landing.stats.destinations', 'Destinos') },
    { value: '99.9%', label: t('landing.stats.uptime', 'Uptime') },
    { value: '24/7', label: t('landing.stats.support', 'Suporte') },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <img src={LogoFull} alt="Wenda" className="w-10 h-10" />
                <div>
                  <img src={LogoFull} alt="Wenda" className="h-6" />
                  <p className="text-[12px] text-muted-foreground">
                    {t('landing.header.subtitle', 'Painel Administrativo')}
                  </p>
                </div>
              </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                className="rounded-xl"
              >
                <Languages className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={ () => setTheme(effectiveTheme === 'dark' ? 'light' : 'dark') }
                className="rounded-xl"
              >
                {effectiveTheme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/login')}
                className="rounded-xl hidden sm:flex"
              >
                {t('landing.header.login', 'Entrar')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background z-0" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-xl">
                <span className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  {t('landing.hero.badge', 'Plataforma de Turismo para Angola')}
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl">
                {t('landing.hero.title', 'Gerencie o Turismo de Angola')}
              </h1>
              
              <p className="text-xl text-muted-foreground">
                {t('landing.hero.description', 'Painel administrativo completo para gerenciar destinos, usuários e análises da plataforma Wenda com ferramentas avançadas de IA.')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                  className="rounded-xl"
                >
                  {t('landing.hero.cta', 'Acessar Painel')}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/login')}
                  className="rounded-xl"
                >
                  {t('landing.hero.secondary', 'Fazer Login')}
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1695173987873-6f157a2d6ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBbmdvbGElMjB0b3VyaXNtJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc2MTMxNzUzNnww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Angola Tourism"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4">
              {t('landing.features.title', 'Recursos Principais')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('landing.features.subtitle', 'Ferramentas poderosas para gerenciar sua plataforma de turismo')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="rounded-xl border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-border">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBtb2Rlcm58ZW58MXx8fHwxNzYxMzE3NTM2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Dashboard Preview"
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-6">
              <h2>
                {t('landing.preview.title', 'Interface Moderna e Intuitiva')}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t('landing.preview.description', 'Dashboard completo com visualizações de dados em tempo real, gráficos interativos e ferramentas de gestão integradas.')}
              </p>
              <ul className="space-y-4">
                {[
                  t('landing.preview.feature1', 'Visualização de dados em tempo real'),
                  t('landing.preview.feature2', 'Interface responsiva e adaptável'),
                  t('landing.preview.feature3', 'Modo escuro/claro automático'),
                  t('landing.preview.feature4', 'Navegação intuitiva e rápida'),
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Integration Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2>
                {t('landing.mobile.title', 'Integração com App Mobile')}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t('landing.mobile.description', 'Gerencie seu aplicativo móvel Wenda diretamente do painel administrativo. Atualizações em tempo real sincronizadas com os usuários.')}
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Map className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-1">{t('landing.mobile.sync.title', 'Sincronização Instantânea')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('landing.mobile.sync.description', 'Mudanças refletidas imediatamente no app mobile')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <h4 className="mb-1">{t('landing.mobile.push.title', 'Notificações Push')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('landing.mobile.push.description', 'Envie notificações para usuários mobile')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-border">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1689872330350-87e38c591b4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBtYW5hZ2VtZW50fGVufDF8fHx8MTc2MTMxNzUzN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Mobile App Management"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary to-primary-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-primary-foreground">
              {t('landing.cta.title', 'Pronto para começar?')}
            </h2>
            <p className="text-xl text-primary-foreground/90">
              {t('landing.cta.description', 'Acesse o painel administrativo e comece a gerenciar sua plataforma de turismo agora mesmo.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate('/dashboard')}
                className="rounded-xl"
              >
                {t('landing.cta.primary', 'Acessar Painel')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/login')}
                className="rounded-xl bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                {t('landing.cta.secondary', 'Fazer Login')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground">W</span>
                </div>
                <div>
                  <h3 className="text-primary">Wenda</h3>
                  <p className="text-[12px] text-muted-foreground">
                    {t('landing.footer.subtitle', 'Turismo em Angola')}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {t('landing.footer.description', 'Plataforma de turismo líder em Angola, conectando viajantes a experiências únicas.')}
              </p>
            </div>
            
            <div>
              <h4 className="mb-4">{t('landing.footer.product', 'Produto')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => navigate('/dashboard')} className="hover:text-primary transition-colors">
                    {t('landing.footer.dashboard', 'Dashboard')}
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/destinations')} className="hover:text-primary transition-colors">
                    {t('landing.footer.destinations', 'Destinos')}
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/users')} className="hover:text-primary transition-colors">
                    {t('landing.footer.users', 'Usuários')}
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4">{t('landing.footer.company', 'Empresa')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary transition-colors cursor-pointer">
                  {t('landing.footer.about', 'Sobre')}
                </li>
                <li className="hover:text-primary transition-colors cursor-pointer">
                  {t('landing.footer.contact', 'Contato')}
                </li>
                <li className="hover:text-primary transition-colors cursor-pointer">
                  {t('landing.footer.privacy', 'Privacidade')}
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 Wenda. {t('landing.footer.rights', 'Todos os direitos reservados.')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
