import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, RotateCcw, Code as CodeIcon, Search, List,
  ChevronLeft, ChevronRight, ChevronDown,
  Terminal,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { executeCode, getRuntimes } from '../services/code.service';
import { codingQuestions, type CodingQuestion } from '../data/codingQuestions';


// ─── Main Component ────────────────────────────────────────────────────────────
const CodingInterview: React.FC = () => {
  const [questions] = useState<CodingQuestion[]>(codingQuestions);
  const [selectedQuestion, setSelectedQuestion] = useState<CodingQuestion>(questions[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(selectedQuestion.initialCode.javascript);
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [runtimes, setRuntimes] = useState<any[]>([]);

  // Panel open/close state
  const [listOpen, setListOpen] = useState(true);
  const [problemOpen, setProblemOpen] = useState(true);
  const [outputOpen, setOutputOpen] = useState(true);

  useEffect(() => {
    getRuntimes().then(setRuntimes);
  }, []);

  useEffect(() => {
    setCode(
      selectedQuestion.initialCode[language as keyof typeof selectedQuestion.initialCode] ||
        '// Write your code here',
    );
    setOutput('');
  }, [selectedQuestion, language]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const filteredQuestions = questions.filter(
    (q) =>
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const runCode = async () => {
    setIsExecuting(true);
    setOutput('Running code...');
    if (!outputOpen) setOutputOpen(true); // auto-expand terminal on run

    try {
      const langConfig = runtimes.find(
        (r) => r.language === language || r.aliases.includes(language),
      );
      const version = langConfig ? langConfig.version : '*';
      const result = await executeCode(language, version, code);

      if (result.run && result.run.stdout) {
        setOutput(result.run.stdout + (result.run.stderr ? '\nError:\n' + result.run.stderr : ''));
      } else if (result.run && result.run.stderr) {
        setOutput(result.run.stderr);
      } else {
        setOutput('Code executed successfully with no output.');
      }
    } catch {
      setOutput('Failed to execute code. Please try again.');
    } finally {
      setIsExecuting(false);
    }
  };

  const resetCode = () => {
    setCode(
      selectedQuestion.initialCode[language as keyof typeof selectedQuestion.initialCode],
    );
    setOutput('');
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Hard':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // ── Shared toggle button styles ──────────────────────────────────────────────
  const toggleBtn =
    'absolute z-20 flex items-center justify-center w-5 h-10 rounded bg-gray-200 dark:bg-gray-700 hover:bg-primary hover:text-white text-gray-500 dark:text-gray-400 transition-colors shadow-md cursor-pointer';

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#0A0F1C] overflow-hidden">

      {/* ── PANEL 1: Question List ─────────────────────────────────────────── */}
      <div className="relative flex-shrink-0 flex h-full">
        <motion.div
          animate={{ width: listOpen ? 260 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 35 }}
          className="overflow-hidden h-full"
          style={{ minWidth: 0 }}
        >
          <div
            className="w-[260px] h-full bg-white dark:bg-[#111827] border-r border-gray-200 dark:border-gray-800 flex flex-col"
            style={{ minWidth: 0 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
              <div className="flex items-center space-x-2 mb-3">
                <List className="text-primary" size={18} />
                <h2 className="text-base font-bold text-gray-900 dark:text-white">Questions</h2>
              </div>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={14}
                />
                <input
                  type="text"
                  placeholder="Search problems or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-gray-100 dark:bg-gray-800 border-none rounded-lg text-xs focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
            {/* Question List */}
            <div className="flex-1 overflow-y-auto">
              {filteredQuestions.map((q) => (
                <div
                  key={q.id}
                  onClick={() => setSelectedQuestion(q)}
                  className={`p-3 border-b border-gray-100 dark:border-gray-800/50 cursor-pointer transition-colors ${
                    selectedQuestion.id === q.id
                      ? 'bg-primary/5 border-l-4 border-l-primary'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 border-l-4 border-l-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <h3 className="font-semibold text-xs text-gray-900 dark:text-white leading-tight pr-1">
                      {q.title}
                    </h3>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase flex-shrink-0 ${getDifficultyColor(q.difficulty)}`}
                    >
                      {q.difficulty}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {q.topics.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="text-[9px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                    {q.topics.length > 2 && (
                      <span className="text-[9px] text-gray-400">+{q.topics.length - 2}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Toggle Button — anchored to the right edge of panel */}
        <button
          onClick={() => setListOpen((o) => !o)}
          title={listOpen ? 'Collapse question list' : 'Expand question list'}
          className={`${toggleBtn} -right-2.5 top-1/2 -translate-y-1/2`}
        >
          {listOpen ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
        </button>
      </div>

      {/* ── PANEL 2: Problem Statement ─────────────────────────────────────── */}
      <div className="relative flex-shrink-0 flex h-full">
        <motion.div
          animate={{ width: problemOpen ? 280 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 35 }}
          className="overflow-hidden h-full"
          style={{ minWidth: 0 }}
        >
          <div className="w-[280px] h-full bg-white dark:bg-[#111827] border-r border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="p-5 flex-1 overflow-y-auto">
              <div className="flex items-center space-x-2 mb-2">
                <CodeIcon className="text-primary flex-shrink-0" size={18} />
                <h1 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                  {selectedQuestion.title}
                </h1>
              </div>
              <div className="mb-4">
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${getDifficultyColor(selectedQuestion.difficulty)}`}
                >
                  {selectedQuestion.difficulty}
                </span>
              </div>
              <div className="prose dark:prose-invert prose-sm">
                <pre className="whitespace-pre-wrap font-sans text-gray-700 dark:text-gray-300 leading-relaxed bg-transparent p-0 text-sm">
                  {selectedQuestion.problemStatement.trim()}
                </pre>
              </div>
            </div>
            <div className="p-3 border-t border-gray-200 dark:border-gray-800 flex-shrink-0">
              <div className="flex flex-wrap gap-1.5">
                {selectedQuestion.topics.map((t) => (
                  <span
                    key={t}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Toggle */}
        <button
          onClick={() => setProblemOpen((o) => !o)}
          title={problemOpen ? 'Collapse problem statement' : 'Expand problem statement'}
          className={`${toggleBtn} -right-2.5 top-1/2 -translate-y-1/2`}
        >
          {problemOpen ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
        </button>
      </div>

      {/* ── PANEL 3 + 4: Editor + Output Terminal ─────────────────────────── */}
      <div className="flex-1 flex flex-col h-full min-w-0 relative">

        {/* Editor Toolbar */}
        <div className="h-14 bg-[#1e1e1e] border-b border-gray-800 flex items-center justify-between px-4 flex-shrink-0 z-10">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-[#2d2d2d] text-gray-300 border border-gray-700 rounded px-3 py-1 text-sm focus:outline-none focus:border-primary"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={resetCode}
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <RotateCcw size={14} className="mr-1.5" />
              Reset
            </Button>
            <Button
              size="sm"
              onClick={runCode}
              isLoading={isExecuting}
              className="bg-green-600 hover:bg-green-700 text-white border-none"
            >
              <Play size={14} className="mr-1.5" />
              Run Code
            </Button>
          </div>
        </div>

        {/* Monaco Editor — fills remaining vertical space */}
        <div className="flex-1 min-h-0">
          <Editor
            height="100%"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
              padding: { top: 16 },
              scrollBeyondLastLine: false,
            }}
          />
        </div>

        {/* ── PANEL 4: Output Terminal (collapsible from bottom) ─────────── */}
        <div className="relative flex-shrink-0">
          {/* Toggle bar — always visible, click to expand/collapse */}
          <button
            onClick={() => setOutputOpen((o) => !o)}
            className="w-full h-9 bg-[#252526] border-t border-gray-800 flex items-center justify-between px-4 group hover:bg-[#2d2d2d] transition-colors"
            title={outputOpen ? 'Collapse terminal' : 'Expand terminal'}
          >
            <div className="flex items-center space-x-2">
              <Terminal size={14} className="text-gray-400 group-hover:text-primary transition-colors" />
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider group-hover:text-gray-200 transition-colors">
                Output / Terminal
              </span>
              {output && !outputOpen && (
                <span className="ml-2 text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded font-medium">
                  Output ready
                </span>
              )}
            </div>
            <motion.div
              animate={{ rotate: outputOpen ? 0 : 180 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-200" />
            </motion.div>
          </button>

          {/* Collapsible body */}
          <AnimatePresence initial={false}>
            {outputOpen && (
              <motion.div
                key="output"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 200, opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 35 }}
                className="overflow-hidden bg-[#1e1e1e]"
              >
                <div className="h-[200px] p-4 overflow-y-auto font-mono text-sm">
                  {output ? (
                    <pre
                      className={`${
                        output.includes('Error') ? 'text-red-400' : 'text-gray-300'
                      } whitespace-pre-wrap`}
                    >
                      {output}
                    </pre>
                  ) : (
                    <span className="text-gray-600 italic">
                      Run your code to see the output here...
                    </span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CodingInterview;
