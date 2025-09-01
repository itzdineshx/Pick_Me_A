import React, { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { FaGithub, FaStar } from 'react-icons/fa';

interface GitHubStarBadgeProps {
  repoFullName: string; // e.g. 'username/repo-name'
  className?: string;
  compact?: boolean;
}

export default function GitHubStarBadge({ repoFullName, className, compact = false }: GitHubStarBadgeProps) {
  const [stars, setStars] = useState<number | null>(null);
  const [displayStars, setDisplayStars] = useState<number>(0);

  // Animated count-up once we have stars
  useEffect(() => {
    if (stars == null) return;
    const durationMs = 900;
    const steps = 30;
    const stepMs = Math.max(15, Math.floor(durationMs / steps));
    let current = 0;
    const increment = stars / steps;
    const id = window.setInterval(() => {
      current += increment;
      if (current >= stars) {
        setDisplayStars(stars);
        window.clearInterval(id);
      } else {
        setDisplayStars(Math.floor(current));
      }
    }, stepMs);
    return () => window.clearInterval(id);
  }, [stars]);

  // Fetch repository data directly from GitHub API
  useEffect(() => {
    let cancelled = false;
    const fetchStars = async () => {
      try {
        const res = await fetch(`https://api.github.com/repos/${repoFullName}`);
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && data?.stargazers_count != null) {
          setStars(Number(data.stargazers_count));
        }
      } catch {
        // Fallback to a default if API fails
        if (!cancelled) {
          setStars(0);
        }
      }
    };
    fetchStars();
    // refresh once after a short delay to catch fresh stars on landing
    const t = window.setTimeout(fetchStars, 3000);
    return () => { cancelled = true; window.clearTimeout(t); };
  }, [repoFullName]);

  const formatted = useMemo(() => {
    const n = displayStars;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return `${n}`;
  }, [displayStars]);

  const pad = compact ? 'px-3 py-1.5' : 'px-4 py-2';
  const iconBox = compact ? 'w-5 h-5' : 'w-6 h-6';
  const iconSize = compact ? 'w-3 h-3' : 'w-3.5 h-3.5';
  const textSize = compact ? 'text-sm' : 'text-base';
  const countText = compact ? 'text-xs' : 'text-sm';
  const countMinW = compact ? 'min-w-[1.9rem]' : 'min-w-[2.25rem]';

  return (
    <a
      href={`https://github.com/${repoFullName}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group select-none',
        className,
      )}
      aria-label="Star this project on GitHub"
    >
      <div
        className={cn(
          'flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)]',
          pad,
          'transition-transform duration-200 group-hover:scale-[1.03] group-active:scale-[0.98]'
        )}
      >
        <div className={cn('flex items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white', iconBox)}>
          <FaGithub className={cn(iconSize)} />
        </div>
        <div className={cn('flex items-center gap-1 text-white/90 font-semibold', textSize)}>
          <FaStar className={cn(iconSize, 'text-yellow-400')} />
          <span className="tracking-wide">Star</span>
        </div>
        <div className={cn('ml-2 rounded-lg border border-white/10 bg-white/5 px-2 py-0.5 text-white/90 font-semibold text-center', countText, countMinW)}>
          {stars == null ? '—' : formatted}
        </div>
      </div>
    </a>
  );
}