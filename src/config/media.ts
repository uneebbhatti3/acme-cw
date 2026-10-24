/**
 * Image standards. Every image slot on the site reserves one of these ratios,
 * and photos are fitted inside it (never stretched), so replacing or adding an
 * image never shifts the layout. Full photography brief: docs/CONTENT_GUIDE.md.
 */

/** Product photos: cards, gallery, thumbnails and lightbox. Supply 2400 x 1800 px on white. */
export const PRODUCT_RATIO = "4/3" as const;

/** Category cards. Supply 1600 x 1200 px. */
export const CATEGORY_RATIO = "4/3" as const;

/** Factory, process and team photos. Supply 2400 x 1600 px. */
export const PHOTO_RATIO = "3/2" as const;
