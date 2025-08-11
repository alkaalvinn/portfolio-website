import React, { useState, useEffect } from "react";
import SectionHeading from "./section-heading";
import { useSectionInView } from "../lib/hooks";
import { certificationsData } from "../lib/data";

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

const CertificateSlider: React.FC<SliderProps> = ({ certificates, reverse = false, onImageClick, sliderId }) => {
  const quantity = certificates.length;

  useEffect(() => {
    const styleId = `slider-styles-${sliderId}`;
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    const css = `
      @keyframes autoRun-${sliderId} {
        from { left: 100%; }
        to { left: calc(150px * -1 * ${quantity}); }
      }
      
      @keyframes reversePlay-${sliderId} {
        from { left: calc(150px * -1 * ${quantity}); }
        to { left: 100%; }
      }
      
      .slider-${sliderId} {
        mask-image: linear-gradient(
          to right,
          transparent,
          #000 10% 90%,
          transparent
        );
        -webkit-mask-image: linear-gradient(
          to right,
          transparent,
          #000 10% 90%,
          transparent
        );
      }
      
      .slider-${sliderId} .item {
        animation: ${reverse ? `reversePlay-${sliderId}` : `autoRun-${sliderId}`} 20s linear infinite;
        animation-delay: calc((20s / ${quantity}) * (var(--position) - 1) - 20s) !important;
      }
      
      .slider-${sliderId}:hover .item {
        animation-play-state: paused !important;
      }
      
      .slider-${sliderId} .item:hover {
        transform: scale(1.05);
        z-index: 10;
      }
      
      /* Mobile responsive styles */
      @media (max-width: 640px) {
        .slider-${sliderId} .item {
          width: 160px !important;
          height: 110px !important;
        }
        
        @keyframes autoRun-${sliderId} {
          from { left: 100%; }
          to { left: calc(100px * -1 * ${quantity}); }
        }
        
        @keyframes reversePlay-${sliderId} {
          from { left: calc(100px * -1 * ${quantity}); }
          to { left: 100%; }
        }
      }
      
      @media (min-width: 641px) {
        .slider-${sliderId} .item {
          width: 280px !important;
          height: 180px !important;
        }
      }
    `;

    styleElement.textContent = css;

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [sliderId, quantity, reverse]);

  return (
    <div 
      className={`slider-${sliderId} w-full overflow-hidden relative h-32 sm:h-48`}
      data-reverse={reverse}
    >
      <div className="list flex w-full relative">
        {certificates.map((cert, index) => (
          <div
            key={cert.id}
            className="item absolute cursor-pointer transition-all duration-300 hover:shadow-2xl w-[100px] h-[120px] sm:w-[280px] sm:h-[180px]"
            style={{
              '--position': index + 1,
              left: '100%',
            } as React.CSSProperties}
            onClick={() => onImageClick(cert)}
          >
            <div className="relative w-full h-full group">
              <img 
                src={cert.src} 
                alt={cert.alt}
                className="w-full h-full object-cover rounded-xl shadow-lg border border-white/20 backdrop-blur-sm transition-all duration-300 group-hover:brightness-110"
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
  if (!isOpen || !certificate) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl max-h-[90vh] w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="relative">
          <img
            src={certificate.src}
            alt={certificate.alt}
            className="w-full h-auto max-h-[80vh] object-contain"
          />
        </div>

        <div className="p-6 bg-gradient-to-t from-black/50 to-transparent">
          <h3 className="text-xl font-bold text-white mb-2">
            {certificate.title}
          </h3>
          <p className="text-white/80">
            {certificate.alt}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Achievement() {
  const { ref } = useSectionInView("Achievement");
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      <section
        id="achievement"
        ref={ref}
        className="mb-20 sm:mb-28 scroll-mt-28 text-center text-white px-2 sm:px-4 max-w-6xl mx-auto"
      >
        <SectionHeading>My Achievements</SectionHeading>
        
        <div className="space-y-6">
          <div className="w-full">
            <CertificateSlider 
              certificates={certificationsData.row1}
              reverse={false}
              onImageClick={handleImageClick}
              sliderId="row1"
            />
          </div>

          <div className="w-full">
            <CertificateSlider 
              certificates={certificationsData.row2}
              reverse={true}
              onImageClick={handleImageClick}
              sliderId="row2"
            />
          </div>

          <div className="w-full">
            <CertificateSlider 
              certificates={certificationsData.row3}
              reverse={false}
              onImageClick={handleImageClick}
              sliderId="row3"
            />
          </div>
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