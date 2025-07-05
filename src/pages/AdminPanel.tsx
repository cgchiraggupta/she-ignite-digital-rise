import { useEffect, useState } from "react";
import { fetchBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost, BlogPost } from "@/lib/blogService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  category: "Digital Marketing",
  author: "",
  read_time: "5 min read",
  featured: false,
  image_url: "",
  tags: [] as string[],
};

const categories = [
  "Digital Marketing",
  "AI & Technology",
  "Business Growth",
  "Success Stories",
];

export default function AdminPanel() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<any>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const loadPosts = () => {
    setLoading(true);
    fetchBlogPosts()
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load posts");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((f: any) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTagsChange = (e: any) => {
    setForm((f: any) => ({ ...f, tags: e.target.value.split(",").map((t: string) => t.trim()) }));
  };

  const handleEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setForm({ ...post, tags: post.tags || [] });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this post?")) return;
    await deleteBlogPost(id);
    loadPosts();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateBlogPost(editingId, form);
      } else {
        await createBlogPost(form);
      }
      setForm(emptyForm);
      setEditingId(null);
      loadPosts();
    } catch (err) {
      alert("Error saving post");
    }
    setSaving(false);
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Blog Admin Panel</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Post" : "Add New Post"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 rounded" required />
              <input name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Excerpt" className="border p-2 rounded" required />
              <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content (Markdown supported)" className="border p-2 rounded min-h-[120px]" required />
              <select name="category" value={form.category} onChange={handleChange} className="border p-2 rounded">
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input name="author" value={form.author} onChange={handleChange} placeholder="Author" className="border p-2 rounded" required />
              <input name="read_time" value={form.read_time} onChange={handleChange} placeholder="Read Time (e.g. 5 min read)" className="border p-2 rounded" required />
              <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="Image URL (optional)" className="border p-2 rounded" />
              <input name="tags" value={form.tags.join(", ")} onChange={handleTagsChange} placeholder="Tags (comma separated)" className="border p-2 rounded" />
              <label className="flex items-center gap-2">
                <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
                Featured
              </label>
              <div className="flex gap-4">
                <Button type="submit" disabled={saving}>{saving ? "Saving..." : editingId ? "Update" : "Add Post"}</Button>
                {editingId && <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>}
              </div>
            </form>
          </CardContent>
        </Card>
        <h2 className="text-2xl font-bold mb-4">All Posts</h2>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-muted">
                  <th className="p-2 border">Title</th>
                  <th className="p-2 border">Category</th>
                  <th className="p-2 border">Author</th>
                  <th className="p-2 border">Featured</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td className="p-2 border">{post.title}</td>
                    <td className="p-2 border">{post.category}</td>
                    <td className="p-2 border">{post.author}</td>
                    <td className="p-2 border text-center">{post.featured ? "✅" : ""}</td>
                    <td className="p-2 border flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 