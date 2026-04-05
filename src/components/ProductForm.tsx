"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IProduct } from "@/models/Product";
import { Card, CardContent } from "@/components/ui/card";
import { X, ImagePlus, Loader2 } from "lucide-react";

export function ProductForm({ product }: { product?: Partial<IProduct> & { _id?: string } }) {
  const router = useRouter();
  const isEditing = !!product;
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price?.toString() || "",
    category: product?.category || "Men",
    stock: product?.stock?.toString() || "0",
    sizes: product?.sizes?.join(", ") || "",
    colors: product?.colors?.join(", ") || "",
    images: product?.images || [],
  });

  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setIsUploadingImage(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      
      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });
      
      if (!res.ok) throw new Error("Failed to upload image");
      
      const data = await res.json();
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, data.secure_url],
      }));
    } catch (error) {
      alert("Error uploading image");
    } finally {
      setIsUploadingImage(false);
      e.target.value = ''; // Reset input
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      price: parseFloat(formData.price as string),
      stock: parseInt(formData.stock as string, 10),
      sizes: formData.sizes.split(",").map(s => s.trim()).filter(Boolean),
      colors: formData.colors.split(",").map(c => c.trim()).filter(Boolean),
    };

    try {
      const url = isEditing ? `/api/products/${product._id}` : "/api/products";
      const method = isEditing ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/products");
        router.refresh();
      } else {
        const data = await res.json();
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <select 
                id="category" 
                name="category" 
                value={formData.category} 
                onChange={handleChange}
                className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                required
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹) *</Label>
              <Input id="price" name="price" type="number" step="0.01" min="0" value={formData.price} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Count *</Label>
              <Input id="stock" name="stock" type="number" min="0" value={formData.stock} onChange={handleChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea id="description" name="description" rows={4} value={formData.description} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="sizes">Sizes (comma separated)</Label>
              <Input id="sizes" name="sizes" placeholder="S, M, L, XL" value={formData.sizes} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="colors">Colors (comma separated)</Label>
              <Input id="colors" name="colors" placeholder="Red, Blue, Green" value={formData.colors} onChange={handleChange} />
            </div>
          </div>

          {/* Cloudinary File Upload */}
          <div className="space-y-4 border p-4 rounded-md bg-gray-50/50">
            <div>
              <Label htmlFor="image-upload" className="mb-2 block">Upload Product Images</Label>
              <div className="flex items-center gap-4">
                <Input 
                  id="image-upload" 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isUploadingImage}
                  className="cursor-pointer file:text-white file:border-0 file:bg-black file:rounded-md file:px-4 file:py-1 file:font-semibold hover:file:bg-black/80 file:mr-4 file:transition-colors bg-white max-w-sm"
                />
                {isUploadingImage && <div className="text-sm text-gray-500 flex items-center"><Loader2 className="h-4 w-4 animate-spin mr-2"/> Uploading...</div>}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4 border-t">
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative w-24 h-24 border rounded overflow-hidden group">
                  <img src={img} alt="preview" className="object-cover w-full h-full" />
                  <button 
                    type="button" 
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {formData.images.length === 0 && (
                <div className="text-sm text-gray-400 p-4 w-full text-center border border-dashed rounded-md">
                  No images added yet. Provide valid image URLs.
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">
               Images are securely uploaded and stored dynamically via Cloudinary.
            </p>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? "Update Product" : "Save Product"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
