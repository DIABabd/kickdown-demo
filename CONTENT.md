# Fahrschule Kickdown – Inhalte der alten Website

Quelle: https://www.fahrschule-kickdown.de/index.html
Abgerufen am: 2026-11-04

Alle Texte sind wörtlich von der Website übernommen (Rechtschreibung, Zeichensetzung und Zeilenumbrüche wie im Original). Überschriften-Ebenen (`#`) und Markdown-Tabellen sind nur Formatierung. Links stehen in der Form `[Text](Ziel)`. Bildpfade zeigen auf `public/old-site/`, also im Next.js-Projekt auf `/old-site/...`.

Hinweise zur Struktur:

- Kopfzeile, Navigation, Fußzeile und Cookie-Banner sind auf allen 10 Seiten identisch und stehen deshalb nur einmal unter „Gemeinsame Elemente“.
- Texte, die nur in HTML-Kommentaren stehen (auf der Live-Seite nicht sichtbar), stehen gesammelt am Ende unter „Versteckte Inhalte“.
- Die Bilder behalten ihre Originalnamen. Weil mehrere Bilder gleich heißen (z. B. `01.jpg` in verschiedenen Ordnern), ist auch die Ordnerstruktur der alten Seite (`assets/img/...`) übernommen.

## Wichtige Fakten auf einen Blick

(Wörtlich aus den Seiten übernommen, hier nur gesammelt.)

- Name: Fahrschule Kickdown (Kontaktseite: „Fahrschule KICKDOWN“)
- Adresse: Friedrich-Ebert-Straße 11/15, 28199 Bremen – Karte: https://goo.gl/maps/rshBXagK5StX8Lgs8
- Telefon: 01 76 - 70 386 440 (`tel:+4917670386440`)
- Zweite Telefonnummer, nur als Ziel eines Telefon-Icons auf der Kontaktseite (ohne sichtbaren Text): `tel:+4915256751996`
- E-Mail: info@fahrschule-kickdown.de – steht nur in einem auskommentierten Block auf Kontakt und Impressum (nicht sichtbar). Im sichtbaren Text gibt es keine E-Mail-Adresse.
- Instagram: https://www.instagram.com/fahrschulekickdown/
- Inhaber: Mahmoud Shehada
- Bürozeiten (Fußzeile und Unterrichtsseiten): Montag 16:30 Uhr bis 19:30 Uhr · Freitag 16:00 Uhr bis 19:00 Uhr · Samstag 14:00 Uhr bis 17:30 Uhr
  - Achtung: Die Kontaktseite nennt nur „Montag:16:30 Uhr bis 19:30 Uhr und Samstag: 14:00 Uhr bis 17:30 Uhr“ (ohne Freitag).
- Theoriezeiten: Dienstag, Mittwoch und Donnerstag: 17:00 Uhr bis 18:30 Uhr und 19:00 Uhr bis 20:30 Uhr
- Praxiszeiten: nach Vereinbarung
- Webdesign/Programmierung: KS Design – https://www.ks-media.de

## Bildübersicht (alle heruntergeladenen Dateien)

28 Dateien in `public/old-site/`. Originalpfad jeweils `https://www.fahrschule-kickdown.de/assets/img/<Datei>`.

| Datei | Verwendet auf | Wer/was ist zu sehen |
|---|---|---|
| `logo/logo.png` | Alle Seiten – Kopfzeile und Mobil-Menü (alt: „Logo Fahrschule Kickdown“ bzw. „Logo“) | Logo der Fahrschule Kickdown |
| `logo/f-logo.png` | Alle Seiten – Fußzeile | Logo der Fahrschule Kickdown; byte-identisch mit `logo/logo.png` |
| `instagram-button.png` | Alle Seiten – Fußzeile, verlinkt auf Instagram | Instagram-Button |
| `banner/brt-1.jpg` | Alle Unterseiten (nicht Startseite) – Hintergrund des Seitentitel-Balkens, per CSS | Asphalt mit Fahrbahnmarkierung |
| `banner/s-1.jpg` | Startseite – Slider 1, per CSS | Auto in Fahrt bei Nacht |
| `banner/s-2.jpg` | Startseite – Slider 2, per CSS | Zwei junge Leute mit Führerschein vor Bremer Rathaus und Dom |
| `banner/s-3.jpg` | Startseite – Slider 3, per CSS | Blick aus dem Fahrersitz bei Nacht |
| `start/01.jpg` | Startseite – neben Willkommens-Text | Schaufenster der Fahrschule mit Kickdown-Schriftzug und Comic-Auto |
| `ausbildungsfahrschule/01.jpg` | Ausbildungsfahrschule | Byte-identisch mit `start/01.jpg` |
| `team/01.jpg` | Team | Mahmoud Shehada – Inhaber / Fahrlehrer |
| `team/02.jpg` | Team | Ralph Dölling – Fahrlehrer |
| `team/03.jpg` | Team | Ralf Jürgensen – Fahrlehrer |
| `team/04.jpg` | Team | Sarah Pendzich – Bürofachangestellte |
| `team/05.jpg` | Team | Penelope Röper – Fahrlehrerin / Büroleitung |
| `team/06.jpg` | Team | Zulquarnain Khan – Fahrlehrer |
| `team/07.jpg` | Team | Khaled Abu Al-Assal – Fahrlehrer |
| `unterricht/theorie/01.jpg` | Theoretischer Unterricht | Seite beschreibt es nicht |
| `unterricht/praxis/01.jpg` | Praktischer Unterricht | Seite beschreibt es nicht |
| `fahrzeuge/01.jpg` | Fahrzeuge | VW Golf VI, manuelle Schaltung |
| `fahrzeuge/02.jpg` | Fahrzeuge | Audi Q2, Automatik |
| `fahrzeuge/03.jpg` | Fahrzeuge | VW T-Roc, manuelle Schaltung |
| `fahrzeuge/04.jpg` | Fahrzeuge | Audi A4, Automatik |
| `fahrzeuge/05.jpg` | Fahrzeuge | VW T-Roc, Automatik |
| `fahrzeuge/06.jpg` | Fahrzeuge | VW T-Roc, Automatik |
| `fahrzeuge/07.jpg` | Fahrzeuge | VW T-Roc, Automatik |
| `christmas-deal.jpg` | Startseite – nur in einem auskommentierten Popup (nicht sichtbar) | Werbebild „CHRISTMAS DEAL – Grundbetrag jetzt nur 50 € – Die Aktion gilt bis zum 31.12.2025“, Weihnachtsmann mit Geschenk, Kickdown-Logo |
| `logo/fahrlehrerverband-bremen.jpg` | Kontakt – nur in einem auskommentierten Block (nicht sichtbar), alt: „Logo Fahrlehrerverband Bremen“ | Logo des Fahrlehrerverbands Bremen e. V. |
| `preloader.gif` | Alle Seiten – Lade-Animation (`#preloader`), per CSS | Lade-Animation |

Bei „Seite beschreibt es nicht“ sagt die Website selbst nicht, was das Bild zeigt (alle `alt`-Texte außer bei den Logos sind leer). Die Beschreibungen der Slider-, Banner- und Startbilder stammen aus meiner eigenen Sichtprüfung der Dateien.

## Gemeinsame Elemente (auf allen Seiten identisch)

### Kopfzeile / Navigation (Desktop)

```
[ ![Logo Fahrschule Kickdown](/old-site/logo/logo.png) ](index.html)
- [Willkommen](index.html)
- [Team](team.html)
- [Unterricht](#)
- [Theoretischer Unterricht](theoretischer-unterricht.html)
- [Praktischer Unterricht](praktischer-unterricht.html)
- [Fahrzeuge](fahrzeuge.html)
- [Ausbildungsfahrschule](ausbildungsfahrschule.html)
- [Kontakt](kontakt.html)
```

### Navigation (Mobil-Menü)

```
[ ![Logo](/old-site/logo/logo.png) ](index-1.html)
- [Willkommen](index.html)
- [Team](team.html)
- [Unterricht](#)
- [Theoretischer Unterricht](theoretischer-unterricht.html)
- [Praktischer Unterricht](praktischer-unterricht.html)
- [Fahrzeuge](fahrzeuge.html)
- [Ausbildungsfahrschule](ausbildungsfahrschule.html)
- [Kontakt](kontakt.html)
```

### Fußzeile

```
![](/old-site/logo/f-logo.png)
[Friedrich-Ebert-Straße 11/15
28199 Bremen](https://goo.gl/maps/rshBXagK5StX8Lgs8)
[Telefon: 01 76 - 70 386 440](tel:+4917670386440)
### Infos
- [Team](team.html)
- [Unterricht](theoretischer-unterricht.html)
- [Fahrzeuge](fahrzeuge.html)
- [Preise](preise.html)
### Bürozeiten
Montag:
16:30 Uhr bis 19:30 Uhr
Freitag:
16:00 Uhr bis 19:00 Uhr Samstag:
14:00 Uhr bis 17:30 Uhr
### Theoriezeiten
Dienstag, Mittwoch und Donnerstag:
17:00 Uhr bis 18:30 Uhr und
19:00 Uhr bis 20:30 Uhr
[ ![](/old-site/instagram-button.png) ](https://www.instagram.com/fahrschulekickdown/)
[© 2026/2027 | Programmiert durch KS Design.](https://www.ks-media.de)
- [Kontakt](kontakt.html)
- [Impressum](impressum.html)
- [Datenschutzerklärung](datenschutz.html)
- [Cookie-Einstellungen](#)
```

### Cookie-Banner und Cookie-Einstellungen (Dialog)

```
Wir benutzen Cookies von Dritten um Ihnen ein möglichst gutes Weberlebnis zu bieten. Erfahren Sie mehr über die Nutzung oder passen Sie die Einstellungen an über "Cookie-Einstellungen". Weitere Informationen auf unserer Seite '[Datenschutzerklärung](datenschutz.html)'
Alle Akzeptieren & Schließen
[Cookie Einstellungen](#)
###### Cookie Einstellungen
[Technisch notwendige Cookies](#multiCollapseExample1)
Zur Einwilligungsverwaltung Ihrer Cookiepräferenzen nutzen wir in Ihrem Browser lokal gespeicherte Cookies. Es werden keine Daten gesammelt und an uns oder Dritte hierfür übertragen.
[Google Maps](#multiCollapseExample2)
Google Maps API ist ein Kartendienst der Google Inc., 1600 Amphitheatre Parkway Mountain View, CA 94043, USA. Wir nutzen Google Maps API zur Darstellung unseres Unternehmensstandortes in einer interaktiven Karte. Bei der Nutzung von Google Maps können Informationen über Ihre Benutzung dieser Webseite (einschließlich Ihrer IP-Adresse) an einen Server von Google in den USA übertragen und dort gespeichert werden.
Unter folgenden Links erhalten Sie Informationen zum [Datenschutz](datenschutz.html) und zu den Nutzungsbedingungen bei Google Maps.
Weitere Information zu den verwendeten Technologien und der Verarbeitung Ihrer Daten finden Sie bei uns unter der [Datenschutzerklärung](datenschutz.html)
Alle ablehnen
Einstellungen speichern
Alle Akzeptieren
```

---

## Seite: Startseite (Willkommen)

- URL: https://www.fahrschule-kickdown.de/index.html
- Seitentitel (`<title>`): Fahrschule Bremen | Fahrschule Kickdown Mahmoud Shehada

### Bilder auf dieser Seite

Zusätzlich die gemeinsamen Bilder aus Kopf- und Fußzeile (siehe oben).

| Datei | Wo auf der Seite | Wer/was ist zu sehen |
|---|---|---|
| `public/old-site/banner/s-1.jpg` | Slider-Hintergrund 1 (CSS-Klasse `slider-bg-1`), hinter dem Text „Deine Fahrschule Kickdown in Bremen / Dein Weg zum Führerschein Klasse B“ | Seite beschreibt es nicht. Zu sehen: weißes Auto in Fahrt bei Nacht, Stadt im Hintergrund (abgedunkelt). |
| `public/old-site/banner/s-2.jpg` | Slider-Hintergrund 2 (`slider-bg-2`), ohne Text | Seite beschreibt es nicht. Zu sehen: junger Mann und junge Frau zeigen ihren Führerschein, Bremer Rathaus und Dom bei Nacht im Hintergrund. |
| `public/old-site/banner/s-3.jpg` | Slider-Hintergrund 3 (`slider-bg-3`), ohne Text | Seite beschreibt es nicht. Zu sehen: Blick aus dem Fahrersitz auf eine nächtliche Straße. |
| `public/old-site/start/01.jpg` | Bild neben dem Willkommens-Text | Seite beschreibt es nicht. Zu sehen: Schaufenster der Fahrschule mit Schriftzug „KICKDOWN“ und Comic-Tieren in einem blauen Auto („Mit KICKDOWN zum Führerschein“). Byte-identisch mit `ausbildungsfahrschule/01.jpg`. |


### Inhalt (wörtlich)

Deine Fahrschule Kickdown in Bremen

#### Dein Weg zum

Führerschein Klasse B

#### Willkommen in der Fahrschule Kickdown

Nicht nur im Privatleben, auch im Beruf eröffnet dir die Fahrerlaubnis zahlreiche Möglichkeiten. Damit du so schnell wie möglich auf die Überholspur wechseln kannst, bekommst du in unserer Fahrschule den Kickstart.

Wir zeigen dir, worauf es im Straßenverkehr ankommt – mit leicht verständlicher Theorie und intensiver Praxis. Ob Automatik oder Schaltung, Stadt, Landstraße oder Autobahn: Unsere Fahrlehrer begleiten dich individuell auf dem Weg zur Fahrerlaubnis und bereiten dich auf die praktische Prüfung vor. Und wenn du schon bald durchstarten willst, haben wir auch einen passendes Theorie-Angebot für dich: An 3 Wochentagen bieten wir 4 Themen an.

Du hast Fragen zu Führerschein und Fahrschule?

Wir stehen dir gern als Ansprechpartner zur Verfügung und beraten dich vom ersten Antrag bis zur praktischen Prüfung zu allen Themen rund um den Führerschein. Schreib uns einfach eine E-Mail, ruf uns während unserer Bürozeiten an – oder komm direkt in der Fahrschule vorbei und sprich uns einfach an. Wir freuen uns auf dich!

![](/old-site/start/01.jpg)

---

## Seite: Team

- URL: https://www.fahrschule-kickdown.de/team.html
- Seitentitel (`<title>`): Fahrschullehrer Team Fahrschule Kickdown

### Bilder auf dieser Seite

Zusätzlich die gemeinsamen Bilder aus Kopf- und Fußzeile (siehe oben).

| Datei | Wo auf der Seite | Wer/was ist zu sehen |
|---|---|---|
| `public/old-site/banner/brt-1.jpg` | Hintergrund des Seitentitel-Balkens (`breadcrumb-section`) | Seite beschreibt es nicht. Zu sehen: Asphalt mit weißer Fahrbahnmarkierung. |
| `public/old-site/team/01.jpg` | unter „Mahmoud Shehada – Inhaber / Fahrlehrer“ | Mahmoud Shehada (laut Seite) |
| `public/old-site/team/02.jpg` | unter „Ralph Dölling – Fahrlehrer“ | Ralph Dölling (laut Seite) |
| `public/old-site/team/03.jpg` | unter „Ralf Jürgensen – Fahrlehrer“ | Ralf Jürgensen (laut Seite) |
| `public/old-site/team/04.jpg` | unter „Sarah Pendzich – Bürofachangestellte“ | Sarah Pendzich (laut Seite) |
| `public/old-site/team/05.jpg` | unter „Penelope Röper – Fahrlehrerin / Büroleitung“ | Penelope Röper (laut Seite) |
| `public/old-site/team/06.jpg` | unter „Zulquarnain Khan – Fahrlehrer“ | Zulquarnain Khan (laut Seite) |
| `public/old-site/team/07.jpg` | unter „Khaled Abu Al-Assal – Fahrlehrer“ | Khaled Abu Al-Assal (laut Seite) |
| — | Inna Korobova – Bürofachangestellte | Kein Foto auf der Seite vorhanden. |


### Inhalt (wörtlich)

#### Unser Team

#### Mahmoud Shehada

###### Inhaber / Fahrlehrer

![](/old-site/team/01.jpg)

#### Ralph Dölling

###### Fahrlehrer

![](/old-site/team/02.jpg)

#### Ralf Jürgensen

###### Fahrlehrer

![](/old-site/team/03.jpg)

#### Sarah Pendzich

###### Bürofachangestellte

![](/old-site/team/04.jpg)

#### Penelope Röper

###### Fahrlehrerin / Büroleitung

![](/old-site/team/05.jpg)

#### Zulquarnain Khan

###### Fahrlehrer

![](/old-site/team/06.jpg)

#### Khaled Abu Al-Assal

###### Fahrlehrer

![](/old-site/team/07.jpg)

#### Inna Korobova

###### Bürofachangestellte

---

## Seite: Theoretischer Unterricht

- URL: https://www.fahrschule-kickdown.de/theoretischer-unterricht.html
- Seitentitel (`<title>`): Theorieunterricht Fahrschule Bremen

### Bilder auf dieser Seite

Zusätzlich die gemeinsamen Bilder aus Kopf- und Fußzeile (siehe oben).

| Datei | Wo auf der Seite | Wer/was ist zu sehen |
|---|---|---|
| `public/old-site/banner/brt-1.jpg` | Hintergrund des Seitentitel-Balkens (`breadcrumb-section`) | Seite beschreibt es nicht. Zu sehen: Asphalt mit weißer Fahrbahnmarkierung. |
| `public/old-site/unterricht/theorie/01.jpg` | Bild über dem Text zum Theorieunterricht | Seite beschreibt es nicht (Bild zum Theorieunterricht). |


### Inhalt (wörtlich)

#### Theoretischer Unterricht

![](/old-site/unterricht/theorie/01.jpg)

Unser Theorieunterricht findet in Form von Kursen statt. Das hat für dich den Vorteil, dass du innerhalb von kürzester Zeit den theoretischen Teil deiner Ausbildung abschließen kannst.

#### Unterrichtsform

- [Theoretischer Unterricht](theoretischer-unterricht.html)

- [Praktischer Unterricht](praktischer-unterricht.html)

#### Theoriezeiten

Dienstag, Mittwoch und Donnerstag:

17:00 Uhr bis 18:30 Uhr und

19:00 Uhr bis 20:30 Uhr

#### Bürozeiten

Montag:

16:30 Uhr bis 19:30 Uhr

Freitag:

16:00 Uhr bis 19:00 Uhr

Samstag:

14:00 Uhr bis 17:30 Uhr

---

## Seite: Praktischer Unterricht

- URL: https://www.fahrschule-kickdown.de/praktischer-unterricht.html
- Seitentitel (`<title>`): Führerschein in Bremen - praktischer Fahrschulunterricht

### Bilder auf dieser Seite

Zusätzlich die gemeinsamen Bilder aus Kopf- und Fußzeile (siehe oben).

| Datei | Wo auf der Seite | Wer/was ist zu sehen |
|---|---|---|
| `public/old-site/banner/brt-1.jpg` | Hintergrund des Seitentitel-Balkens (`breadcrumb-section`) | Seite beschreibt es nicht. Zu sehen: Asphalt mit weißer Fahrbahnmarkierung. |
| `public/old-site/unterricht/praxis/01.jpg` | Bild über dem Text zum praktischen Unterricht | Seite beschreibt es nicht (Bild zum praktischen Unterricht). |


### Inhalt (wörtlich)

#### Praktischer Unterricht

![](/old-site/unterricht/praxis/01.jpg)

Du möchtest den Führerschein machen?

Wir bereiten dich zu fairen Preisen mit modernsten Lehrmethoden gezielt auf deinen Weg zur Fahrprüfung vor. Unser flexibles Ausbildungskonzept orientiert sich dabei ganz an deine Bedürfnisse.

#### Unterrichtsform

- [Theoretischer Unterricht](theoretischer-unterricht.html)

- [Praktischer Unterricht](praktischer-unterricht.html)

#### Praxiszeiten

nach Vereinbarung

#### Bürozeiten

Montag:

16:30 Uhr bis 19:30 Uhr

Freitag:

16:00 Uhr bis 19:00 Uhr

Samstag:

14:00 Uhr bis 17:30 Uhr

---

## Seite: Fahrzeuge

- URL: https://www.fahrschule-kickdown.de/fahrzeuge.html
- Seitentitel (`<title>`): Fahrschulfahrzeuge

### Bilder auf dieser Seite

Zusätzlich die gemeinsamen Bilder aus Kopf- und Fußzeile (siehe oben).

| Datei | Wo auf der Seite | Wer/was ist zu sehen |
|---|---|---|
| `public/old-site/banner/brt-1.jpg` | Hintergrund des Seitentitel-Balkens (`breadcrumb-section`) | Seite beschreibt es nicht. Zu sehen: Asphalt mit weißer Fahrbahnmarkierung. |
| `public/old-site/fahrzeuge/05.jpg` | 1. Fahrzeug | VW T-Roc, Automatik (laut Seite) |
| `public/old-site/fahrzeuge/06.jpg` | 2. Fahrzeug | VW T-Roc, Automatik (laut Seite) |
| `public/old-site/fahrzeuge/07.jpg` | 3. Fahrzeug | VW T-Roc, Automatik (laut Seite) |
| `public/old-site/fahrzeuge/01.jpg` | 4. Fahrzeug | VW Golf VI, manuelle Schaltung (laut Seite) |
| `public/old-site/fahrzeuge/02.jpg` | 5. Fahrzeug | Audi Q2, Automatik (laut Seite) |
| `public/old-site/fahrzeuge/03.jpg` | 6. Fahrzeug | VW T-Roc, manuelle Schaltung (laut Seite) |
| `public/old-site/fahrzeuge/04.jpg` | 7. Fahrzeug | Audi A4, Automatik (laut Seite) |


### Inhalt (wörtlich)

#### Unsere Fahrzeuge

#### VW T-Roc

###### mit Automatikschaltung ausgestattet

Technische Details:

Leistung: 110 kW / 150 PS

Getriebe: Automatikgetriebe

Antrieb: Vorderradantrieb

Perfekt für Fahrschüler/ Fahranfänger geeignet.

![](/old-site/fahrzeuge/05.jpg)

#### VW T-Roc

###### mit Automatikschaltung ausgestattet

Technische Details:

Leistung: 110 kW / 150 PS

Getriebe: Automatikgetriebe

Antrieb: Vorderradantrieb

Perfekt für Fahrschüler/ Fahranfänger geeignet.

![](/old-site/fahrzeuge/06.jpg)

#### VW T-Roc

###### mit Automatikschaltung ausgestattet

Technische Details:

Leistung: 110 kW / 150 PS

Getriebe: Automatikgetriebe

Antrieb: Vorderradantrieb

Perfekt für Fahrschüler/ Fahranfänger geeignet.

![](/old-site/fahrzeuge/07.jpg)

#### VW Golf VI

###### mit manueller Schaltung ausgestattet

Technische Details:

Leistung: 59 kW / 80 PS

Getriebe: Manuelles Getriebe

Antrieb: Vorderradantrieb

Perfekt für Fahrschüler/ Fahranfänger geeignet.

![](/old-site/fahrzeuge/01.jpg)

#### Audi Q2

###### mit Automatikschaltung ausgestattet

Technische Details:

Leistung: 110 kW / 150 PS

Getriebe: Automatikgetriebe

Antrieb: Vorderradantrieb

Perfekt für Fahrschüler/ Fahranfänger geeignet.

![](/old-site/fahrzeuge/02.jpg)

#### VW T-Roc

###### mit manueller Schaltung ausgestattet

Technische Details:

Leistung: 110 kW / 150 PS

Getriebe: Manuelles Getriebe

Antrieb: Vorderradantrieb

Perfekt für Fahrschüler/ Fahranfänger geeignet.

![](/old-site/fahrzeuge/03.jpg)

#### Audi A4

###### mit Automatikschaltung ausgestattet

Technische Details:

Leistung: 140 kW / 190 PS

Getriebe: Automatik Getriebe

Antrieb: Vorderradantrieb

Perfekt für Fahrschüler/ Fahranfänger geeignet.

![](/old-site/fahrzeuge/04.jpg)

---

## Seite: Ausbildungsfahrschule

- URL: https://www.fahrschule-kickdown.de/ausbildungsfahrschule.html
- Seitentitel (`<title>`): Fahrschule Kickdown | Ausbildungsfahrschule

### Bilder auf dieser Seite

Zusätzlich die gemeinsamen Bilder aus Kopf- und Fußzeile (siehe oben).

| Datei | Wo auf der Seite | Wer/was ist zu sehen |
|---|---|---|
| `public/old-site/banner/brt-1.jpg` | Hintergrund des Seitentitel-Balkens (`breadcrumb-section`) | Seite beschreibt es nicht. Zu sehen: Asphalt mit weißer Fahrbahnmarkierung. |
| `public/old-site/ausbildungsfahrschule/01.jpg` | Bild unter dem Text | Seite beschreibt es nicht. Identisch mit `start/01.jpg` (Schaufenster der Fahrschule). |


### Inhalt (wörtlich)

#### Ausbildungsfahrschule

Für Fahrlehrer in der Ausbildung bieten wir einen Ausbildungsplatz an.

![](/old-site/ausbildungsfahrschule/01.jpg)

---

## Seite: Preise

- URL: https://www.fahrschule-kickdown.de/preise.html
- Seitentitel (`<title>`): Fahrschule Kickdown | Preise

### Bilder auf dieser Seite

Zusätzlich die gemeinsamen Bilder aus Kopf- und Fußzeile (siehe oben).

| Datei | Wo auf der Seite | Wer/was ist zu sehen |
|---|---|---|
| `public/old-site/banner/brt-1.jpg` | Hintergrund des Seitentitel-Balkens (`breadcrumb-section`) | Seite beschreibt es nicht. Zu sehen: Asphalt mit weißer Fahrbahnmarkierung. |


### Inhalt (wörtlich)

#### Preisliste für Klasse B

MIT SCHÜLER/STUDENTEN AKTION


| | |
|---|---|
| Grundbetrag inkl. Lehrmaterial | 300 € |
| Übungsfahrt (45 Min.) | 65 € |
| Sonderfahrt (45 Min.) | 75 € |
| Vorstellung zur prakt. Prüfung* | 170 € |
| Vorstellung zur theor. Prüfung* | 30 € |


(ERSPARNIS VON 260 €)

OHNE AKTION


| | |
|---|---|
| Grundbetrag | 500 € |
| Lehrmaterial | 90 € <sup>1</sup> / 60 € <sup>2</sup> |
| Übungsfahrt (45 Min.) | 65 € |
| Sonderfahrt (45 Min.) | 75 € |
| Vorstellung zur prakt. Prüfung* | 170 € |
| Vorstellung zur theor. Prüfung* | 30 € |


<sup>1</sup> Mit Drivers Cam, <sup>2</sup> Ohne Drivers Cam

*Die amtlichen Gebühren für die Fahrerlaubnisprüfungen sind hier nicht enthalten, und werden von der Prüfstelle extern berechnet.

---

## Seite: Kontakt

- URL: https://www.fahrschule-kickdown.de/kontakt.html
- Seitentitel (`<title>`): Fahrschule Kickdown | Kontakt

### Bilder auf dieser Seite

Zusätzlich die gemeinsamen Bilder aus Kopf- und Fußzeile (siehe oben).

| Datei | Wo auf der Seite | Wer/was ist zu sehen |
|---|---|---|
| `public/old-site/banner/brt-1.jpg` | Hintergrund des Seitentitel-Balkens (`breadcrumb-section`) | Seite beschreibt es nicht. Zu sehen: Asphalt mit weißer Fahrbahnmarkierung. |
| (Google-Maps-Einbettung) | iframe unter den Kontaktdaten | Interaktive Karte „Fahrschule Kickdown“ – kein Bild, nicht heruntergeladen. Embed-URL steht im Inhalt unten. |


### Inhalt (wörtlich)

#### Kontakt

Du hast Fragen zu unseren Leistungen, Preisen und Inhalten oder du wünschst eine Beratung? Dann kontaktiere uns gerne zu unseren Bürozeiten am Montag:16:30 Uhr bis 19:30 Uhr

und Samstag: 14:00 Uhr bis 17:30 Uhr.

(Icon-Link ohne Text: https://goo.gl/maps/rshBXagK5StX8Lgs8)

- [Fahrschule KICKDOWN](https://goo.gl/maps/rshBXagK5StX8Lgs8)

- [Friedrich-Ebert-Straße 11/15, 28199 Bremen](https://goo.gl/maps/rshBXagK5StX8Lgs8)

(Icon-Link ohne Text: tel:+4915256751996)

- [Telefon:](tel:+4917670386440)

- [01 76 - 70 386 440](tel:+4917670386440)

[IFRAME: https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2397.157682251703!2d8.8011851!3d53.0714407!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b128192418bf9b%3A0xcbf1dc520a31b991!2sFahrschule%20Kickdown!5e0!3m2!1sde!2sde!4v1576069785387!5m2!1sde!2sde]

---

## Seite: Impressum

- URL: https://www.fahrschule-kickdown.de/impressum.html
- Seitentitel (`<title>`): Fahrschule Kickdown | Impressum

### Bilder auf dieser Seite

Zusätzlich die gemeinsamen Bilder aus Kopf- und Fußzeile (siehe oben).

| Datei | Wo auf der Seite | Wer/was ist zu sehen |
|---|---|---|
| `public/old-site/banner/brt-1.jpg` | Hintergrund des Seitentitel-Balkens (`breadcrumb-section`) | Seite beschreibt es nicht. Zu sehen: Asphalt mit weißer Fahrbahnmarkierung. |


### Inhalt (wörtlich)

#### Impressum

[Fahrschule Kickdown

Friedrich-Ebert-Straße 11/15

28199 Bremen](https://goo.gl/maps/rshBXagK5StX8Lgs8)

[Telefon: 01 76 - 70 386 440](tel:+4917670386440)

Inhaber: Mahmoud Shehada

Steuer Nr.: 60/240/19002

USt-ID: DE 316948289

Verantwortlich für den Inhalt: Mahmoud Shehada

Erlaubnisbehörde nach § 32 FahrlG:

Freie Hansestadt Bremen

Der Senator für Klimaschutz, Umwelt, Mobilität, Stadtentwicklung und Wohnungsbau

Contrescarpe 73

28195 Bremen

Verbraucherstreitbeilegung/Universalschlichtungsstelle

Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.

Bildquellen:

© Fahrschule Kickdown

© Adobe Stock Fotos

Programmierung:

[KS Design | www.ks-media.de](https://www.ks-media.de)

---

## Seite: Datenschutzerklärung

- URL: https://www.fahrschule-kickdown.de/datenschutz.html
- Seitentitel (`<title>`): Fahrschule Kickdown | Datenschutzerklärung

### Bilder auf dieser Seite

Zusätzlich die gemeinsamen Bilder aus Kopf- und Fußzeile (siehe oben).

| Datei | Wo auf der Seite | Wer/was ist zu sehen |
|---|---|---|
| `public/old-site/banner/brt-1.jpg` | Hintergrund des Seitentitel-Balkens (`breadcrumb-section`) | Seite beschreibt es nicht. Zu sehen: Asphalt mit weißer Fahrbahnmarkierung. |


### Inhalt (wörtlich)

#### Datenschutzerklärung

#### 1. Datenschutz auf einen Blick

##### Allgemeine Hinweise

Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.

##### Datenerfassung auf dieser Website

###### Wer ist verantwortlich für die Datenerfassung auf dieser Website?

Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen.

###### Wie erfassen wir Ihre Daten?

Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.

Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.

###### Wofür nutzen wir Ihre Daten?

Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Sofern über die Website Verträge geschlossen oder angebahnt werden können, werden die übermittelten Daten auch für Vertragsangebote, Bestellungen oder sonstige Auftragsanfragen verarbeitet.

###### Welche Rechte haben Sie bezüglich Ihrer Daten?

Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.

Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.

#### 2. Hosting

Wir hosten die Inhalte unserer Website bei folgendem Anbieter:

##### Externes Hosting

Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters / der Hoster gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.

Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO). Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.

Unser(e) Hoster wird bzw. werden Ihre Daten nur insoweit verarbeiten, wie dies zur Erfüllung seiner Leistungspflichten erforderlich ist und unsere Weisungen in Bezug auf diese Daten befolgen.

Wir setzen folgende(n) Hoster ein:

Serveradministration:

KS Design Antener Str. 5

49637 Menslage

Hoster:

Timme Hosting GmbH & Co. KG

Ovelgönner Weg 43

21335 Lüneburg

Deutschland

###### Auftragsverarbeitung

Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des oben genannten Dienstes geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der gewährleistet, dass dieser die personenbezogenen Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet.

#### 3. Allgemeine Hinweise und Pflichtinformationen

##### Datenschutz

Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.

Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.

Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.

##### Hinweis zur verantwortlichen Stelle

Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:

[Fahrschule Kickdown

Friedrich-Ebert-Straße 11/15

28199 Bremen](https://goo.gl/maps/rshBXagK5StX8Lgs8)

[Telefon: 01 76 - 70 386 440](tel:+4917670386440)

Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.

##### Speicherdauer

Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.

##### Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website

Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endgerät (z. B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. Über die jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird in den folgenden Absätzen dieser Datenschutzerklärung informiert.

##### Empfänger von personenbezogenen Daten

Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen externen Stellen zusammen. Dabei ist teilweise auch eine Übermittlung von personenbezogenen Daten an diese externen Stellen erforderlich. Wir geben personenbezogene Daten nur dann an externe Stellen weiter, wenn dies im Rahmen einer Vertragserfüllung erforderlich ist, wenn wir gesetzlich hierzu verpflichtet sind (z. B. Weitergabe von Daten an Steuerbehörden), wenn wir ein berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der Weitergabe haben oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe erlaubt. Beim Einsatz von Auftragsverarbeitern geben wir personenbezogene Daten unserer Kunden nur auf Grundlage eines gültigen Vertrags über Auftragsverarbeitung weiter. Im Falle einer gemeinsamen Verarbeitung wird ein Vertrag über gemeinsame Verarbeitung geschlossen.

##### Widerruf Ihrer Einwilligung zur Datenverarbeitung

Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.

##### Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)

WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).

WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).

##### Beschwerderecht bei der zuständigen Aufsichtsbehörde

Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.

##### Recht auf Datenübertragbarkeit

Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.

##### Auskunft, Berichtigung und Löschung

Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.

##### Recht auf Einschränkung der Verarbeitung

Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:

- Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.

- Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.

- Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.

- Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.

Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.

##### SSL- bzw. TLS-Verschlüsselung

Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.

Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.

##### Widerspruch gegen Werbe-E-Mails

Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.

#### 4. Datenerfassung auf dieser Website

##### Cookies

Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.

Cookies können von uns (First-Party-Cookies) oder von Drittunternehmen stammen (sog. Third-Party-Cookies). Third-Party-Cookies ermöglichen die Einbindung bestimmter Dienstleistungen von Drittunternehmen innerhalb von Webseiten (z. B. Cookies zur Abwicklung von Zahlungsdienstleistungen).

Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind technisch notwendig, da bestimmte Webseitenfunktionen ohne diese nicht funktionieren würden (z. B. die Warenkorbfunktion oder die Anzeige von Videos). Andere Cookies können zur Auswertung des Nutzerverhaltens oder zu Werbezwecken verwendet werden.

Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs, zur Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (z. B. für die Warenkorbfunktion) oder zur Optimierung der Website (z. B. Cookies zur Messung des Webpublikums) erforderlich sind (notwendige Cookies), werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine andere Rechtsgrundlage angegeben wird. Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von notwendigen Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste. Sofern eine Einwilligung zur Speicherung von Cookies und vergleichbaren Wiedererkennungstechnologien abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG); die Einwilligung ist jederzeit widerrufbar.

Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.

Welche Cookies und Dienste auf dieser Website eingesetzt werden, können Sie dieser Datenschutzerklärung entnehmen.

##### Server-Log-Dateien

Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:

- Browsertyp und Browserversion

- verwendetes Betriebssystem

- Referrer URL

- Hostname des zugreifenden Rechners

- Uhrzeit der Serveranfrage

- IP-Adresse

Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.

Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.

##### Kontaktformular

Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.

Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.

Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.

##### Anfrage per E-Mail, Telefon oder Telefax

Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.

Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.

Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.

#### 5. Plugins und Tools

##### Google Fonts (lokales Hosting)

Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Google Fonts, die von Google bereitgestellt werden. Die Google Fonts sind lokal installiert. Eine Verbindung zu Servern von Google findet dabei nicht statt.

Weitere Informationen zu Google Fonts finden Sie unter [https://developers.google.com/fonts/faq](https://developers.google.com/fonts/faq) und in der Datenschutzerklärung von Google: [https://policies.google.com/privacy?hl=de](https://policies.google.com/privacy?hl=de).

##### Google Maps

Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland. Mit Hilfe dieses Dienstes können wir Kartenmaterial auf unserer Website einbinden.

Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern. Diese Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Der Anbieter dieser Seite hat keinen Einfluss auf diese Datenübertragung. Wenn Google Maps aktiviert ist, kann Google zum Zwecke der einheitlichen Darstellung der Schriftarten Google Fonts verwenden. Beim Aufruf von Google Maps lädt Ihr Browser die benötigten Web Fonts in ihren Browsercache, um Texte und Schriftarten korrekt anzuzeigen.

Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote und an einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.

Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie hier: [https://privacy.google.com/businesses/gdprcontrollerterms/](https://privacy.google.com/businesses/gdprcontrollerterms/) und [https://privacy.google.com/businesses/gdprcontrollerterms/sccs/](https://privacy.google.com/businesses/gdprcontrollerterms/sccs/).

Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google: [https://policies.google.com/privacy?hl=de](https://policies.google.com/privacy?hl=de).

Das Unternehmen verfügt über eine Zertifizierung nach dem „EU-US Data Privacy Framework“ (DPF). Der DPF ist ein Übereinkommen zwischen der Europäischen Union und den USA, der die Einhaltung europäischer Datenschutzstandards bei Datenverarbeitungen in den USA gewährleisten soll. Jedes nach dem DPF zertifizierte Unternehmen verpflichtet sich, diese Datenschutzstandards einzuhalten. Weitere Informationen hierzu erhalten Sie vom Anbieter unter folgendem Link: [https://www.dataprivacyframework.gov/participant/5780](https://www.dataprivacyframework.gov/participant/5780).

---

## Versteckte Inhalte (nur in HTML-Kommentaren, auf der Live-Seite nicht sichtbar)

Diese Texte stehen im Quellcode, werden aber nicht angezeigt. Sie sind vermutlich veraltet. Hier nur zur Vollständigkeit.

### Alle Seiten – auskommentierter Menüpunkt

- `[Preise](preise.html)` (in der Haupt- und Mobilnavigation auskommentiert; die Preisseite ist nur über die Fußzeile „Infos → Preise“ erreichbar)

### Startseite – alter Slider-Text

Deine Fahrschule in Bremen
Fahrschule KICKDOWN

### Startseite – alter Hinweis

Im März 2021 bieten wir euch einen Intensivkurs für Theorie an.
An den Tagen Montag, Mittwoch und Freitag.

### Startseite – alter Block „Theorie-Intensivkurs“

Theorie-
Intensivkurs

Und wenn du schon bald durchstarten willst, haben wir auch einen passenden Theorie-Intensivkurs für dich:
In nur sieben Tagen machen wir dich fit für die 14 Themenfelder der theoretischen Führerscheinprüfung.

Termine 2019/2020

27. Dezember 2019
Thema 1: 09:00 Uhr bis 10:30 Uhr
Thema 2: 10:30 Uhr bis 12:00 Uhr

28. Dezember 2019
Thema 3: 09:00 Uhr bis 10:30 Uhr
Thema 4: 10:30 Uhr bis 12:00 Uhr

30. Dezember 2019
Thema 5: 09:00 Uhr bis 10:30 Uhr
Thema 6: 10:30 Uhr bis 12:00 Uhr

31. Dezember 2019
Thema 7: 09:00 Uhr bis 10:30 Uhr
Thema 8: 10:30 Uhr bis 12:00 Uhr

02. Januar 2020
Thema 9: 09:00 Uhr bis 10:30 Uhr
Thema 10: 10:30 Uhr bis 12:00 Uhr

03. Januar 2020
Thema 11: 09:00 Uhr bis 10:30 Uhr
Thema 12: 10:30 Uhr bis 12:00 Uhr

04. Januar 2020
Thema 13: 09:00 Uhr bis 10:30 Uhr
Thema 14: 10:30 Uhr bis 12:00 Uhr

### Startseite – Popup „Schüler und Studenten Aktion“

Schüler und Studenten Aktion
Wir haben eine Aktion für Schüler und Studenten! Informiert euch!
Weitere Informationen
Fenster schließen

### Startseite – Popup „Christmas Deal“

Nur ein Bild: `christmas-deal.jpg` (Text im Bild: „CHRISTMAS DEAL – Grundbetrag jetzt nur 50 € – Die Aktion gilt bis zum 31.12.2025“).

### Kontakt und Impressum – E-Mail

E-Mail: info@fahrschule-kickdown.de (`mailto:info@fahrschule-kickdown.de`)

### Kontakt – Mitgliedschaft

![Logo Fahrlehrerverband Bremen](/old-site/logo/fahrlehrerverband-bremen.jpg)
[Wir sind Mitglied im
Fahrlehrerverband Bremen e. V.](http://www.fahrlehrerverband-bremen.de/)

---

## Nicht abrufbar / nicht übernommen

- `index-1.html` – das Logo im Mobil-Menü verlinkt auf diese Seite, sie liefert aber **404 Not Found**.
- `assets/img/banner/pb.jpg` – im CSS als Hintergrund der Cookie-Dialog-Kopfzeile (`.modal-header`) angegeben, liefert **404 Not Found**.
- Google-Maps-Karte auf der Kontaktseite – eingebettetes iframe, kein Bild. Nur die Embed-URL ist gespeichert.
- Instagram-Profil und externe Links (ks-media.de, Google, Fahrlehrerverband usw.) – externe Seiten, nicht Teil der Website, nicht besucht.
- Nicht heruntergeladen: Template-Bilder, die nur im CSS stehen und von keiner Seite benutzt werden: `about/abt.jpg`, `banner/cf-1.png`, `banner/contact-b.jpg`, `banner/fq-1.jpg`, `banner/hb-2.jpg`, `banner/s-4.jpg`, `banner/sd-1.jpg`, `banner/teacher-b.jpg`, `banner/tesit-b-1.jpg`, `banner/wc-1.jpg`. Sie gehören zum Website-Template, nicht zu den Inhalten der Fahrschule.
- Icon-Schriften (Font Awesome, Flaticon) wurden nicht als Bilder übernommen.
