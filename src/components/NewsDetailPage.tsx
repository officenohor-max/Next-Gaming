import React, { useState } from 'react';
import { NewsArticle, Game } from '../types';
import { 
  Calendar, Clock, User, ArrowLeft, Share2, Check, ExternalLink, 
  MessageSquare, Send, CheckCircle2, Bookmark 
} from 'lucide-react';

interface NewsDetailPageProps {
  article: NewsArticle;
  allNews: NewsArticle[];
  allGames: Game[];
  onBack: () => void;
  onSelectGame: (game: Game) => void;
  onSelectNews: (article: NewsArticle) => void;
}

interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export const NewsDetailPage: React.FC<NewsDetailPageProps> = ({
  article,
  allNews,
  allGames,
  onBack,
  onSelectGame,
  onSelectNews
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'c1',
      author: 'AeroPixel_PC',
      text: 'DirectStorage being mandatory is the right move. Modern open-world asset streaming cannot sustain SATA or spinning hard drives anymore.',
      date: '2 hours ago'
    },
    {
      id: 'c2',
      author: 'CyberSamurai99',
      text: 'The UE5 Nanite custom work that CDPR is developing directly with Epic is huge for the PC industry as a whole.',
      date: '5 hours ago'
    }
  ]);

  const handleCopy = () => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
      }
    } catch (e) {
      console.warn(e);
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    const newComment: Comment = {
      id: `comm-${Date.now()}`,
      author: commentName.trim(),
      text: commentText.trim(),
      date: 'Just now'
    };

    setComments([newComment, ...comments]);
    setCommentText('');
  };

  const relatedGame = article?.relatedGameSlug
    ? (allGames || []).find((g) => g?.slug === article.relatedGameSlug)
    : undefined;

  const moreArticles = (allNews || []).filter((n) => n?.id !== article?.id).slice(0, 3);

  return (
    <article className="min-h-screen bg-[#08090d] text-slate-200 pb-20">
      
      {/* Breadcrumb Navigation */}
      <div className="border-b border-slate-800/80 bg-[#0a0d14]/80 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-3 flex items-center justify-between text-xs text-slate-400">
          <nav className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
            <button onClick={onBack} className="hover:text-white flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to News</span>
            </button>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span>Editorial</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span className="text-purple-400 font-medium">{article.category}</span>
          </nav>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md shrink-0"
          >
            {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5 text-purple-400" />}
            <span>{copiedLink ? 'Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Article Container */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        
        {/* Unboxed Metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
          <span>{article.category}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-400">{article.publishedAt}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-400">{article.readTime}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {article.title}
        </h1>

        {/* Lead Teaser */}
        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
          {article.teaser}
        </p>

        {/* Author Byline */}
        <div className="flex items-center justify-between border-y border-slate-800/80 py-4">
          <div className="flex items-center gap-3">
            {article.author.avatar ? (
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="h-10 w-10 rounded-full object-cover border border-slate-700"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-purple-900/60 flex items-center justify-center text-purple-300 font-bold">
                {article.author.name[0]}
              </div>
            )}
            <div>
              <span className="text-sm font-bold text-white block">{article.author.name}</span>
              <span className="text-xs text-slate-400">{article.author.role} · NextLevel Gaming</span>
            </div>
          </div>

          <div className="text-xs text-slate-400 hidden sm:block">
            Verified Editorial · Peer Reviewed
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
          <img
            src={article.coverImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Executive Summary / Key Takeaways Box */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="rounded-xl border border-purple-900/40 bg-[#121626] p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-purple-400 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-purple-400" />
              <span>Key Takeaways & Core Takeaways</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {article.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Body Content */}
        <div className="prose prose-invert max-w-none space-y-5 text-slate-300 text-sm sm:text-base leading-relaxed">
          {article.content.split('\n\n').map((paragraph, i) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={i} className="text-xl sm:text-2xl font-bold text-white pt-4">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            return <p key={i}>{paragraph}</p>;
          })}
        </div>

        {/* Related Game Highlight */}
        {relatedGame && (
          <div className="rounded-xl border border-slate-800 bg-[#0e121c] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={relatedGame.coverImage}
                alt={relatedGame.title}
                referrerPolicy="no-referrer"
                className="h-14 w-20 rounded-lg object-cover bg-slate-900 border border-slate-800"
              />
              <div>
                <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold block">Related Game Feature</span>
                <span className="text-base font-bold text-white block">{relatedGame.title}</span>
                <span className="text-xs text-slate-400">{relatedGame.releaseStatus} · {relatedGame.releaseDate}</span>
              </div>
            </div>

            <button
              onClick={() => onSelectGame(relatedGame)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Explore Full Game Page
            </button>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800/80">
          <span className="text-xs text-slate-500">Tags:</span>
          {article.tags.map((tag) => (
            <span key={tag} className="text-xs text-slate-400 hover:text-white transition-colors">
              #{tag}
            </span>
          ))}
        </div>

        {/* Discussion & Community Comments */}
        <section className="pt-8 border-t border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-400" />
              <span>Community Discussion ({comments.length})</span>
            </h2>
          </div>

          {/* New Comment Input */}
          <form onSubmit={handleAddComment} className="rounded-xl border border-slate-800 bg-[#0e121c] p-4 space-y-3">
            <input
              type="text"
              placeholder="Your gamer tag / name..."
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
            />
            <textarea
              placeholder="Share your thoughts, benchmarks, or theories..."
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!commentName.trim() || !commentText.trim()}
                className="px-4 py-2 bg-purple-600 disabled:opacity-50 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Post Comment</span>
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-3">
            {comments.map((comm) => (
              <div key={comm.id} className="rounded-xl border border-slate-800/80 bg-[#0c0f18] p-4 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-purple-300">{comm.author}</span>
                  <span className="text-slate-500">{comm.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                  {comm.text}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </article>
  );
};
