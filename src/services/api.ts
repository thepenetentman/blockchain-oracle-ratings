import axios from 'axios';
import { OracleData } from '../types/oracle';

const DEFILLAMA_API_BASE = 'https://api.llama.fi';

export const fetchOracleData = async (): Promise<OracleData[]> => {
  try {
    const response = await axios.get(`${DEFILLAMA_API_BASE}/oracles`);
    return response.data.map((oracle: any) => ({
      id: oracle.id,
      name: oracle.name,
      chains: oracle.chains || [],
      tvl: oracle.tvl || 0,
      category: oracle.category || 'Unknown',
      description: oracle.description,
      rating: calculateRating(oracle)
    }));
  } catch (error) {
    console.error('Error fetching oracle data:', error);
    throw error;
  }
};

const calculateRating = (oracle: any): number => {
  // Basic rating calculation based on TVL and number of chains
  const tvlScore = Math.min(oracle.tvl / 1000000, 5); // Max 5 points for TVL
  const chainScore = Math.min(oracle.chains?.length || 0, 5) / 2; // Max 2.5 points for chain diversity
  
  // Normalize to 0-5 range
  return Math.round((tvlScore + chainScore) * 2) / 2;
}; 