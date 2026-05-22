import { supabase } from "./supabase.js";

export async function auth(req: any, res: any): Promise<boolean> {
  const token = req.headers["x-admin-key"] as string;
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}
