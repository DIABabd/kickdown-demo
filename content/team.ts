/**
 * "Unser Team" – all 8 people, names and roles word for word from
 * CONTENT.md ("Seite: Team"), in the original order. Nothing else is
 * known about them, so nothing else is shown. Inna Korobova has no photo
 * on the old site (owner question 24) – her window stays empty.
 * Whether everyone agrees to their photo being shown: owner question 11.
 */

export type Member = { name: string; role: string; photo: string | null };

export const team = {
  title: "Unser Team",
  /** Native size of every team photo. */
  photoPx: { w: 370, h: 400 },
  members: [
    { name: "Mahmoud Shehada", role: "Inhaber / Fahrlehrer", photo: "/old-site/team/01.jpg" },
    { name: "Ralph Dölling", role: "Fahrlehrer", photo: "/old-site/team/02.jpg" },
    { name: "Ralf Jürgensen", role: "Fahrlehrer", photo: "/old-site/team/03.jpg" },
    { name: "Sarah Pendzich", role: "Bürofachangestellte", photo: "/old-site/team/04.jpg" },
    { name: "Penelope Röper", role: "Fahrlehrerin / Büroleitung", photo: "/old-site/team/05.jpg" },
    { name: "Zulquarnain Khan", role: "Fahrlehrer", photo: "/old-site/team/06.jpg" },
    { name: "Khaled Abu Al-Assal", role: "Fahrlehrer", photo: "/old-site/team/07.jpg" },
    { name: "Inna Korobova", role: "Bürofachangestellte", photo: null },
  ] satisfies Member[],
} as const;
