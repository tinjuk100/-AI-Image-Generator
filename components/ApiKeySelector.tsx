import React, { useState, useEffect } from 'react';
import { BILLING_DOCS_URL } from '../constants';

interface ApiKeySelectorProps {
  onApiKeySelected: () => void;
}

const ApiKeySelector: React.FC<ApiKeySelectorProps> = ({ onApiKeySelected }) => {
  const [hasKey, setHasKey] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkApiKey = async () => {
      if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
        try {
          const selected = await window.aistudio.hasSelectedApiKey();
          setHasKey(selected);
        } catch (err) {
          console.error('Error checking API key:', err);
          setError('ไม่สามารถตรวจสอบสถานะ API Key ได้ กรุณาลองใหม่');
          setHasKey(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Fallback for environments where window.aistudio is not available
        // In a real AI Studio environment, this block would not be hit.
        // For local development or other environments, ensure process.env.API_KEY is set.
        console.warn('window.aistudio not found. Assuming API key is set via environment variable for local development.');
        setHasKey(true);
        setIsLoading(false);
        onApiKeySelected(); // Proceed as if key is selected
      }
    };
    checkApiKey();
  }, [onApiKeySelected]);

  const handleSelectKey = async () => {
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      try {
        // Assume success after opening the dialog, as per guidelines
        await window.aistudio.openSelectKey();
        setHasKey(true);
        setError(null); // Clear any previous errors
        onApiKeySelected();
      } catch (err) {
        console.error('Error opening API key selection dialog:', err);
        setError('ไม่สามารถเปิดหน้าต่างเลือก API Key ได้ กรุณาลองใหม่');
      }
    } else {
      setError('ฟังก์ชันเลือก API Key ไม่พร้อมใช้งาน (โปรดตรวจสอบการตั้งค่า API_KEY ในสภาพแวดล้อมของคุณ)');
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-300">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mb-4"></div>
        <p>กำลังตรวจสอบ API Key...</p>
      </div>
    );
  }

  if (hasKey) {
    return null; // Key is selected, render nothing, parent component will proceed
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6 bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-red-500 mb-4">อาจารย์สายดำ: คำสั่งลับ!</h2>
      <p className="text-xl text-gray-200 mb-6">
        ก่อนจะไปต่อ ท่านต้องเตรียมพลังงานให้ข้า!
        <br />
        โปรดตรวจสอบหรือเลือก API Key ที่เหมาะสม เพื่อปลดปล่อยพลังจิตรกร AI
      </p>
      {error && (
        <p className="text-red-400 mb-4">{error}</p>
      )}
      {window.aistudio && typeof window.aistudio.openSelectKey === 'function' ? (
        <button
          onClick={handleSelectKey}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white text-xl font-bold rounded-lg shadow-lg hover:from-purple-700 hover:to-indigo-800 transition duration-300 ease-in-out transform hover:scale-105"
        >
          ปลดปล่อยพลังงาน (เลือก API Key ใน AI Studio)
        </button>
      ) : (
        <p className="px-6 py-3 text-lg font-medium text-gray-300 bg-gray-700 rounded-lg">
          ท่านไม่ได้อยู่ใน AI Studio environment: โปรดตั้งค่า `process.env.API_KEY` ด้วยตนเอง
        </p>
      )}
      <p className="mt-8 text-lg text-gray-400">
        หากพบปัญหา ท่านสามารถดูข้อมูลเพิ่มเติมเกี่ยวกับการจัดการ API Key ได้ที่
        <a href={BILLING_DOCS_URL} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline ml-2">
          เอกสาร Gemini API
        </a>
      </p>
    </div>
  );
};

export default ApiKeySelector;