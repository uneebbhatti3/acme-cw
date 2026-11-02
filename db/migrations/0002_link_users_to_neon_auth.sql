-- Links an admin in users to their Neon Auth account. Set only after the admin proves their password.
ALTER TABLE users ADD COLUMN auth_user_id uuid UNIQUE;
