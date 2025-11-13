import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      common: {
        search: "Search",
        search_placeholder: "Search...",
        search_users_placeholder: "Search users...",
        filter: "Filter",
        recipients: "recipients",
        export: "Export",
        import: "Import",
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit",
        create: "Create",
        view: "View",
        loading: "Loading...",
        no_data: "No data available",
        confirm: "Confirm",
        back: "Back",
      },
      nav: {
        dashboard: "Dashboard",
        destinations: "Destinations",
        map: "Map",
        users: "Users",
        ml: "Models",
        monitoring: "Monitoring",
        notifications: "Notifications",
        settings: "Settings",
        logout: "Logout",
      },
      dashboard: {
        title: "Dashboard",
        welcome: "Welcome back",
        kpis: {
          active_users: "Active Users",
          destinations: "Destinations",
          favorites: "Total Favorites",
          recommendations: "Recommendations Served",
        },
        charts: {
          users_over_time: "Users Over Time",
          destinations_by_category: "Destinations by Category",
          engagement: "User Engagement",
        },
        recent_activity: "Recent Activity",
        subtitles: {
          last_24_hours: "Last 24 hours",
          published: "Published",
          all_time: "All time",
          last_7_days: "Last 7 days",
          last_30_days: "Last 30 days",
          last_hour: "Last hour",
        },
        activity: {
          destination_created: 'Created new destination "{{name}}"',
          destination_updated: 'Updated "{{name}}" images',
          user_registered: "{{count}} new users registered today",
          recommendation_served:
            "Served {{count}} recommendations in the last hour",
        },
      },
      destinations: {
        title: "Destinations",
        add: "Add Destination",
        edit: "Edit Destination",
        delete_confirm: "Are you sure you want to delete this destination?",
        fields: {
          name: "Name",
          description: "Description",
          category: "Category",
          location: "Location",
          rating: "Rating",
          distance: "Distance",
          status: "Status",
          featured: "Featured",
        },
        categories: {
          beaches: "Beaches",
          nature: "Nature",
          culture: "Culture",
          adventure: "Adventure",
          restaurants: "Restaurants",
          hotels: "Hotels",
          all: "All Categories",
        },
        found: "{{count}} destinations found",
      },
      users: {
        title: "Users",
        total: "Total Users",
        active: "Active",
        inactive: "Inactive",
        roles: {
          admin: "Admin",
          editor: "Editor",
          viewer: "Viewer",
        },
        description: "Manage user accounts and permissions",
        add: "Add User",
        table: {
          title: "User List",
          name: "Name",
          email: "Email",
          role: "Role",
          status: "Status",
          last_login: "Last Login",
          actions: "Actions",
        },
        stats: {
          admins: "Admins",
        },
      },
      auth: {
        login: "Login",
        email: "Email",
        password: "Password",
        forgot_password: "Forgot password?",
        sign_in_google: "Sign in with Google",
        welcome: "Welcome to Wenda Admin",
      },
      settings: {
        sections: {
          api: { title: "API Configuration" },
          i18n: { title: "Internationalization" },
        },
        api: {
          base_url: "API Base URL",
          key: "API Key",
        },
        buttons: {
          save_api: "Save API Settings",
        },
        appearance: {
          theme: "Theme",
          default_language: "Default Language",
          auto_translation: "Enable Auto-Translation",
          show_language_switcher: "Show Language Switcher",
          compact_mode: "Compact Mode",
          show_animations: "Show Animations",
        },
        labels: {
          items_per_page: "Items Per Page",
          cache_duration: "Cache Duration (minutes)",
          enable_analytics: "Enable Analytics",
          enable_error_reporting: "Enable Error Reporting",
        },
      },
      landing: {
        header: {
          subtitle: "Admin Dashboard",
          login: "Sign in",
        },
        hero: {
          badge: "Platform for Angola Tourism",
          title: "Manage Angola Tourism",
          description:
            "Complete admin panel to manage destinations, users and analytics for Wenda with advanced AI tools.",
          cta: "Access Dashboard",
          secondary: "Sign in",
        },
        features: {
          title: "Main Features",
          subtitle: "Powerful tools to manage your tourism platform",
          analytics: {
            title: "Advanced Analytics",
            description:
              "Visualize KPIs in real-time and make data-driven decisions",
          },
          destinations: {
            title: "Destination Management",
            description:
              "Manage tourist destinations with an intuitive visual interface",
          },
          users: {
            title: "User Management",
            description: "Manage users, profiles and access permissions",
          },
          ml: {
            title: "AI Recommendations",
            description:
              "Intelligent recommendation system powered by machine learning",
          },
          i18n: {
            title: "Multilingual",
            description: "Full support for English and Portuguese",
          },
          security: {
            title: "Security",
            description: "Robust authentication and granular access control",
          },
        },
        stats: {
          users: "Active Users",
          destinations: "Destinations",
          uptime: "Uptime",
          support: "Support",
        },
        preview: {
          title: "Modern and Intuitive Interface",
          description:
            "Complete dashboard with real-time data visualizations, interactive charts and integrated management tools.",
          feature1: "Real-time data visualization",
          feature2: "Responsive and adaptive interface",
          feature3: "Automatic dark/light mode",
          feature4: "Fast and intuitive navigation",
        },
        mobile: {
          title: "Mobile App Integration",
          description:
            "Manage your Wenda mobile app directly from the admin panel",
          sync: {
            title: "Instant Sync",
            description: "Changes reflected immediately in the mobile app",
          },
          push: {
            title: "Push Notifications",
            description: "Send notifications to mobile users",
          },
        },
        cta: {
          title: "Ready to get started?",
          description:
            "Access the admin panel and start managing your tourism platform now.",
          primary: "Access Dashboard",
          secondary: "Sign in",
        },
        footer: {
          subtitle: "Tourism in Angola",
          description:
            "Leading tourism platform in Angola, connecting travelers to unique experiences.",
          product: "Product",
          dashboard: "Dashboard",
          destinations: "Destinations",
          users: "Users",
          company: "Company",
          about: "About",
          contact: "Contact",
          privacy: "Privacy",
          rights: "All rights reserved.",
        },
      },
      map: {
        title: "Map",
        description: "View and manage destination locations",
        add: "Add Location",
        preview: {
          title: "Interactive Map",
          description:
            "Map integration would display here (Mapbox GL or Leaflet)",
        },
        markers: "Markers",
      },
      ml: {
        title: "Machine Learning",
        description: "Machine learning models and recommendation engine",
        buttons: {
          retrain: "Retrain Models",
        },
        kpis: {
          model_accuracy: "Model Accuracy",
          recommendations_served: "Recommendations Served",
          active_models: "Active Models",
        },
        training_jobs: "Training Jobs",
        sample_recommendations: "Sample Recommendations",
        status: {
          completed: "Completed",
          running: "Running",
        },
        confidence_label: "{{percent}}% confident",
      },
      notifications: {
        title: "Notifications",
        description: "Send push notifications to users",
        kpis: {
          total_sent: "Total Sent",
          delivered_today: "Delivered Today",
          scheduled: "Scheduled",
        },
        create_title: "Create Notification",
        history_title: "Notification History",
        labels: {
          title: "Title",
          message: "Message",
          language: "Language",
        },
        buttons: {
          send_now: "Send Now",
          schedule: "Schedule",
        },
      },
      monitoring: {
        title: "Monitoring",
        description: "System health and performance metrics",
        kpis: {
          uptime: "Uptime",
          error_rate: "Error Rate",
          avg_response_time: "Avg Response Time",
          api_requests: "API Requests",
        },
        charts: {
          error_rate_over_time: "Error Rate Over Time",
          requests_by_endpoint: "Requests by Endpoint",
        },
        recent_errors: "Recent Errors",
      },
    },
  },
  pt: {
    translation: {
      common: {
        search: "Pesquisar",
        search_placeholder: "Pesquisar...",
        search_users_placeholder: "Pesquisar utilizadores...",
        filter: "Filtrar",
        recipients: "destinatários",
        export: "Exportar",
        import: "Importar",
        save: "Guardar",
        cancel: "Cancelar",
        delete: "Eliminar",
        edit: "Editar",
        create: "Criar",
        view: "Ver",
        loading: "A carregar...",
        no_data: "Sem dados disponíveis",
        confirm: "Confirmar",
        back: "Voltar",
      },
      nav: {
        dashboard: "Painel",
        destinations: "Destinos",
        map: "Mapa",
        users: "Utilizadores",
        ml: "Modelos",
        monitoring: "Monitorização",
        notifications: "Notificações",
        settings: "Definições",
        logout: "Sair",
      },
      dashboard: {
        title: "Painel",
        welcome: "Bem-vindo",
        kpis: {
          active_users: "Utilizadores Ativos",
          destinations: "Destinos",
          favorites: "Total de Favoritos",
          recommendations: "Recomendações Servidas",
        },
        charts: {
          users_over_time: "Utilizadores ao Longo do Tempo",
          destinations_by_category: "Destinos por Categoria",
          engagement: "Envolvimento do Utilizador",
        },
        recent_activity: "Atividade Recente",
        subtitles: {
          last_24_hours: "Últimas 24 horas",
          published: "Publicado",
          all_time: "Todo o tempo",
          last_7_days: "Últimos 7 dias",
          last_30_days: "Últimos 30 dias",
          last_hour: "Última hora",
        },
        activity: {
          destination_created: 'Criou novo destino "{{name}}"',
          destination_updated: 'Atualizou imagens de "{{name}}"',
          user_registered: "{{count}} novos utilizadores registados hoje",
          recommendation_served:
            "Serviu {{count}} recomendações na última hora",
        },
      },
      destinations: {
        title: "Destinos",
        add: "Adicionar Destino",
        edit: "Editar Destino",
        delete_confirm: "Tem certeza que deseja eliminar este destino?",
        fields: {
          name: "Nome",
          description: "Descrição",
          category: "Categoria",
          location: "Localização",
          rating: "Avaliação",
          distance: "Distância",
          status: "Estado",
          featured: "Destaque",
        },
        categories: {
          beaches: "Praias",
          nature: "Natureza",
          culture: "Cultura",
          adventure: "Aventura",
          restaurants: "Restaurantes",
          hotels: "Hotéis",
          all: "Todas as categorias",
        },
        found: "{{count}} destinos encontrados",
      },
      users: {
        title: "Utilizadores",
        total: "Total de Utilizadores",
        active: "Ativos",
        inactive: "Inativo",
        roles: {
          admin: "Administrador",
          editor: "Editor",
          viewer: "Visualizador",
        },
        description: "Gerenciar contas de usuário e permissões",
        add: "Adicionar Utilizador",
        table: {
          title: "Lista de Utilizadores",
          name: "Nome",
          email: "Email",
          role: "Função",
          status: "Estado",
          last_login: "Último login",
          actions: "Ações",
        },
        stats: {
          admins: "Administradores",
        },
      },
      auth: {
        login: "Entrar",
        email: "Email",
        password: "Palavra-passe",
        forgot_password: "Esqueceu a palavra-passe?",
        sign_in_google: "Entrar com Google",
        welcome: "Bem-vindo ao Wenda Admin",
      },
      settings: {
        sections: {
          api: { title: "Configuração da API" },
          i18n: { title: "Internacionalização" },
        },
        api: {
          base_url: "URL base da API",
          key: "Chave da API",
        },
        buttons: {
          save_api: "Guardar Configurações da API",
        },
        appearance: {
          theme: "Tema",
          default_language: "Idioma Padrão",
          auto_translation: "Ativar Tradução Automática",
          show_language_switcher: "Mostrar Seletor de Idioma",
          compact_mode: "Modo Compacto",
          show_animations: "Mostrar Animações",
        },
        labels: {
          items_per_page: "Itens por página",
          cache_duration: "Duração do Cache (minutos)",
          enable_analytics: "Ativar Analytics",
          enable_error_reporting: "Ativar Relatório de Erros",
        },
      },
      landing: {
        header: {
          subtitle: "Painel Administrativo",
          login: "Entrar",
        },
        hero: {
          badge: "Plataforma de Turismo para Angola",
          title: "Gerencie o Turismo de Angola",
          description:
            "Painel administrativo completo para gerenciar destinos, usuários e análises da plataforma Wenda com ferramentas avançadas de IA.",
          cta: "Acessar Painel",
          secondary: "Fazer Login",
        },
        features: {
          title: "Recursos Principais",
          subtitle:
            "Ferramentas poderosas para gerenciar sua plataforma de turismo",
          analytics: {
            title: "Analytics Avançado",
            description:
              "Visualize KPIs em tempo real e tome decisões baseadas em dados",
          },
          destinations: {
            title: "Gestão de Destinos",
            description:
              "Gerencie destinos turísticos com interface intuitiva e visual",
          },
          users: {
            title: "Controle de Usuários",
            description: "Administre usuários, perfis e permissões de acesso",
          },
          ml: {
            title: "Recomendações IA",
            description:
              "Sistema de recomendações inteligente com machine learning",
          },
          i18n: {
            title: "Multilíngue",
            description: "Suporte completo para português e inglês",
          },
          security: {
            title: "Segurança",
            description: "Autenticação robusta e controlo de acesso granular",
          },
        },
        stats: {
          users: "Usuários Ativos",
          destinations: "Destinos",
          uptime: "Uptime",
          support: "Suporte",
        },
        preview: {
          title: "Interface Moderna e Intuitiva",
          description:
            "Dashboard completo com visualizações de dados em tempo real, gráficos interativos e ferramentas de gestão integradas.",
          feature1: "Visualização de dados em tempo real",
          feature2: "Interface responsiva e adaptável",
          feature3: "Modo escuro/claro automático",
          feature4: "Navegação intuitiva e rápida",
        },
        mobile: {
          title: "Integração com App Mobile",
          description:
            "Gerencie seu aplicativo móvel Wenda diretamente do painel administrativo.",
          sync: {
            title: "Sincronização Instantânea",
            description: "Mudanças refletidas imediatamente no app mobile",
          },
          push: {
            title: "Notificações Push",
            description: "Envie notificações para usuários mobile",
          },
        },
        cta: {
          title: "Pronto para começar?",
          description:
            "Acesse o painel administrativo e comece a gerenciar sua plataforma de turismo agora mesmo.",
          primary: "Acessar Painel",
          secondary: "Fazer Login",
        },
        footer: {
          subtitle: "Turismo em Angola",
          description:
            "Plataforma de turismo líder em Angola, conectando viajantes a experiências únicas.",
          product: "Produto",
          dashboard: "Dashboard",
          destinations: "Destinos",
          users: "Utilizadores",
          company: "Empresa",
          about: "Sobre",
          contact: "Contato",
          privacy: "Privacidade",
          rights: "Todos os direitos reservados.",
        },
      },
      map: {
        title: "Mapa",
        description: "Ver e gerir localizações de destinos",
        add: "Adicionar Localização",
        preview: {
          title: "Mapa Interativo",
          description:
            "A integração do mapa seria exibida aqui (Mapbox GL ou Leaflet)",
        },
        markers: "Marcadores",
      },
      ml: {
        title: "Machine Learning",
        description: "Modelos de machine learning e motor de recomendações",
        buttons: {
          retrain: "Re-treinar Modelos",
        },
        kpis: {
          model_accuracy: "Precisão do Modelo",
          recommendations_served: "Recomendações Servidas",
          active_models: "Modelos Ativos",
        },
        training_jobs: "Tarefas de Treino",
        sample_recommendations: "Amostra de Recomendações",
        status: {
          completed: "Concluído",
          running: "A executar",
        },
        confidence_label: "{{percent}}% de confiança",
      },
      notifications: {
        title: "Notificações",
        description: "Enviar notificações push aos utilizadores",
        kpis: {
          total_sent: "Total Enviado",
          delivered_today: "Entregues Hoje",
          scheduled: "Agendadas",
        },
        create_title: "Criar Notificação",
        history_title: "Histórico de Notificações",
        labels: {
          title: "Título",
          message: "Mensagem",
          language: "Idioma",
        },
        buttons: {
          send_now: "Enviar Agora",
          schedule: "Agendar",
        },
      },
      monitoring: {
        title: "Monitorização",
        description: "Estado do sistema e métricas de desempenho",
        kpis: {
          uptime: "Uptime",
          error_rate: "Taxa de Erro",
          avg_response_time: "Tempo Médio de Resposta",
          api_requests: "Pedidos à API",
        },
        charts: {
          error_rate_over_time: "Taxa de Erro ao Longo do Tempo",
          requests_by_endpoint: "Pedidos por Endpoint",
        },
        recent_errors: "Erros Recentes",
      },
    },
  },
};

const savedLang = localStorage.getItem("i18nextLng");
i18n.use(initReactI18next).init({
  resources,
  lng: savedLang || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
