import type { CookieConsentConfig } from "vanilla-cookieconsent";
import "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
    gtag: (...args: any[]) => void;
  }
}

export const config: CookieConsentConfig = {
  root: "body",
  categories: {
    necessary: {
      enabled: true,
      readOnly: true,
    },
    analytics: {
      enabled: true,
      readOnly: false,
      services: {
        googleAnalytics: {
          label: "Google Analytics",
          onAccept: () => {
            window.gtag("consent", "update", {
              analytics_storage: "granted",
            });
          },
          onReject: () => {
            window.gtag("consent", "update", {
              analytics_storage: "denied",
            });
          },
        },
      },
    },
    marketing: {
      enabled: true,
      readOnly: false,
      services: {
        googleAds: {
          label: "Google Ads",
          onAccept: () => {
            window.gtag("consent", "update", {
              ad_storage: "granted",
              ad_user_data: "granted",
              ad_personalization: "granted",
            });
          },
          onReject: () => {
            window.gtag("consent", "update", {
              ad_storage: "denied",
              ad_user_data: "denied",
              ad_personalization: "denied",
            });
          },
        },
      },
    },
  },
  guiOptions: {
    consentModal: {
      layout: "box inline",
      position: "bottom right",
      equalWeightButtons: true,
      flipButtons: false,
    },
    preferencesModal: {
      layout: "box",
      position: "right",
      equalWeightButtons: true,
      flipButtons: false,
    },
  },
  language: {
    default: "fr",
    translations: {
      fr: {
        consentModal: {
          title: "Nous utilisons des cookies",
          description:
            "Nous utilisons des cookies pour améliorer votre expérience sur notre site. Vous pouvez choisir les cookies que vous souhaitez accepter.",
          acceptAllBtn: "Tout accepter",
          acceptNecessaryBtn: "Rejeter tout",
          showPreferencesBtn: "Gérer les préférences",
          closeIconLabel: "Fermer",
        },
        preferencesModal: {
          title: "Préférences des cookies",
          acceptAllBtn: "Tout accepter",
          acceptNecessaryBtn: "Rejeter tout",
          savePreferencesBtn: "Enregistrer les préférences",
          closeIconLabel: "Fermer",
          sections: [
            {
              title: "Cookies nécessaires",
              description:
                "Ces cookies sont indispensables au fonctionnement du site.",
              linkedCategory: "necessary",
            },
            {
              title: "Cookies analytiques",
              description:
                "Ces cookies nous permettent d'analyser l'utilisation du site pour en améliorer les performances.",
              linkedCategory: "analytics",
            },
            {
              title: "Cookies marketing",
              description:
                "Ces cookies sont utilisés pour vous proposer des publicités personnalisées.",
              linkedCategory: "marketing",
            },
          ],
        },
      },
    },
  },
};
