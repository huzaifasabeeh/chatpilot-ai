-- ChatPilot v2 isolated tables. Run in Supabase SQL editor after review.
-- Does not modify existing public User/Chat/Message tables used by Prisma.
CREATE TABLE IF NOT EXISTS public.cp_chats (
  id varchar(36) PRIMARY KEY,
  owner_clerk_id varchar(255) NOT NULL,
  title varchar(120) NOT NULL DEFAULT 'New Chat',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS cp_chats_owner_clerk_id_idx ON public.cp_chats(owner_clerk_id);
CREATE TABLE IF NOT EXISTS public.cp_messages (
  id varchar(36) PRIMARY KEY,
  chat_id varchar(36) NOT NULL REFERENCES public.cp_chats(id) ON DELETE CASCADE,
  role varchar(24) NOT NULL CHECK (role IN ('user','assistant')),
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS cp_messages_chat_id_idx ON public.cp_messages(chat_id);
-- Server-side FastAPI uses a trusted database connection; keep client access disabled.
ALTER TABLE public.cp_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cp_messages ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.cp_chats, public.cp_messages FROM anon, authenticated;
