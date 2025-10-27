import { useTranslation } from 'react-i18next';
import { Search, Bell, Moon, Sun, Languages, LogOut } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../ui/button';
import '../../i18n/config';
import LogoBola from '../../public/images/logo/logo-bola.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { useNavigate, useNavigation } from 'react-router-dom';

export function Topbar() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme, effectiveTheme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const changeLanguage = (lng?: string) => {
    const target = lng || (i18n.language === 'en' ? 'pt' : 'en');
    i18n.changeLanguage(target);
    try {
      localStorage.setItem('i18nextLng', target);
    } catch (e) {
      // ignore
    }
  };
   const handleLogout = async () => {
    localStorage.removeItem("authToken")
    navigate('/login');
  };
  return (
    <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6">
  <div className="flex items-center gap-4 flex-1 max-w-md">
  <img src={LogoBola} alt="Wenda" className="w-8 h-8 mr-2" />
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t('common.search_placeholder')}
            className="pl-9 rounded-xl bg-input-background border-0"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* <Button variant="ghost" size="icon" className="rounded-xl">
              <Languages className="w-5 h-5" />
            </Button> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => changeLanguage('en')}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeLanguage('pt')}>
              Português
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Quick toggle: switch language immediately without opening menu */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl px-2"
          onClick={() => changeLanguage()}
          title={t('settings.appearance.default_language')}
        >
          {(i18n.language || 'en').slice(0,2).toUpperCase()}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-xl"
        >
          {effectiveTheme === 'light' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </Button>
        <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => handleLogout()}>
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
