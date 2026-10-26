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
  { key: "singapore", flag: "🇸🇬", status: "comingSoon", image: null },
] as const satisfies ReadonlyArray<{
  key: string;
  flag: string;
  status: DestinationStatus;
  image: string | null;
}>;

export const certificates = [
  { key: "moc", image: "/images/certificates/moc.png" },
  { key: "tax", image: "/images/certificates/tax.png" },
  { key: "malaysia", image: "/images/certificates/malaysia.jpg" },
  { key: "japan", image: "/images/certificates/japan.jpg" },
  { key: "thailand", image: "/images/certificates/thailand.jpg" },
] as const;

export const newsImages = [
  "/images/news/news-1.jpg",
  "/images/news/news-2.jpg",
  "/images/news/news-3.png",
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

// Shown on the home page; set to null until a portrait of the CEO is supplied.
export const ceoPortrait: string | null = null;
