
-- Wanted posts table
CREATE TABLE public.wanted_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vehicle_description TEXT NOT NULL,
  budget TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'Active',
  matches INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.wanted_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own wanted posts" ON public.wanted_posts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own wanted posts" ON public.wanted_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own wanted posts" ON public.wanted_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own wanted posts" ON public.wanted_posts FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_wanted_posts_updated_at BEFORE UPDATE ON public.wanted_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Movements table
CREATE TABLE public.movements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vehicle_name TEXT NOT NULL,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  from_location TEXT NOT NULL,
  to_location TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Scheduled',
  scheduled_date DATE,
  driver TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.movements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own movements" ON public.movements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own movements" ON public.movements FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own movements" ON public.movements FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own movements" ON public.movements FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_movements_updated_at BEFORE UPDATE ON public.movements FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Documents table
CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  doc_type TEXT NOT NULL DEFAULT 'Invoice',
  vehicle_name TEXT,
  party_name TEXT,
  amount NUMERIC,
  doc_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own documents" ON public.documents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own documents" ON public.documents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own documents" ON public.documents FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own documents" ON public.documents FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON public.documents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
