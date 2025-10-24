import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      common: {
        search: 'Search',
        search_placeholder: 'Search...',
        filter: 'Filter',
        export: 'Export',
        import: 'Import',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        create: 'Create',
        view: 'View',
        loading: 'Loading...',
        no_data: 'No data available',
        confirm: 'Confirm',
        back: 'Back'
      },
      nav: {
        dashboard: 'Dashboard',
        destinations: 'Destinations',
        map: 'Map',
        users: 'Users',
        ml: 'Recommendations',
        monitoring: 'Monitoring',
        notifications: 'Notifications',
        settings: 'Settings',
        logout: 'Logout'
      },
      dashboard: {
        title: 'Dashboard',
        welcome: 'Welcome back',
        kpis: {
          active_users: 'Active Users',
          destinations: 'Destinations',
          favorites: 'Total Favorites',
          recommendations: 'Recommendations Served'
        },
        charts: {
          users_over_time: 'Users Over Time',
          destinations_by_category: 'Destinations by Category',
          engagement: 'User Engagement'
        },
        recent_activity: 'Recent Activity'
      },
      destinations: {
        title: 'Destinations',
        add: 'Add Destination',
        edit: 'Edit Destination',
        delete_confirm: 'Are you sure you want to delete this destination?',
        fields: {
          name: 'Name',
          description: 'Description',
          category: 'Category',
          location: 'Location',
          rating: 'Rating',
          distance: 'Distance',
          status: 'Status',
          featured: 'Featured'
        },
        categories: {
          beaches: 'Beaches',
          nature: 'Nature',
          culture: 'Culture',
          adventure: 'Adventure',
          restaurants: 'Restaurants',
          hotels: 'Hotels'
        }
      },
      users: {
        title: 'Users',
        total: 'Total Users',
        active: 'Active',
        roles: {
          admin: 'Admin',
          editor: 'Editor',
          viewer: 'Viewer'
        }
      },
      auth: {
        login: 'Login',
        email: 'Email',
        password: 'Password',
        forgot_password: 'Forgot password?',
        sign_in_google: 'Sign in with Google',
        welcome: 'Welcome to Wenda Admin'
      }
    }
  },
  pt: {
    translation: {
      common: {
        search: 'Pesquisar',
        search_placeholder: 'Pesquisar...',
        filter: 'Filtrar',
        export: 'Exportar',
        import: 'Importar',
        save: 'Guardar',
        cancel: 'Cancelar',
        delete: 'Eliminar',
        edit: 'Editar',
        create: 'Criar',
        view: 'Ver',
        loading: 'A carregar...',
        no_data: 'Sem dados disponíveis',
        confirm: 'Confirmar',
        back: 'Voltar'
      },
      nav: {
        dashboard: 'Painel',
        destinations: 'Destinos',
        map: 'Mapa',
        users: 'Utilizadores',
        ml: 'Recomendações',
        monitoring: 'Monitorização',
        notifications: 'Notificações',
        settings: 'Definições',
        logout: 'Sair'
      },
      dashboard: {
        title: 'Painel',
        welcome: 'Bem-vindo',
        kpis: {
          active_users: 'Utilizadores Ativos',
          destinations: 'Destinos',
          favorites: 'Total de Favoritos',
          recommendations: 'Recomendações Servidas'
        },
        charts: {
          users_over_time: 'Utilizadores ao Longo do Tempo',
          destinations_by_category: 'Destinos por Categoria',
          engagement: 'Envolvimento do Utilizador'
        },
        recent_activity: 'Atividade Recente'
      },
      destinations: {
        title: 'Destinos',
        add: 'Adicionar Destino',
        edit: 'Editar Destino',
        delete_confirm: 'Tem certeza que deseja eliminar este destino?',
        fields: {
          name: 'Nome',
          description: 'Descrição',
          category: 'Categoria',
          location: 'Localização',
          rating: 'Avaliação',
          distance: 'Distância',
          status: 'Estado',
          featured: 'Destaque'
        },
        categories: {
          beaches: 'Praias',
          nature: 'Natureza',
          culture: 'Cultura',
          adventure: 'Aventura',
          restaurants: 'Restaurantes',
          hotels: 'Hotéis'
        }
      },
      users: {
        title: 'Utilizadores',
        total: 'Total de Utilizadores',
        active: 'Ativos',
        roles: {
          admin: 'Administrador',
          editor: 'Editor',
          viewer: 'Visualizador'
        }
      },
      auth: {
        login: 'Entrar',
        email: 'Email',
        password: 'Palavra-passe',
        forgot_password: 'Esqueceu a palavra-passe?',
        sign_in_google: 'Entrar com Google',
        welcome: 'Bem-vindo ao Wenda Admin'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
