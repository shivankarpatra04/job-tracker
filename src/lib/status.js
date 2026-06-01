// Single source of truth for status badge styling across the app.
// Used by applications, interviews, timeline, and dashboard so colors stay consistent.

const STATUS_STYLES = {
  // Application statuses
  applied: "bg-blue-50 text-blue-700 ring-blue-600/20",
  interview: "bg-amber-50 text-amber-700 ring-amber-600/20",
  offer: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  accepted: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
  rejected: "bg-rose-50 text-rose-700 ring-rose-600/20",
  // Interview statuses
  scheduled: "bg-violet-50 text-violet-700 ring-violet-600/20",
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  cancelled: "bg-rose-50 text-rose-700 ring-rose-600/20",
};

const DEFAULT_STYLE = "bg-slate-100 text-slate-700 ring-slate-500/20";

/**
 * Returns the tailwind classes for a status pill (with a subtle ring).
 * @param {string} status
 */
export function statusClasses(status) {
  if (!status) return DEFAULT_STYLE;
  return STATUS_STYLES[status.toString().toLowerCase()] || DEFAULT_STYLE;
}

/**
 * Convenience class string for a consistent status pill.
 */
export function statusPill(status) {
  return `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${statusClasses(
    status
  )}`;
}
