export interface Tool { name: string; slug: string; description: string; icon: string; category: string; }
export interface Category { id: string; name: string; icon: string; }

export const categories: Category[] = [
  { id: 'transform', name: 'Transform', icon: '🔄' },
  { id: 'convert', name: 'Convert', icon: '📁' },
  { id: 'enhance', name: 'Enhance & Filter', icon: '✨' },
  { id: 'generate', name: 'Generate', icon: '🎨' },
];

export const tools: Tool[] = [
  { name: 'Image Resizer', slug: 'image-resize', description: 'Resize images to exact dimensions or by percentage.', icon: '📐', category: 'transform' },
  { name: 'Image Cropper', slug: 'image-crop', description: 'Crop images with preset ratios or custom selection.', icon: '✂️', category: 'transform' },
  { name: 'Image Rotator', slug: 'image-rotate', description: 'Rotate and flip images to any angle.', icon: '🔄', category: 'transform' },
  { name: 'Image Compressor', slug: 'image-compress', description: 'Reduce image file size while maintaining quality.', icon: '📦', category: 'transform' },
  { name: 'PNG to JPG', slug: 'png-to-jpg', description: 'Convert PNG images to JPG format.', icon: '🖼️', category: 'convert' },
  { name: 'JPG to PNG', slug: 'jpg-to-png', description: 'Convert JPG images to PNG format with transparency.', icon: '🖼️', category: 'convert' },
  { name: 'Image to Base64', slug: 'image-to-base64', description: 'Convert images to Base64 encoded strings.', icon: '🔤', category: 'convert' },
  { name: 'SVG to PNG', slug: 'svg-to-png', description: 'Convert SVG vector graphics to PNG raster images.', icon: '📊', category: 'convert' },
  { name: 'Image Filters', slug: 'image-filters', description: 'Apply grayscale, sepia, blur, brightness, and contrast filters.', icon: '🎭', category: 'enhance' },
  { name: 'Image Watermark', slug: 'image-watermark', description: 'Add text watermarks to your images.', icon: '💧', category: 'enhance' },
  { name: 'Placeholder Generator', slug: 'placeholder-gen', description: 'Generate placeholder images for web design mockups.', icon: '🖥️', category: 'generate' },
  { name: 'Favicon Generator', slug: 'favicon-gen', description: 'Create favicons from text or uploaded images.', icon: '⭐', category: 'generate' },
];

export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter(t => t.category === categoryId);
}
