import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Loader2, RefreshCw, Image as ImageIcon } from 'lucide-react';

interface DishImageProps {
  name: string;
  description?: string;
  category: string;
  className?: string;
  src?: string;
}

const DishImage: React.FC<DishImageProps> = ({ name, description, category, className, src }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(src || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update imageUrl if src changes
  useEffect(() => {
    if (src) {
      setImageUrl(src);
    }
  }, [src]);

  // Intersection Observer to only generate when in view
  useEffect(() => {
    if (src) {
      setIsVisible(false); // Don't need to generate if we have a real URL
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const generateImage = async (retryCount = 0) => {
    if (loading && retryCount === 0) return;
    setLoading(true);
    setError(false);

    const cacheKey = `dish-image-${name.replace(/[^\w]/g, '-').toLowerCase()}`;

    try {
      // Check cache first
      if (retryCount === 0) {
        const cached = localStorage.getItem(cacheKey);
        if (cached && cached.startsWith('data:image')) {
          setImageUrl(cached);
          setLoading(false);
          return;
        }
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `Professional food photography of "${name}". 
      Description: ${description || name}. 
      Category: ${category}. 
      Style: Realistic, appetizing, high resolution, soft natural lighting, restaurant presentation. 
      Composition: Close-up shot on a clean plate. 
      Avoid: Text, watermarks, blurry backgrounds, non-food items.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
      });

      let foundImage = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64Data = part.inlineData.data;
            const url = `data:image/png;base64,${base64Data}`;
            setImageUrl(url);
            
            // Safe localStorage set
            try {
              localStorage.setItem(cacheKey, url);
            } catch (e) {
              console.warn('LocalStorage full, clearing some space...');
              // Clear old dish images if full
              for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key?.startsWith('dish-image-')) {
                  localStorage.removeItem(key);
                  break;
                }
              }
              try { localStorage.setItem(cacheKey, url); } catch (e2) { /* ignore */ }
            }
            
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        throw new Error('No image part found');
      }
    } catch (err) {
      console.error(`Error generating image for ${name} (Attempt ${retryCount + 1}):`, err);
      
      if (retryCount < 2) {
        const delay = (retryCount + 1) * 2000 + Math.random() * 1000;
        setTimeout(() => generateImage(retryCount + 1), delay);
      } else {
        setError(true);
      }
    } finally {
      if (retryCount === 0 || !loading) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (isVisible && !imageUrl && !loading && !error) {
      // Small delay to avoid hitting rate limits too hard if many items appear at once
      const timer = setTimeout(() => {
        generateImage();
      }, Math.random() * 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden bg-gray-100 flex items-center justify-center ${className}`}
    >
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover animate-in fade-in duration-700"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="flex flex-col items-center gap-2 text-gray-400 p-4 text-center">
          {loading ? (
            <>
              <Loader2 className="animate-spin text-orange-500" size={32} />
              <p className="text-[10px] font-medium uppercase tracking-wider">Generando...</p>
            </>
          ) : error ? (
            <>
              <RefreshCw 
                className="cursor-pointer hover:text-orange-500 transition-colors" 
                size={32} 
                onClick={generateImage}
              />
              <p className="text-[10px] font-medium">Error al cargar</p>
            </>
          ) : (
            <>
              <ImageIcon size={32} className="opacity-20" />
              <p className="text-[10px] font-medium">Esperando...</p>
            </>
          )}
        </div>
      )}
      
      {/* Overlay for loading state if image exists but we are refreshing */}
      {loading && imageUrl && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center">
          <Loader2 className="animate-spin text-white" size={24} />
        </div>
      )}
    </div>
  );
};

export default DishImage;
