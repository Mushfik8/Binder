// Mock profiles for the discover feed
// In production, these come from Supabase with RLS filtering

export interface DiscoverProfile {
  id: string;
  displayName: string;
  age: number;
  city: string;
  country: string;
  bio: string;
  photos: string[];
  tags: string[];
  moods: string[];
  pressureLevel: number;
  pronouns?: string;
  isVerified: boolean;
  distanceKm?: number;
}

export const mockProfiles: DiscoverProfile[] = [
  {
    id: '1',
    displayName: 'Rafiq',
    age: 24,
    city: 'Dhaka',
    country: 'Bangladesh',
    bio: 'Corporate slave by day, chai enthusiast by night. Boss er chokh e dhora porsi but still going strong 💪',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face',
    ],
    tags: ['Gold Leaf Gang', 'Corporate Life', 'Tea Stall Adda'],
    moods: ['Office pressure', 'Boss dekhe felse'],
    pressureLevel: 4,
    pronouns: 'he/him',
    isVerified: true,
    distanceKm: 2.3,
  },
  {
    id: '2',
    displayName: 'Nusrat',
    age: 22,
    city: 'Chittagong',
    country: 'Bangladesh',
    bio: 'Campus er last bencher. Exam er tension e break nite hoy, judge korben na please 🙏',
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face',
    ],
    tags: ['Biri Veteran', 'Campus Life', 'Music'],
    moods: ['Exam er tension', 'Just need a break'],
    pressureLevel: 5,
    pronouns: 'she/her',
    isVerified: false,
    distanceKm: 0.8,
  },
  {
    id: '3',
    displayName: 'Karim',
    age: 28,
    city: 'Sylhet',
    country: 'Bangladesh',
    bio: 'Software dev who debugs code and life simultaneously. Salary ashe nai but vibe ta thik ache ✌️',
    photos: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face',
    ],
    tags: ['Marlboro Mood', 'Coding', 'Late Night Work'],
    moods: ['Salary ekhono ashe nai', 'Deadline er agun'],
    pressureLevel: 3,
    isVerified: true,
    distanceKm: 5.1,
  },
  {
    id: '4',
    displayName: 'Tania',
    age: 25,
    city: 'Rajshahi',
    country: 'Bangladesh',
    bio: 'Marketing e stress er kotha bolte gele raat hoye jay. Coffee > everything. Weekend e Netflix er sathe committed.',
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face',
    ],
    tags: ['Benson Boy', 'Corporate Life', 'Gaming'],
    moods: ['Wife pressure', 'Traffic e atke asi'],
    pressureLevel: 2,
    pronouns: 'she/her',
    isVerified: true,
  },
  {
    id: '5',
    displayName: 'Arif',
    age: 30,
    city: 'Khulna',
    country: 'Bangladesh',
    bio: 'Freelancer life = no boss but also no salary guarantee 😅 Tea stall er regular, adda dite ready always.',
    photos: [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop&crop=face',
    ],
    tags: ['Lucky Strike Crew', 'Tea Stall Adda', 'Football'],
    moods: ['Family group er notification', 'GF er pera'],
    pressureLevel: 3,
    isVerified: false,
    distanceKm: 1.5,
  },
  {
    id: '6',
    displayName: 'Sumaiya',
    age: 23,
    city: 'Gazipur',
    country: 'Bangladesh',
    bio: 'RMG sector e kaje thaki, chutti te gaan shuni ar boi pori. Pressure ache but positivity o ache 🌸',
    photos: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop&crop=face',
    ],
    tags: ['Gold Leaf Gang', 'Music', 'Campus Life'],
    moods: ['Office pressure', 'Just need a break'],
    pressureLevel: 4,
    pronouns: 'she/her',
    isVerified: true,
    distanceKm: 3.2,
  },
];
