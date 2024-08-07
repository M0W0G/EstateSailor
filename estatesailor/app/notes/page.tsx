import { createClient } from '@/app/utils/supabase/server';

export default async function Notes() {
  const supabase = createClient();
  const { data: users } = await supabase.from("users").select();

  return <pre>{JSON.stringify(users, null, 2)}</pre>
}