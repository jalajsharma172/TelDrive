import { useState, useRef } from 'react';
import { Search, Grid, Settings, Plus, RefreshCw, LogOut, FileText, Folder, ShieldCheck, Inbox, Download, Eye, Trash2, ChevronUp, Presentation } from 'lucide-react';

export default function App() {
  const [activeFolder, setActiveFolder] = useState('PPT');
  
  const [folders, setFolders] = useState([
    { name: 'Saved Messages', icon: Inbox, id: 'saved' },
    { name: 'PPT', icon: Folder, id: 'ppt' },
    { name: 'Temp', icon: Folder, id: 'temp' },
  ]);

  const [files, setFiles] = useState([
    { id: '1', name: 'Pool.pdf', size: 488.43 * 1024, type: 'pdf', color: 'text-red-400', folder: 'PPT' },
    { id: '2', name: 'PTEMS - 26 Presentation Schedule.pdf', size: 101.6 * 1024, type: 'pdf', color: 'text-red-400', folder: 'PPT' },
    { id: '3', name: 'PTEMS official template.pptx', size: 2.01 * 1024 * 1024, type: 'ppt', color: 'text-orange-500', folder: 'PPT' },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to format file sizes
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handlers
  const handleCreateFolder = () => {
    const folderName = prompt('Enter new folder name:');
    if (folderName && folderName.trim()) {
      setFolders([...folders, { name: folderName.trim(), icon: Folder, id: Date.now().toString() }]);
      setActiveFolder(folderName.trim());
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles || uploadedFiles.length === 0) return;

    const newFiles = Array.from(uploadedFiles).map(file => {
      let type = 'unknown';
      let color = 'text-gray-400';
      const name = file.name.toLowerCase();
      
      if (name.endsWith('.pdf')) {
        type = 'pdf'; color = 'text-red-400';
      } else if (name.endsWith('.ppt') || name.endsWith('.pptx')) {
        type = 'ppt'; color = 'text-orange-500';
      } else if (name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.jpeg')) {
        type = 'image'; color = 'text-blue-400';
      } else {
        type = 'document'; color = 'text-emerald-400';
      }

      return {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        size: file.size,
        type,
        color,
        folder: activeFolder,
        fileObj: file // Keep reference to actual file for downloading
      };
    });

    setFiles([...files, ...newFiles]);
    // Reset input so the same file can be uploaded again if needed
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeleteFile = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this file?')) {
      setFiles(files.filter(f => f.id !== id));
    }
  };

  const handleDownloadFile = (file: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (file.fileObj) {
      // If it's a newly uploaded file in this session, we can download it directly from memory
      const url = URL.createObjectURL(file.fileObj);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // Placeholder files don't have actual content
      alert(`Simulating download for: ${file.name}\n(This is a placeholder file, so no actual content is downloaded)`);
    }
  };

  const currentFolderFiles = files.filter(f => f.folder === activeFolder);

  // Calculate total size used
  const totalBytesUsed = files.reduce((acc, file) => acc + file.size, 0);

  return (
    <div className="flex h-screen bg-[#0f1319] text-gray-300 font-sans selection:bg-blue-500/30">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col h-full bg-[#131720] border-r border-[#1e2532]">
        <div className="p-5 flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#2c6aec] flex items-center justify-center text-white">
            <ShieldCheck size={18} strokeWidth={2.5} />
          </div>
          <h1 className="text-[17px] font-bold text-white tracking-wide">Telegram Drive</h1>
        </div>

        <nav className="flex-1 py-2 px-3 space-y-1 overflow-y-auto">
          {folders.map((folder) => (
            <button 
              key={folder.id}
              onClick={() => setActiveFolder(folder.name)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                activeFolder === folder.name 
                  ? 'bg-[#1c2230] text-[#eab308]' 
                  : 'text-[#8b949e] hover:bg-[#1a202c] hover:text-gray-200'
              }`}
            >
              <folder.icon size={18} className={activeFolder === folder.name ? 'text-[#eab308]' : 'text-[#8b949e]'} />
              <span className="font-medium text-[13px] truncate">{folder.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 space-y-5 border-t border-[#1e2532]">
          <button 
            onClick={handleCreateFolder}
            className="w-full flex items-center gap-2 justify-center py-2 rounded border border-[#1e2532] text-[#8b949e] hover:bg-[#1a202c] hover:text-white transition-colors text-[13px] font-medium"
          >
            <Plus size={16} />
            Create Folder
          </button>
          
          <div className="flex items-center gap-2 text-[11px] font-medium text-[#8b949e] px-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            Connected to Telegram
          </div>

          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded bg-[#132035] text-[#3b82f6] hover:bg-[#1a2b47] transition-colors text-[12px] font-medium">
              <RefreshCw size={12} />
              Sync
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded bg-[#2e171c] text-[#ef4444] hover:bg-[#3d1e25] transition-colors text-[12px] font-medium">
              <LogOut size={12} />
              Logout
            </button>
          </div>

          <div className="pt-1 px-1">
            <div className="flex justify-between text-[11px] text-[#8b949e] mb-1.5">
              <span>Used Today:</span>
            </div>
            <div className="w-full h-1 bg-[#1e2532] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#4b5563] transition-all duration-500" 
                style={{ width: `${Math.min(100, (totalBytesUsed / (2.5 * 1024 * 1024 * 1024)) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-[#8b949e] mt-1.5">
              <span>{formatBytes(totalBytesUsed)}</span>
              <span>2.50 GB</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-[60px] px-6 flex items-center justify-between border-b border-[#1e2532]">
          <div className="flex items-center text-[13px] font-medium">
            <span className="text-[#8b949e]">Start</span>
            <span className="mx-2 text-[#4b5563]">/</span>
            <span className="text-white">{activeFolder}</span>
          </div>
          
          <div className="flex-1 max-w-[400px] px-8">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search files..." 
                className="w-full bg-[#181d27] border border-[#262f40] rounded py-1.5 px-4 text-[13px] text-white placeholder-[#6b7280] focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-5 text-[#8b949e]">
            <button className="hover:text-white transition-colors"><Inbox size={18} /></button>
            <button className="hover:text-white transition-colors"><Grid size={18} /></button>
            <button className="hover:text-white transition-colors"><Settings size={18} /></button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Sorting */}
          <div className="flex items-center gap-6 text-[12px] font-medium text-[#8b949e] mb-6 px-1">
            <span className="mr-1">Sort by:</span>
            <button className="flex items-center gap-1 text-[#eab308]">
              Name <ChevronUp size={12} strokeWidth={3} />
            </button>
            <button className="flex items-center gap-1 hover:text-[#d1d5db]">
              Size <ChevronUp size={12} className="opacity-0" />
            </button>
            <button className="flex items-center gap-1 hover:text-[#d1d5db]">
              Date <ChevronUp size={12} className="opacity-0" />
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentFolderFiles.length === 0 && (
               <div className="col-span-full py-12 flex flex-col items-center justify-center text-[#8b949e]">
                 <Folder size={48} className="mb-4 opacity-50" />
                 <p className="text-[14px]">This folder is empty</p>
                 <p className="text-[12px] mt-1 opacity-70">Upload a file to get started</p>
               </div>
            )}

            {currentFolderFiles.map((file) => (
              <div 
                key={file.id} 
                className="bg-[#181d27] border border-[#222a38] rounded-xl p-4 flex flex-col group hover:bg-[#1c2230] hover:border-[#374151] transition-all cursor-pointer relative h-[180px]"
              >
                {/* Hover actions */}
                <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <button onClick={(e) => { e.stopPropagation(); alert(`Viewing ${file.name}`); }} className="text-[#8b949e] hover:text-white p-1 bg-[#131720]/80 rounded"><Eye size={14} /></button>
                  <button onClick={(e) => handleDownloadFile(file, e)} className="text-[#8b949e] hover:text-white p-1 bg-[#131720]/80 rounded"><Download size={14} /></button>
                  <button onClick={(e) => handleDeleteFile(file.id, e)} className="text-[#8b949e] hover:text-red-400 p-1 bg-[#131720]/80 rounded"><Trash2 size={14} /></button>
                </div>
                
                {/* Circular selection indicator placeholder */}
                <div className="absolute top-3 left-3 w-4 h-4 rounded-full border border-[#2d3748] group-hover:border-[#4a5568] opacity-50 transition-colors"></div>

                {/* Card Icon */}
                <div className="flex-1 flex items-center justify-center">
                  {file.type === 'pdf' ? (
                    <FileText size={42} className={file.color} strokeWidth={1.5} />
                  ) : file.type === 'ppt' ? (
                    <Presentation size={42} className={file.color} strokeWidth={1.5} />
                  ) : (
                    <FileText size={42} className={file.color} strokeWidth={1.5} />
                  )}
                </div>

                {/* Card Info */}
                <div className="mt-auto">
                  <h3 className="text-[13px] font-bold text-[#e1e4e8] truncate mb-0.5" title={file.name}>{file.name}</h3>
                  <p className="text-[11px] text-[#8b949e]">{formatBytes(file.size)}</p>
                </div>
              </div>
            ))}

            {/* Hidden file input */}
            <input 
              type="file" 
              multiple 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
            />

            {/* Upload File Card */}
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="border border-dashed border-[#2d3748] hover:border-[#4a5568] hover:bg-[#1a202c] rounded-xl p-4 flex flex-col items-center justify-center text-[#8b949e] hover:text-[#d1d5db] transition-colors h-[180px]"
            >
              <Plus size={24} className="mb-2" />
              <span className="text-[13px] font-medium">Upload File</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
