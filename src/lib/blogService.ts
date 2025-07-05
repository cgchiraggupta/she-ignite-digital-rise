import { supabase } from './supabaseClient';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  read_time: string;
  featured: boolean;
  published_at: string;
  image_url?: string;
  tags: string[];
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false });
  if (error) throw error;
  return data as BlogPost[];
}

export async function fetchBlogPostById(id: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return data as BlogPost;
}

export async function createBlogPost(post: Omit<BlogPost, 'id' | 'published_at'>): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select()
    .single();
  if (error) throw error;
  return data as BlogPost;
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as BlogPost;
}

export async function deleteBlogPost(id: string): Promise<void> {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// // In a real implementation, this would fetch from your CMS API
// // For now, we'll import the markdown files directly
// const blogPosts: BlogPost[] = [
//   {
//     id: "ai-tools-2024",
//     title: "10 AI Tools Every Woman Entrepreneur Must Know in 2024",
//     excerpt: "Discover the game-changing AI tools that can automate your marketing, streamline operations, and accelerate business growth.",
//     category: "AI & Technology",
//     author: "SHELeads Team",
//     read_time: "8 min read",
//     featured: true,
//     published_at: "2024-12-15",
//     tags: ["AI", "automation", "productivity", "marketing"],
//     image_url: "",
//     body: "# 10 AI Tools Every Woman Entrepreneur Must Know in 2024\n\nArtificial Intelligence is revolutionizing how businesses operate..."
//   },
//   {
//     id: "digital-marketing-roadmap",
//     title: "From Zero to Six Figures: A Complete Digital Marketing Roadmap",
//     excerpt: "The exact step-by-step strategy our most successful members use to scale their businesses using digital marketing.",
//     category: "Digital Marketing",
//     author: "Priya Sharma",
//     read_time: "12 min read",
//     featured: true,
//     published_at: "2024-12-10",
//     tags: ["digital marketing", "strategy", "growth", "social media"],
//     image_url: "",
//     body: "# From Zero to Six Figures: A Complete Digital Marketing Roadmap\n\nBuilding a successful business in the digital age requires a strategic approach..."
//   },
//   {
//     id: "personal-branding",
//     title: "Building Your Personal Brand as a Woman Entrepreneur",
//     excerpt: "Why personal branding is crucial for business success and how to build an authentic brand that attracts your ideal customers.",
//     category: "Business Growth",
//     author: "Anita Desai",
//     read_time: "6 min read",
//     featured: true,
//     published_at: "2024-12-05",
//     tags: ["personal branding", "authenticity", "business growth"],
//     image_url: "",
//     body: "# Building Your Personal Brand as a Woman Entrepreneur\n\nYour personal brand is your most valuable business asset..."
//   },
//   {
//     id: "social-media-mistakes",
//     title: "5 Mistakes That Kill Your Social Media Engagement",
//     excerpt: "Avoid these common pitfalls that prevent your content from reaching and converting your ideal audience.",
//     category: "Digital Marketing",
//     author: "Marketing Team",
//     read_time: "5 min read",
//     featured: false,
//     published_at: "2024-12-01",
//     tags: ["social media", "engagement", "marketing"],
//     image_url: "",
//     body: "# 5 Mistakes That Kill Your Social Media Engagement\n\nSocial media can be a powerful tool for business growth..."
//   },
//   {
//     id: "pricing-services",
//     title: "How to Price Your Services as a Female Entrepreneur",
//     excerpt: "Stop undervaluing yourself. Learn the psychology of pricing and how to charge what you're truly worth.",
//     category: "Business Growth",
//     author: "Business Mentor",
//     read_time: "7 min read",
//     featured: false,
//     published_at: "2024-11-28",
//     tags: ["pricing", "value", "business strategy"],
//     image_url: "",
//     body: "# How to Price Your Services as a Female Entrepreneur\n\nPricing is one of the most challenging aspects of entrepreneurship..."
//   },
//   {
//     id: "automation-systems",
//     title: "Creating Systems That Scale: Automation for Busy Entrepreneurs",
//     excerpt: "Build business systems that work without you, giving you freedom while growing your revenue.",
//     category: "AI & Technology",
//     author: "Tech Specialist",
//     read_time: "9 min read",
//     featured: false,
//     published_at: "2024-11-25",
//     tags: ["automation", "systems", "productivity"],
//     image_url: "",
//     body: "# Creating Systems That Scale: Automation for Busy Entrepreneurs\n\nAutomation is the key to scaling your business..."
//   }
// ];

// export const getBlogPosts = (): BlogPost[] => {
//   return blogPosts.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
// };

// export const getFeaturedPosts = (): BlogPost[] => {
//   return blogPosts.filter(post => post.featured);
// };

// export const getRecentPosts = (limit: number = 6): BlogPost[] => {
//   return blogPosts
//     .filter(post => !post.featured)
//     .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
//     .slice(0, limit);
// };

// export const getPostBySlug = (slug: string): BlogPost | undefined => {
//   return blogPosts.find(post => post.id === slug);
// };

// export const getPostsByCategory = (category: string): BlogPost[] => {
//   return blogPosts.filter(post => post.category === category);
// };

// export const getCategories = () => {
//   const categories = blogPosts.reduce((acc, post) => {
//     if (!acc[post.category]) {
//       acc[post.category] = 0;
//     }
//     acc[post.category]++;
//     return acc;
//   }, {} as Record<string, number>);

//   return Object.entries(categories).map(([name, count]) => ({ name, count }));
// };

// // Function to simulate fetching from CMS API
// export const fetchFromCMS = async (): Promise<BlogPost[]> => {
//   // In a real implementation, this would make an API call to your CMS
//   // For now, we'll return the static data
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(blogPosts);
//     }, 100);
//   });
// }; 