# Livegang-Checkliste

Diese Liste muss abgearbeitet sein, bevor aus der privaten Demo eine echte, veröffentlichte Website wird. Die Reihenfolge ist ein Vorschlag, keine feste Vorgabe. Diese Liste macht keine Preis- oder Rechtsaussagen – Zahlen und rechtliche Einschätzungen kommen von der Fahrschule bzw. von fachkundiger Prüfung.

## 1. Freigaben durch die Fahrschule

- [ ] Alle Fragen in **OWNER-QUESTIONS.md**, Teil A, sind beantwortet.
- [ ] Die Fahrschule hat die Demo einmal komplett gesehen (z. B. mit DEMO-LEITFADEN.md) und ausdrücklich zugestimmt, dass sie online gehen darf.
- [ ] Alle Fakten sind geprüft: Preise, Aktionen, Zeiten, Team, Fahrzeuge (siehe OWNER-QUESTIONS.md, Abschnitt „Fakten prüfen").

## 2. Foto- und Nutzungsrechte

- [ ] Für jedes gezeigte Teamfoto liegt die Zustimmung der abgebildeten Person vor.
- [ ] Das Schaufenster-Foto ist freigegeben (oder ersetzt) – aktuell **noch offen** laut OWNER-QUESTIONS.md Nr. 12.
- [ ] Das Kalender-Foto ist freigegeben (zugeschnitten oder ersetzt).
- [ ] Für alle weiteren benutzten Bilder (Fahrzeuge, Logo) ist das Nutzungsrecht geklärt.
- [ ] Falls neue Hintergrundbilder von Adobe Stock oder einer anderen Quelle benutzt werden sollen: Lizenz ist gekauft bzw. geprüft.

## 3. Rechtliche Texte – letzte Prüfung

- [ ] Impressum: Name der Behörde und alle übrigen Angaben sind aktuell geprüft (nicht nur aus der alten Seite übernommen).
- [ ] Datenschutzerklärung: von einer fachkundigen Person (z. B. Rechtsberatung) geprüft, besonders die Abschnitte Hosting, Google Maps, Google Fonts, Kontaktformular.
- [ ] Datenschutz-Abschnitt zu Hosting ist an den echten Hoster angepasst (aktuell steht „KS Design" / „Timme Hosting" aus der alten Seite).
- [ ] Cookie-Banner und Cookie-Einstellungen sind entweder (a) technisch echt umgesetzt (mit echter Einwilligungsspeicherung), falls Google Maps oder andere Drittanbieter eingebunden werden, oder (b) weiterhin nicht nötig, weil keine Cookies/Drittanbieter eingesetzt werden. Die aktuelle Vorschau-Seite `/cookie-einstellungen` speichert nichts und darf so nicht live gehen, wenn echte Cookies eingesetzt werden.

## 4. Echte Anmeldung statt Simulation

- [ ] Entschieden: Soll es eine echte Online-Anmeldung geben? (OWNER-QUESTIONS.md Nr. 16)
- [ ] Falls ja: Ziel der Anmeldungen festgelegt (z. B. welche E-Mail-Adresse), technische Anbindung umgesetzt und getestet.
- [ ] Falls ja: Zustimmung der Eltern bei Fahrschülern unter 18 ist geklärt (OWNER-QUESTIONS.md Nr. 18).
- [ ] Falls nein: Simulations-Hinweis bleibt, oder das Formular wird durch einen Kontakt-Hinweis (Telefon/E-Mail) ersetzt.
- [ ] Datenschutzerklärung passt zur tatsächlichen Lösung (z. B. Kontaktformular-Abschnitt).

## 5. Alte Adressen (Weiterleitungen)

- [ ] Weiterleitungen von den alten `.html`-Adressen auf die neuen Seiten sind eingerichtet, zum Beispiel:
  - `index.html`, `index-1.html` → `/`
  - `team.html` → `/team`
  - `theoretischer-unterricht.html` → `/unterricht#theorie`
  - `praktischer-unterricht.html` → `/unterricht#praxis`
  - `fahrzeuge.html` → `/fahrzeuge`
  - `ausbildungsfahrschule.html` → `/ausbildungsfahrschule`
  - `preise.html` → `/preise`
  - `kontakt.html` → `/kontakt`
  - `impressum.html` → `/impressum`
  - `datenschutz.html` → `/datenschutz`
- [ ] Alte Adressen wurden getestet (führen wirklich zur neuen Seite, kein Fehler 404).
- [ ] Falls die alte Website bei Suchmaschinen gelistet ist: Google Search Console / Bing informiert, damit die neuen Adressen übernommen werden.

## 6. Demo-Kennzeichen entfernen

- [ ] Das Schild „Private Demo" ist aus Kopfzeile/Fußzeile entfernt.
- [ ] Der `noindex, nofollow`-Hinweis ist entfernt (Meta-Tag **und** `X-Robots-Tag`-Header in `next.config.ts`), damit Suchmaschinen die Seite finden können.
- [ ] Alle Demo-Hinweise in Texten sind entfernt oder angepasst (z. B. Hinweise bei Anmeldung, Schaufenster-Foto, Cookie-Vorschau).
- [ ] Noch einmal geprüft: Es gibt keine Text-Reste mit „Demo", „Vorschau" oder „Simulation", die nicht mehr zutreffen.

## 7. Hosting und Domain

- [ ] Hosting-Anbieter für die echte Website ausgewählt.
- [ ] Domain (z. B. fahrschule-kickdown.de) zeigt auf das neue Hosting.
- [ ] SSL-Zertifikat (https) ist eingerichtet und wird automatisch erneuert.
- [ ] Datenschutzerklärung nennt den tatsächlichen Hoster (siehe Punkt 3).
- [ ] E-Mail-Adressen (z. B. info@fahrschule-kickdown.de) funktionieren, falls auf der Website genannt.

## 8. Letzter technischer Test (auf der echten, fertigen Website)

- [ ] `npm run build` läuft ohne Fehler; Typecheck und Lint sind sauber.
- [ ] Jede Seite wurde einmal am Handy, am Tablet und am Desktop angeschaut.
- [ ] Alle Links in Kopfzeile, Fußzeile, Menü und Handy-Leiste wurden angeklickt – keine Fehlerseite (404).
- [ ] Alle Texte, Preise, Zeiten, Fahrzeuge und Team-Angaben stimmen mit dem, was die Fahrschule zuletzt freigegeben hat (nicht nur mit der alten Website).
- [ ] Keine Konsole-Fehler im Browser.
- [ ] Ladezeit auf einem normalen Handy-Netz (4G) geprüft.
- [ ] Datenschutz-Test: Netzwerk-Tab zeigt nur Anfragen, die zur jetzigen Lösung passen (z. B. keine unerklärten Drittanbieter-Anfragen, falls weiterhin keine eingesetzt werden).

## 9. Nach dem Livegang

- [ ] Eine Sicherungskopie (Backup) der alten Website bleibt erhalten.
- [ ] Die Fahrschule weiß, wer bei technischen Problemen nach dem Livegang angesprochen werden kann.
- [ ] Termin für eine erste Kontrolle nach ein bis zwei Wochen (z. B. funktionieren alle Weiterleitungen weiterhin, kommen Anmeldungen an).
