import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Binary, ExternalLink, Github, Loader2, Trophy } from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { fadeInUp, staggerContainer } from '../utils/animations';

const GITHUB_USER = 'prince093kumar';
const LEETCODE_USER = 'Prince62065';
const HACKERRANK_USER = 'princekumar09372';

const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USER}`;
const LEETCODE_PROFILE_URL = `https://leetcode.com/${LEETCODE_USER}`;
const HACKERRANK_PROFILE_URL = `https://www.hackerrank.com/profile/${HACKERRANK_USER}`;
const HACKERRANK_API_BASE = import.meta.env.VITE_HACKERRANK_API_BASE || '/api/hackerrank';

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const CACHE_TTL_MS = 3 * 60 * 60 * 1000;
const API_TIMEOUT_MS = 6000;

const CACHE_KEYS = {
  github: 'stats:v3:github',
  leetcode: 'stats:v3:leetcode',
  hackerrank: 'stats:v4:hackerrank',
};

const HACKERRANK_BAR_COLORS = ['#22D3EE', '#3B82F6', '#8B5CF6', '#22C55E', '#14B8A6', '#F59E0B'];

const FALLBACK_GITHUB = {
  followers: 12,
  public_repos: 24,
  trendData: [
    { month: 'Oct', commits: 8 },
    { month: 'Nov', commits: 12 },
    { month: 'Dec', commits: 9 },
    { month: 'Jan', commits: 16 },
    { month: 'Feb', commits: 14 },
    { month: 'Mar', commits: 18 },
  ],
};

const FALLBACK_LEETCODE = {
  totalSolved: 142,
  easySolved: 65,
  mediumSolved: 62,
  hardSolved: 15,
  ranking: 123456,
  acceptanceRate: 55.5,
};

const FALLBACK_HACKERRANK = {
  username: HACKERRANK_USER,
  badges: 12,
  stars: 24,
  rank: 'Top Performer',
  points: 1680,
  chartData: [
    { label: 'Problem', score: 90 },
    { label: 'Java', score: 82 },
    { label: 'SQL', score: 88 },
    { label: 'Python', score: 74 },
    { label: 'C++', score: 70 },
    { label: 'DSA', score: 92 },
  ],
  profileUrl: HACKERRANK_PROFILE_URL,
};

const readCache = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.ts || !parsed?.data) return null;
    return parsed;
  } catch {
    return null;
  }
};

const writeCache = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    // Ignore storage errors.
  }
};

const withTimeout = async (promise, ms, controller) => {
  let timer;
  try {
    const timeoutPromise = new Promise((_, reject) => {
      timer = setTimeout(() => {
        controller?.abort?.();
        reject(new Error('timeout'));
      }, ms);
    });
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timer);
  }
};

const githubHeaders = () => ({
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
});

const fetchJsonSafe = async (url, { signal, headers } = {}) => {
  const response = await fetch(url, { signal, headers });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || `HTTP ${response.status}`);
  }
  return data;
};

const monthKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

const lastMonths = (count) => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
  const output = [];
  for (let index = count - 1; index >= 0; index -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - index, 1);
    output.push({ key: monthKey(date), label: formatter.format(date) });
  }
  return output;
};

const buildMonthlyCommitsFromEvents = (events) => {
  const months = lastMonths(6);
  const bucket = new Map(months.map((month) => [month.key, 0]));
  if (Array.isArray(events)) {
    events.forEach((event) => {
      if (!event?.created_at || event.type !== 'PushEvent') return;
      const key = monthKey(new Date(event.created_at));
      if (!bucket.has(key)) return;
      const commits = Number(event?.payload?.size ?? 0) || 0;
      bucket.set(key, (bucket.get(key) || 0) + commits);
    });
  }
  return months.map((month) => ({ month: month.label, commits: bucket.get(month.key) || 0 }));
};

const buildMonthlyCommitsFromRepos = (repos) => {
  const months = lastMonths(6);
  const bucket = new Map(months.map((month) => [month.key, 0]));
  if (Array.isArray(repos)) {
    repos.forEach((repo) => {
      const pushedAt = repo?.pushed_at || repo?.updated_at;
      if (!pushedAt) return;
      const key = monthKey(new Date(pushedAt));
      if (!bucket.has(key)) return;
      bucket.set(key, (bucket.get(key) || 0) + 1);
    });
  }
  return months.map((month) => ({ month: month.label, commits: (bucket.get(month.key) || 0) * 3 }));
};

const buildMonthlyCommitsFromCommitLists = (commitLists) => {
  const months = lastMonths(6);
  const bucket = new Map(months.map((month) => [month.key, 0]));
  if (Array.isArray(commitLists)) {
    commitLists.forEach((commits) => {
      if (!Array.isArray(commits)) return;
      commits.forEach((commit) => {
        const dateStr = commit?.commit?.author?.date || commit?.author?.date;
        if (!dateStr) return;
        const key = monthKey(new Date(dateStr));
        if (!bucket.has(key)) return;
        bucket.set(key, (bucket.get(key) || 0) + 1);
      });
    });
  }
  return months.map((month) => ({ month: month.label, commits: bucket.get(month.key) || 0 }));
};

const toArray = (value) => {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.models)) return value.models;
  if (Array.isArray(value?.model)) return value.model;
  return [];
};

const shortLabel = (raw, fallback) => {
  const normalized = String(raw || fallback || '').replace(/[_-]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!normalized) return 'Skill';
  return normalized.length > 12 ? `${normalized.slice(0, 11)}…` : normalized;
};

const normalizeHackerRankData = (profilePayload, badgesPayload, skillsPayload, cachedData) => {
  const profile = profilePayload?.model || profilePayload || {};
  const badges = toArray(badgesPayload) || toArray(profile?.badges);
  const skills = toArray(skillsPayload);

  const skillChart = skills
    .slice(0, 6)
    .map((item, index) => ({
      label: shortLabel(item?.name || item?.skill, `Skill ${index + 1}`),
      score: Math.min(5, Math.max(0, Number(item?.stars ?? item?.stars_count ?? (item?.score ? item.score / 20 : 0)) || 0)),
    }))
    .filter((item) => item.score > 0);

  const badgeChart = badges
    .slice(0, 6)
    .map((item, index) => ({
      label: shortLabel(item?.badge_name || item?.topic || item?.name, `Badge ${index + 1}`),
      score: Math.min(5, Math.max(0, Number(item?.stars ?? item?.stars_count ?? item?.level ?? 0) || 0)),
    }))
    .filter((item) => item.score > 0);

  const chartData =
    skillChart.length > 0
      ? skillChart
      : badgeChart.length > 0
        ? badgeChart
        : cachedData?.chartData || FALLBACK_HACKERRANK.chartData;

  const starsFromBadges = badges.reduce(
    (sum, badge) => sum + (Number(badge?.stars ?? badge?.stars_count ?? 0) || 0),
    0
  );

  return {
    username: profile?.username || cachedData?.username || FALLBACK_HACKERRANK.username,
    badges:
      badges.length ||
      Number(profile?.badges_count ?? profile?.badges?.length ?? 0) ||
      cachedData?.badges ||
      FALLBACK_HACKERRANK.badges,
    stars:
      starsFromBadges ||
      Number(profile?.stars ?? profile?.max_stars ?? profile?.total_stars ?? 0) ||
      cachedData?.stars ||
      FALLBACK_HACKERRANK.stars,
    rank: String(profile?.rank || profile?.country_rank || cachedData?.rank || FALLBACK_HACKERRANK.rank),
    points: Number(profile?.score ?? profile?.points ?? 0) || cachedData?.points || FALLBACK_HACKERRANK.points,
    chartData,
    profileUrl: HACKERRANK_PROFILE_URL,
  };
};

const useElementWidth = () => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const updateWidth = () => setWidth(element.clientWidth || 0);
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);
    window.addEventListener('resize', updateWidth);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  return [ref, width];
};

const CodingStats = () => {
  const [githubData, setGithubData] = useState(() => readCache(CACHE_KEYS.github)?.data || FALLBACK_GITHUB);
  const [leetcodeData, setLeetcodeData] = useState(() => readCache(CACHE_KEYS.leetcode)?.data || FALLBACK_LEETCODE);
  const [hackerRankData, setHackerRankData] = useState(() => readCache(CACHE_KEYS.hackerrank)?.data || FALLBACK_HACKERRANK);
  const [refreshing, setRefreshing] = useState(false);

  const [githubChartRef, githubChartWidth] = useElementWidth();
  const [hackerRankChartRef, hackerRankChartWidth] = useElementWidth();

  useEffect(() => {
    const fetchData = async () => {
      setRefreshing(true);
      try {
        const cachedGithub = readCache(CACHE_KEYS.github);
        const cachedLeetCode = readCache(CACHE_KEYS.leetcode);
        const cachedHackerRank = readCache(CACHE_KEYS.hackerrank);

        const githubFresh = cachedGithub && Date.now() - cachedGithub.ts < CACHE_TTL_MS;
        const leetCodeFresh = cachedLeetCode && Date.now() - cachedLeetCode.ts < CACHE_TTL_MS;
        const hackerRankFresh = cachedHackerRank && Date.now() - cachedHackerRank.ts < CACHE_TTL_MS;

        const jobs = [];

        if (!githubFresh) {
          jobs.push((async () => {
            const userController = new AbortController();
            const reposController = new AbortController();
            const eventsController = new AbortController();

            const [userResult, reposResult, eventsResult] = await Promise.allSettled([
              withTimeout(
                fetchJsonSafe(`https://api.github.com/users/${GITHUB_USER}`, {
                  signal: userController.signal,
                  headers: githubHeaders(),
                }),
                API_TIMEOUT_MS,
                userController
              ),
              withTimeout(
                fetchJsonSafe(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=20`, {
                  signal: reposController.signal,
                  headers: githubHeaders(),
                }),
                API_TIMEOUT_MS,
                reposController
              ),
              withTimeout(
                fetchJsonSafe(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=100`, {
                  signal: eventsController.signal,
                  headers: githubHeaders(),
                }),
                API_TIMEOUT_MS,
                eventsController
              ),
            ]);

            const user = userResult.status === 'fulfilled' ? userResult.value : null;
            const repos = reposResult.status === 'fulfilled' ? reposResult.value : null;
            const events = eventsResult.status === 'fulfilled' ? eventsResult.value : null;

            const topRepos = Array.isArray(repos) ? repos.slice(0, 6) : [];
            const sinceDate = new Date();
            sinceDate.setMonth(sinceDate.getMonth() - 6);

            let trendFromCommits = [];
            let hasCommitResponse = false;
            if (topRepos.length > 0) {
              const commitResults = await Promise.allSettled(
                topRepos.map((repo) => {
                  const commitController = new AbortController();
                  return withTimeout(
                    fetchJsonSafe(
                      `https://api.github.com/repos/${GITHUB_USER}/${repo.name}/commits?per_page=100&since=${encodeURIComponent(sinceDate.toISOString())}`,
                      {
                        signal: commitController.signal,
                        headers: githubHeaders(),
                      }
                    ),
                    API_TIMEOUT_MS,
                    commitController
                  );
                })
              );
              hasCommitResponse = commitResults.some((result) => result.status === 'fulfilled');
              trendFromCommits = buildMonthlyCommitsFromCommitLists(
                commitResults.map((result) => (result.status === 'fulfilled' ? result.value : []))
              );
            }

            const trendFromEvents = buildMonthlyCommitsFromEvents(events);
            const trendFromRepos = buildMonthlyCommitsFromRepos(repos);

            const hasCommitTrend = trendFromCommits.some((item) => item.commits > 0);
            const hasEventTrend = trendFromEvents.some((item) => item.commits > 0);
            const hasRepoTrend = trendFromRepos.some((item) => item.commits > 0);

            const nextGithub = {
              followers: user?.followers ?? cachedGithub?.data?.followers ?? FALLBACK_GITHUB.followers,
              public_repos: user?.public_repos ?? cachedGithub?.data?.public_repos ?? FALLBACK_GITHUB.public_repos,
              public_gists: user?.public_gists ?? cachedGithub?.data?.public_gists ?? 0,
              trendData: hasCommitTrend
                ? trendFromCommits
                : hasEventTrend
                  ? trendFromEvents
                  : hasRepoTrend
                    ? trendFromRepos
                    : cachedGithub?.data?.trendData ?? FALLBACK_GITHUB.trendData,
            };

            const hasGithubResponse =
              userResult.status === 'fulfilled' ||
              reposResult.status === 'fulfilled' ||
              eventsResult.status === 'fulfilled' ||
              hasCommitResponse;

            if (hasGithubResponse) {
              setGithubData(nextGithub);
              writeCache(CACHE_KEYS.github, nextGithub);
            } else if (!cachedGithub?.data) {
              setGithubData(FALLBACK_GITHUB);
              writeCache(CACHE_KEYS.github, FALLBACK_GITHUB);
            }
          })());
        }

        if (!leetCodeFresh) {
          jobs.push((async () => {
            const lcController = new AbortController();
            const lcResult = await withTimeout(
              fetchJsonSafe(`https://leetcode-stats-api.herokuapp.com/${LEETCODE_USER}`, {
                signal: lcController.signal,
              }),
              API_TIMEOUT_MS,
              lcController
            ).catch(() => null);

            if (lcResult?.status === 'success') {
              const normalized = {
                totalSolved: Number(lcResult.totalSolved || 0),
                easySolved: Number(lcResult.easySolved || 0),
                mediumSolved: Number(lcResult.mediumSolved || 0),
                hardSolved: Number(lcResult.hardSolved || 0),
                ranking: Number(lcResult.ranking || 0),
                acceptanceRate: Number(lcResult.acceptanceRate || 0),
              };
              setLeetcodeData(normalized);
              writeCache(CACHE_KEYS.leetcode, normalized);
            } else if (!cachedLeetCode?.data) {
              setLeetcodeData(FALLBACK_LEETCODE);
              writeCache(CACHE_KEYS.leetcode, FALLBACK_LEETCODE);
            }
          })());
        }

        if (!hackerRankFresh) {
          jobs.push((async () => {
            const profileController = new AbortController();
            const badgesController = new AbortController();
            const skillsController = new AbortController();

            const [profileResult, badgesResult, skillsResult] = await Promise.allSettled([
              withTimeout(
                fetchJsonSafe(`${HACKERRANK_API_BASE}/${HACKERRANK_USER}/profile`, {
                  signal: profileController.signal,
                  headers: { Accept: 'application/json' },
                }),
                API_TIMEOUT_MS,
                profileController
              ),
              withTimeout(
                fetchJsonSafe(`${HACKERRANK_API_BASE}/${HACKERRANK_USER}/badges`, {
                  signal: badgesController.signal,
                  headers: { Accept: 'application/json' },
                }),
                API_TIMEOUT_MS,
                badgesController
              ),
              withTimeout(
                fetchJsonSafe(`${HACKERRANK_API_BASE}/${HACKERRANK_USER}/skills`, {
                  signal: skillsController.signal,
                  headers: { Accept: 'application/json' },
                }),
                API_TIMEOUT_MS,
                skillsController
              ),
            ]);

            const profilePayload = profileResult.status === 'fulfilled' ? profileResult.value : null;
            const badgesPayload = badgesResult.status === 'fulfilled' ? badgesResult.value : null;
            const skillsPayload = skillsResult.status === 'fulfilled' ? skillsResult.value : null;

            const nextHackerRank = normalizeHackerRankData(
              profilePayload,
              badgesPayload,
              skillsPayload,
              cachedHackerRank?.data
            );

            const hasResponse =
              profileResult.status === 'fulfilled' ||
              badgesResult.status === 'fulfilled' ||
              skillsResult.status === 'fulfilled';

            if (hasResponse) {
              setHackerRankData(nextHackerRank);
              writeCache(CACHE_KEYS.hackerrank, nextHackerRank);
            } else if (!cachedHackerRank?.data) {
              setHackerRankData(FALLBACK_HACKERRANK);
              writeCache(CACHE_KEYS.hackerrank, FALLBACK_HACKERRANK);
            }
          })());
        }

        if (jobs.length > 0) {
          await Promise.allSettled(jobs);
        }
      } finally {
        setRefreshing(false);
      }
    };

    fetchData();
  }, []);

  const trendData = githubData?.trendData || FALLBACK_GITHUB.trendData;
  const maxCommits = trendData.length ? Math.max(...trendData.map((point) => Number(point.commits) || 0)) : 0;
  const totalSolved = Math.max(1, Number(leetcodeData?.totalSolved || FALLBACK_LEETCODE.totalSolved));
  const hackerRankChartData = hackerRankData?.chartData?.length ? hackerRankData.chartData : FALLBACK_HACKERRANK.chartData;

  const ChartTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="rounded-xl border border-cyan-400/20 bg-slate-950/95 px-3 py-2 shadow-xl backdrop-blur-xl">
        <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-200">{label}</p>
        <p className="mt-1 text-xs font-semibold text-cyan-300">{payload[0].value}</p>
      </div>
    );
  };

  return (
    <section className="section section-no-cv relative overflow-hidden bg-transparent">
      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 left-16 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -24, 0], y: [0, 28, 0], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-20 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl"
        />
      </div>

      <div className="container mx-auto relative z-10 px-6">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14 max-w-5xl">
          <motion.div variants={fadeInUp} className="mb-4 flex items-center gap-4 text-primary">
            <span className="h-px w-12 bg-primary/50" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.4em]">Analytics.v4()</span>
          </motion.div>
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="text-4xl font-heading font-black tracking-tight text-white md:text-6xl">
              SYSTEM <span className="text-gradient">TELEMETRY</span>
            </h2>
            {refreshing && (
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-slate-900/70 px-3 py-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-cyan-200">
                <Loader2 size={13} className="animate-spin" />
                Refreshing Sources
              </div>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 items-stretch gap-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, scale: 1.005 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="group h-full"
          >
            <div className="glass-card rounded-2xl border border-white/10 bg-slate-950/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/30 hover:shadow-[0_18px_50px_-24px_rgba(34,211,238,0.45)] md:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-300"
                  >
                    <Github size={24} />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-white">GitHub Impact</h3>
                    <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Monthly Commit Activity</p>
                  </div>
                </div>
                <a
                  href={GITHUB_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/20 bg-cyan-500/5 px-3 py-2 text-[10px] font-mono font-black uppercase tracking-widest text-cyan-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-500/15 hover:shadow-[0_10px_24px_-14px_rgba(34,211,238,0.8)]"
                >
                  Profile
                  <ExternalLink size={12} />
                </a>
              </div>

              <div ref={githubChartRef} className="h-[280px] w-full">
                {githubChartWidth > 0 && (
                  <AreaChart width={githubChartWidth} height={280} data={trendData}>
                    <defs>
                      <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.14)" vertical={false} />
                    <XAxis dataKey="month" stroke="rgba(203,213,225,0.5)" fontSize={11} tickLine={false} axisLine={false} dy={10} fontFamily="JetBrains Mono" />
                    <YAxis stroke="rgba(148,163,184,0.4)" fontSize={11} tickLine={false} axisLine={false} width={30} domain={[0, Math.max(5, maxCommits + 2)]} allowDecimals={false} />
                    <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'rgba(34,211,238,0.25)', strokeWidth: 1 }} />
                    <Area type="monotone" dataKey="commits" stroke="#22D3EE" fillOpacity={1} fill="url(#colorCommits)" strokeWidth={3} dot={{ r: 3, stroke: '#0f172a', strokeWidth: 2, fill: '#3B82F6' }} activeDot={{ r: 6, fill: '#22D3EE', stroke: '#0f172a', strokeWidth: 2 }} />
                  </AreaChart>
                )}
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/10 pt-6">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300/30">
                  <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">Total Commits (6M)</p>
                  <p className="text-2xl font-black text-white">{githubData.totalCommits || trendData.reduce((acc, curr) => acc + curr.commits, 0)}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300/30">
                  <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">Followers</p>
                  <p className="text-2xl font-black text-white">{githubData.followers}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300/30">
                  <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">Public Repos</p>
                  <p className="text-2xl font-black text-white">{githubData.public_repos}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, scale: 1.01 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              className="h-full"
            >
              <div className="glass-card flex h-full min-h-[500px] flex-col rounded-2xl border border-amber-300/20 bg-slate-950/65 p-6 backdrop-blur-xl transition-all duration-300 hover:border-amber-300/45 hover:shadow-[0_18px_50px_-24px_rgba(251,191,36,0.45)] md:p-7">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-300/30 bg-amber-400/10 text-amber-300"
                    >
                      <Trophy size={22} />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-white">LeetCode</h3>
                      <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-100/70">Problem Solving Split</p>
                    </div>
                  </div>
                  <a
                    href={LEETCODE_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300/30 bg-amber-500/10 px-2.5 py-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-amber-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-500/20 hover:shadow-[0_10px_24px_-14px_rgba(251,191,36,0.8)]"
                  >
                    Open
                    <ExternalLink size={11} />
                  </a>
                </div>

                <div className="flex-1 space-y-5">
                  {[
                    { label: 'Easy', value: Number(leetcodeData.easySolved || 0), color: 'bg-emerald-400' },
                    { label: 'Medium', value: Number(leetcodeData.mediumSolved || 0), color: 'bg-amber-400' },
                    { label: 'Hard', value: Number(leetcodeData.hardSolved || 0), color: 'bg-rose-400' },
                  ].map((level) => (
                    <div key={level.label} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-100/85">{level.label}</span>
                        <span className="text-lg font-black text-white">{level.value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 p-[1px]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.min(100, (level.value / totalSolved) * 100)}%` }}
                          transition={{ duration: 0.8 }}
                          className={`h-full rounded-full ${level.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-amber-300/20 bg-amber-400/[0.06] p-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-300/40">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-100/70">Total Solved</p>
                  <p className="mt-2 text-3xl font-black text-white">{leetcodeData.totalSolved}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, scale: 1.01 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              className="h-full"
            >
              <div className="glass-card flex h-full min-h-[500px] flex-col rounded-2xl border border-emerald-300/20 bg-slate-950/65 p-6 backdrop-blur-xl transition-all duration-300 hover:border-emerald-300/45 hover:shadow-[0_18px_50px_-24px_rgba(34,197,94,0.45)] md:p-7">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 3.0, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-300/30 bg-emerald-400/10 text-emerald-300"
                    >
                      <Binary size={20} />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-white">HackerRank</h3>
                      <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-100/70">Skills / Badge Trend</p>
                    </div>
                  </div>
                  <a
                    href={hackerRankData.profileUrl || HACKERRANK_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300/30 bg-emerald-500/10 px-2.5 py-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-emerald-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-500/20 hover:shadow-[0_10px_24px_-14px_rgba(34,197,94,0.8)]"
                  >
                    Open
                    <ExternalLink size={11} />
                  </a>
                </div>

                <div ref={hackerRankChartRef} className="h-[190px] w-full flex-1">
                  {hackerRankChartWidth > 0 && (
                    <BarChart width={hackerRankChartWidth} height={190} data={hackerRankChartData}>
                      <defs>
                        <linearGradient id="colorHrBar" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#34D399" stopOpacity={0.9} />
                          <stop offset="100%" stopColor="#059669" stopOpacity={0.4} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.10)" vertical={false} />
                      <XAxis dataKey="label" stroke="rgba(203,213,225,0.45)" fontSize={10} tickLine={false} axisLine={false} fontFamily="JetBrains Mono" />
                      <YAxis stroke="rgba(148,163,184,0.35)" fontSize={10} tickLine={false} axisLine={false} width={24} domain={[0, 5]} allowDecimals={false} />
                      <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'rgba(34,211,238,0.25)', strokeWidth: 1 }} />
                      <Bar dataKey="score" radius={[6, 6, 0, 0]} animationDuration={900}>
                        {hackerRankChartData.map((entry, index) => (
                          <Cell key={`${entry.label}-${index}`} fill="url(#colorHrBar)" />
                        ))}
                      </Bar>
                    </BarChart>
                  )}
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                  <div className="rounded-lg border border-emerald-300/20 bg-emerald-400/[0.05] p-3 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300/40">
                    <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">Badges</p>
                    <p className="mt-1 text-lg font-black text-white">{hackerRankData.badges}</p>
                  </div>
                  <div className="rounded-lg border border-emerald-300/20 bg-emerald-400/[0.05] p-3 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300/40">
                    <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">Stars</p>
                    <p className="mt-1 text-lg font-black text-white">{hackerRankData.stars}</p>
                  </div>
                  <div className="rounded-lg border border-emerald-300/20 bg-emerald-400/[0.05] p-3 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300/40">
                    <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">Points</p>
                    <p className="mt-1 text-lg font-black text-white">{hackerRankData.points}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-200/80">
                  <Activity size={12} />
                  Rank: {hackerRankData.rank}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodingStats;
