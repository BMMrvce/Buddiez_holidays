import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { galleryImages as staticGalleryImages } from "@/lib/media";

type GalleryRow = {
  public_url: string;
  caption: string | null;
};

/**
 * Live gallery managed from the CRM (Supabase `gallery_images` table +
 * `gallery` storage bucket). Falls back to the bundled static images when
 * the table is empty or the request fails, so the site never looks broken.
 */
export function useGalleryImages() {
  const [images, setImages] = useState<string[]>(staticGalleryImages);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { data, error } = await supabase
          .from("gallery_images")
          .select("public_url, caption")
          .eq("visible", true)
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: false });

        if (cancelled) return;

        if (error) {
          console.warn("[Gallery] falling back to static images:", error.message);
        } else if (data && data.length > 0) {
          setImages((data as GalleryRow[]).map((r) => r.public_url));
        }
      } catch (err) {
        if (!cancelled) console.warn("[Gallery] fetch failed, using static images", err);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { images, loaded };
}
