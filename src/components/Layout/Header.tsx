import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, LogOut, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { Logo } from '../Logo';
import { useStore } from '../../store/useStore';

export function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { language, setLanguage, currentEmployee, logout } = useStore();

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-4">
            <Menu className="h-6 w-6 text-primary-600" />
            <Link to="/">
              <Logo language={language} />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center text-primary-600 border-primary-200 hover:bg-primary-50"
            >
              <Globe className="h-4 w-4 mr-2" />
              {language.toUpperCase()}
            </Button>
            {currentEmployee && (
              <>
                <Link to="/profile">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center text-primary-600 border-primary-200 hover:bg-primary-50"
                  >
                    <User className="h-4 w-4 mr-2" />
                    {t('common.profile')}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('common.logout')}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}