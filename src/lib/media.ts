const heroImageModules = import.meta.glob("../assets/hero/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const galleryImageModules = import.meta.glob("../assets/gallery/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const sortImageModules = (modules: Record<string, string>) =>
  Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, image]) => image);

const heroImageList = sortImageModules(heroImageModules);
const galleryImageList = sortImageModules(galleryImageModules);

export const heroSlides = heroImageList.map((image, index) => ({
  image,
  title: ["Goa", "Kerala", "Kashmir", "Coorg", "Munnar", "Rajasthan"][index] ?? `Hero ${index + 1}`,
  subtitle:
    [
      "Sunsets, sand and salty breezes",
      "Drift through God's Own Country",
      "Where Himalayas meet still waters",
      "Misty coffee hills and quiet escapes",
      "Tea gardens and mountain air",
      "Royal palaces and golden dunes",
    ][index] ?? "Handpicked holiday highlights",
}));

// Static images bundled at build time. Used as a fallback when no
// CRM-managed gallery images exist in Supabase (see useGalleryImages).
export const galleryImages = galleryImageList;
