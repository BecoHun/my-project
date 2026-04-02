-- Create messages table for the message board
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read messages (public message board)
CREATE POLICY "Anyone can read messages" ON messages
  FOR SELECT USING (true);

-- Allow anyone to insert messages
CREATE POLICY "Anyone can insert messages" ON messages
  FOR INSERT WITH CHECK (true);

-- Allow anyone to delete messages
CREATE POLICY "Anyone can delete messages" ON messages
  FOR DELETE USING (true);
