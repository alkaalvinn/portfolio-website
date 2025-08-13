import React, { useState, useCallback, useEffect } from "react";
import SectionHeading from "./section-heading";
import { useSectionInView } from "../lib/hooks";
import { certificationsData } from "../lib/data";

const getWebpSrc = (src: string) => {
  return src.replace(/\.(png|jpe?g)$/i, '.webp');
};

interface Certificate {
  id: number;
  src: string;
  alt: string;
  title: string;
}

interface SliderProps {
  certificates: readonly Certificate[];
  reverse?: boolean;
  onImageClick: (certificate: Certificate) => void;
  sliderId: string;
}

const CertificateSlider: React.FC<SliderProps> = ({ 
  certificates, 
  reverse = false, 
  onImageClick, 
  sliderId 
}) => {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const styleId = `bulletproof-slider-${sliderId}`;
    if (document.getElementById(styleId)) return;

    const itemWidth = 160;
    const animationDuration = certificates.length * 4;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .bulletproof-slider-${sliderId} {
        mask-image: linear-gradient(to right, transparent, #000 15% 85%, transparent);
        -webkit-mask-image: linear-gradient(to right, transparent, #000 15% 85%, transparent);
        position: relative;
        overflow: hidden;
      }

      .bulletproof-slider-${sliderId} .slider-track {
        display: flex;
        width: fit-content;
        animation: slide-${sliderId} ${animationDuration}s linear infinite;
        animation-direction: ${reverse ? 'reverse' : 'normal'};
        will-change: transform;
        transform: translateZ(0);
      }

      .bulletproof-slider-${sliderId}.paused .slider-track {
        animation-play-state: paused;
      }

      .bulletproof-slider-${sliderId} .slide-item {
        flex: 0 0 auto;
        width: 140px;
        height: 120px;
        margin-right: 1rem;
        transform: translateZ(0);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .bulletproof-slider-${sliderId} .slide-item:hover {
        transform: scale(1.05) translateZ(0);
        z-index: 10;
      }

      @keyframes slide-${sliderId} {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-${itemWidth * certificates.length}px);
        }
      }

      /* Mobile styles */
      @media (min-width: 640px) {
        .bulletproof-slider-${sliderId} .slide-item {
          width: 280px;
          height: 180px;
        }

        @keyframes slide-${sliderId} {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${280 * certificates.length}px);
          }
        }
      }

      /* Performance optimizations */
      .bulletproof-slider-${sliderId} * {
        backface-visibility: hidden;
        perspective: 1000px;
      }
    `;

    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) existingStyle.remove();
    };
  }, [sliderId, certificates.length, reverse]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div 
      className={`bulletproof-slider-${sliderId} w-full h-32 sm:h-48 ${isPaused ? 'paused' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="slider-track">
        {[...certificates, ...certificates, ...certificates].map((cert, index) => (
          <div
            key={`${cert.id}-${index}`}
            className="slide-item cursor-pointer"
            onClick={() => onImageClick(cert)}
          >
            <div className="relative w-full h-full group">
              <img 
                src={getWebpSrc(cert.src)} 
                alt={cert.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover rounded-xl shadow-lg border border-white/20 backdrop-blur-sm transition-all duration-300 group-hover:brightness-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== cert.src) {
                    target.onerror = null;
                    target.src = cert.src;
                  }
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-xl flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-2">
                  <p className="text-xs sm:text-sm font-medium drop-shadow-lg">Click to view</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface ModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ certificate, isOpen, onClose }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const currentScrollY = window.scrollY;
      setScrollPosition(currentScrollY);
      
      document.body.style.position = 'fixed';
      document.body.style.top = `-${currentScrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPosition);
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      if (isOpen) {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
      }
    };
  }, [isOpen, onClose, scrollPosition]);

  if (!isOpen || !certificate) return null;

  return (
    <div 
      className="fixed bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, margin: 0, padding: '1rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div 
        className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
        style={{ position: 'relative', maxWidth: '56rem', maxHeight: '90vh', width: '100%', margin: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative">
          <img
            src={getWebpSrc(certificate.src)}
            alt={certificate.alt}
            className="w-full h-auto object-contain"
            style={{ maxHeight: '70vh', width: '100%', height: 'auto' }}
            loading="eager"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== certificate.src) {
                target.onerror = null;
                target.src = certificate.src;
              }
            }}
          />
        </div>

        <div className="p-6 bg-gradient-to-t from-black/50 to-transparent">
          <h3 className="text-xl font-bold text-white mb-2">{certificate.title}</h3>
          <p className="text-white/80">{certificate.alt}</p>
        </div>
      </div>
    </div>
  );
};

export default function Achievement() {
  const { ref } = useSectionInView("Achievement");
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = useCallback((certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  }, []);

  return (
    <>
      <section
        id="achievement"
        ref={ref}
        className="mb-20 sm:mb-28 scroll-mt-28 text-center text-white px-2 sm:px-4 max-w-6xl mx-auto overflow-hidden"
      >
        <SectionHeading>My Achievements</SectionHeading>
        
        <div className="space-y-8">
          <CertificateSlider 
            certificates={certificationsData.row1}
            reverse={false}
            onImageClick={handleImageClick}
            sliderId="row1"
          />
          <CertificateSlider 
            certificates={certificationsData.row2}
            reverse={true}
            onImageClick={handleImageClick}
            sliderId="row2"
          />
          <CertificateSlider 
            certificates={certificationsData.row3}
            reverse={false}
            onImageClick={handleImageClick}
            sliderId="row3"
          />
        </div>
      </section>

      <Modal
        certificate={selectedCertificate}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}