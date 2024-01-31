import axiosInstance from '../../../api/apiInstance';

export const uploadImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('images', file);

    const response = await axiosInstance.post('/v1/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const imageUrl = response.data?.imageLocationList?.[0];

    if (imageUrl) {
      return imageUrl;
    } else {
      throw new Error('Image URL not found in response data');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
