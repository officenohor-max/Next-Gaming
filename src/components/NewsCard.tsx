import React, { useState } from 'react';
import { NewsArticle } from '../types';
import { Clock, Calendar, ArrowRight, User } from 'lucide-react';

interface NewsCardProps {
  article: NewsArticle;
  onSelect: (article: NewsArticle) => void;
  layout?: 'grid' | 'horizontal';
}

export const NewsCard: React.FC<NewsCardProps> = ({
  article,
  onSelect,
  layout = 'grid'
}) => {
  const [imgError, setImgError] = useState(false);

  if (layout === 'horizontal') {
    return (
      <article
        onClick={() => onSelect(article)}
        className="group cursor-pointer flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 rounded-xl border border-slate-800/80 bg-[#0e121c] transition-all duration-300 hover:border-purple-500/40 hover:bg-[#121724]"
      >
        <div className="relative aspect-[16/9] sm:w-56 shrink-0 overflow-hidden rounded-lg bg-slate-900">
          {!imgError ? (
            <img
              src={article.coverImage}
              alt={article.title}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full bg-slate-800 flex items-center justify-center p-2 text-center text-xs text-slate-400">
              {article.category}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div className="space-y-2">
            {/* Unboxed Metadata */}
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-purple-400 font-semibold">{article.category}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{article.publishedAt}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{article.readTime}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
              {article.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
              {article.teaser}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span className="text-slate-400">By {article.author.name}</span>
            <div className="flex items-center gap-1 text-purple-400 font-medium group-hover:translate-x-1 transition-transform">
              <span>Read Article</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={() => onSelect(article)}
      className="group cursor-pointer flex flex-col overflow-hidden rounded-xl border border-slate-800/80 bg-[#0e121c] transition-all duration-300 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-950/20"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
        {!imgError ? (
          <img
            src={article.coverImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-800 text-xs text-slate-400">
            {article.category}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e121c] via-transparent to-transparent opacity-80" />
      </div>

      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div className="space-y-2">
          {/* Zero-Pill Unboxed Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="text-purple-400 font-semibold">{article.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{article.publishedAt}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{article.readTime}</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
            {article.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {article.teaser}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span className="text-slate-400">By {article.author.name}</span>
          <div className="flex items-center gap-1 text-purple-400 font-medium group-hover:translate-x-1 transition-transform">
            <span>Read Story</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </article>
  );
};
