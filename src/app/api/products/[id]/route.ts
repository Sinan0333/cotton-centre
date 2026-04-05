import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';
import { NextRequest } from 'next/server';
import { deleteCloudinaryImage } from '@/lib/cloudinary';

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await Promise.resolve(props.params);
    await connectToDatabase();
    const data = await request.json();

    const product = await Product.findByIdAndUpdate(resolvedParams.id, data, { new: true, runValidators: true });
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await Promise.resolve(props.params);
    await connectToDatabase();
    
    // Find product first to get image URLs
    const product = await Product.findById(resolvedParams.id);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Delete images from Cloudinary if they exist
    if (product.images && product.images.length > 0) {
      const deletePromises = product.images.map((imageUrl: string) => deleteCloudinaryImage(imageUrl));
      await Promise.allSettled(deletePromises);
    }
    
    // Delete product from MongoDB
    await Product.findByIdAndDelete(resolvedParams.id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
