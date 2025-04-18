export interface OracleData {
  id: string;
  name: string;
  chains: string[];
  tvl: number;
  category: string;
  description?: string;
  rating?: number;
}

export interface OracleRating {
  reliability: number;
  decentralization: number;
  accuracy: number;
  updateFrequency: number;
  overallScore: number;
}

export interface ChainData {
  name: string;
  tvl: number;
  protocols: number;
} 