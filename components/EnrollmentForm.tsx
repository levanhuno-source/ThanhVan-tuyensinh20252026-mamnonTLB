
import React, { useState } from 'react';
import { AGE_GROUPS } from '../constants';
import { User, CheckCircle2, ChevronRight, ChevronLeft, Upload, FileText, UserCircle } from 'lucide-react';

interface EnrollmentFormProps {
  onComplete: () => void;
}

const EnrollmentForm: React.FC<EnrollmentFormProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    childName: '',
    birthDate: '',
    gender: 'MALE',
    ethnicity: 'Kinh',
    address: '',
    ageGroupId: AGE_GROUPS[0].id,
    parentName: '',
    phoneNumber: '',
    email: '',
    relation: 'Bố',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    onComplete();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="bg-blue-600 px-6 py-8 text-white">
        <h2 className="text-2xl font-heading font-bold">Đăng Ký Nhập Học</h2>
        <p className="text-blue-100 mt-1">Vui lòng điền đầy đủ và chính xác thông tin</p>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-4 mt-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex-1 flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= i ? 'bg-white text-blue-600' : 'bg-blue-500 text-blue-100'}`}>
                {step > i ? <CheckCircle2 size={16} /> : i}
              </div>
              {i < 3 && <div className={`flex-1 h-1 rounded-full ${step > i ? 'bg-white' : 'bg-blue-500 opacity-30'}`} />}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
              <UserCircle size={20} />
              <h3>Thông tin của bé</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên trẻ *</label>
                <input required type="text" name="childName" value={formData.childName} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="VD: Nguyễn Văn An" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ngày sinh *</label>
                  <input required type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Giới tính *</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                    <option value="MALE">Nam</option>
                    <option value="FEMALE">Nữ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Đăng ký khối lớp *</label>
                <select name="ageGroupId" value={formData.ageGroupId} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                  {AGE_GROUPS.map(group => (
                    <option key={group.id} value={group.id}>{group.name} ({group.ageRange})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Địa chỉ thường trú/Tạm trú *</label>
                <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Số nhà, đường, phường/xã..." />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
              <UserCircle size={20} />
              <h3>Thông tin phụ huynh</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên người đăng ký *</label>
                <input required type="text" name="parentName" value={formData.parentName} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="VD: Trần Văn Bình" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mối quan hệ *</label>
                  <select name="relation" value={formData.relation} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                    <option value="Bố">Bố</option>
                    <option value="Mẹ">Mẹ</option>
                    <option value="Ông bà">Ông bà</option>
                    <option value="Người giám hộ">Người giám hộ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Số điện thoại *</label>
                  <input required type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="09xxxxxxx" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email liên hệ (nếu có)</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="email@example.com" />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
              <FileText size={20} />
              <h3>Đính kèm hồ sơ</h3>
            </div>

            <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100 flex gap-3 text-sm text-yellow-700 mb-4">
              <div className="shrink-0 mt-0.5">⚠️</div>
              <p>Bạn có thể chụp ảnh hoặc tải file PDF. Đảm bảo hình ảnh rõ nét, không bị mất góc.</p>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                <Upload className="mx-auto text-slate-400 group-hover:text-blue-500 mb-2" size={32} />
                <p className="text-sm font-medium text-slate-700">Giấy khai sinh (Bản sao/Gốc) *</p>
                <p className="text-xs text-slate-400 mt-1">Nhấn để chọn ảnh hoặc kéo thả vào đây</p>
                <input type="file" className="hidden" />
              </div>

              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                <Upload className="mx-auto text-slate-400 group-hover:text-blue-500 mb-2" size={32} />
                <p className="text-sm font-medium text-slate-700">Giấy xác nhận cư trú (CT07) *</p>
                <p className="text-xs text-slate-400 mt-1">Hoặc Thông báo số định danh cá nhân</p>
                <input type="file" className="hidden" />
              </div>
            </div>

            <div className="flex items-start gap-3 mt-6">
              <input required type="checkbox" className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
              <label className="text-sm text-slate-600">
                Tôi cam đoan những thông tin cung cấp trên là hoàn toàn chính xác và chịu trách nhiệm trước pháp luật.
              </label>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
          {step > 1 ? (
            <button 
              type="button" 
              onClick={handlePrev}
              className="flex items-center gap-2 px-6 py-2.5 font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              <ChevronLeft size={20} /> Quay lại
            </button>
          ) : <div />}

          {step < 3 ? (
            <button 
              type="button" 
              onClick={handleNext}
              className="flex items-center gap-2 bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
            >
              Tiếp theo <ChevronRight size={20} />
            </button>
          ) : (
            <button 
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-green-600 text-white px-10 py-2.5 rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
            >
              {isSubmitting ? 'Đang gửi...' : 'Gửi hồ sơ'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EnrollmentForm;
