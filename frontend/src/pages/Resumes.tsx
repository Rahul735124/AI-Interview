import React, { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyResumes, uploadResume, deleteResume } from '../services/resume.service';
import { UploadCloud, FileText, CheckCircle, AlertCircle, FilePlus, ChevronRight, X, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

const Resumes: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [viewingResume, setViewingResume] = useState<any | null>(null);
  
  const queryClient = useQueryClient();

  const { data: resumes, isLoading } = useQuery({
    queryKey: ['resumes'],
    queryFn: getMyResumes,
  });

  const uploadMutation = useMutation({
    mutationFn: uploadResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      setSelectedFile(null);
      alert('Resume uploaded and analyzed successfully!');
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || 'Upload failed');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || 'Delete failed');
    }
  });

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
      } else {
        alert('Only PDF files are supported');
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
      } else {
        alert('Only PDF files are supported');
      }
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('resume', selectedFile);
    uploadMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Resume Manager</h1>
            <p className="text-gray-500 dark:text-gray-400">Upload your resumes and get instant AI feedback to optimize them for ATS.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FilePlus className="mr-2 text-primary" size={24} /> 
                Upload New
              </h2>
              
              <div 
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-300 dark:border-gray-700 hover:border-primary/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input 
                  type="file" 
                  id="resume-upload" 
                  className="hidden" 
                  accept=".pdf" 
                  onChange={handleChange}
                />
                
                {!selectedFile ? (
                  <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center">
                    <UploadCloud size={48} className="text-gray-400 mb-4" />
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Drag & drop your PDF here
                    </p>
                    <p className="text-xs text-gray-500">or click to browse files</p>
                  </label>
                ) : (
                  <div className="flex flex-col items-center">
                    <FileText size={48} className="text-primary mb-4" />
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 truncate w-full px-4">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-500 mb-4">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    <div className="flex space-x-3">
                      <Button variant="outline" size="sm" onClick={() => setSelectedFile(null)}>Cancel</Button>
                      <Button size="sm" onClick={handleUpload} isLoading={uploadMutation.isPending}>Analyze AI</Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Tips */}
              <div className="mt-6 space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Pro Tips:</h3>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                  <li className="flex items-start"><CheckCircle size={16} className="text-success mr-2 shrink-0 mt-0.5"/> Ensure it's a standard PDF format.</li>
                  <li className="flex items-start"><CheckCircle size={16} className="text-success mr-2 shrink-0 mt-0.5"/> Use standard fonts for better ATS parsing.</li>
                  <li className="flex items-start"><AlertCircle size={16} className="text-warning mr-2 shrink-0 mt-0.5"/> Avoid complex multi-column layouts.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Resumes List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 h-full">
              <h2 className="text-xl font-bold mb-6">Your Resumes</h2>
              
              {isLoading ? (
                <div className="flex justify-center items-center h-48">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : resumes?.length === 0 ? (
                <div className="text-center py-12">
                  <FileText size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No resumes uploaded yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {resumes?.map((resume: any) => (
                    <div key={resume._id} className="border border-gray-100 dark:border-gray-800 rounded-xl p-4 flex items-center justify-between hover:border-primary/30 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                          <FileText size={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{resume.originalName}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Uploaded on {new Date(resume.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-center hidden sm:block pr-4 border-r border-gray-100 dark:border-gray-800">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">ATS Score</p>
                          <p className={`font-bold ${resume.aiFeedback?.score >= 80 ? 'text-success' : resume.aiFeedback?.score >= 50 ? 'text-warning' : 'text-danger'}`}>
                            {resume.aiFeedback?.score || 0}/100
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="px-2 text-danger hover:bg-danger/10 border-danger/30" onClick={() => { if(window.confirm('Delete this resume?')) deleteMutation.mutate(resume._id); }}>
                            <Trash2 size={16} />
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs px-2" onClick={() => window.open(resume.fileUrl, '_blank')}>
                            View PDF
                          </Button>
                          <Button variant="ghost" size="sm" className="px-2 text-xs" onClick={() => setViewingResume(resume)}>
                            AI Feedback <ChevronRight size={16} className="ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {viewingResume && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-card-dark rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-xl border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <FileText className="mr-2 text-primary" size={24} />
                {viewingResume.originalName}
              </h2>
              <button onClick={() => setViewingResume(null)} className="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
                <span className="font-semibold text-gray-900 dark:text-white">ATS Compatibility Score</span>
                <span className={`text-2xl font-bold ${viewingResume.aiFeedback?.score >= 80 ? 'text-success' : viewingResume.aiFeedback?.score >= 50 ? 'text-warning' : 'text-danger'}`}>
                  {viewingResume.aiFeedback?.score || 0}/100
                </span>
              </div>
              
              {viewingResume.aiFeedback?.improvementSuggestions && viewingResume.aiFeedback.improvementSuggestions.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wider">Improvement Suggestions</h3>
                  <ul className="space-y-2">
                    {viewingResume.aiFeedback.improvementSuggestions.map((sug: string, i: number) => (
                      <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                        <AlertCircle size={16} className="text-primary mr-2 mt-0.5 shrink-0" />
                        <span>{sug}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {viewingResume.aiFeedback?.missingSkills && viewingResume.aiFeedback.missingSkills.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wider">Missing Skills to Add</h3>
                  <div className="flex flex-wrap gap-2">
                    {viewingResume.aiFeedback.missingSkills.map((skill: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-danger/10 text-danger rounded-full text-xs font-medium border border-danger/20">
                        + {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {viewingResume.parsedData?.skills && viewingResume.parsedData.skills.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wider">Detected Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {viewingResume.parsedData.skills.map((skill: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-success/10 text-success rounded-full text-xs font-medium border border-success/20">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
            </div>
            
            <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
              <Button onClick={() => setViewingResume(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resumes;
