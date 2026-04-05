"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Download } from "lucide-react";

export function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setIsInstallable(true);
      
      // If they haven't dismissed the modal before, show it
      if (!localStorage.getItem('hideInstallModal')) {
        setShowModal(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setIsInstallable(false);
    setShowModal(false);
    localStorage.setItem('hideInstallModal', 'true');
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
  };

  const dismissModal = () => {
    setShowModal(false);
    localStorage.setItem('hideInstallModal', 'true');
  };

  // Only show the button if the app is installable and not already installed
  if (!isInstallable || isInstalled) {
    return null;
  }

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="flex p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors hover:text-black gap-2 items-center"
        aria-label="Install App"
        title="Download Web App"
      >
        <Download className="h-5 w-5" />
      </button>

      {/* First-time Visitor Modal */}
      {showModal && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" style={{ position: 'fixed' }}>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-300 relative border border-gray-100">
            <div className="flex justify-center mb-6">
              <div className="bg-black text-white p-4 rounded-2xl shadow-lg">
                <Download className="h-8 w-8" />
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-center tracking-tight mb-2">Get the App</h3>
            <p className="text-center text-gray-500 mb-8 font-medium">
              Install The Cotton Centre on your device for a fast, native shopping experience.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleInstallClick}
                className="w-full bg-black text-white rounded-full py-4 font-bold text-base shadow-md hover:bg-gray-900 transition-colors"
              >
                Install Now
              </button>
              <button
                onClick={dismissModal}
                className="w-full bg-gray-100 text-gray-700 rounded-full py-4 font-bold text-base hover:bg-gray-200 transition-colors"
              >
                Not Now
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
