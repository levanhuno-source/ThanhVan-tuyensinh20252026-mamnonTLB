
import React, { useState, useEffect, useRef } from 'react';
import Layout from './components/Layout';
import EnrollmentForm from './components/EnrollmentForm';
import AdminDashboard from './components/AdminDashboard';
import { UserRole } from './types';
import { AGE_GROUPS, SCHOOL_NAME, ENROLLMENT_ANNOUNCEMENT } from './constants';
import { Calendar, Users, Info, ArrowRight, MessageCircle, Send, X, CheckCircle } from 'lucide-react';
import { askEnrollmentAssistant } from './services/geminiService';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>('PARENT');
  const [page, setPage] = useState('home');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [aiChat, setAiChat] = useState<{role: 'user'|'bot', text: string}[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiChat]);

  const handleAiSend = async () => {
    if (!aiMessage.trim()) return;
    const userText = aiMessage;
    setAiChat(prev => [...prev, { role: 'user', text: userText }]);
    setAiMessage('');
    setIsThinking(true);
    
    const response = await askEnrollmentAssistant(userText);
    setAiChat(prev => [...prev, { role: 'bot', text: response || "Tôi không nhận được phản hồi từ máy chủ." }]);
    setIsThinking(false);
  };

  const renderHome = () => (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 p-8 md:p-16 text-white text-center">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6 leading-tight uppercase">{SCHOOL_NAME}</h1>
          <p className="text-blue-100 text-lg md:text-xl mb-10 leading-relaxed uppercase tracking-widest font-bold opacity-90">Tuyển Sinh Trực Tuyến 2025 - 2026</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setPage('form')}
              className="bg-white text-blue-700 px-10 py-4 rounded-2xl font-extrabold text-lg shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2 hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all"
            >
              Đăng ký ngay <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => setPage('announcement')}
              className="bg-blue-500/30 backdrop-blur-md text-white border border-blue-400/30 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-500/50 transition-all"
            >
              Xem thông báo
            </button>
          </div>
        </div>
      </section>

      {/* Quick Info Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
            <Calendar size={28} />
          </div>
          <h3 className="font-heading font-bold text-xl text-slate-800 mb-2">Thời gian đăng ký</h3>
          <p className="text-slate-500">Từ 15/06/2025 đến 15/07/2025</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-4">
            <Users size={28} />
          </div>
          <h3 className="font-heading font-bold text-xl text-slate-800 mb-2">Độ tuổi tiếp nhận</h3>
          <p className="text-slate-500">Trẻ sinh năm từ 2021 đến 2025</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <Info size={28} />
          </div>
          <h3 className="font-heading font-bold text-xl text-slate-800 mb-2">Hồ sơ đơn giản</h3>
          <p className="text-slate-500">Khai sinh & Giấy xác nhận cư trú</p>
        </div>
      </section>

      {/* Quotas */}
      <section className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <h2 className="text-2xl font-heading font-bold text-slate-800">Chỉ tiêu theo độ tuổi</h2>
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Năm học 2025-2026</span>
        </div>
        <div className="divide-y divide-slate-50">
          {AGE_GROUPS.map((group) => {
            const percentage = group.quota > 0 ? Math.round((group.enrolled / group.quota) * 100) : 0;
            return (
              <div key={group.id} className="p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 group hover:bg-slate-50 transition-colors">
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors">{group.name}</h4>
                  <p className="text-slate-500 text-sm">{group.ageRange}</p>
                </div>
                <div className="flex flex-col items-center sm:items-end gap-2 w-full sm:w-auto">
                  <div className="flex items-center gap-4 w-full sm:w-64">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${percentage > 90 ? 'bg-red-500' : 'bg-blue-600'}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-slate-700 min-w-[3rem] text-right">{percentage}%</span>
                  </div>
                  <p className="text-xs text-slate-400">Đã nhận: <span className="font-bold text-slate-600">{group.enrolled}</span> / {group.quota} chỉ tiêu</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );

  const renderAnnouncement = () => (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12 animate-in slide-in-from-bottom-8 duration-500">
      <div className="prose prose-slate lg:prose-lg max-w-none">
        <div className="whitespace-pre-line text-slate-700">
          {ENROLLMENT_ANNOUNCEMENT.split('\n').map((line, i) => {
            if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-heading font-extrabold text-blue-700 mb-6">{line.replace('# ', '')}</h1>;
            if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-heading font-bold text-slate-800 mt-8 mb-4 border-l-4 border-blue-500 pl-4">{line.replace('## ', '')}</h2>;
            if (line.startsWith('- ')) return <li key={i} className="ml-4 mb-1 list-disc list-outside text-slate-600">{line.replace('- ', '')}</li>;
            return <p key={i} className="mb-2">{line}</p>;
          })}
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-slate-400 italic">Cập nhật ngày 01/01/2025</p>
        <button 
          onClick={() => setPage('form')}
          className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
        >
          Tiến hành đăng ký ngay
        </button>
      </div>
    </div>
  );

  const renderStatusCheck = () => (
    <div className="max-w-xl mx-auto text-center space-y-8 py-12">
      <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
        <CheckCircle size={40} />
      </div>
      <h2 className="text-3xl font-heading font-extrabold text-slate-800">Tra cứu trạng thái hồ sơ</h2>
      <p className="text-slate-500">Vui lòng nhập số điện thoại hoặc mã hồ sơ để kiểm tra tiến độ xử lý của {SCHOOL_NAME}.</p>
      
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4">
        <input 
          type="text" 
          placeholder="Nhập số điện thoại (VD: 090...)" 
          className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-lg text-center font-medium transition-all"
        />
        <button className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-900 transition-all shadow-xl shadow-slate-200">
          Tìm kiếm hồ sơ
        </button>
      </div>
    </div>
  );

  const content = () => {
    if (role === 'ADMIN') return <AdminDashboard />;
    switch (page) {
      case 'announcement': return renderAnnouncement();
      case 'form': return <EnrollmentForm onComplete={() => setPage('success')} />;
      case 'status': return renderStatusCheck();
      case 'success': return (
        <div className="max-w-md mx-auto py-20 text-center animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-heading font-extrabold text-slate-800 mb-4">Gửi hồ sơ thành công!</h2>
          <p className="text-slate-500 mb-10 leading-relaxed">Nhà trường đã nhận được thông tin của bé cho năm học 2025-2026. Chúng tôi sẽ phản hồi qua số điện thoại hoặc email trong vòng 2-3 ngày làm việc.</p>
          <button 
            onClick={() => setPage('home')}
            className="bg-slate-800 text-white px-10 py-3 rounded-2xl font-bold hover:bg-slate-900 transition-all"
          >
            Quay lại trang chủ
          </button>
        </div>
      );
      default: return renderHome();
    }
  };

  return (
    <Layout activeRole={role} setRole={setRole} currentPage={page} setCurrentPage={setPage}>
      {content()}

      {/* Floating AI Assistant Toggle */}
      <button 
        onClick={() => setIsAiOpen(true)}
        className="fixed bottom-20 md:bottom-8 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group"
      >
        <MessageCircle size={28} />
        <span className="absolute right-full mr-4 bg-white px-3 py-1.5 rounded-lg text-slate-700 text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">Trợ lý ảo Tân Lập B</span>
      </button>

      {/* AI Assistant Chat Modal */}
      {isAiOpen && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col h-[80vh] sm:h-[600px] overflow-hidden">
            <div className="p-5 bg-blue-600 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Trợ lý ảo Tân Lập B</h3>
                  <p className="text-[10px] text-blue-100 opacity-80 uppercase tracking-wider font-bold">Tuyển sinh 2025-2026</p>
                </div>
              </div>
              <button onClick={() => setIsAiOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50">
              {aiChat.length === 0 && (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle size={32} />
                  </div>
                  <p className="text-slate-700 text-sm font-bold mb-1">Chào bạn! Tôi là trợ lý của {SCHOOL_NAME}.</p>
                  <p className="text-slate-500 text-xs px-10">Tôi có thể giúp bạn giải đáp thắc mắc về tuyển sinh năm học mới 2025-2026.</p>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {['Bé sinh 2025 có được học không?', 'Lịch nộp hồ sơ?', 'Hồ sơ cần những gì?'].map(q => (
                      <button 
                        key={q} 
                        onClick={() => {setAiMessage(q); }}
                        className="text-[11px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 hover:bg-blue-100"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {aiChat.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none shadow-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-100" />
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-slate-100">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Nhập câu hỏi của bạn..." 
                  className="flex-1 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAiSend()}
                />
                <button 
                  onClick={handleAiSend}
                  disabled={!aiMessage.trim() || isThinking}
                  className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
