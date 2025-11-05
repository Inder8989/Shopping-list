import { useState, useEffect, useCallback } from 'react';

const APP_SETTINGS_KEY = 'appSettings';

export type Theme = 'indigo' | 'emerald' | 'rose';

interface AppSettings {
    theme: Theme;
    shoppingDate: string | null;
    currency: string;
}

const defaultSettings: AppSettings = {
    theme: 'indigo',
    shoppingDate: null,
    currency: 'USD',
};

export const useAppSettings = () => {
    const [settings, setSettings] = useState<AppSettings>(() => {
        try {
            const stored = window.localStorage.getItem(APP_SETTINGS_KEY);
            if (stored) {
                return { ...defaultSettings, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.error("Error reading app settings from localStorage", error);
        }
        return defaultSettings;
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(APP_SETTINGS_KEY, JSON.stringify(settings));
        } catch (error) {
            console.error("Error writing app settings to localStorage", error);
        }

        const root = document.documentElement;
        root.classList.remove('theme-emerald', 'theme-rose');
        
        if (settings.theme === 'emerald') {
            root.classList.add('theme-emerald');
        } else if (settings.theme === 'rose') {
            root.classList.add('theme-rose');
        }
    }, [settings]);

    const setTheme = useCallback((theme: Theme) => {
        setSettings(s => ({ ...s, theme }));
    }, []);

    const setShoppingDate = useCallback((date: string | null) => {
        setSettings(s => ({ ...s, shoppingDate: date }));
    }, []);

    const setCurrency = useCallback((currency: string) => {
        setSettings(s => ({ ...s, currency }));
    }, []);

    return {
        theme: settings.theme,
        shoppingDate: settings.shoppingDate,
        currency: settings.currency,
        setTheme,
        setShoppingDate,
        setCurrency,
    };
};