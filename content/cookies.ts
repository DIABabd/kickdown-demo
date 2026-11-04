import type { Inline } from "./legal-types";

/**
 * Old cookie banner + "Cookie Einstellungen" dialog (G11, G12), word for
 * word from CONTENT.md – shown ONLY as a labelled preview. The demo sets no
 * cookies and stores nothing; the buttons do nothing.
 */
export const cookies = {
  metaTitle: "Cookie Einstellungen",
  banner: {
    text: [
      "Wir benutzen Cookies von Dritten um Ihnen ein möglichst gutes Weberlebnis zu bieten. Erfahren Sie mehr über die Nutzung oder passen Sie die Einstellungen an über \"Cookie-Einstellungen\". Weitere Informationen auf unserer Seite '",
      { text: "Datenschutzerklärung", href: "/datenschutz" },
      "'",
    ] satisfies Inline[],
    acceptClose: "Alle Akzeptieren & Schließen",
    settingsLink: "Cookie Einstellungen",
  },
  dialog: {
    title: "Cookie Einstellungen",
    groups: [
      {
        title: "Technisch notwendige Cookies",
        text: [
          [
            "Zur Einwilligungsverwaltung Ihrer Cookiepräferenzen nutzen wir in Ihrem Browser lokal gespeicherte Cookies. Es werden keine Daten gesammelt und an uns oder Dritte hierfür übertragen.",
          ],
        ] satisfies Inline[][],
      },
      {
        title: "Google Maps",
        text: [
          [
            "Google Maps API ist ein Kartendienst der Google Inc., 1600 Amphitheatre Parkway Mountain View, CA 94043, USA. Wir nutzen Google Maps API zur Darstellung unseres Unternehmensstandortes in einer interaktiven Karte. Bei der Nutzung von Google Maps können Informationen über Ihre Benutzung dieser Webseite (einschließlich Ihrer IP-Adresse) an einen Server von Google in den USA übertragen und dort gespeichert werden.",
          ],
          [
            "Unter folgenden Links erhalten Sie Informationen zum ",
            { text: "Datenschutz", href: "/datenschutz" },
            " und zu den Nutzungsbedingungen bei Google Maps.",
          ],
        ] satisfies Inline[][],
      },
    ],
    more: [
      "Weitere Information zu den verwendeten Technologien und der Verarbeitung Ihrer Daten finden Sie bei uns unter der ",
      { text: "Datenschutzerklärung", href: "/datenschutz" },
    ] satisfies Inline[],
    buttons: ["Alle ablehnen", "Einstellungen speichern", "Alle Akzeptieren"],
  },
} as const;
