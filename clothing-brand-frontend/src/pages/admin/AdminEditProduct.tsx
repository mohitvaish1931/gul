import { useState, useEffect, type ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { API_ENDPOINTS } from '../../utils/api';
import { getImageUrl } from '../../utils/mediaHelper';

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  
  const [localForm, setLocalForm] = useState<any>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const product = state.products.find(p => ((p as any)._id || p.id) === id);
    if (product) {
      setLocalForm({
        ...product,
        sizes_raw: product.sizes?.join(', ') || '',
        colors_raw: product.colors?.join(', ') || '',
        materials_raw: product.materials?.join('\n') || '',
        specifications_raw: product.specifications?.join('\n') || '',
        careInstructions_raw: product.careInstructions?.join('\n') || ''
      });
    }
  }, [id, state.products]);

  if (!localForm) return <div className="p-10 text-center">Loading product...</div>;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles(files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const fd = new FormData(e.target as HTMLFormElement);
    
    // Handle images
    fd.delete('image');
    if (imageFiles.length > 0) {
      imageFiles.forEach(file => fd.append('image', file));
    } else if (localForm.images && localForm.images.length > 0) {
      fd.append('existing_images', JSON.stringify(localForm.images));
    }

    const parseRaw = (name: string, target: string) => {
      const raw = fd.get(name)?.toString() || '';
      if (raw) {
        const arr = name.includes('raw') && (name.includes('Instructions') || name.includes('materials') || name.includes('specifications'))
          ? raw.split('\n').map(s => s.trim()).filter(Boolean)
          : raw.split(',').map(s => s.trim()).filter(Boolean);
        fd.append(target, JSON.stringify(arr));
      }
      fd.delete(name);
    };

    parseRaw('sizes_raw', 'sizes');
    parseRaw('colors_raw', 'colors');
    parseRaw('materials_raw', 'materials');
    parseRaw('specifications_raw', 'specifications');
    parseRaw('careInstructions_raw', 'careInstructions');

    try {
      const res = await fetch(`${API_ENDPOINTS.PRODUCTS}/${id}`, {
        method: 'PUT',
        body: fd
      });
      if (!res.ok) throw new Error('Update failed');
      const updated = await res.json();
      dispatch({ type: 'UPDATE_PRODUCT', payload: updated });
      alert('✅ Product updated successfully!');
      navigate('/admin/products');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
            <Edit className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Edit Acquisition</h1>
            <p className="text-xs text-gray-500 font-medium">Refining: {localForm.name}</p>
          </div>
        </div>
        <button onClick={() => navigate('/admin/products')} className="text-xs font-bold text-gray-400 hover:text-gray-800 uppercase tracking-widest">
          Discard Changes
        </button>
      </div>

      <div className="bg-white border border-gray-100 p-10 rounded-[2.5rem] shadow-sm">
        <form className="space-y-10" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Product Name</label>
              <input name="name" defaultValue={localForm.name} className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-indigo-600/20 transition-all outline-none" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Price (₹)</label>
              <input name="price" type="number" defaultValue={localForm.price} className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-indigo-600/20 transition-all outline-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Description</label>
            <textarea name="description" rows={4} defaultValue={localForm.description} className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-indigo-600/20 transition-all outline-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Current Assets</label>
              <div className="grid grid-cols-3 gap-2">
                {localForm.images?.map((img: string, idx: number) => (
                  <img key={idx} src={getImageUrl(img)} className="w-full h-20 object-cover rounded-xl border border-gray-100" alt="" />
                ))}
              </div>
              <input type="file" multiple name="image" onChange={handleImageChange} className="mt-2 text-xs text-gray-500" />
            </div>
            <div className="space-y-4">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Inventory Status</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="soldOut" defaultChecked={localForm.soldOut} className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-bold text-gray-600">Sold Out</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-10 border-t border-gray-50">
            <button
              type="submit"
              disabled={isLoading}
              className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:shadow-2xl hover:shadow-indigo-600/20 transition-all disabled:opacity-50"
            >
              {isLoading ? '⏳ Updating...' : 'Update Acquisition'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditProduct;
