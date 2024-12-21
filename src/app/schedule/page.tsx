"use client";

import React, { useState } from 'react';
import { 
  Plus, 
  User, 
  Calendar, 
  Clock,
  AlertCircle,
  X,
  Check,
  Edit2,
  Trash2
} from 'lucide-react';

// Données simulées
type Staff = {
  id: number;
  name: string;
  role: string;
  availability: string;
  schedule: {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
    sunday: string[];
  };
};

const mockStaff: Staff[] = [
  {
    id: 1,
    name: "Marie Dubois",
    role: "Serveuse",
    availability: "Temps plein",
    schedule: {
      monday: ["11:00-15:00", "18:00-23:00"],
      tuesday: ["11:00-15:00"],
      wednesday: ["18:00-23:00"],
      thursday: ["11:00-15:00", "18:00-23:00"],
      friday: ["18:00-23:00"],
      saturday: ["11:00-15:00", "18:00-23:00"],
      sunday: []
    }
  },
  // Ajoutez plus de membres du personnel ici
];

const timeSlots = [
  "11:00-15:00",
  "15:00-18:00",
  "18:00-23:00"
];

const daysOfWeek = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche"
];

type Notification = {
  message: string;
  type: 'success' | 'error';
};

export default function StaffManagementPage() {
  // Déplacez les hooks ici
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Code du composant */}
    </div>
  );
}
