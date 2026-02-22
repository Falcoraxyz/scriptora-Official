-- 1. Create Affiliates Table (Standalone, no Supabase Auth dependency)
CREATE TABLE affiliates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL, -- Stored directly to bypass Auth service limits
    ref_id TEXT UNIQUE NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Sales Table
CREATE TABLE sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    affiliate_id UUID REFERENCES affiliates(id) ON DELETE CASCADE,
    ref_id TEXT NOT NULL,
    customer_email TEXT, -- Added to track who bought it
    device_key TEXT,    -- Added to link to their app installation
    amount INT8 DEFAULT 249000,
    status TEXT CHECK (status IN ('pending', 'verified')) DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Clicks Table
CREATE TABLE clicks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    affiliate_id UUID REFERENCES affiliates(id) ON DELETE CASCADE,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Optional: RLS disabling for ease of use in this phase
ALTER TABLE affiliates DISABLE ROW LEVEL SECURITY;
ALTER TABLE sales DISABLE ROW LEVEL SECURITY;
ALTER TABLE clicks DISABLE ROW LEVEL SECURITY;
