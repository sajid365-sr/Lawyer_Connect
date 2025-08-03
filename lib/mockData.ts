import { Lawyer, Review, LegalArea } from '@/types';

export const legalAreas: LegalArea[] = [
  {
    id: 'family',
    name: 'Family Law',
    description: 'Divorce, custody, adoption, and family matters',
    icon: 'fas fa-heart'
  },
  {
    id: 'criminal',
    name: 'Criminal Law',
    description: 'Criminal defense and prosecution matters',
    icon: 'fas fa-gavel'
  },
  {
    id: 'civil',
    name: 'Civil Law',
    description: 'Personal injury, contracts, and civil disputes',
    icon: 'fas fa-handshake'
  },
  {
    id: 'corporate',
    name: 'Corporate Law',
    description: 'Business formation, contracts, and corporate matters',
    icon: 'fas fa-building'
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    description: 'Property transactions and real estate law',
    icon: 'fas fa-home'
  },
  {
    id: 'immigration',
    name: 'Immigration',
    description: 'Visa applications and immigration matters',
    icon: 'fas fa-globe'
  }
];

export const mockLawyers: Lawyer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Family Law Attorney',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    rating: 4.9,
    reviewCount: 127,
    experience: 12,
    location: 'New York, NY',
    practiceAreas: ['Family Law', 'Divorce', 'Child Custody'],
    bio: 'Experienced family law attorney with over 12 years of practice. Specializes in divorce proceedings, child custody cases, and adoption matters.',
    education: ['Harvard Law School - JD', 'Columbia University - BA'],
    languages: ['English', 'Spanish'],
    hourlyRate: 350,
    availability: 'Available',
    verified: true
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Corporate Law Attorney',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    rating: 4.8,
    reviewCount: 89,
    experience: 8,
    location: 'San Francisco, CA',
    practiceAreas: ['Corporate Law', 'Business Formation', 'Contracts'],
    bio: 'Corporate attorney helping startups and established businesses with legal matters. Expert in business formation and contract negotiations.',
    education: ['Stanford Law School - JD', 'UC Berkeley - MBA'],
    languages: ['English', 'Mandarin'],
    hourlyRate: 425,
    availability: 'Available',
    verified: true
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    title: 'Criminal Defense Attorney',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    rating: 4.7,
    reviewCount: 156,
    experience: 15,
    location: 'Miami, FL',
    practiceAreas: ['Criminal Defense', 'DUI Defense', 'White Collar Crime'],
    bio: 'Aggressive criminal defense attorney with a track record of successful case outcomes. Experienced in all areas of criminal law.',
    education: ['University of Miami Law - JD', 'Florida State University - BA'],
    languages: ['English', 'Spanish'],
    hourlyRate: 300,
    availability: 'Busy',
    verified: true
  },
  {
    id: '4',
    name: 'David Thompson',
    title: 'Personal Injury Attorney',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    rating: 4.6,
    reviewCount: 203,
    experience: 20,
    location: 'Chicago, IL',
    practiceAreas: ['Personal Injury', 'Medical Malpractice', 'Workers Compensation'],
    bio: 'Dedicated personal injury attorney fighting for clients\' rights. Specializes in complex personal injury and medical malpractice cases.',
    education: ['Northwestern Law - JD', 'University of Illinois - BA'],
    languages: ['English'],
    hourlyRate: 275,
    availability: 'Available',
    verified: true
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    clientName: 'John D.',
    rating: 5,
    comment: 'Sarah was incredibly professional and helped me through a difficult divorce. Highly recommended!',
    date: '2024-01-15',
    lawyerId: '1'
  },
  {
    id: '2',
    clientName: 'Maria S.',
    rating: 5,
    comment: 'Michael helped us set up our startup. His expertise in corporate law is outstanding.',
    date: '2024-01-10',
    lawyerId: '2'
  },
  {
    id: '3',
    clientName: 'Robert K.',
    rating: 4,
    comment: 'Emily successfully defended my case. Great communication throughout the process.',
    date: '2024-01-08',
    lawyerId: '3'
  }
];

export const testimonials = [
  {
    name: 'Jennifer Martinez',
    role: 'Small Business Owner',
    content: 'Found the perfect lawyer for my business needs. The platform made it so easy to compare and connect.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
  },
  {
    name: 'Robert Chen',
    role: 'Individual Client',
    content: 'Excellent service! The lawyer I found was professional, knowledgeable, and got great results.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    name: 'Lisa Thompson',
    role: 'Family Law Client',
    content: 'The verification process gave me confidence. My lawyer was exactly what I needed during a difficult time.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  }
];