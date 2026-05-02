import React from 'react';

const highlightCode = (code: string) => {
  if (!code) return '';
  
  // Very basic Regex-based syntax highlighter (dependency-free)
  const highlighted = code
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Keywords
    .replace(/\b(const|let|var|function|return|import|export|from|class|interface|type|extends|implements|new|this|super|if|else|for|while|switch|case|break|continue|default|try|catch|finally|throw|async|await|yield)\b/g, '<span class="text-pink-400">$1</span>')
    // Strings (basic)
    .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="text-emerald-300">$1</span>')
    // Numbers
    .replace(/\b(\d+)\b/g, '<span class="text-purple-300">$1</span>')
    // Comments (single line)
    .replace(/(\/\/.*)/g, '<span class="text-slate-500 italic">$1</span>')
    // HTML tags
    .replace(/(&lt;[\w\s="/.-]+&gt;)/g, '<span class="text-blue-300">$1</span>')
    .replace(/(&lt;\/[\w\s="/.-]+&gt;)/g, '<span class="text-blue-300">$1</span>');

  return highlighted;
};

export default function CodeBlock({ code, className = '' }: { code: string, className?: string }) {
  return (
    <pre className={`text-sm overflow-x-auto ${className}`}>
      <code 
        dangerouslySetInnerHTML={{ __html: highlightCode(code) }} 
        className="block min-w-full"
      />
    </pre>
  );
}
