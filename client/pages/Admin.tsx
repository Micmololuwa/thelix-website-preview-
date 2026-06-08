import { useState, useEffect, useRef } from "react";
import { Trash2, Link2, Loader2, Plus, LogOut, Newspaper, Users, ImagePlus, X, Pencil, Check, Briefcase, MapPin, BookOpen, Eye, EyeOff, ArrowUp, ArrowDown, Rss, Globe } from "lucide-react";
import { RichTextEditor } from "@/components/RichTextEditor";
import { supabase } from "@/lib/supabase";

interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  date: string;
  source: string;
  createdAt: string;
}

interface Meta {
  title: string;
  description: string;
  image: string;
  source: string;
}

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  image: string;
  createdAt: string;
}

// ---- Login Gate ----
function LoginGate({ onAuth }: { onAuth: (token: string, email: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setLoading(true);
    setError("");
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (authError || !data.session) {
      setError(authError?.message || "Invalid email or password.");
      return;
    }
    onAuth(data.session.access_token, data.user.email ?? email);
  };

  return (
    <div className="min-h-screen bg-[#07060f] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-black font-jakarta">Admin Access</h1>
          <p className="text-black/50 text-sm mt-1 font-jakarta">Sign in with your Thelix admin account.</p>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-3 text-sm font-jakarta focus:outline-none focus:border-[#F48220]"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 pr-11 text-sm font-jakarta focus:outline-none focus:border-[#F48220]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black/30 hover:text-black transition-colors"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          {error && <p className="text-red-500 text-xs font-jakarta">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#F48220] text-white py-3 rounded-lg text-sm font-medium font-jakarta hover:bg-orange-500 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={15} className="animate-spin" />}
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ---- News Tab ----
function NewsTab({ adminKey }: { adminKey: string }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(false);

  const [url, setUrl] = useState("");
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const [form, setForm] = useState<Meta & { date: string; url: string }>({
    title: "", description: "", image: "", source: "", date: "", url: "",
  });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const headers = { "Content-Type": "application/json", "x-admin-key": adminKey };

  useEffect(() => {
    setLoadingArticles(true);
    fetch("/api/news")
      .then((r) => r.json())
      .then((data) => setArticles(data))
      .finally(() => setLoadingArticles(false));
  }, []);

  const fetchMeta = async () => {
    if (!url.trim()) return;
    setFetching(true);
    setFetchError("");
    try {
      const res = await fetch("/api/news/fetch-meta", {
        method: "POST",
        headers,
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setForm({
        title: data.title || "",
        description: data.description || "",
        image: data.image || "",
        source: data.source || "",
        date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
        url: url.trim(),
      });
    } catch (err: any) {
      setFetchError(err.message || "Failed to fetch URL");
    } finally {
      setFetching(false);
    }
  };

  const saveArticle = async () => {
    if (!form.title || !form.url) return;
    setSaving(true);
    setSaveError("");
    setSaveSuccess(false);
    try {
      const res = await fetch("/api/news", { method: "POST", headers, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setArticles((prev) => [data, ...prev]);
      setForm({ title: "", description: "", image: "", source: "", date: "", url: "" });
      setUrl("");
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setSaveError(err.message || "Failed to save article");
    } finally {
      setSaving(false);
    }
  };

  const deleteArticle = async (id: string) => {
    if (!confirm("Delete this article?")) return;
    await fetch(`/api/news/${id}`, { method: "DELETE", headers });
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const moveArticle = async (index: number, direction: "up" | "down") => {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= articles.length) return;
    const next = [...articles];
    [next[index], next[target]] = [next[target], next[index]];
    setArticles(next);
    await fetch("/api/news/reorder", { method: "PATCH", headers, body: JSON.stringify({ ids: next.map((a) => a.id) }) });
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Add Article */}
      <div className="bg-white rounded-2xl p-6 flex flex-col gap-6 shadow-sm">
        <h2 className="text-lg font-bold text-black font-jakarta">Add News Article</h2>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-black/70 font-jakarta">Article URL</label>
          <div className="flex gap-3">
            <input
              type="url"
              placeholder="https://example.com/article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchMeta()}
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-jakarta focus:outline-none focus:border-[#F48220]"
            />
            <button
              onClick={fetchMeta}
              disabled={fetching || !url.trim()}
              className="flex items-center gap-2 bg-[#F48220] text-white px-4 py-2.5 rounded-lg text-sm font-medium font-jakarta hover:bg-orange-500 transition-colors disabled:opacity-50"
            >
              {fetching ? <Loader2 size={16} className="animate-spin" /> : <Link2 size={16} />}
              {fetching ? "Fetching…" : "Fetch Details"}
            </button>
          </div>
          {fetchError && <p className="text-red-500 text-xs font-jakarta">{fetchError}</p>}
        </div>

        {form.title && (
          <div className="flex flex-col gap-4 border-t border-gray-100 pt-5">
            {form.image && <img src={form.image} alt="" className="w-full h-48 object-cover rounded-xl" />}
            <Field label="Title" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} />
            <Field label="Description" value={form.description} onChange={(v) => setForm((f) => ({ ...f, description: v }))} multiline />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Source / Publication" value={form.source} onChange={(v) => setForm((f) => ({ ...f, source: v }))} />
              <Field label="Date" value={form.date} onChange={(v) => setForm((f) => ({ ...f, date: v }))} />
            </div>
            <Field label="Image URL" value={form.image} onChange={(v) => setForm((f) => ({ ...f, image: v }))} />
            {saveError && <p className="text-red-500 text-xs font-jakarta">{saveError}</p>}
            {saveSuccess && <p className="text-green-600 text-xs font-jakarta">Article saved successfully.</p>}
            <button
              onClick={saveArticle}
              disabled={saving || !form.title || !form.url}
              className="flex items-center gap-2 bg-[#07060f] text-white px-5 py-3 rounded-lg text-sm font-medium font-jakarta hover:bg-gray-800 transition-colors disabled:opacity-50 w-fit"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
              {saving ? "Saving…" : "Add Article"}
            </button>
          </div>
        )}
      </div>

      {/* Article list */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-black font-jakarta">Published Articles ({articles.length})</h2>
        {loadingArticles && (
          <div className="flex items-center gap-2 text-black/40 text-sm font-jakarta">
            <Loader2 size={16} className="animate-spin" /> Loading…
          </div>
        )}
        {!loadingArticles && articles.length === 0 && (
          <p className="text-black/40 text-sm font-jakarta">No articles yet. Add one above.</p>
        )}
        {articles.map((article, index) => (
          <div key={article.id} className="bg-white rounded-xl p-4 flex gap-4 items-start shadow-sm">
            {article.image && (
              <img src={article.image} alt="" className="w-24 h-16 object-cover rounded-lg flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-black font-jakarta hover:text-[#F48220] transition-colors line-clamp-2">
                {article.title}
              </a>
              <p className="text-black/40 text-xs font-jakarta mt-1">
                {article.source && <span>{article.source} · </span>}
                {article.date}
              </p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button onClick={() => moveArticle(index, "up")} disabled={index === 0} className="text-black/30 hover:text-black transition-colors p-1 disabled:opacity-30" title="Move up"><ArrowUp size={15} /></button>
              <button onClick={() => moveArticle(index, "down")} disabled={index === articles.length - 1} className="text-black/30 hover:text-black transition-colors p-1 disabled:opacity-30" title="Move down"><ArrowDown size={15} /></button>
              <button onClick={() => deleteArticle(article.id)} className="text-red-400 hover:text-red-600 transition-colors p-1"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Photo Upload Widget (reusable) ----
function PhotoUpload({
  image, fileName, onFile, onClear, inputRef,
}: {
  image: string;
  fileName: string;
  onFile: (base64: string, name: string) => void;
  onClear: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert("Image must be under 5 MB."); return; }
    const reader = new FileReader();
    reader.onload = () => onFile(reader.result as string, file.name);
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-black/50 font-jakarta">Photo</label>
      <div className="flex items-start gap-4">
        <div
          onClick={() => inputRef.current?.click()}
          className={`w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer border-2 border-dashed transition-colors ${
            image ? "border-transparent" : "border-gray-200 hover:border-[#F48220]"
          }`}
        >
          {image ? (
            <img src={image} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center gap-1">
              <ImagePlus size={22} className="text-gray-300" />
              <span className="text-[10px] text-gray-300 font-jakarta text-center px-1">Click to upload</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 pt-1">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-jakarta text-black hover:border-[#F48220] hover:text-[#F48220] transition-colors w-fit"
          >
            <ImagePlus size={15} />
            {image ? "Change photo" : "Upload photo"}
          </button>
          {fileName && (
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-black/40 font-jakarta truncate max-w-[180px]">{fileName}</span>
              <button type="button" onClick={onClear} className="text-black/30 hover:text-red-500 transition-colors">
                <X size={13} />
              </button>
            </div>
          )}
          <p className="text-[11px] text-black/30 font-jakarta">JPG, PNG or WebP · Max 5 MB</p>
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleChange} className="hidden" />
    </div>
  );
}

// ---- Team Tab ----
function TeamTab({ adminKey }: { adminKey: string }) {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);

  // Add form state
  const [addForm, setAddForm] = useState({ name: "", designation: "", image: "" });
  const [addFileName, setAddFileName] = useState("");
  const addFileRef = useRef<HTMLInputElement>(null);
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState("");
  const [addSuccess, setAddSuccess] = useState(false);

  // Edit state
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", designation: "", image: "" });
  const [editFileName, setEditFileName] = useState("");
  const editFileRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState("");

  const headers = { "Content-Type": "application/json", "x-admin-key": adminKey };

  useEffect(() => {
    setLoading(true);
    fetch("/api/team")
      .then((r) => r.json())
      .then((data) => setMembers(data))
      .finally(() => setLoading(false));
  }, []);

  const addMember = async () => {
    if (!addForm.name || !addForm.designation) return;
    setAdding(true);
    setAddError("");
    setAddSuccess(false);
    try {
      const res = await fetch("/api/team", { method: "POST", headers, body: JSON.stringify(addForm) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMembers((prev) => [...prev, data]);
      setAddForm({ name: "", designation: "", image: "" });
      setAddFileName("");
      if (addFileRef.current) addFileRef.current.value = "";
      setAddSuccess(true);
      setTimeout(() => setAddSuccess(false), 3000);
    } catch (err: any) {
      setAddError(err.message || "Failed to save team member");
    } finally {
      setAdding(false);
    }
  };

  const startEdit = (member: TeamMember) => {
    setEditId(member.id);
    setEditForm({ name: member.name, designation: member.designation, image: member.image });
    setEditFileName("");
    setEditError("");
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditFileName("");
    if (editFileRef.current) editFileRef.current.value = "";
  };

  const saveEdit = async () => {
    if (!editForm.name || !editForm.designation || !editId) return;
    setSaving(true);
    setEditError("");
    try {
      const res = await fetch(`/api/team/${editId}`, { method: "PUT", headers, body: JSON.stringify(editForm) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMembers((prev) => prev.map((m) => (m.id === editId ? data : m)));
      cancelEdit();
    } catch (err: any) {
      setEditError(err.message || "Failed to update member");
    } finally {
      setSaving(false);
    }
  };

  const deleteMember = async (id: string) => {
    if (!confirm("Remove this team member?")) return;
    await fetch(`/api/team/${id}`, { method: "DELETE", headers });
    setMembers((prev) => prev.filter((m) => m.id !== id));
    if (editId === id) cancelEdit();
  };

  const moveMember = async (index: number, direction: "up" | "down") => {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= members.length) return;
    const next = [...members];
    [next[index], next[target]] = [next[target], next[index]];
    setMembers(next);
    await fetch("/api/team/reorder", { method: "PATCH", headers, body: JSON.stringify({ ids: next.map((m) => m.id) }) });
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Add Member */}
      <div className="bg-white rounded-2xl p-6 flex flex-col gap-6 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-black font-jakarta">Add Team Member</h2>
          <p className="text-xs text-black/40 font-jakarta mt-1">
            The first member added will appear in the large featured slot on the About page.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name" value={addForm.name} onChange={(v) => setAddForm((f) => ({ ...f, name: v }))} />
            <Field label="Designation / Role" value={addForm.designation} onChange={(v) => setAddForm((f) => ({ ...f, designation: v }))} />
          </div>
          <PhotoUpload
            image={addForm.image}
            fileName={addFileName}
            onFile={(base64, name) => { setAddForm((f) => ({ ...f, image: base64 })); setAddFileName(name); }}
            onClear={() => { setAddForm((f) => ({ ...f, image: "" })); setAddFileName(""); if (addFileRef.current) addFileRef.current.value = ""; }}
            inputRef={addFileRef}
          />
          {addError && <p className="text-red-500 text-xs font-jakarta">{addError}</p>}
          {addSuccess && <p className="text-green-600 text-xs font-jakarta">Team member added successfully.</p>}
          <button
            onClick={addMember}
            disabled={adding || !addForm.name || !addForm.designation}
            className="flex items-center gap-2 bg-[#07060f] text-white px-5 py-3 rounded-lg text-sm font-medium font-jakarta hover:bg-gray-800 transition-colors disabled:opacity-50 w-fit"
          >
            {adding ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
            {adding ? "Saving…" : "Add Member"}
          </button>
        </div>
      </div>

      {/* Member list */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-black font-jakarta">Team Members ({members.length})</h2>
        {loading && (
          <div className="flex items-center gap-2 text-black/40 text-sm font-jakarta">
            <Loader2 size={16} className="animate-spin" /> Loading…
          </div>
        )}
        {!loading && members.length === 0 && (
          <p className="text-black/40 text-sm font-jakarta">No team members yet. Add one above.</p>
        )}
        {members.map((member, index) => (
          <div key={member.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* View row */}
            {editId !== member.id ? (
              <div className="p-4 flex gap-4 items-center">
                {member.image ? (
                  <img src={member.image} alt="" className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Users size={20} className="text-gray-300" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-black font-jakarta">{member.name}</p>
                  <p className="text-xs text-black/40 font-jakarta">{member.designation}</p>
                </div>
                {index === 0 && (
                  <span className="text-[10px] font-jakarta text-[#F48220] border border-[#F48220]/30 px-2 py-0.5 rounded-full flex-shrink-0">
                    Featured
                  </span>
                )}
                <button onClick={() => moveMember(index, "up")} disabled={index === 0} className="text-black/30 hover:text-black transition-colors flex-shrink-0 p-1 disabled:opacity-30" title="Move up"><ArrowUp size={15} /></button>
                <button onClick={() => moveMember(index, "down")} disabled={index === members.length - 1} className="text-black/30 hover:text-black transition-colors flex-shrink-0 p-1 disabled:opacity-30" title="Move down"><ArrowDown size={15} /></button>
                <button
                  onClick={() => startEdit(member)}
                  className="text-black/30 hover:text-black transition-colors flex-shrink-0 p-1"
                  title="Edit"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => deleteMember(member.id)}
                  className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0 p-1"
                  title="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ) : (
              /* Edit row */
              <div className="p-5 flex flex-col gap-4 border-l-2 border-[#F48220]">
                <p className="text-xs font-medium text-[#F48220] font-jakarta">Editing — {member.name}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name" value={editForm.name} onChange={(v) => setEditForm((f) => ({ ...f, name: v }))} />
                  <Field label="Designation / Role" value={editForm.designation} onChange={(v) => setEditForm((f) => ({ ...f, designation: v }))} />
                </div>
                <PhotoUpload
                  image={editForm.image}
                  fileName={editFileName}
                  onFile={(base64, name) => { setEditForm((f) => ({ ...f, image: base64 })); setEditFileName(name); }}
                  onClear={() => { setEditForm((f) => ({ ...f, image: "" })); setEditFileName(""); if (editFileRef.current) editFileRef.current.value = ""; }}
                  inputRef={editFileRef}
                />
                {editError && <p className="text-red-500 text-xs font-jakarta">{editError}</p>}
                <div className="flex gap-3">
                  <button
                    onClick={saveEdit}
                    disabled={saving || !editForm.name || !editForm.designation}
                    className="flex items-center gap-2 bg-[#07060f] text-white px-4 py-2 rounded-lg text-sm font-medium font-jakarta hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                    {saving ? "Saving…" : "Save changes"}
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-4 py-2 rounded-lg text-sm font-medium font-jakarta text-black/50 hover:text-black border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Careers Tab ----
interface Job {
  id: string;
  title: string;
  location: string;
  description: string;
  applyUrl: string;
  createdAt: string;
}

function CareersTab({ adminKey }: { adminKey: string }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [addForm, setAddForm] = useState({ title: "", location: "", description: "", applyUrl: "" });
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState("");
  const [addSuccess, setAddSuccess] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: "", location: "", description: "", applyUrl: "" });
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState("");

  const headers = { "Content-Type": "application/json", "x-admin-key": adminKey };

  useEffect(() => {
    setLoading(true);
    fetch("/api/careers")
      .then((r) => r.json())
      .then((data) => setJobs(data))
      .finally(() => setLoading(false));
  }, []);

  const addJob = async () => {
    if (!addForm.title || !addForm.location || !addForm.description || !addForm.applyUrl) return;
    setAdding(true); setAddError(""); setAddSuccess(false);
    try {
      const res = await fetch("/api/careers", { method: "POST", headers, body: JSON.stringify(addForm) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setJobs((prev) => [...prev, data]);
      setAddForm({ title: "", location: "", description: "", applyUrl: "" });
      setAddSuccess(true);
      setTimeout(() => setAddSuccess(false), 3000);
    } catch (err: any) { setAddError(err.message || "Failed to save"); }
    finally { setAdding(false); }
  };

  const startEdit = (job: Job) => {
    setEditId(job.id);
    setEditForm({ title: job.title, location: job.location, description: job.description, applyUrl: job.applyUrl });
    setEditError("");
  };

  const cancelEdit = () => { setEditId(null); setEditError(""); };

  const saveEdit = async () => {
    if (!editId) return;
    setSaving(true); setEditError("");
    try {
      const res = await fetch(`/api/careers/${editId}`, { method: "PUT", headers, body: JSON.stringify(editForm) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setJobs((prev) => prev.map((j) => (j.id === editId ? data : j)));
      cancelEdit();
    } catch (err: any) { setEditError(err.message || "Failed to update"); }
    finally { setSaving(false); }
  };

  const deleteJob = async (id: string) => {
    if (!confirm("Remove this job posting?")) return;
    await fetch(`/api/careers/${id}`, { method: "DELETE", headers });
    setJobs((prev) => prev.filter((j) => j.id !== id));
    if (editId === id) cancelEdit();
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Add Job */}
      <div className="bg-white rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
        <h2 className="text-lg font-bold text-black font-jakarta">Post a Job</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Role / Job Title" value={addForm.title} onChange={(v) => setAddForm((f) => ({ ...f, title: v }))} />
          <Field label="Location (e.g. Lagos, Nigeria · Remote)" value={addForm.location} onChange={(v) => setAddForm((f) => ({ ...f, location: v }))} />
        </div>
        <Field label="Application URL" value={addForm.applyUrl} onChange={(v) => setAddForm((f) => ({ ...f, applyUrl: v }))} />
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-black/50 font-jakarta">Job Description</label>
          <RichTextEditor
            value={addForm.description}
            onChange={(v) => setAddForm((f) => ({ ...f, description: v }))}
            placeholder="Describe the role, responsibilities, and requirements…"
          />
        </div>
        {addError && <p className="text-red-500 text-xs font-jakarta">{addError}</p>}
        {addSuccess && <p className="text-green-600 text-xs font-jakarta">Job posted successfully.</p>}
        <button
          onClick={addJob}
          disabled={adding || !addForm.title || !addForm.location || !addForm.description || !addForm.applyUrl}
          className="flex items-center gap-2 bg-[#07060f] text-white px-5 py-3 rounded-lg text-sm font-medium font-jakarta hover:bg-gray-800 transition-colors disabled:opacity-50 w-fit"
        >
          {adding ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
          {adding ? "Posting…" : "Post Job"}
        </button>
      </div>

      {/* Job list */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-black font-jakarta">Active Postings ({jobs.length})</h2>
        {loading && <div className="flex items-center gap-2 text-black/40 text-sm font-jakarta"><Loader2 size={16} className="animate-spin" /> Loading…</div>}
        {!loading && jobs.length === 0 && <p className="text-black/40 text-sm font-jakarta">No jobs posted yet.</p>}
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            {editId !== job.id ? (
              <div className="p-4 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-[#F48220]/10 flex items-center justify-center flex-shrink-0">
                  <Briefcase size={18} className="text-[#F48220]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-black font-jakarta">{job.title}</p>
                  <p className="text-xs text-black/40 font-jakarta flex items-center gap-1 mt-0.5">
                    <MapPin size={11} /> {job.location}
                  </p>
                  <p className="text-xs text-black/50 font-jakarta mt-2 line-clamp-2">{job.description}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={() => startEdit(job)} className="text-black/30 hover:text-black transition-colors p-1"><Pencil size={15} /></button>
                  <button onClick={() => deleteJob(job.id)} className="text-red-400 hover:text-red-600 transition-colors p-1"><Trash2 size={15} /></button>
                </div>
              </div>
            ) : (
              <div className="p-5 flex flex-col gap-4 border-l-2 border-[#F48220]">
                <p className="text-xs font-medium text-[#F48220] font-jakarta">Editing — {job.title}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Role / Job Title" value={editForm.title} onChange={(v) => setEditForm((f) => ({ ...f, title: v }))} />
                  <Field label="Location" value={editForm.location} onChange={(v) => setEditForm((f) => ({ ...f, location: v }))} />
                </div>
                <Field label="Application URL" value={editForm.applyUrl} onChange={(v) => setEditForm((f) => ({ ...f, applyUrl: v }))} />
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-black/50 font-jakarta">Job Description</label>
                  <RichTextEditor
                    value={editForm.description}
                    onChange={(v) => setEditForm((f) => ({ ...f, description: v }))}
                  />
                </div>
                {editError && <p className="text-red-500 text-xs font-jakarta">{editError}</p>}
                <div className="flex gap-3">
                  <button onClick={saveEdit} disabled={saving} className="flex items-center gap-2 bg-[#07060f] text-white px-4 py-2 rounded-lg text-sm font-medium font-jakarta hover:bg-gray-800 transition-colors disabled:opacity-50">
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                    {saving ? "Saving…" : "Save changes"}
                  </button>
                  <button onClick={cancelEdit} className="px-4 py-2 rounded-lg text-sm font-medium font-jakarta text-black/50 hover:text-black border border-gray-200 hover:border-gray-300 transition-colors">Cancel</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Books Tab ----
interface Book {
  id: string;
  title: string;
  year: string;
  sellingUrl: string;
  cover: string;
  createdAt: string;
}

function BooksTab({ adminKey }: { adminKey: string }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [addForm, setAddForm] = useState({ title: "", year: "", sellingUrl: "", cover: "" });
  const [addFileName, setAddFileName] = useState("");
  const addFileRef = useRef<HTMLInputElement>(null);
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState("");
  const [addSuccess, setAddSuccess] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: "", year: "", sellingUrl: "", cover: "" });
  const [editFileName, setEditFileName] = useState("");
  const editFileRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState("");

  const headers = { "Content-Type": "application/json", "x-admin-key": adminKey };

  useEffect(() => {
    setLoading(true);
    fetch("/api/books")
      .then((r) => r.json())
      .then((data) => setBooks(data))
      .finally(() => setLoading(false));
  }, []);

  const addBook = async () => {
    if (!addForm.title || !addForm.year || !addForm.sellingUrl) return;
    setAdding(true); setAddError(""); setAddSuccess(false);
    try {
      const res = await fetch("/api/books", { method: "POST", headers, body: JSON.stringify(addForm) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setBooks((prev) => [...prev, data]);
      setAddForm({ title: "", year: "", sellingUrl: "", cover: "" });
      setAddFileName("");
      if (addFileRef.current) addFileRef.current.value = "";
      setAddSuccess(true);
      setTimeout(() => setAddSuccess(false), 3000);
    } catch (err: any) { setAddError(err.message || "Failed to save"); }
    finally { setAdding(false); }
  };

  const startEdit = (book: Book) => {
    setEditId(book.id);
    setEditForm({ title: book.title, year: book.year, sellingUrl: book.sellingUrl, cover: book.cover });
    setEditFileName("");
    setEditError("");
  };

  const cancelEdit = () => { setEditId(null); setEditFileName(""); if (editFileRef.current) editFileRef.current.value = ""; };

  const saveEdit = async () => {
    if (!editId) return;
    setSaving(true); setEditError("");
    try {
      const res = await fetch(`/api/books/${editId}`, { method: "PUT", headers, body: JSON.stringify(editForm) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setBooks((prev) => prev.map((b) => (b.id === editId ? data : b)));
      cancelEdit();
    } catch (err: any) { setEditError(err.message || "Failed to update"); }
    finally { setSaving(false); }
  };

  const deleteBook = async (id: string) => {
    if (!confirm("Remove this book?")) return;
    await fetch(`/api/books/${id}`, { method: "DELETE", headers });
    setBooks((prev) => prev.filter((b) => b.id !== id));
    if (editId === id) cancelEdit();
  };

  const moveBook = async (index: number, direction: "up" | "down") => {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= books.length) return;
    const next = [...books];
    [next[index], next[target]] = [next[target], next[index]];
    setBooks(next);
    await fetch("/api/books/reorder", { method: "PATCH", headers, body: JSON.stringify({ ids: next.map((b) => b.id) }) });
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Add Book */}
      <div className="bg-white rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-black font-jakarta">Add a Book</h2>
          <p className="text-xs text-black/40 font-jakarta mt-1">
            Books added here appear on the Founder page and link to their purchase page.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Book Title" value={addForm.title} onChange={(v) => setAddForm((f) => ({ ...f, title: v }))} />
          <Field label="Year Published" value={addForm.year} onChange={(v) => setAddForm((f) => ({ ...f, year: v }))} />
        </div>
        <Field label="Selling Page URL (Amazon, etc.)" value={addForm.sellingUrl} onChange={(v) => setAddForm((f) => ({ ...f, sellingUrl: v }))} />
        <PhotoUpload
          image={addForm.cover}
          fileName={addFileName}
          onFile={(base64, name) => { setAddForm((f) => ({ ...f, cover: base64 })); setAddFileName(name); }}
          onClear={() => { setAddForm((f) => ({ ...f, cover: "" })); setAddFileName(""); if (addFileRef.current) addFileRef.current.value = ""; }}
          inputRef={addFileRef}
        />
        {addError && <p className="text-red-500 text-xs font-jakarta">{addError}</p>}
        {addSuccess && <p className="text-green-600 text-xs font-jakarta">Book added successfully.</p>}
        <button
          onClick={addBook}
          disabled={adding || !addForm.title || !addForm.year || !addForm.sellingUrl}
          className="flex items-center gap-2 bg-[#07060f] text-white px-5 py-3 rounded-lg text-sm font-medium font-jakarta hover:bg-gray-800 transition-colors disabled:opacity-50 w-fit"
        >
          {adding ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
          {adding ? "Saving…" : "Add Book"}
        </button>
      </div>

      {/* Book list */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-black font-jakarta">Books ({books.length})</h2>
        {loading && <div className="flex items-center gap-2 text-black/40 text-sm font-jakarta"><Loader2 size={16} className="animate-spin" /> Loading…</div>}
        {!loading && books.length === 0 && <p className="text-black/40 text-sm font-jakarta">No books yet. Add one above.</p>}
        {books.map((book, index) => (
          <div key={book.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            {editId !== book.id ? (
              <div className="p-4 flex gap-4 items-center">
                {book.cover ? (
                  <img src={book.cover} alt="" className="w-14 h-20 object-cover rounded-lg flex-shrink-0" />
                ) : (
                  <div className="w-14 h-20 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <BookOpen size={20} className="text-gray-300" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-black font-jakarta">{book.title}</p>
                  <p className="text-xs text-thelix-orange font-jakarta mt-0.5">{book.year}</p>
                  <a href={book.sellingUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-black/40 font-jakarta hover:text-[#F48220] transition-colors truncate block mt-1">
                    {book.sellingUrl}
                  </a>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={() => moveBook(index, "up")} disabled={index === 0} className="text-black/30 hover:text-black transition-colors p-1 disabled:opacity-30" title="Move up"><ArrowUp size={15} /></button>
                  <button onClick={() => moveBook(index, "down")} disabled={index === books.length - 1} className="text-black/30 hover:text-black transition-colors p-1 disabled:opacity-30" title="Move down"><ArrowDown size={15} /></button>
                  <button onClick={() => startEdit(book)} className="text-black/30 hover:text-black transition-colors p-1"><Pencil size={15} /></button>
                  <button onClick={() => deleteBook(book.id)} className="text-red-400 hover:text-red-600 transition-colors p-1"><Trash2 size={15} /></button>
                </div>
              </div>
            ) : (
              <div className="p-5 flex flex-col gap-4 border-l-2 border-[#F48220]">
                <p className="text-xs font-medium text-[#F48220] font-jakarta">Editing — {book.title}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Book Title" value={editForm.title} onChange={(v) => setEditForm((f) => ({ ...f, title: v }))} />
                  <Field label="Year Published" value={editForm.year} onChange={(v) => setEditForm((f) => ({ ...f, year: v }))} />
                </div>
                <Field label="Selling Page URL" value={editForm.sellingUrl} onChange={(v) => setEditForm((f) => ({ ...f, sellingUrl: v }))} />
                <PhotoUpload
                  image={editForm.cover}
                  fileName={editFileName}
                  onFile={(base64, name) => { setEditForm((f) => ({ ...f, cover: base64 })); setEditFileName(name); }}
                  onClear={() => { setEditForm((f) => ({ ...f, cover: "" })); setEditFileName(""); if (editFileRef.current) editFileRef.current.value = ""; }}
                  inputRef={editFileRef}
                />
                {editError && <p className="text-red-500 text-xs font-jakarta">{editError}</p>}
                <div className="flex gap-3">
                  <button onClick={saveEdit} disabled={saving} className="flex items-center gap-2 bg-[#07060f] text-white px-4 py-2 rounded-lg text-sm font-medium font-jakarta hover:bg-gray-800 transition-colors disabled:opacity-50">
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                    {saving ? "Saving…" : "Save changes"}
                  </button>
                  <button onClick={cancelEdit} className="px-4 py-2 rounded-lg text-sm font-medium font-jakarta text-black/50 hover:text-black border border-gray-200 hover:border-gray-300 transition-colors">Cancel</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Blog Tab ----
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  author: string;
  category: string;
  date: string;
  published: boolean;
  sort_order: number;
}

const BLOG_CATEGORIES = [
  "Technology",
  "Leadership",
  "Innovation",
  "Company News",
  "Philanthropy",
  "Insights",
  "Cybersecurity",
];

const EXCERPT_LIMIT = 200;

function formatDateDisplay(isoDate: string): string {
  if (!isoDate) return "";
  const d = new Date(isoDate + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function dateToInputValue(displayDate: string): string {
  if (!displayDate) return "";
  const d = new Date(displayDate);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
}

// Cover image upload — landscape version of PhotoUpload
function CoverUpload({ image, fileName, onFile, onClear, inputRef }: {
  image: string; fileName: string;
  onFile: (base64: string, name: string) => void;
  onClear: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert("Image must be under 5 MB."); return; }
    const reader = new FileReader();
    reader.onload = () => onFile(reader.result as string, file.name);
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-black/50 font-jakarta">Cover Image</label>
      <div
        onClick={() => inputRef.current?.click()}
        className={`w-full h-40 rounded-xl overflow-hidden cursor-pointer border-2 border-dashed transition-colors ${image ? "border-transparent" : "border-gray-200 hover:border-[#F48220]"}`}
      >
        {image ? (
          <img src={image} alt="Cover preview" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center gap-1.5">
            <ImagePlus size={24} className="text-gray-300" />
            <span className="text-xs text-gray-300 font-jakarta">Click to upload cover image</span>
            <span className="text-[11px] text-gray-200 font-jakarta">JPG, PNG or WebP · Max 5 MB</span>
          </div>
        )}
      </div>
      {image && (
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => inputRef.current?.click()} className="flex items-center gap-1.5 text-xs font-jakarta text-black/50 hover:text-black transition-colors">
            <ImagePlus size={13} /> Change image
          </button>
          <span className="text-black/20">·</span>
          <button type="button" onClick={onClear} className="flex items-center gap-1 text-xs font-jakarta text-black/40 hover:text-red-500 transition-colors">
            <X size={12} /> Remove
          </button>
          {fileName && <span className="text-[11px] text-black/30 font-jakarta truncate max-w-[180px]">{fileName}</span>}
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleChange} className="hidden" />
    </div>
  );
}

const emptyBlogForm = { title: "", content: "", excerpt: "", cover_image: "", author: "", category: "", date: "", published: false };

function BlogPostForm({
  form, setForm, onSubmit, onCancel, saving, submitLabel, addFileRef,
}: {
  form: typeof emptyBlogForm;
  setForm: React.Dispatch<React.SetStateAction<typeof emptyBlogForm>>;
  onSubmit: (e?: React.FormEvent) => void;
  onCancel: () => void;
  saving: boolean;
  submitLabel: string;
  addFileRef: React.RefObject<HTMLInputElement>;
}) {
  const [fileName, setFileName] = useState("");

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Title *" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} />
        <Field label="Author" value={form.author} onChange={(v) => setForm((f) => ({ ...f, author: v }))} />

        {/* Category dropdown */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-black/50 font-jakarta">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-jakarta focus:outline-none focus:border-[#F48220] bg-white appearance-none"
          >
            <option value="">Select a category…</option>
            {BLOG_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Date picker */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-black/50 font-jakarta">Date</label>
          <input
            type="date"
            value={dateToInputValue(form.date)}
            onChange={(e) => setForm((f) => ({ ...f, date: formatDateDisplay(e.target.value) }))}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-jakarta focus:outline-none focus:border-[#F48220]"
          />
        </div>
      </div>

      {/* Cover image upload */}
      <CoverUpload
        image={form.cover_image}
        fileName={fileName}
        onFile={(base64, name) => { setForm((f) => ({ ...f, cover_image: base64 })); setFileName(name); }}
        onClear={() => { setForm((f) => ({ ...f, cover_image: "" })); setFileName(""); if (addFileRef.current) addFileRef.current.value = ""; }}
        inputRef={addFileRef}
      />

      {/* Excerpt with character limit */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-black/50 font-jakarta">Excerpt <span className="text-black/30">(shown on blog listing)</span></label>
          <span className={`text-xs font-jakarta ${form.excerpt.length > EXCERPT_LIMIT ? "text-red-500" : "text-black/30"}`}>
            {form.excerpt.length}/{EXCERPT_LIMIT}
          </span>
        </div>
        <textarea
          value={form.excerpt}
          onChange={(e) => {
            if (e.target.value.length <= EXCERPT_LIMIT) setForm((f) => ({ ...f, excerpt: e.target.value }));
          }}
          rows={3}
          placeholder="A short summary of the post…"
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-jakarta focus:outline-none focus:border-[#F48220] resize-y"
        />
      </div>

      {/* Rich text content */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-black/50 font-jakarta">Content *</label>
        <RichTextEditor value={form.content} onChange={(v) => setForm((f) => ({ ...f, content: v }))} placeholder="Write your blog post…" />
      </div>

      <label className="flex items-center gap-2 cursor-pointer w-fit">
        <input type="checkbox" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} className="accent-[#F48220]" />
        <span className="text-sm font-jakarta text-black/70">Publish immediately</span>
      </label>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onSubmit()}
          disabled={saving || !form.title.trim() || !form.content.trim()}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#F48220] text-white text-sm font-medium font-jakarta rounded-lg hover:bg-orange-500 transition-colors disabled:opacity-60"
        >
          {saving && <Loader2 size={14} className="animate-spin" />}
          {saving ? "Saving…" : submitLabel}
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-2.5 text-sm font-jakarta text-black/50 hover:text-black border border-gray-200 rounded-lg transition-colors">Cancel</button>
      </div>
    </div>
  );
}

function BlogTab({ adminKey }: { adminKey: string }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [addForm, setAddForm] = useState({ ...emptyBlogForm });
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ ...emptyBlogForm });
  const [showAdd, setShowAdd] = useState(false);
  const addFileRef = useRef<HTMLInputElement>(null);
  const editFileRef = useRef<HTMLInputElement>(null);

  const headers = { "Content-Type": "application/json", "x-admin-key": adminKey };

  useEffect(() => {
    fetch("/api/blog/admin/all", { headers: { "x-admin-key": adminKey } })
      .then((r) => r.json())
      .then((data) => { setPosts(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const addPost = async () => {
    if (!addForm.title.trim() || !addForm.content.trim()) return;
    setSaving(true);
    const res = await fetch("/api/blog", { method: "POST", headers, body: JSON.stringify(addForm) });
    const data = await res.json();
    setSaving(false);
    if (res.ok) {
      setPosts((prev) => [...prev, data]);
      setAddForm({ ...emptyBlogForm });
      if (addFileRef.current) addFileRef.current.value = "";
      setShowAdd(false);
    }
  };

  const startEdit = (post: BlogPost) => {
    setEditId(post.id);
    setEditForm({ title: post.title, content: post.content, excerpt: post.excerpt, cover_image: post.cover_image, author: post.author, category: post.category, date: post.date, published: post.published });
  };

  const saveEdit = async () => {
    if (!editId) return;
    setSaving(true);
    const res = await fetch(`/api/blog/${editId}`, { method: "PUT", headers, body: JSON.stringify(editForm) });
    const data = await res.json();
    setSaving(false);
    if (res.ok) {
      setPosts((prev) => prev.map((p) => (p.id === editId ? data : p)));
      setEditId(null);
      if (editFileRef.current) editFileRef.current.value = "";
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE", headers });
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const togglePublished = async (post: BlogPost) => {
    const res = await fetch(`/api/blog/${post.id}`, { method: "PUT", headers, body: JSON.stringify({ ...post, published: !post.published }) });
    const data = await res.json();
    if (res.ok) setPosts((prev) => prev.map((p) => (p.id === post.id ? data : p)));
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-black font-jakarta">Blog</h2>
          <p className="text-black/40 text-sm font-jakarta mt-0.5">Write and publish blog posts. Toggle the globe icon to publish or unpublish.</p>
        </div>
        <button
          onClick={() => { setShowAdd((v) => !v); setEditId(null); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#F48220] text-white text-sm font-medium font-jakarta rounded-lg hover:bg-orange-500 transition-colors"
        >
          <Plus size={16} /> New Post
        </button>
      </div>

      {showAdd && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-base font-bold text-black font-jakarta mb-5">New Blog Post</h3>
          <BlogPostForm
            form={addForm}
            setForm={setAddForm}
            onSubmit={addPost}
            onCancel={() => setShowAdd(false)}
            saving={saving}
            submitLabel="Publish Post"
            addFileRef={addFileRef}
          />
        </div>
      )}

      {loading && <div className="flex items-center gap-2 text-black/40 text-sm font-jakarta"><Loader2 size={15} className="animate-spin" /> Loading posts…</div>}
      {!loading && posts.length === 0 && <p className="text-black/40 text-sm font-jakarta">No blog posts yet. Click "New Post" to write one.</p>}

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {editId === post.id ? (
              <div className="p-6">
                <h3 className="text-base font-bold font-jakarta mb-5">Editing: {post.title}</h3>
                <BlogPostForm
                  form={editForm}
                  setForm={setEditForm}
                  onSubmit={saveEdit}
                  onCancel={() => setEditId(null)}
                  saving={saving}
                  submitLabel="Save changes"
                  addFileRef={editFileRef}
                />
              </div>
            ) : (
              <div className="flex items-start gap-4 p-4">
                {post.cover_image && (
                  <img src={post.cover_image} alt={post.title} className="w-20 h-14 object-cover rounded-lg flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`text-xs font-medium font-jakarta px-2 py-0.5 rounded-full ${post.published ? "bg-green-50 text-green-600 border border-green-200" : "bg-gray-100 text-black/40 border border-gray-200"}`}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                    {post.category && <span className="text-xs text-thelix-orange font-jakarta bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-full">{post.category}</span>}
                    {post.date && <span className="text-xs text-black/30 font-jakarta">{post.date}</span>}
                  </div>
                  <p className="text-sm font-bold text-black font-jakarta truncate">{post.title}</p>
                  {post.excerpt && <p className="text-xs text-black/45 font-jakarta mt-0.5 line-clamp-1">{post.excerpt}</p>}
                  {post.author && <p className="text-xs text-black/30 font-jakarta mt-0.5">By {post.author}</p>}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => togglePublished(post)} title={post.published ? "Unpublish" : "Publish"} className="p-2 text-black/30 hover:text-green-600 transition-colors">
                    <Globe size={16} />
                  </button>
                  <button onClick={() => { startEdit(post); setShowAdd(false); }} title="Edit" className="p-2 text-black/30 hover:text-black transition-colors">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => deletePost(post.id)} title="Delete" className="p-2 text-black/30 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Main Admin Panel ----
export default function Admin() {
  const [adminKey, setAdminKey] = useState<string>("");
  const [adminEmail, setAdminEmail] = useState<string>("");
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState<"news" | "team" | "careers" | "books" | "blog">("news");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setAdminKey(data.session.access_token);
        setAdminEmail(data.session.user.email ?? "");
        setAuthed(true);
      }
      setChecking(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAdminKey(session.access_token);
        setAdminEmail(session.user.email ?? "");
        setAuthed(true);
      } else {
        setAdminKey("");
        setAdminEmail("");
        setAuthed(false);
      }
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleAuth = (token: string, email: string) => {
    setAdminKey(token);
    setAdminEmail(email);
    setAuthed(true);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (checking) return (
    <div className="min-h-screen bg-[#07060f] flex items-center justify-center">
      <Loader2 size={24} className="animate-spin text-white/40" />
    </div>
  );

  if (!authed) return <LoginGate onAuth={handleAuth} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-black font-jakarta">Thelix Admin</h1>
          <p className="text-black/40 text-xs font-jakarta">{adminEmail || "Thelix Holdings"}</p>
        </div>
        <button onClick={signOut} className="flex items-center gap-2 text-sm text-black/50 hover:text-black font-jakarta transition-colors">
          <LogOut size={16} /> Sign out
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="max-w-4xl mx-auto flex gap-0">
          <button
            onClick={() => setTab("news")}
            className={`flex items-center gap-2 px-5 py-3.5 text-sm font-jakarta font-medium border-b-2 transition-colors ${
              tab === "news"
                ? "border-[#F48220] text-[#F48220]"
                : "border-transparent text-black/50 hover:text-black"
            }`}
          >
            <Newspaper size={16} /> News
          </button>
          <button
            onClick={() => setTab("team")}
            className={`flex items-center gap-2 px-5 py-3.5 text-sm font-jakarta font-medium border-b-2 transition-colors ${
              tab === "team"
                ? "border-[#F48220] text-[#F48220]"
                : "border-transparent text-black/50 hover:text-black"
            }`}
          >
            <Users size={16} /> Team
          </button>
          <button
            onClick={() => setTab("careers")}
            className={`flex items-center gap-2 px-5 py-3.5 text-sm font-jakarta font-medium border-b-2 transition-colors ${
              tab === "careers"
                ? "border-[#F48220] text-[#F48220]"
                : "border-transparent text-black/50 hover:text-black"
            }`}
          >
            <Briefcase size={16} /> Careers
          </button>
          <button
            onClick={() => setTab("books")}
            className={`flex items-center gap-2 px-5 py-3.5 text-sm font-jakarta font-medium border-b-2 transition-colors ${
              tab === "books"
                ? "border-[#F48220] text-[#F48220]"
                : "border-transparent text-black/50 hover:text-black"
            }`}
          >
            <BookOpen size={16} /> Books
          </button>
          <button
            onClick={() => setTab("blog")}
            className={`flex items-center gap-2 px-5 py-3.5 text-sm font-jakarta font-medium border-b-2 transition-colors ${
              tab === "blog"
                ? "border-[#F48220] text-[#F48220]"
                : "border-transparent text-black/50 hover:text-black"
            }`}
          >
            <Rss size={16} /> Blog
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {tab === "news" && <NewsTab adminKey={adminKey} />}
        {tab === "team" && <TeamTab adminKey={adminKey} />}
        {tab === "careers" && <CareersTab adminKey={adminKey} />}
        {tab === "books" && <BooksTab adminKey={adminKey} />}
        {tab === "blog" && <BlogTab adminKey={adminKey} />}
      </div>
    </div>
  );
}

// ---- Reusable field ----
function Field({
  label, value, onChange, multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  const base = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-jakarta focus:outline-none focus:border-[#F48220]";
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-black/50 font-jakarta">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={6} className={`${base} resize-y`} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={base} />
      )}
    </div>
  );
}
