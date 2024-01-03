export interface IAchievementType {
  id: string;
  type: string;
  category: string;
  name: string;
  difficulty?: number;
  min_value?: number;
}
