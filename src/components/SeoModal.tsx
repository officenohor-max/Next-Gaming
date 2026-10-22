import React, { useState } from 'react';
import { Game, NewsArticle } from '../types';
import { X, Copy, Check, Download, FileCode, Bot } from 'lucide-react';

interface SeoModalProps {
  games: Game[];
  news: NewsArticle[];
  onClose: () => void;
}

export const SeoModal: React.FC<SeoModalProps> = ({ games, news, onClose }) => {
  const [activeTab, setActiveTab] = useState<'sitemap' | 'robots' | 'schema'>('sitemap');
  const [copied, setCopied] = useState(false);

  const baseUrl = 'https://nextlevelgaming.com';

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/calendar</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/stories</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/hardware</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
${games
  .map(
    (g) => `  <url>
    <loc>${baseUrl}/games/${g.slug}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
  )
  .join('\n')}
${news
  .map(
    (n) => `  <url>
    <loc>${baseUrl}/news/${n.slug}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const robotsTxt = `# NextLevel Gaming robots.txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/private/

Sitemap: ${baseUrl}/sitemap.xml
`;

  const schemaJson = `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": "NextLevel Gaming",
      "url": "${baseUrl}",
      "description": "Discover the Next Generation of Gaming - Premium PC gaming editorial, upcoming AAA games, release calendar, and hardware specs."
    },
    {
      "@type": "Organization",
      "name": "NextLevel Gaming Media",
      "logo": "${baseUrl}/icon.png"
    }
  ]
}`;

  const currentContent = activeTab === 'sitemap' ? sitemapXml : activeTab === 'robots' ? robotsTxt : schemaJson;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = activeTab === 'sitemap' ? 'sitemap.xml' : activeTab === 'robots' ? 'robots.txt' : 'schema.json';
    const mime = activeTab === 'sitemap' ? 'application/xml' : activeTab === 'robots' ? 'text/plain' : 'application/json';
    const blob = new Blob([currentContent], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-md animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-800 bg-[#0d101a] shadow-2xl flex flex-col max-h-[85vh]"
      >
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4 bg-[#0a0d14]">
          <div className="flex items-center gap-2">
            <FileCode className="h-4 w-4 text-purple-400" />
            <h2 className="text-sm font-bold text-white">SEO & Search Engine Infrastructure</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-md text-slate-400 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-800 bg-[#0c0f18] text-xs">
          <button
            onClick={() => setActiveTab('sitemap')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'sitemap' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            sitemap.xml
          </button>
          <button
            onClick={() => setActiveTab('robots')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'robots' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            robots.txt
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'schema' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            JSON-LD Schema
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 bg-[#08090d]">
          <pre className="text-[11px] font-mono text-emerald-300 leading-relaxed overflow-x-auto whitespace-pre">
            {currentContent}
          </pre>
        </div>

        <div className="flex items-center justify-between border-t border-slate-800 px-5 py-3 bg-[#0a0d14] text-xs">
          <span className="text-slate-500">Live generated from verified database slugs</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-purple-400" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
