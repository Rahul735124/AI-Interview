import axios from 'axios';

// ─── Judge0 CE (Community Edition) — Free, no API key required ───────────────
// Docs: https://ce.judge0.com
const JUDGE0_BASE = 'https://ce.judge0.com';

// Judge0 language IDs
const JUDGE0_LANGUAGE_IDS: Record<string, number> = {
  python: 71,   // Python 3.8.1
  java: 62,     // Java (OpenJDK 13.0.1)
  cpp: 54,      // C++ (GCC 9.2.0)
};

// ─── In-browser JavaScript execution (no API needed) ─────────────────────────
function executeJavaScriptInBrowser(code: string): string {
  const logs: string[] = [];

  // Capture console output
  const _log = console.log;
  const _error = console.error;
  const _warn = console.warn;
  const _info = console.info;

  const stringify = (...args: unknown[]) =>
    args
      .map((a) =>
        typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a),
      )
      .join(' ');

  console.log = (...args) => { logs.push(stringify(...args)); _log(...args); };
  console.error = (...args) => { logs.push('[error] ' + stringify(...args)); _error(...args); };
  console.warn = (...args) => { logs.push('[warn] ' + stringify(...args)); _warn(...args); };
  console.info = (...args) => { logs.push('[info] ' + stringify(...args)); _info(...args); };

  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function(code);
    const returnVal = fn();
    // If the script returns a value, show it
    if (returnVal !== undefined) {
      logs.push(stringify(returnVal));
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      logs.push(`\nRuntimeError: ${err.message}`);
    }
  } finally {
    console.log = _log;
    console.error = _error;
    console.warn = _warn;
    console.info = _info;
  }

  return logs.length > 0 ? logs.join('\n') : '(no output)';
}

// ─── Judge0 CE submission for Python / Java / C++ ────────────────────────────
async function executeViaJudge0(languageId: number, code: string): Promise<string> {
  // Submit the code — wait=true returns result synchronously (up to ~5 s)
  const submitRes = await axios.post(
    `${JUDGE0_BASE}/submissions?base64_encoded=false&wait=true`,
    {
      source_code: code,
      language_id: languageId,
      stdin: '',
    },
    {
      headers: { 'Content-Type': 'application/json' },
      timeout: 15000,
    },
  );

  const data = submitRes.data;

  // If still processing, poll once more after a short delay
  if (data.status?.id <= 2) {
    await new Promise((r) => setTimeout(r, 3000));
    const pollRes = await axios.get(
      `${JUDGE0_BASE}/submissions/${data.token}?base64_encoded=false`,
    );
    return formatJudge0Output(pollRes.data);
  }

  return formatJudge0Output(data);
}

function formatJudge0Output(data: Record<string, unknown>): string {
  const status = (data.status as { description?: string } | undefined)?.description ?? '';
  const stdout = (data.stdout as string | null) ?? '';
  const stderr = (data.stderr as string | null) ?? '';
  const compileOutput = (data.compile_output as string | null) ?? '';

  const parts: string[] = [];

  if (compileOutput) parts.push(`Compile Error:\n${compileOutput}`);
  if (stdout) parts.push(stdout);
  if (stderr) parts.push(`\nError:\n${stderr}`);
  if (!stdout && !stderr && !compileOutput) {
    parts.push(status ? `Status: ${status}` : '(no output)');
  }

  return parts.join('\n').trim();
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Execute code for the given language.
 * - JavaScript → runs directly in the browser (instant, no API limit)
 * - Python / Java / C++ → Judge0 CE public API (free, no key needed)
 *
 * Returns a normalised { run: { stdout, stderr } } shape so CodingInterview.tsx
 * doesn't need to change its output handling.
 */
export const executeCode = async (
  language: string,
  _version: string,
  code: string,
): Promise<{ run: { stdout: string; stderr: string } }> => {
  // ── JavaScript: browser eval ──
  if (language === 'javascript') {
    const output = executeJavaScriptInBrowser(code);
    const isError = output.includes('RuntimeError') || output.includes('[error]');
    return {
      run: {
        stdout: isError ? '' : output,
        stderr: isError ? output : '',
      },
    };
  }

  // ── Other languages: Judge0 CE ──
  const langId = JUDGE0_LANGUAGE_IDS[language];
  if (!langId) {
    return {
      run: {
        stdout: '',
        stderr: `Language "${language}" is not supported for remote execution.`,
      },
    };
  }

  try {
    const output = await executeViaJudge0(langId, code);
    const isError =
      output.startsWith('Compile Error') ||
      output.startsWith('\nError') ||
      output.includes('error:') ||
      output.includes('Exception');

    return {
      run: {
        stdout: isError ? '' : output,
        stderr: isError ? output : '',
      },
    };
  } catch (err) {
    console.error('Judge0 execution error:', err);
    return {
      run: {
        stdout: '',
        stderr: 'Code execution failed. Please check your internet connection and try again.',
      },
    };
  }
};

/**
 * No longer fetches from Piston. Returns static runtime info so the
 * rest of the app (language selector, version lookup) keeps working.
 */
export const getRuntimes = async () => [
  { language: 'javascript', version: 'browser-native', aliases: ['js', 'node'] },
  { language: 'python',     version: '3.8.1',          aliases: ['py'] },
  { language: 'java',       version: '13.0.1',         aliases: [] },
  { language: 'cpp',        version: '9.2.0',          aliases: ['c++'] },
];
