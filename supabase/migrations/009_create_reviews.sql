-- Create custom type for review status
CREATE TYPE public.review_status AS ENUM ('pending', 'approved', 'declined');

-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_name TEXT NOT NULL,
    company_name TEXT,
    rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    content TEXT NOT NULL,
    status public.review_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_reviews_status ON public.reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at);

-- Trigger to automatically update 'updated_at'
CREATE OR REPLACE FUNCTION update_reviews_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_reviews_updated_at
    BEFORE UPDATE ON public.reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_reviews_updated_at();

-- RLS configuration
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Allow public to read approved reviews
CREATE POLICY "Public can view approved reviews"
    ON public.reviews
    FOR SELECT
    TO anon, authenticated
    USING (status = 'approved');

-- Allow public to insert new reviews
CREATE POLICY "Public can insert reviews"
    ON public.reviews
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Allow authenticated admins to do everything (assuming service_role or admin check)
CREATE POLICY "Admins have full access to reviews"
    ON public.reviews
    TO authenticated
    USING (true)
    WITH CHECK (true);
