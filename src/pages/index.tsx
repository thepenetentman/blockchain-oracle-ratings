import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';
import { fetchOracleData } from '../services/api';
import { OracleData } from '../types/oracle';

export default function Home() {
  const [oracles, setOracles] = useState<OracleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    const loadOracles = async () => {
      try {
        const data = await fetchOracleData();
        setOracles(data);
      } catch (err) {
        setError('Failed to load oracle data');
      } finally {
        setLoading(false);
      }
    };

    loadOracles();
  }, []);

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'green';
    if (rating >= 3) return 'blue';
    if (rating >= 2) return 'yellow';
    return 'red';
  };

  if (loading) return <Box p={8}>Loading...</Box>;
  if (error) return <Box p={8}>{error}</Box>;

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Blockchain Oracle Ratings
        </Heading>
        <Text textAlign="center" fontSize="lg">
          Comprehensive ratings and analysis of blockchain oracles
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {oracles.map((oracle) => (
            <Box
              key={oracle.id}
              p={6}
              bg={bgColor}
              borderRadius="lg"
              border="1px"
              borderColor={borderColor}
              shadow="md"
            >
              <VStack align="stretch" spacing={4}>
                <Heading size="md">{oracle.name}</Heading>
                <Badge
                  colorScheme={getRatingColor(oracle.rating || 0)}
                  fontSize="md"
                  p={2}
                  borderRadius="md"
                >
                  Rating: {oracle.rating?.toFixed(1)} / 5
                </Badge>

                <Stat>
                  <StatLabel>Total Value Locked (TVL)</StatLabel>
                  <StatNumber>
                    ${(oracle.tvl / 1000000).toFixed(2)}M
                  </StatNumber>
                  <StatHelpText>{oracle.category}</StatHelpText>
                </Stat>

                <Text fontSize="sm" color="gray.600">
                  Supported Chains: {oracle.chains.length}
                </Text>
                
                {oracle.description && (
                  <Text fontSize="sm" noOfLines={2}>
                    {oracle.description}
                  </Text>
                )}
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
} 