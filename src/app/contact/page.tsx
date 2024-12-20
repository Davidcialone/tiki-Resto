"use client";

import React, { useRef, useState } from "react";
import { Phone, Mail, Clock, MapPin, Send, CheckCircle, X } from "lucide-react";
import Image from "next/image";
import emailjs from "@emailjs/browser";

// Composant Toast
interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => (
  <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-2 ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  } text-white`}>
    {type === 'success' ? <CheckCircle className="w-5 h-5" /> : <X className="w-5 h-5" />}
    <p>{message}</p>
    <button onClick={onClose} className="ml-4">
      <X className="w-4 h-4" />
    </button>
  </div>
);

// Composant Info Contact
interface ContactInfoProps {
  icon: React.ReactNode;
  title: string;
  info: string;
}

const ContactInfo = ({ icon, title, info }: ContactInfoProps) => (
  <div className="flex items-start gap-4">
    <div className="p-2 rounded-full border border-[#C4B5A2]">{icon}</div>
    <div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-gray-400">{info}</p>
    </div>
  </div>
);

// Composant Champ de texte
interface TextFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}

const TextField = ({ id, name, label, value, onChange, placeholder, type = "text" }: TextFieldProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium mb-2">
      {label}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required
      className="w-full px-4 py-3 bg-[#1a1a1a] rounded-lg border border-[#C4B5A2]/30 text-white focus:outline-none focus:border-[#C4B5A2] transition-colors"
      placeholder={placeholder}
    />
  </div>
);

// Composant Zone de texte
interface TextAreaProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = ({ id, name, label, value, onChange }: TextAreaProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium mb-2">
      {label}
    </label>
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required
      rows={6}
      className="w-full px-4 py-3 bg-[#1a1a1a] rounded-lg border border-[#C4B5A2]/30 text-white focus:outline-none focus:border-[#C4B5A2] transition-colors"
      placeholder="Votre message..."
    />
  </div>
);

// Composant Bouton d'envoi
interface SubmitButtonProps {
  submitted: boolean;
}

const SubmitButton = ({ submitted }: SubmitButtonProps) => (
  <button
    type="submit"
    className="w-full bg-[#C4B5A2] hover:bg-[#A69783] text-black font-medium px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
    disabled={submitted}
  >
    {submitted ? (
      <>
        <CheckCircle className="w-5 h-5" />
        Envoyé
      </>
    ) : (
      <>
        <Send className="w-5 h-5" />
        Envoyer
      </>
    )}
  </button>
);

// Composant principal
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const form = useRef<HTMLFormElement>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_w43hhbe",
        "template_xb59ysa",
        form.current!,
        "qGukIkoXy-BXaqm2L"
      )
      .then(
        () => {
          showToast("Message envoyé avec succès !", "success");
          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 3000);
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          showToast("Une erreur s'est produite. Veuillez réessayer.", "error");
          console.error("Error:", error);
        }
      );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#141414] text-white relative">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      {/* Background de base sombre */}
      <div className="fixed inset-0 bg-black/40" />

      {/* Contenu principal */}
      <main className="flex-grow relative">
        <div className="relative h-full">
          {/* Conteneur des feuilles et du contenu central */}
          <div className="absolute inset-0 flex">
            {/* Feuilles gauches */}
            <div className="w-[400px] relative">
              <Image
                src="/decorations/leavesleft.webp"
                alt="Décoration gauche"
                fill
                className="object-cover opacity-20"
                priority
              />
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent to-[#141414]" />
            </div>

            {/* Zone centrale */}
            <div className="flex-grow bg-[#141414]">
              <div className="max-w-6xl mx-auto px-8" />
            </div>

            {/* Feuilles droites */}
            <div className="w-[400px] relative">
              <Image
                src="/decorations/leavesright.webp"
                alt="Décoration droite"
                fill
                className="object-cover opacity-20"
                priority
              />
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-l from-transparent to-[#141414]" />
            </div>
          </div>

          {/* Zone de contenu superposée */}
          <div className="relative max-w-6xl mx-auto px-8 py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
              <div className="w-24 h-1 bg-[#C4B5A2] mx-auto mb-4"></div>
              <p className="text-gray-300">Nous sommes à votre écoute</p>
            </div>

            {/* Grille principale */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {/* Colonne de gauche */}
              <div className="space-y-8">
                <div className="bg-[#2a2a2a]/90 rounded-xl shadow-lg overflow-hidden border border-[#C4B5A2]/20">
                  <div className="h-[400px] bg-gray-800">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=VOTRE_CLE_MAPS"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>

                <div className="bg-[#2a2a2a]/90 rounded-xl p-8 space-y-6 border border-[#C4B5A2]/20 shadow-xl">
                  <ContactInfo
                    icon={<Phone />}
                    title="Téléphone"
                    info="04 78 49 02 39"
                  />
                  <ContactInfo
                    icon={<Mail />}
                    title="Email"
                    info="contact@autiki.fr"
                  />
                  <ContactInfo
                    icon={<MapPin />}
                    title="Adresse"
                    info="Chemin du Pontet, 69330 Decines"
                  />
                  <ContactInfo
                    icon={<Clock />}
                    title="Horaires"
                    info="Mardi - Dimanche : 12h - 14h30"
                  />
                </div>
              </div>

              {/* Colonne de droite - Formulaire */}
              <div className="space-y-8">
                <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
                <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                  <TextField
                    id="name"
                    name="name"
                    label="Nom complet"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                  />
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    type="email"
                  />
                  <TextArea
                    id="message"
                    name="message"
                    label="Message"
                    value={formData.message}
                    onChange={handleTextAreaChange}
                  />
                  <SubmitButton submitted={submitted} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}