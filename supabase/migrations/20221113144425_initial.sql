CREATE extension ltree;

CREATE TABLE IF NOT EXISTS user_profiles (
    user_id uuid PRIMARY KEY REFERENCES auth.users (id) NOT NULL,
    full_name text NOT NULL,
    username text UNIQUE NOT NULL
);

CREATE OR REPLACE FUNCTION uuid_from_filename(filename text) RETURNS uuid AS $$
SELECT rtrim(
        STORAGE.filename(filename),
        concat('.', STORAGE.extension(filename))
    )::uuid;

$$ language SQL immutable SECURITY DEFINER leakproof;

ALTER TABLE user_profiles enable ROW LEVEL SECURITY;

CREATE POLICY "all can see" ON "public"."user_profiles" AS PERMISSIVE FOR
SELECT TO public USING (TRUE);

CREATE POLICY "users can insert" ON "public"."user_profiles" AS PERMISSIVE FOR
INSERT TO public WITH CHECK (auth.uid() = user_id);

CREATE POLICY "owners can update" ON "public"."user_profiles" AS PERMISSIVE FOR
UPDATE TO public USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

INSERT INTO STORAGE.buckets (id, name, public)
VALUES ('profile_images', 'profile_images', TRUE);

CREATE policy "Everyone can read profile images" ON STORAGE.objects FOR
SELECT TO anon,
    authenticated USING (bucket_id = 'profile_images');

CREATE policy "Users can delete their profile image" ON STORAGE.objects FOR DELETE TO authenticated USING (
    bucket_id = 'profile_images'
    AND auth.uid() = owner
    AND auth.uid() = uuid_from_filename(name)
);

CREATE policy "Users can update their profile image" ON STORAGE.objects FOR
UPDATE TO authenticated USING (
        bucket_id = 'profile_images'
        AND auth.uid() = owner
        AND auth.uid() = uuid_from_filename(name)
    );

CREATE policy "Users can upload their profile image" ON STORAGE.objects FOR
INSERT TO authenticated WITH CHECK (
        bucket_id = 'profile_images'
        AND auth.uid() = owner
        AND auth.uid() = uuid_from_filename(name)
    );