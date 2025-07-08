-- Create sample blog posts to populate the blog section
-- Run this in your Supabase SQL Editor

-- Insert sample blog posts
INSERT INTO public.posts (
    title,
    excerpt,
    content,
    category,
    author,
    read_time,
    featured,
    image_url,
    tags,
    published_at
) VALUES 
(
    '10 AI Tools Every Woman Entrepreneur Must Know in 2024',
    'Discover the game-changing AI tools that can automate your marketing, streamline operations, and accelerate business growth.',
    '# 10 AI Tools Every Woman Entrepreneur Must Know in 2024

Artificial Intelligence is revolutionizing how businesses operate, and as a woman entrepreneur, you have a unique opportunity to leverage these powerful tools to scale your business efficiently. Here are the 10 essential AI tools that can transform your entrepreneurial journey:

## 1. ChatGPT for Content Creation
Use AI to generate blog posts, social media content, and marketing copy that resonates with your audience.

## 2. Canva AI for Design
Create professional graphics, presentations, and marketing materials without design experience.

## 3. Jasper AI for Marketing
Automate your marketing campaigns with AI-powered copywriting and content optimization.

## 4. Calendly for Scheduling
Streamline your appointment booking and client meetings with intelligent scheduling.

## 5. Zapier for Automation
Connect your favorite apps and automate repetitive tasks to save time and increase productivity.

These tools can help you work smarter, not harder, allowing you to focus on what matters most - growing your business and serving your customers.',
    'AI & Technology',
    'SHELeads Team',
    '8 min read',
    true,
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
    '["AI", "automation", "productivity", "marketing", "tools"]',
    NOW()
),
(
    'From Zero to Six Figures: A Complete Digital Marketing Roadmap',
    'The exact step-by-step strategy our most successful members use to scale their businesses using digital marketing.',
    '# From Zero to Six Figures: A Complete Digital Marketing Roadmap

Building a successful business in the digital age requires a strategic approach to marketing. Here''s the proven roadmap that has helped hundreds of women entrepreneurs scale their businesses to six figures and beyond.

## Phase 1: Foundation (Months 1-2)
### Define Your Brand Identity
- Clarify your unique value proposition
- Identify your target audience
- Create brand guidelines and visual identity

### Build Your Digital Presence
- Set up professional website
- Create social media profiles
- Establish email marketing system

## Phase 2: Content Strategy (Months 3-4)
### Content Planning
- Develop content calendar
- Create valuable blog posts
- Design social media templates

This roadmap has been tested and refined by our community of successful women entrepreneurs.',
    'Digital Marketing',
    'Priya Sharma',
    '12 min read',
    true,
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    '["digital marketing", "strategy", "growth", "social media", "business scaling"]',
    NOW() - INTERVAL '5 days'
),
(
    'Building Your Personal Brand as a Woman Entrepreneur',
    'Why personal branding is crucial for business success and how to build an authentic brand that attracts your ideal customers.',
    '# Building Your Personal Brand as a Woman Entrepreneur

Your personal brand is your most valuable business asset. It''s what sets you apart from competitors and creates trust with your audience. Here''s how to build an authentic personal brand that drives business success.

## Why Personal Branding Matters
In today''s digital landscape, people buy from people they know, like, and trust. Your personal brand is the bridge that connects your expertise with your audience''s needs.

### Benefits of Strong Personal Branding:
- Increased credibility and authority
- Higher conversion rates
- Premium pricing opportunities
- Stronger customer relationships
- Better networking opportunities

Remember, building a personal brand is a marathon, not a sprint. Be patient, stay consistent, and let your authentic self shine through.',
    'Business Growth',
    'Anita Desai',
    '6 min read',
    true,
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop',
    '["personal branding", "authenticity", "business growth", "marketing", "entrepreneur"]',
    NOW() - INTERVAL '10 days'
),
(
    '5 Mistakes That Kill Your Social Media Engagement',
    'Avoid these common pitfalls that prevent your content from reaching and converting your ideal audience.',
    '# 5 Mistakes That Kill Your Social Media Engagement

Social media can be a powerful tool for business growth, but many entrepreneurs make critical mistakes that sabotage their success. Here are the top 5 mistakes to avoid and how to fix them.

## Mistake #1: Posting Without a Strategy
### The Problem
Random posting without clear goals or audience understanding leads to poor engagement and wasted effort.

### The Solution
- Define your social media goals
- Identify your target audience
- Create a content calendar
- Plan your posting schedule

Remember, social media success doesn''t happen overnight. Stay consistent, provide value, and genuinely connect with your audience.',
    'Digital Marketing',
    'Marketing Team',
    '5 min read',
    false,
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
    '["social media", "engagement", "marketing", "strategy", "content"]',
    NOW() - INTERVAL '15 days'
),
(
    'How to Price Your Services as a Female Entrepreneur',
    'Stop undervaluing yourself. Learn the psychology of pricing and how to charge what you''re truly worth.',
    '# How to Price Your Services as a Female Entrepreneur

Pricing is one of the most challenging aspects of entrepreneurship, especially for women who often struggle with undervaluing their services. Here''s how to price confidently and profitably.

## The Psychology of Pricing
Understanding the psychology behind pricing helps you make strategic decisions that benefit both you and your clients.

### Common Pricing Mistakes Women Make:
- Undercharging due to imposter syndrome
- Competing on price instead of value
- Not factoring in all costs
- Afraid to raise prices
- Giving too many discounts

Remember, pricing is not just about covering costs - it''s about valuing your expertise and the transformation you provide to your clients.',
    'Business Growth',
    'Business Mentor',
    '7 min read',
    false,
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
    '["pricing", "value", "business strategy", "confidence", "entrepreneur"]',
    NOW() - INTERVAL '20 days'
)
ON CONFLICT (id) DO NOTHING;

-- Verify the posts were created
SELECT 
    title,
    author,
    category,
    featured,
    published_at
FROM public.posts 
ORDER BY published_at DESC; 