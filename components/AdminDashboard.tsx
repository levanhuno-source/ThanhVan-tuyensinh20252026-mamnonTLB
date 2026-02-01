
import React, { useState } from 'react';
import { Application, ApplicationStatus, AgeGroup } from '../types';
import { AGE_GROUPS, MOCK_APPLICATIONS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Search, Filter, Download, UserCheck, Clock, XCircle, FileSpreadsheet } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [apps, setApps] = useState<Application[]>(MOCK_APPLICATIONS);
  const [filter, setFilter] = useState<ApplicationStatus | 'ALL'>('ALL');
  const [search, setSearch] = useState('');

  const stats = [
    { label: 'Tổng hồ sơ', value: apps.length, icon: Clock, color: 'bg-blue-500' },
    { label: 'Đã duyệt', value: apps.filter(a => a.status === ApplicationStatus.APPROVED).length, icon: UserCheck, color: 'bg-green-500' },
    { label: 'Chờ xử lý', value: apps.filter(a => a.status === ApplicationStatus.PENDING).length, icon: Clock, color: 'bg-amber-500' },
    { label: 'Từ chối', value: apps.filter(a => a.status === ApplicationStatus.REJECTED).length, icon: XCircle, color: 'bg-red-500' },
  ];

  const chartData = AGE_GROUPS.map(group => ({
    name: group.id,
    label: group.name,
    quota: group.quota,
    enrolled: group.enrolled,
  }));

  const filteredApps = apps.filter(app => {
    const matchesFilter = filter === 'ALL' || app.status === filter;
    const matchesSearch = app.childName.toLowerCase().includes(search.toLowerCase()) || 
                          app.phoneNumber.includes(search);
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case ApplicationStatus.APPROVED: return <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">Đã duyệt</span>;
      case ApplicationStatus.REJECTED: return <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">Từ chối</span>;
      case ApplicationStatus.PENDING: return <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">Đang chờ</span>;
      default: return <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${s.color} text-white flex items-center justify-center`}>
              <s.icon size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-medium">{s.label}</p>
              <p className="text-xl font-bold text-slate-800">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-heading font-bold text-slate-800 mb-6">Chỉ tiêu theo độ tuổi</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="enrolled" name="Đã đăng ký" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="quota" name="Chỉ tiêu" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center text-center">
            <FileSpreadsheet className="mx-auto text-green-600 mb-4" size={48} />
            <h3 className="font-bold text-slate-800">Báo cáo dữ liệu</h3>
            <p className="text-slate-500 text-sm mt-2 mb-6">Xuất danh sách hồ sơ đầy đủ ra file Excel phục vụ công tác xét duyệt ngoại tuyến.</p>
            <button className="bg-slate-800 text-white px-4 py-2 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-900 transition-colors">
              <Download size={18} /> Xuất File Excel
            </button>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <h3 className="font-heading font-bold text-slate-800">Danh sách hồ sơ</h3>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Tìm tên trẻ, SĐT..." 
                className="pl-10 pr-4 py-2 w-full sm:w-64 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select 
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
            >
              <option value="ALL">Tất cả</option>
              <option value={ApplicationStatus.PENDING}>Chờ duyệt</option>
              <option value={ApplicationStatus.APPROVED}>Đã duyệt</option>
              <option value={ApplicationStatus.REJECTED}>Từ chối</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Họ tên Trẻ</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Khối lớp</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Phụ huynh</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">SĐT</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Trạng thái</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredApps.length > 0 ? filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800">{app.childName}</div>
                    <div className="text-xs text-slate-400">ID: {app.id}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{AGE_GROUPS.find(g => g.id === app.ageGroupId)?.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{app.parentName}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-mono">{app.phoneNumber}</td>
                  <td className="px-6 py-4">{getStatusBadge(app.status)}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-bold">Chi tiết</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-sm italic">Không có dữ liệu phù hợp</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
