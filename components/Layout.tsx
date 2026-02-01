
import React from 'react';
import { SCHOOL_NAME, MANAGING_BODY, COPYRIGHT_INFO } from '../constants';
import { UserRole } from '../types';
import { Home, ClipboardList, Settings, LogOut, ShieldCheck } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeRole: UserRole;
  setRole: (role: UserRole) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeRole, setRole, currentPage, setCurrentPage }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl uppercase">TLB</div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-slate-800 text-sm leading-tight uppercase hidden sm:block">{SCHOOL_NAME}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase hidden sm:block">{MANAGING_BODY}</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
            >
              Trang chủ
            </button>
            <button 
              onClick={() => setCurrentPage('announcement')}
              className={`text-sm font-medium transition-colors ${currentPage === 'announcement' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
            >
              Thông báo
            </button>
            <button 
              onClick={() => setCurrentPage('status')}
              className={`text-sm font-medium transition-colors ${currentPage === 'status' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
            >
              Tra cứu hồ sơ
            </button>
          </nav>

          <div className="flex items-center gap-2">
            {activeRole === 'ADMIN' ? (
              <button 
                onClick={() => setRole('PARENT')}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-slate-600 text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                <LogOut size={14} /> Thoát Admin
              </button>
            ) : (
              <button 
                onClick={() => setRole('ADMIN')}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold hover:bg-blue-100 transition-colors"
              >
                <ShieldCheck size={14} /> Quản trị viên
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 mt-12 mb-16 md:mb-0">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 border-b border-slate-100 pb-8">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Cơ quan chủ quản: {MANAGING_BODY}</p>
              <h4 className="font-heading font-extrabold text-slate-800 text-xl uppercase mb-1">{SCHOOL_NAME}</h4>
              <p className="text-slate-500 text-sm">Nơi ươm mầm tài năng tương lai - Hệ thống tuyển sinh điện tử</p>
            </div>
            <div className="flex flex-col sm:items-end gap-2 text-slate-600 text-sm">
              <span className="font-bold text-blue-600">Hotline: 028-1234-5678</span>
              <span>Địa chỉ: Xã Ô Diên, Huyện Đan Phượng, Hà Nội</span>
            </div>
          </div>
          
          <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-xs">
              © 2024 Trường Mầm Non Tân Lập B. All rights reserved.
            </div>
            <div className="text-blue-600/70 text-sm font-medium italic text-center md:text-right">
              {COPYRIGHT_INFO}
            </div>
          </div>
        </div>
      </footer>
      
      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 h-16 flex items-center justify-around z-50">
        <button onClick={() => setCurrentPage('home')} className={`flex flex-col items-center gap-1 ${currentPage === 'home' ? 'text-blue-600' : 'text-slate-400'}`}>
          <Home size={20} />
          <span className="text-[10px] font-medium">Trang chủ</span>
        </button>
        <button onClick={() => setCurrentPage('announcement')} className={`flex flex-col items-center gap-1 ${currentPage === 'announcement' ? 'text-blue-600' : 'text-slate-400'}`}>
          <ClipboardList size={20} />
          <span className="text-[10px] font-medium">Thông báo</span>
        </button>
        <button onClick={() => setCurrentPage('status')} className={`flex flex-col items-center gap-1 ${currentPage === 'status' ? 'text-blue-600' : 'text-slate-400'}`}>
          <Settings size={20} />
          <span className="text-[10px] font-medium">Tra cứu</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
