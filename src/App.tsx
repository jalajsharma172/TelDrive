import React, { useState } from 'react';
import { Folder, HardDrive, Settings, Search, UploadCloud, Bell, File, Image, FileText, FileSpreadsheet, LayoutGrid, List } from 'lucide-react';
import { motion } from 'framer-motion';

export default function App() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const recentFiles = [
        { id: 1, name: 'Q4 Financial Report.xlsx', type: 'spreadsheet', size: '2.4 MB', date: '2 hours ago', icon: FileSpreadsheet, color: 'text-green-400' },
        { id: 2, name: 'Project Alpha Presentation.pptx', type: 'presentation', size: '15.1 MB', date: 'Yesterday', icon: FileText, color: 'text-orange-400' },
        { id: 3, name: 'Design Assets.zip', type: 'archive', size: '142 MB', date: 'Oct 12, 2023', icon: File, color: 'text-blue-400' },
        { id: 4, name: 'Team Photo.jpg', type: 'image', size: '4.2 MB', date: 'Oct 10, 2023', icon: Image, color: 'text-purple-400' },
    ];

    const folders = [
        { id: 1, name: 'Work Documents', files: 124, size: '2.1 GB', color: 'from-blue-500 to-cyan-400' },
        { id: 2, name: 'Personal Media', files: 432, size: '14.5 GB', color: 'from-purple-500 to-pink-500' },
        { id: 3, name: 'Project Alpha', files: 45, size: '850 MB', color: 'from-orange-500 to-yellow-400' },
        { id: 4, name: 'Taxes 2023', files: 12, size: '24 MB', color: 'from-emerald-500 to-teal-400' },
    ];

    return (
        <div className="flex h-screen bg-[#0B0F19] text-gray-200 overflow-hidden font-sans selection:bg-indigo-500/30">

            {/* Background Orbs for Glassmorphism effect */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />
            <div className="fixed top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-cyan-600/10 blur-[100px] pointer-events-none" />

            {/* Sidebar */}
            <motion.aside
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-64 z-10 flex flex-col h-full border-r border-white/5 bg-white/[0.02] backdrop-blur-3xl"
            >
                <div className="p-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                        <UploadCloud className="text-white" size={24} />
                    </div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-white tracking-tight">TeleDrive</h1>
                </div>

                <nav className="flex-1 px-4 mt-8 space-y-2">
                    {[
                        { name: 'My Files', icon: Folder, active: true },
                        { name: 'Recent', icon: Bell, active: false },
                        { name: 'Starred', icon: File, active: false },
                        { name: 'Trash', icon: Settings, active: false },
                    ].map((item) => (
                        <button
                            key={item.name}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${item.active
                                ? 'bg-indigo-500/10 text-indigo-400 font-medium border border-indigo-500/20 shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.05)]'
                                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                                }`}
                        >
                            <item.icon size={20} className={item.active ? 'text-indigo-400' : ''} />
                            {item.name}
                        </button>
                    ))}
                </nav>

                <div className="p-6">
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-white/5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-300" />
                        <div className="flex items-center gap-3 mb-4 relative z-10">
                            <HardDrive className="text-indigo-400" size={20} />
                            <span className="font-medium text-sm text-indigo-100">Storage</span>
                        </div>
                        <div className="w-full h-1.5 bg-black/40 rounded-full mb-3 overflow-hidden relative z-10">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '65%' }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                            />
                        </div>
                        <p className="text-xs text-gray-400 relative z-10 font-medium">65 GB of 100 GB used</p>
                        <button className="w-full mt-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors duration-300 border border-white/5">
                            Upgrade Plan
                        </button>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative z-10 h-full">
                {/* Header */}
                <header className="h-20 px-8 flex items-center justify-between border-b border-white/5 bg-white/[0.01] backdrop-blur-xl">
                    <div className="relative w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-400 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search files, folders..."
                            className="w-full bg-black/20 border border-white/10 focus:border-indigo-500/50 rounded-2xl py-2.5 pl-12 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-all duration-300 shadow-inner"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative text-gray-400 hover:text-white transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-pink-500 rounded-full border border-[#0B0F19]"></span>
                        </button>
                        <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 p-[2px] cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg shadow-indigo-500/20">
                            <div className="w-full h-full rounded-full bg-[#0B0F19] overflow-hidden border-2 border-transparent">
                                <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold text-white tracking-tight">Overview</h2>
                            <button className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transform hover:-translate-y-0.5">
                                <UploadCloud size={18} />
                                Upload New
                            </button>
                        </div>

                        {/* Folders */}
                        <h3 className="text-lg font-semibold text-gray-300 mb-4">Quick Access</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                            {folders.map((folder, index) => (
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                                    key={folder.id}
                                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${folder.color} p-[1px]`}>
                                            <div className="w-full h-full rounded-xl bg-[#0B0F19] flex items-center justify-center opacity-80 group-hover:opacity-60 transition-opacity">
                                                <Folder className="text-white" size={24} />
                                            </div>
                                        </div>
                                    </div>
                                    <h4 className="text-white font-medium mb-1 group-hover:text-indigo-300 transition-colors">{folder.name}</h4>
                                    <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                                        <span>{folder.files} files</span>
                                        <span>{folder.size}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Recent Files */}
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-300">Recent Files</h3>
                            <div className="flex items-center gap-2 bg-black/20 rounded-lg p-1 border border-white/5">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                                >
                                    <LayoutGrid size={16} />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                                >
                                    <List size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                                        <th className="px-6 py-4 font-medium">Name</th>
                                        <th className="px-6 py-4 font-medium">Size</th>
                                        <th className="px-6 py-4 font-medium">Last Modified</th>
                                        <th className="px-6 py-4 font-medium text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {recentFiles.map((file, index) => (
                                        <motion.tr
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                                            key={file.id}
                                            className="hover:bg-white/[0.04] transition-colors group cursor-pointer"
                                        >
                                            <td className="px-6 py-4 flex items-center gap-3">
                                                <div className={`p-2.5 rounded-lg bg-black/30 border border-white/5 ${file.color}`}>
                                                    <file.icon size={20} />
                                                </div>
                                                <span className="text-gray-200 font-medium group-hover:text-indigo-300 transition-colors">{file.name}</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-400 font-medium">{file.size}</td>
                                            <td className="px-6 py-4 text-sm text-gray-400 font-medium">{file.date}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                                                    <Settings size={18} />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </motion.div>
                </div>
            </main>
        </div>
    );
}
