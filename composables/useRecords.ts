 // composables/useRecords.ts
 export interface DailyRecord {
    date: string; // YYYY-MM-DD（同日は上書き）
    mainGoal: string;
    timeManagement: number; // 0-10
    timeManagementNote?: string;
    planning: number; // 0-10
    planningNote?: string;
    cleaning: number; // 0-10
    cleaningNote?: string;
    selfImprovement: number; // 0-10
    selfImprovementNote?: string;
    githubCheck: boolean;
  }
  
  export type Records = DailyRecord[];
  
  const STORAGE_KEY = 'growth-records/v1';
  
  /** 平均スコア（小数1桁） */
  export const averageOf = (r: DailyRecord) => {
    const vals = [r.timeManagement, r.planning, r.cleaning, r.selfImprovement];
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    return Math.round(avg * 10) / 10;
  };
  
  /** LocalStorage ラッパ。SSR 安全 */
  const safeStorage = {
    load(): Records {
      if (process.client) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        try { return JSON.parse(raw) as Records; } catch { return []; }
      }
      return [];
    },
    save(records: Records) {
      if (process.client) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
      }
    }
  };
  
  /** 直近のレコード（配列末尾想定。なければ null） */
  export function getLastRecord(records: Records): DailyRecord | null {
    if (!records.length) return null;
    return records[records.length - 1];
  }
  
  /** レコード管理（配列保存 + 日付上書き） */
  export function useRecords() {
    const records = useState<Records>('records', () => safeStorage.load());
  
    const upsert = (payload: DailyRecord) => {
      const idx = records.value.findIndex(r => r.date === payload.date);
      if (idx >= 0) {
        records.value[idx] = payload;
      } else {
        records.value.push(payload);
        // 日付昇順に整列
        records.value.sort((a, b) => a.date.localeCompare(b.date));
      }
      safeStorage.save(records.value);
    };
  
    const clearAll = () => {
      records.value = [];
      safeStorage.save(records.value);
    };
  
    return { records, upsert, clearAll };
  }