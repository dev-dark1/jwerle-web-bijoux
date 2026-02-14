-- BIJOUX IYL - Seed Initial Data
-- This script creates the initial admin user and migrates products from catalog

-- ==========================================
-- CREATE INITIAL SUPER ADMIN
-- ==========================================
-- Email: rabaailyass2004@gmail.com
-- Password: Admin@123 (should be changed immediately after first login)
-- Password hash generated with bcrypt, salt rounds: 10
INSERT INTO admins (email, password_hash, role, is_active)
VALUES (
  'rabaailyass2004@gmail.com',
  '$2a$10$YourHashedPasswordHere', -- This will be replaced by actual hash
  'super_admin',
  true
)
ON CONFLICT (email) DO NOTHING;

-- ==========================================
-- MIGRATE PRODUCTS FROM CATALOG
-- ==========================================

-- Product 1: Silver Curb Chain Bracelet
INSERT INTO products (
  name, description, price, image, category, type, 
  has_stone, has_size, metal_type, sku, stock_quantity, is_active
) VALUES (
  'Silver Curb Chain Bracelet',
  'Bold curb chain in 925 sterling silver. Weight: 20g. Width: 8mm.',
  450,
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bracelet-silver-curb-nMjSKYVlrZdOX0CKj0vH8eFm4CwSMI.jpg',
  'Bracelets',
  'men',
  false,
  true,
  'silver',
  'IYL-BRC-001',
  50,
  true
) ON CONFLICT (sku) DO NOTHING;

-- Product 2: Black Zircon Ring
INSERT INTO products (
  name, description, price, image, category, type,
  has_stone, has_size, metal_type, sku, stock_quantity, is_active
) VALUES (
  'Black Zircon Ring',
  'Striking black zircon set in silver. Stone: 8mm round cut.',
  320,
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ring-black-zircon-8tXvQYMnJKp4lN3HfZ0eR2wA5BqDgS.jpg',
  'Rings',
  'men',
  true,
  true,
  'silver',
  'IYL-RNG-001',
  75,
  true
) ON CONFLICT (sku) DO NOTHING;

-- Product 3: Gold Chain Necklace
INSERT INTO products (
  name, description, price, image, category, type,
  has_stone, has_size, metal_type, sku, stock_quantity, is_active
) VALUES (
  'Gold Chain Necklace',
  'Classic rope chain in 18k gold vermeil. Length: 55cm. Weight: 15g.',
  680,
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/necklace-gold-chain-pR1TkL6VmXs9Wf2Hy4NcJ7bQ0DzEaG.jpg',
  'Necklaces',
  'men',
  false,
  false,
  'gold',
  'IYL-NCK-001',
  30,
  true
) ON CONFLICT (sku) DO NOTHING;

-- Product 4: Silver Signet Ring
INSERT INTO products (
  name, description, price, image, category, type,
  has_stone, has_size, metal_type, sku, stock_quantity, is_active
) VALUES (
  'Silver Signet Ring',
  'Royal signet ring with brushed finish. Weight: 12g. Face: 15x15mm.',
  380,
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ring-silver-signet-fT3NhK9LmWv6Xs1Qy8BcR4pJ0DzEaG.jpg',
  'Rings',
  'men',
  false,
  true,
  'silver',
  'IYL-RNG-002',
  60,
  true
) ON CONFLICT (sku) DO NOTHING;

-- Product 5: Delicate Chain Bracelet (Women)
INSERT INTO products (
  name, description, price, image, category, type,
  has_stone, has_size, metal_type, sku, stock_quantity, is_active
) VALUES (
  'Delicate Chain Bracelet',
  'Elegant fine chain in 925 sterling silver. Length: 18cm + 3cm extender.',
  280,
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bracelet-silver-delicate-women-kM2VnL9XpRs6Tf4Hy1NcJ8bQ0DzEaG.jpg',
  'Bracelets',
  'women',
  false,
  false,
  'silver',
  'IYL-BRC-W001',
  90,
  true
) ON CONFLICT (sku) DO NOTHING;

-- Product 6: Pearl Drop Earrings (Women)
INSERT INTO products (
  name, description, price, image, category, type,
  has_stone, has_size, metal_type, sku, stock_quantity, is_active
) VALUES (
  'Pearl Drop Earrings',
  'Freshwater pearls with sterling silver posts. Pearl size: 8mm.',
  340,
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/earrings-pearl-drop-women-pL5NmR8VxKs3Wf6Hy2NcJ9bQ1DzEaG.jpg',
  'Earrings',
  'women',
  true,
  false,
  'silver',
  'IYL-ERR-W001',
  70,
  true
) ON CONFLICT (sku) DO NOTHING;

-- Product 7: Gold Bangle (Women)
INSERT INTO products (
  name, description, price, image, category, type,
  has_stone, has_size, metal_type, sku, stock_quantity, is_active
) VALUES (
  'Gold Bangle',
  'Classic round bangle in 18k gold vermeil. Diameter: 6.5cm. Weight: 18g.',
  720,
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bangle-gold-classic-women-rN4VkL7XpMs2Tf5Hy3NcJ0bQ6DzEaG.jpg',
  'Bracelets',
  'women',
  false,
  false,
  'gold',
  'IYL-BNG-W001',
  40,
  true
) ON CONFLICT (sku) DO NOTHING;

-- Product 8: Rose Gold Heart Pendant (Women)
INSERT INTO products (
  name, description, price, image, category, type,
  has_stone, has_size, metal_type, sku, stock_quantity, is_active
) VALUES (
  'Rose Gold Heart Pendant',
  'Delicate heart pendant with chain. Chain length: 45cm. Pendant: 12mm.',
  420,
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pendant-rose-gold-heart-women-sM6VnL8XpRt4Tf7Hy5NcJ1bQ2DzEaG.jpg',
  'Necklaces',
  'women',
  false,
  false,
  'gold',
  'IYL-PND-W001',
  55,
  true
) ON CONFLICT (sku) DO NOTHING;

-- ==========================================
-- SEED INITIAL SITE CONTENT
-- ==========================================

INSERT INTO site_content (key, value, updated_by)
VALUES 
  ('hero_title', '"Every Royal Story Begins With a Spark."', 'system'),
  ('hero_subtitle', '"Royal Moroccan heritage in modern black and gold. Build identity jewelry designed for status, symbolism, and legacy."', 'system'),
  ('announcement_bar', '"Discover BIJOUX IYL - Free Delivery in Morocco for orders over 500 MAD"', 'system'),
  ('contact_email', '"contact@bijouxiyl.com"', 'system'),
  ('contact_phone', '"+212 6 XX XX XX XX"', 'system'),
  ('about_text', '"BIJOUX IYL represents the fusion of Royal Moroccan heritage with modern jewelry craftsmanship. Each piece is handcrafted in Tizirit, Morocco with architectural precision."', 'system')
ON CONFLICT (key) DO UPDATE SET 
  value = EXCLUDED.value,
  updated_at = timezone('utc'::text, now());

-- ==========================================
-- CLEAN UP OLD OTPs AND EXPIRED DATA
-- ==========================================

-- Delete expired OTPs (older than 1 hour)
DELETE FROM admin_otps 
WHERE expires_at < timezone('utc'::text, now());

-- Delete expired trusted devices
DELETE FROM trusted_devices 
WHERE expires_at < timezone('utc'::text, now());

-- Reset old failed attempts (older than 24 hours)
DELETE FROM failed_attempts 
WHERE created_at < timezone('utc'::text, now()) - INTERVAL '24 hours';
