"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MessageSquare, Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import Map from '@/components/map';

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    specialRequests: '',
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isClient, setIsClient] = useState(false);  // Etat pour savoir si on est côté client

  const availableTimes = [
    '11:30', '12:00', '12:30', '13:00', '13:30',
    '19:00', '19:30', '20:00', '20:30', '21:00'
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Vérification côté client pour éviter l'accès à `window` côté serveur
  useEffect(() => {
    setIsClient(typeof window !== "undefined");  // Définit si on est côté client
  }, []);

  const handleLaunchNavigation = () => {
    if (isClient) {  // S'assure que le code est exécuté seulement côté client
      window.open('https://maps.google.com?q=Chemin+du+Pontet+69150+Décines-Charpieu', '_blank');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#141414] text-white relative">
      {/* Background de base sombre */}
      <div className="fixed inset-0 bg-black/40" />

      {/* Contenu principal */}
      <main className="flex-grow relative">
        <div className="relative h-full">
          {/* Conteneur des feuilles et du contenu central */}
          <div className="absolute inset-0 flex">
            {/* Feuilles gauches avec une zone de transition */}
            <div className="w-[400px] relative">
              <Image
                src="/decorations/leavesleft.webp"
                alt="Décoration gauche"
                fill
                className="object-cover opacity-20"
                priority
              />
              {/* Dégradé de transition */}
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent to-[#141414]" />
            </div>

            {/* Zone centrale avec background très sombre */}
            <div className="flex-grow bg-[#141414]">
              <div className="max-w-6xl mx-auto px-8" />
            </div>

            {/* Feuilles droites avec une zone de transition */}
            <div className="w-[400px] relative">
              <Image
                src="/decorations/leavesright.webp"
                alt="Décoration droite"
                fill
                className="object-cover opacity-20"
                priority
              />
              {/* Dégradé de transition */}
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-l from-transparent to-[#141414]" />
            </div>
          </div>

          {/* Zone de contenu superposée */}
          <div className="relative max-w-6xl mx-auto px-8 py-8">
            {/* En-tête */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Réservez dès maintenant</h1>
              <div className="w-24 h-1 bg-[#C4B5A2] mx-auto mb-4"></div>
              <p className="text-gray-300">Réservez votre table en quelques clics</p>
            </div>

            {/* Grille principale */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Colonne gauche - Formulaire */}
              <div className="bg-[#2a2a2a]/90 backdrop-blur-md rounded-xl p-8 border border-[#C4B5A2]/20 shadow-xl">
                <h2 className="text-2xl font-bold mb-6">Réserver une table</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-gray-300 mb-2">
                      <Calendar className="w-5 h-5" />
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-[#1A1A1A] rounded-lg border border-[#C4B5A2]/30 focus:ring-2 focus:ring-[#C4B5A2] focus:border-transparent text-white"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-gray-300 mb-2">
                      <Clock className="w-5 h-5" />
                      Heure
                    </label>
                    <select
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#1A1A1A] rounded-lg border border-[#C4B5A2]/30 focus:ring-2 focus:ring-[#C4B5A2] focus:border-transparent text-white"
                    >
                      <option value="">Sélectionnez une heure</option>
                      {availableTimes.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-gray-300 mb-2">
                      <Users className="w-5 h-5" />
                      Nombre de personnes
                    </label>
                    <select
                      name="guests"
                      required
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#1A1A1A] rounded-lg border border-[#C4B5A2]/30 focus:ring-2 focus:ring-[#C4B5A2] focus:border-transparent text-white"
                    >
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'personne' : 'personnes'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-gray-300 mb-2">
                      <MessageSquare className="w-5 h-5" />
                      Demandes spéciales
                    </label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-[#1A1A1A] rounded-lg border border-[#C4B5A2]/30 focus:ring-2 focus:ring-[#C4B5A2] focus:border-transparent text-white resize-none"
                      placeholder="Allergies, occasion spéciale..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C4B5A2] text-black font-medium px-6 py-3 rounded-lg hover:bg-[#a39482] transition-colors"
                  >
                    Confirmer la réservation
                  </button>
                </form>
              </div>

              {/* Colonne droite */}
              <div className="space-y-8">
                {/* Section Map */}
                <div className="bg-[#2a2a2a]/90 backdrop-blur-md rounded-xl overflow-hidden border border-[#C4B5A2]/20 shadow-xl">
                  <div className="h-[300px] w-full relative">
                    <Map />
                  </div>
                  <div className="p-6">
                    <button 
                      onClick={handleLaunchNavigation}
                      className="w-full bg-[#1A1A1A] text-white font-medium px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#252525] border border-[#C4B5A2]/30 transition-colors"
                    >
                      <MapPin className="w-5 h-5" />
                      Lancer la navigation
                    </button>
                  </div>
                </div>

                {/* Section Contact */}
                <div className="bg-[#2a2a2a]/90 backdrop-blur-md rounded-xl p-8 border border-[#C4B5A2]/20 shadow-xl">
                  <h2 className="text-2xl font-semibold mb-6">Informations de contact</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-[#C4B5A2]/20 rounded-lg">
                        <Phone className="w-6 h-6 text-[#C4B5A2]" />
                      </div>
                      <div>
                        <p className="font-medium">Tél : +33 1 23 45 67 89</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-[#C4B5A2]/20 rounded-lg">
                        <Mail className="w-6 h-6 text-[#C4B5A2]" />
                      </div>
                      <div>
                        <p className="font-medium">contact@restaurant.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
