import { 
  Employee, 
  Destination, 
  Accommodation,
  DrawSettings,
  NotificationSettings
} from '../types';
import { DEFAULT_DRAW_SETTINGS, NOTIFICATION_DEFAULTS } from './constants';

export const mockDestinations: Destination[] = [
  {
    id: '1',
    name: 'Alexandria',
    nameAr: 'الإسكندرية',
    description: 'Historic coastal city with beautiful Mediterranean beaches',
    descriptionAr: 'مدينة ساحلية تاريخية تتميز بشواطئ البحر المتوسط الجميلة',
    location: 'Northern Egypt, Mediterranean Coast',
    locationAr: 'شمال مصر، ساحل البحر المتوسط',
    image: 'https://images.unsplash.com/photo-1638710133105-c1ab11847d6e',
    eligibleGrades: ['junior', 'mid', 'senior', 'manager', 'executive']
  },
  {
    id: '2',
    name: 'Marsa Matrouh',
    nameAr: 'مرسى مطروح',
    description: 'Crystal clear waters and pristine white sand beaches',
    descriptionAr: 'مياه صافية وشواطئ رملية بيضاء نقية',
    location: 'Northwestern Egypt, Mediterranean Coast',
    locationAr: 'شمال غرب مصر، ساحل البحر المتوسط',
    image: 'https://images.unsplash.com/photo-1590077428593-a55bb07c4665',
    eligibleGrades: ['junior', 'mid', 'senior', 'manager', 'executive']
  },
  {
    id: '3',
    name: 'North Coast',
    nameAr: 'الساحل الشمالي',
    description: 'Modern beach resorts and luxury accommodations',
    descriptionAr: 'منتجعات شاطئية حديثة وأماكن إقامة فاخرة',
    location: 'Northern Egypt, Mediterranean Coast',
    locationAr: 'شمال مصر، ساحل البحر المتوسط',
    image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b',
    eligibleGrades: ['mid', 'senior', 'manager', 'executive']
  },
];

export const mockAccommodations: Accommodation[] = [
  {
    id: '1',
    name: 'Luxury Beach Apartment',
    nameAr: 'شقة فاخرة على الشاطئ',
    destinationId: '1',
    type: 'apartment',
    description: 'Modern 3-bedroom apartment with sea view',
    descriptionAr: 'شقة حديثة مكونة من 3 غرف نوم مع إطلالة على البحر',
    location: 'Gleem Bay',
    locationAr: 'خليج جليم',
    capacity: 6,
    eligibleGrades: ['executive', 'manager'],
    photos: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
    ],
  },
  {
    id: '2',
    name: 'Beachfront Chalet',
    nameAr: 'شاليه على الشاطئ',
    destinationId: '2',
    type: 'chalet',
    description: 'Cozy chalet with direct beach access',
    descriptionAr: 'شاليه مريح مع وصول مباشر للشاطئ',
    location: 'Agiba Beach',
    locationAr: 'شاطئ عجيبة',
    capacity: 4,
    eligibleGrades: ['senior', 'manager', 'executive'],
    photos: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2',
      'https://images.unsplash.com/photo-1501117716987-c8c394bb29df',
    ],
  },
  {
    id: '3',
    name: 'Marina View Apartment',
    nameAr: 'شقة بإطلالة على المارينا',
    destinationId: '3',
    type: 'apartment',
    description: 'Luxurious apartment overlooking the marina',
    descriptionAr: 'شقة فاخرة تطل على المارينا',
    location: 'Marina Gate',
    locationAr: 'بوابة المارينا',
    capacity: 8,
    eligibleGrades: ['manager', 'executive'],
    photos: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
    ],
  },
];

export const mockEmployees: Employee[] = [
  {
    id: 'EMP001',
    name: 'John Doe',
    jobGrade: 'manager',
    role: 'employee',
    email: 'john.doe@example.com',
    mobileNo: '+201234567890',
    travelHistory: [
      {
        year: 2023,
        destination: 'Alexandria',
        accommodation: 'Luxury Beach Apartment',
        startDate: '2023-07-07',
        endDate: '2023-07-14',
        won: true,
      },
    ],
    hasConfirmedSelection: false,
    confirmationCount: 0,
  },
  {
    id: 'ADMIN001',
    name: 'Admin User',
    jobGrade: 'executive',
    role: 'admin',
    email: 'admin@example.com',
    mobileNo: '+201234567891',
    travelHistory: [],
    hasConfirmedSelection: false,
    confirmationCount: 0,
  },
];

export const mockDrawSettings: DrawSettings = DEFAULT_DRAW_SETTINGS;
export const mockNotificationSettings: NotificationSettings = NOTIFICATION_DEFAULTS;