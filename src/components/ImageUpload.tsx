'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import exifr from 'exifr';

interface ImageUploadProps {
  onLocationFound: (lat: number, lng: number) => void;
}

export default function ImageUpload({ onLocationFound }: ImageUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      console.log('Processing file:', file.name);
      // Extract EXIF data
      const output = await exifr.parse(file, ['GPSLatitude', 'GPSLongitude']);
      console.log('EXIF data:', output);
      
      if (output && output.GPSLatitude && output.GPSLongitude) {
        console.log('Found coordinates:', { lat: output.GPSLatitude, lng: output.GPSLongitude });
        onLocationFound(output.GPSLatitude, output.GPSLongitude);
      } else {
        console.log('No GPS data found in image');
        setError('No GPS data found in the image');
      }
    } catch (err) {
      console.error('Error processing image:', err);
      setError(err instanceof Error ? err.message : 'Error reading image data');
    } finally {
      setIsLoading(false);
    }
  }, [onLocationFound]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        {...getRootProps()}
        className={`p-4 bg-white rounded-lg shadow-lg cursor-pointer transition-colors ${
          isDragActive ? 'bg-gray-100' : ''
        }`}
      >
        <input {...getInputProps()} />
        {isLoading ? (
          <p>Processing image...</p>
        ) : (
          <div className="text-center">
            <p className="mb-2">Drop an image here or click to upload</p>
            <p className="text-sm text-gray-500">Supported formats: JPEG, PNG</p>
          </div>
        )}
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>
    </div>
  );
} 