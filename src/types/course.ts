export type Provider = 'udemy' | 'coursera' | 'youtube' | 'edx';
export type Level = 'beginner' | 'intermediate' | 'advanced';

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  provider: Provider;
  affiliateUrl: string;
  thumbnail: string;
  instructor: {
    name: string;
    avatar: string;
    bio?: string;
  };
  rating: number;
  reviewCount: number;
  enrollmentCount: number;
  duration: number;          // minutes
  level: Level;
  price: number;             // 0 = free
  originalPrice?: number;
  language: string;
  lastUpdated: string;       // ISO date
  tags: string[];
  category: string;
  subcategory: string;
  whatYouLearn: string[];
  prerequisites: string[];
  curriculum?: Section[];
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: number;          // minutes
  type: 'video' | 'article' | 'quiz';
  isFreePreview: boolean;
}
