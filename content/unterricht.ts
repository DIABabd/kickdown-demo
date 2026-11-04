/**
 * Unterricht (/unterricht) – the two old pages "Theoretischer Unterricht"
 * and "Praktischer Unterricht" on one page (DESIGN.md 3.2, owner question
 * 33). Texts word for word from CONTENT.md (U1–U11).
 */
export const unterricht = {
  /** U1: <title> of the old theory page – used as page title. */
  metaTitle: "Theorieunterricht Fahrschule Bremen",
  /** U2: <title> of the old practice page – used as meta description. */
  metaDescription: "Führerschein in Bremen - praktischer Fahrschulunterricht",
  /** Old navigation label (G1). */
  title: "Unterricht",
  /** U5: "Unterrichtsform" + its two links (now jump links on the same page). */
  unterrichtsform: {
    title: "Unterrichtsform",
    links: [
      { label: "Theoretischer Unterricht", href: "#theorie" },
      { label: "Praktischer Unterricht", href: "#praxis" },
    ],
  },
  theorie: {
    title: "Theoretischer Unterricht", // U3
    text: "Unser Theorieunterricht findet in Form von Kursen statt. Das hat für dich den Vorteil, dass du innerhalb von kürzester Zeit den theoretischen Teil deiner Ausbildung abschließen kannst.", // U4
    /** B17: CROPPED COPY of unterricht/theorie/01.jpg (supplier details removed). */
    photo: { src: "/demo/theorie-kalender.jpg", w: 848, h: 388 },
  },
  praxis: {
    title: "Praktischer Unterricht", // U8
    frage: "Du möchtest den Führerschein machen?", // U9
    text: "Wir bereiten dich zu fairen Preisen mit modernsten Lehrmethoden gezielt auf deinen Weg zur Fahrprüfung vor. Unser flexibles Ausbildungskonzept orientiert sich dabei ganz an deine Bedürfnisse.", // U10
    /** B18, original file. */
    photo: { src: "/old-site/unterricht/praxis/01.jpg", w: 870, h: 390 },
  },
} as const;
