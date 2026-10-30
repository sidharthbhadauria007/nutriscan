import React, { useState, useRef } from 'react';

export function Scanner() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Expanded Nutrition Database
  const NUTRITION_DB = {
    dhokla: { name: "Fresh Dhokla", calories: 160, protein: "4.5g", carbs: "28g", fat: "3.2g", desc: "Steamed fermented gram flour cakes with mustard seasoning" },
    samosa: { name: "Crispy Samosa", calories: 262, protein: "3.5g", carbs: "32g", fat: "13.5g", desc: "Deep-fried pastry with spiced potato and pea filling" },
    biryani: { name: "Hyderabadi Biryani", calories: 350, protein: "12g", carbs: "45g", fat: "12g", desc: "Aromatic basmati rice cooked with savory spices" },
    jalebi: { name: "Sweet Jalebi", calories: 150, protein: "1g", carbs: "35g", fat: "5g", desc: "Deep-fried batter spirals soaked in sugar syrup" },
    poha: { name: "Kanda Poha", calories: 180, protein: "3.2g", carbs: "33g", fat: "4g", desc: "Flattened rice cooked with turmeric, onions, and peanuts" },
    roti: { name: "Whole Wheat Roti", calories: 120, protein: "3.1g", carbs: "22g", fat: "0.8g", desc: "Traditional unleavened Indian flatbread" },
    maggi: { name: "Masala Maggi Noodles", calories: 310, protein: "7.0g", carbs: "46g", fat: "11.2g", desc: "Classic masala instant wheat noodles cooked with spices" },
    noodles: { name: "Veg Hakka Noodles", calories: 290, protein: "6.2g", carbs: "42g", fat: "10.1g", desc: "Stir-fried noodles with fresh spring vegetables" },
    chowmein: { name: "Desi Veg Chowmein", calories: 320, protein: "6.8g", carbs: "48g", fat: "12.0g", desc: "Street-style spicy stir-fried wheat noodles" },
    default: { name: "Detected Food Item", calories: 220, protein: "6g", carbs: "30g", fat: "8g", desc: "Freshly prepared meal" }
  };

  const handleImageUpload = (e) => {
    stopCamera();
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setScanResult(null);
    }
  };

  const startCamera = async () => {
    setSelectedImage(null);
    setImagePreview(null);
    setScanResult(null);
    setIsCameraActive(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Unable to access live camera.");
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const captureCamera = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "camera_capture.jpg", { type: "image/jpeg" });
        setSelectedImage(file);
        setImagePreview(canvas.toDataURL('image/jpeg'));
        stopCamera();
      }
    }, 'image/jpeg');
  };

  const handleScan = async () => {
    if (!selectedImage) return alert("Please select or capture a food image first!");

    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('http://localhost:5000/api/detect', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.detections && data.detections.length > 0) {
        const topDetection = data.detections[0];
        const rawClass = topDetection.item.toLowerCase().trim();
        const confidence = topDetection.confidence;

        const foodInfo = NUTRITION_DB[rawClass] || {
          ...NUTRITION_DB['default'],
          name: topDetection.item.charAt(0).toUpperCase() + topDetection.item.slice(1)
        };

        setScanResult({
          title: foodInfo.name,
          confidence: confidence,
          description: foodInfo.desc,
          calories: foodInfo.calories,
          protein: foodInfo.protein,
          carbs: foodInfo.carbs,
          fat: foodInfo.fat
        });
      } else {
        alert("No food item detected with sufficient confidence. Try a clearer image.");
      }
    } catch (err) {
      console.error("API Error:", err);
      alert("Failed to connect to backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#1f2937' }}>
        Distraction-Free Food Scanner
      </h2>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
        <label style={{ padding: '10px 18px', backgroundColor: '#e5e7eb', color: '#374151', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
          📁 Choose File
          <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
        </label>

        {!isCameraActive ? (
          <button 
            onClick={startCamera} 
            style={{ padding: '10px 18px', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
          >
            📷 Live Camera
          </button>
        ) : (
          <button 
            onClick={stopCamera} 
            style={{ padding: '10px 18px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
          >
            ❌ Close Camera
          </button>
        )}
      </div>

      {isCameraActive && (
        <div style={{ marginBottom: '20px' }}>
          <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxHeight: '300px', borderRadius: '10px', backgroundColor: '#000' }} />
          <div style={{ marginTop: '10px' }}>
            <button 
              onClick={captureCamera} 
              style={{ padding: '10px 22px', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              📸 Capture Photo
            </button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {imagePreview && !isCameraActive && (
        <div style={{ marginBottom: '20px' }}>
          <img src={imagePreview} alt="Selected Food" style={{ width: '280px', height: '200px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
        </div>
      )}

      {!isCameraActive && (
        <div>
          <button 
            onClick={handleScan} 
            disabled={loading}
            style={{ padding: '12px 28px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
          >
            {loading ? 'Scanning with YOLOv8...' : 'Scan Food'}
          </button>
        </div>
      )}

      {scanResult && (
        <div style={{ marginTop: '25px', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '12px', textAlign: 'left', backgroundColor: '#fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <span style={{ backgroundColor: '#dcfce7', color: '#166534', fontSize: '12px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px' }}>
            CONFIDENCE {scanResult.confidence}%
          </span>

          <h3 style={{ fontSize: '22px', margin: '10px 0 5px 0', color: '#111827' }}>{scanResult.title}</h3>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '15px' }}>{scanResult.description}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', textAlign: 'center', backgroundColor: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
            <div>
              <div style={{ fontSize: '10px', color: '#6b7280', fontWeight: 'bold' }}>CALORIES</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>{scanResult.calories}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#6b7280', fontWeight: 'bold' }}>PROTEIN</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>{scanResult.protein}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#6b7280', fontWeight: 'bold' }}>CARBS</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>{scanResult.carbs}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#6b7280', fontWeight: 'bold' }}>TOTAL FATS</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>{scanResult.fat}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Scanner;