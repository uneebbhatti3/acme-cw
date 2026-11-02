-- Products added in the admin panel. image_url is the app URL of the image in the "products" bucket.
CREATE TABLE products (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          text NOT NULL UNIQUE,
  name          text NOT NULL,
  model         text NOT NULL,
  title         text NOT NULL,
  category_slug text NOT NULL,
  sizes         text[] NOT NULL DEFAULT '{}',
  description   text NOT NULL,
  image_url     text NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX products_model_unique ON products (upper(model));
