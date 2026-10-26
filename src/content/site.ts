// Locale-independent business data. Copy that changes per language lives in /messages.

export const company = {
  name: "AA Labour Cambodia Supply Co., Ltd.",
  shortName: "AA Labour",
  license: "121/19",
  email: "aalabourcambodia@gmail.com",
  phones: [
    { display: "096 928 2828", tel: "+855969282828" },
    { display: "088 433 2222", tel: "+855884332222" },
  ],
  officePhone: { display: "+855 12 995 618", tel: "+85512995618" },
  telegram: "https://t.me/+855969282828",
  telegramGroup: "https://t.me/+QnDEQGsNGzZiOWVl",
  line: "https://line.me/ti/p/pMNsK-_aJk",
  mapQuery: "GVHF+5JG Phnom Penh, Cambodia",
} as const;

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&z=16&output=embed`;
export const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.mapQuery)}`;

export const jobKeys = [
  "construction",
  "factory",
  "semiconductor",
  "agriculture",
  "rubber",
  "cleaning",
  "care",
  "housemaid",
] as const;

export type DestinationStatus = "active" | "inactive" | "suspended" | "comingSoon";

export const destinations = [
  { key: "malaysia", flag: "🇲🇾", status: "active", image: "/images/destinations/malaysia.png" },
  { key: "japan", flag: "🇯🇵", status: "inactive", image: "/images/destinations/japan.png" },
  { key: "thailand", flag: "🇹🇭", status: "suspended", image: "/images/destinations/thailand.png" },
  {
    key: "singapore",
    flag: "🇸🇬",
    status: "comingSoon",
    image: "/images/destinations/singapore.jpg",
    // Licensed CC BY-SA 3.0, which requires this credit wherever the photo is shown.
    credit: {
      text: "Photo: Someformofhuman, CC BY-SA 3.0",
      href: "https://commons.wikimedia.org/wiki/File:Marina_Bay_Sands_in_the_evening_-_20101120.jpg",
    },
  },
] as const satisfies ReadonlyArray<{
  key: string;
  flag: string;
  status: DestinationStatus;
  image: string | null;
  credit?: { text: string; href: string };
}>;

export const certificates = [
  { key: "moc", image: "/images/certificates/moc.png" },
  { key: "tax", image: "/images/certificates/tax.png" },
  { key: "malaysia", image: "/images/certificates/malaysia.jpg" },
  { key: "japan", image: "/images/certificates/japan.jpg" },
  { key: "thailand", image: "/images/certificates/thailand.jpg" },
] as const;

// Original job posters, shown uncropped so every detail stays readable. `country` is the
// destination the poster names; the restaurant poster names none, so it gets no badge.
export const newsImages = [
  { src: "/images/news/news-1.jpg", width: 1054, height: 1492, country: "malaysia" },
  { src: "/images/news/news-2.jpg", width: 1024, height: 1536, country: "malaysia" },
  { src: "/images/news/news-3.png", width: 1144, height: 2048, country: null },
] as const;

export const galleryCategories = ["cleaning", "memories", "management", "rubber"] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

const galleryCounts: Record<GalleryCategory, number> = {
  cleaning: 7,
  memories: 11,
  management: 5,
  rubber: 5,
};

export const gallery = galleryCategories.flatMap((category) =>
  Array.from({ length: galleryCounts[category] }, (_, i) => ({
    category,
    src: `/images/gallery/${category}-${i + 1}.jpg`,
  })),
);

// Shown on the home page next to the CEO message.
export const ceoPortrait: string | null = "/images/ceo.webp";
