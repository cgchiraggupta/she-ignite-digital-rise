import { useEffect, useState } from "react";
import { fetchBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost, BlogPost } from "@/lib/blogService";
import { fetchEvents, createEvent, updateEvent, deleteEvent, Event, fetchRegistrationsWithEvents, RegistrationWithEvent } from "@/lib/eventService";
import { getCurrentUser, signOut, onAuthStateChange, User } from "@/lib/authService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLogin from "@/components/AdminLogin";
import { LogOut, Plus, Edit, Trash2, Users, Calendar, FileText, Settings } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

const emptyBlogForm = {
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

const emptyEventForm = {
  title: "",
  description: "",
  event_date: "",
  event_time: "",
  location: "",
  image_url: "",
  registration_enabled: true,
  max_attendees: 100,
  price: 0,
  currency: "USD",
  status: "draft" as const,
  registration_fields: ["name", "email", "phone"],
  thank_you_message: "Thank you for registering! We'll send you more details soon.",
};

const categories = [
  "Digital Marketing",
  "AI & Technology", 
  "Business Growth",
  "Success Stories",
];

export default function AdminPanel() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("blogs");
  
  // Blog state
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [blogForm, setBlogForm] = useState<any>(emptyBlogForm);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  
  // Event state
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventForm, setEventForm] = useState<any>(emptyEventForm);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [registrations, setRegistrations] = useState<RegistrationWithEvent[]>([]);
  
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Check initial auth state
    getCurrentUser().then((user) => {
      setUser(user);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadPosts = () => {
    setPostsLoading(true);
    fetchBlogPosts()
      .then((data) => {
        setPosts(data);
        setPostsLoading(false);
      })
      .catch(() => {
        setError("Failed to load posts");
        setPostsLoading(false);
      });
  };

  const loadEvents = () => {
    setEventsLoading(true);
    fetchEvents()
      .then((data) => {
        setEvents(data);
        setEventsLoading(false);
      })
      .catch(() => {
        setError("Failed to load events");
        setEventsLoading(false);
      });
  };

  const loadRegistrations = (eventId?: string) => {
    fetchRegistrationsWithEvents(eventId)
      .then((data) => {
        setRegistrations(data);
      })
      .catch(() => {
        setError("Failed to load registrations");
      });
  };

  useEffect(() => {
    if (user) {
      loadPosts();
      loadEvents();
      loadRegistrations();
    }
  }, [user]);

  const handleBlogChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setBlogForm((f: any) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEventChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setEventForm((f: any) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlogTagsChange = (e: any) => {
    setBlogForm((f: any) => ({ ...f, tags: e.target.value.split(",").map((t: string) => t.trim()) }));
  };

  const handleEventFieldsChange = (e: any) => {
    setEventForm((f: any) => ({ ...f, registration_fields: e.target.value.split(",").map((t: string) => t.trim()) }));
  };

  const handleEditBlog = (post: BlogPost) => {
    setEditingBlogId(post.id);
    setBlogForm({ ...post, tags: post.tags || [] });
  };

  const handleEditEvent = (event: Event) => {
    setEditingEventId(event.id);
    setEventForm({ ...event, registration_fields: event.registration_fields || [] });
  };

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm("Delete this blog post?")) return;
    await deleteBlogPost(id);
    loadPosts();
  };

  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm("Delete this event?")) return;
    await deleteEvent(id);
    loadEvents();
  };

  const handleBlogSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingBlogId) {
        await updateBlogPost(editingBlogId, blogForm);
      } else {
        await createBlogPost(blogForm);
      }
      setBlogForm(emptyBlogForm);
      setEditingBlogId(null);
      loadPosts();
    } catch (err) {
      alert("Error saving blog post");
    }
    setSaving(false);
  };

  const handleEventSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingEventId) {
        await updateEvent(editingEventId, eventForm);
      } else {
        await createEvent(eventForm);
      }
      setEventForm(emptyEventForm);
      setEditingEventId(null);
      loadEvents();
    } catch (err) {
      alert("Error saving event");
    }
    setSaving(false);
  };

  const handleCancelBlog = () => {
    setBlogForm(emptyBlogForm);
    setEditingBlogId(null);
  };

  const handleCancelEvent = () => {
    setEventForm(emptyEventForm);
    setEditingEventId(null);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLogin={() => {}} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold">SHELeads Admin Panel</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="blogs" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Blogs
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="registrations" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Registrations
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="blogs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  {editingBlogId ? "Edit Blog Post" : "Add New Blog Post"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBlogSubmit} className="grid gap-4">
                  <input name="title" value={blogForm.title} onChange={handleBlogChange} placeholder="Title" className="border p-2 rounded" required />
                  <input name="excerpt" value={blogForm.excerpt} onChange={handleBlogChange} placeholder="Excerpt" className="border p-2 rounded" required />
                  <textarea name="content" value={blogForm.content} onChange={handleBlogChange} placeholder="Content (Markdown supported)" className="border p-2 rounded min-h-[120px]" required />
                  <select name="category" value={blogForm.category} onChange={handleBlogChange} className="border p-2 rounded">
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <input name="author" value={blogForm.author} onChange={handleBlogChange} placeholder="Author" className="border p-2 rounded" required />
                  <input name="read_time" value={blogForm.read_time} onChange={handleBlogChange} placeholder="Read Time (e.g. 5 min read)" className="border p-2 rounded" required />
                  <div>
                    <label className="block text-sm font-medium mb-2">Blog Image</label>
                    <ImageUpload
                      value={blogForm.image_url}
                      onChange={(url) => setBlogForm((f: any) => ({ ...f, image_url: url }))}
                      folder="blog"
                    />
                  </div>
                  <input name="tags" value={blogForm.tags.join(", ")} onChange={handleBlogTagsChange} placeholder="Tags (comma separated)" className="border p-2 rounded" />
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="featured" checked={blogForm.featured} onChange={handleBlogChange} />
                    Featured
                  </label>
                  <div className="flex gap-4">
                    <Button type="submit" disabled={saving}>{saving ? "Saving..." : editingBlogId ? "Update" : "Add Post"}</Button>
                    {editingBlogId && <Button type="button" variant="outline" onClick={handleCancelBlog}>Cancel</Button>}
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>All Blog Posts</CardTitle>
              </CardHeader>
              <CardContent>
                {postsLoading ? (
                  <div>Loading posts...</div>
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
                              <Button size="sm" variant="outline" onClick={() => handleEditBlog(post)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDeleteBlog(post.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  {editingEventId ? "Edit Event" : "Add New Event"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEventSubmit} className="grid gap-4">
                  <input name="title" value={eventForm.title} onChange={handleEventChange} placeholder="Event Title" className="border p-2 rounded" required />
                  <textarea name="description" value={eventForm.description} onChange={handleEventChange} placeholder="Event Description" className="border p-2 rounded min-h-[80px]" required />
                  <div className="grid grid-cols-2 gap-4">
                    <input name="event_date" type="date" value={eventForm.event_date} onChange={handleEventChange} className="border p-2 rounded" required />
                    <input name="event_time" type="time" value={eventForm.event_time} onChange={handleEventChange} className="border p-2 rounded" required />
                  </div>
                  <input name="location" value={eventForm.location} onChange={handleEventChange} placeholder="Location" className="border p-2 rounded" required />
                  <div>
                    <label className="block text-sm font-medium mb-2">Event Image</label>
                    <ImageUpload
                      value={eventForm.image_url}
                      onChange={(url) => setEventForm((f: any) => ({ ...f, image_url: url }))}
                      folder="events"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <input name="max_attendees" type="number" value={eventForm.max_attendees} onChange={handleEventChange} placeholder="Max Attendees" className="border p-2 rounded" />
                    <input name="price" type="number" step="0.01" value={eventForm.price} onChange={handleEventChange} placeholder="Price" className="border p-2 rounded" />
                    <select name="currency" value={eventForm.currency} onChange={handleEventChange} className="border p-2 rounded">
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                  <select name="status" value={eventForm.status} onChange={handleEventChange} className="border p-2 rounded">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="ended">Ended</option>
                  </select>
                  <input name="registration_fields" value={eventForm.registration_fields.join(", ")} onChange={handleEventFieldsChange} placeholder="Registration Fields (comma separated)" className="border p-2 rounded" />
                  <textarea name="thank_you_message" value={eventForm.thank_you_message} onChange={handleEventChange} placeholder="Thank you message after registration" className="border p-2 rounded" />
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="registration_enabled" checked={eventForm.registration_enabled} onChange={handleEventChange} />
                    Enable Registration
                  </label>
                  <div className="flex gap-4">
                    <Button type="submit" disabled={saving}>{saving ? "Saving..." : editingEventId ? "Update" : "Add Event"}</Button>
                    {editingEventId && <Button type="button" variant="outline" onClick={handleCancelEvent}>Cancel</Button>}
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>All Events</CardTitle>
              </CardHeader>
              <CardContent>
                {eventsLoading ? (
                  <div>Loading events...</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border">
                      <thead>
                        <tr className="bg-muted">
                          <th className="p-2 border">Title</th>
                          <th className="p-2 border">Date</th>
                          <th className="p-2 border">Location</th>
                          <th className="p-2 border">Status</th>
                          <th className="p-2 border">Registration</th>
                          <th className="p-2 border">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {events.map((event) => (
                          <tr key={event.id}>
                            <td className="p-2 border">{event.title}</td>
                            <td className="p-2 border">{event.event_date}</td>
                            <td className="p-2 border">{event.location}</td>
                            <td className="p-2 border">
                              <span className={`px-2 py-1 rounded text-xs ${
                                event.status === 'published' ? 'bg-green-100 text-green-800' :
                                event.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {event.status}
                              </span>
                            </td>
                            <td className="p-2 border text-center">{event.registration_enabled ? "✅" : "❌"}</td>
                            <td className="p-2 border flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleEditEvent(event)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDeleteEvent(event.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="registrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Event Registrations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="p-2 border">Event</th>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Phone</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Registered</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((registration) => (
                        <tr key={registration.id}>
                          <td className="p-2 border">
                            <div>
                              <div className="font-medium">{registration.event?.title || 'Unknown Event'}</div>
                              <div className="text-xs text-muted-foreground">
                                {registration.event?.event_date && new Date(registration.event.event_date).toLocaleDateString()}
                              </div>
                            </div>
                          </td>
                          <td className="p-2 border">{registration.name}</td>
                          <td className="p-2 border">{registration.email}</td>
                          <td className="p-2 border">{registration.phone}</td>
                          <td className="p-2 border">
                            <span className={`px-2 py-1 rounded text-xs ${
                              registration.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              registration.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {registration.status}
                            </span>
                          </td>
                          <td className="p-2 border">{new Date(registration.registered_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Admin Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Site Configuration</h3>
                    <p className="text-sm text-muted-foreground">
                      Future settings for site configuration, SEO, and other admin preferences will be added here.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Database Status</h3>
                    <p className="text-sm text-muted-foreground">
                      All systems operational. Connected to Supabase.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 