import {
  ShoppingCart,
  Coffee,
  Stethoscope,
  Scissors,
  Dumbbell,
  GraduationCap,
  Home,
  Package,
  Factory,
  Building2,
  type LucideIcon,
} from "lucide-react";

export type Industry = {
  icon: LucideIcon;
  name: string;
  description: string;
  useCases: string[];
  span?: string; // tailwind grid span classes
  image: string;
};

export const industries: Industry[] = [
  {
    icon: ShoppingCart,
    name: "Retail & Supermarkets",
    description: "Smarter stock, faster checkout, fewer lost sales.",
    useCases: ["Inventory AI", "Checkout automation", "Demand forecasting"],
    span: "md:col-span-2 md:row-span-2",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: Coffee,
    name: "Cafes & Restaurants",
    description: "Predict orders, slash waste, delight regulars.",
    useCases: ["Order prediction", "Waste reduction", "Customer preference AI"],
    image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: Stethoscope,
    name: "Medical & Diagnostics",
    description: "Free up clinicians from paperwork and admin.",
    useCases: ["Patient scheduling", "Report automation", "Billing AI"],
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: Scissors,
    name: "Salons & Spas",
    description: "Bookings that fill themselves and clients who return.",
    useCases: ["Appointment AI", "Customer retention", "Product recs"],
    span: "md:col-span-2",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: Dumbbell,
    name: "Gyms & Fitness",
    description: "Spot churn early, schedule trainers automatically.",
    useCases: ["Membership AI", "Trainer scheduling", "Churn prediction"],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: GraduationCap,
    name: "Schools & Coaching",
    description: "Less admin, more teaching. Real insights into students.",
    useCases: ["Attendance automation", "Performance analytics", "Fee management"],
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: Home,
    name: "Real Estate",
    description: "Better leads, smarter matching, faster paperwork.",
    useCases: ["Lead scoring", "Property matching", "Document automation"],
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: Package,
    name: "Logistics & Delivery",
    description: "Routes, dispatch, and ETAs that actually keep up.",
    useCases: ["Route optimization", "Dispatch AI", "ETA prediction"],
    span: "md:col-span-2",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: Factory,
    name: "Manufacturing",
    description: "Catch defects and downtime before they cost you.",
    useCases: ["Quality control AI", "Downtime prediction", "Inventory"],
    image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: Building2,
    name: "Corporate Companies",
    description: "Automate the boring. Decide on real data.",
    useCases: ["HR automation", "Reporting AI", "Process optimization"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
  },
];