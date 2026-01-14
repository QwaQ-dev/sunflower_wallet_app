import { useState } from 'react';
import { Token } from '../../../shared/types/Token';
import { PricesData } from '../types/wallet';
import calculatePriceDiff from '../utils/calculatePriceDiff';
import { parseStacksTokens } from '../../../shared/utils/parseStacksTokens';
import { fetchStacksBalances } from '../../../shared/services/stacksBalances';
import { TOKEN_REGISTRY } from '../../../shared/types/tokenRegistry';
import { fetchTokenPrices } from '../../../shared/services/tokenPrices';
import { fetchBtcBalance } from '../../../shared/services/btcBalance';


export default function useWalletTokens(priceHistory: PricesData) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [tokenLoading, setTokenLoading] = useState(false);

  const fetchTokensCosts = async (stxAddress: string, btcAddress: string) => {
    try {
      setTokenLoading(true);
      setTokenError(null);

      const result: Token[] = [];
      let totalUsd = 0;

      // STX + fungible tokens
      if (stxAddress) {
        const data = await fetchStacksBalances(stxAddress);

        const stxRaw = Number(data.stx.balance);
        const stxBalance = (stxRaw / 1e6).toFixed(6);

        const parsedTokens = parseStacksTokens(data.fungible_tokens);

        const priceIds = [
          TOKEN_REGISTRY.STX.coingeckoId!,
          ...parsedTokens.map(t => t.coingeckoId).filter(Boolean),
        ];

        const prices = await fetchTokenPrices(priceIds);

        // STX
        const stxPrice = prices.blockstack?.usd ?? 0;
        const stxUsd = Number(stxBalance) * stxPrice;

        result.push({
          name: 'Stacks',
          symbol: 'STX',
          balance: stxBalance,
          cost: stxPrice.toString(),
          balanceUsd: stxUsd.toFixed(2),
          diff: calculatePriceDiff(priceHistory?.stx).data,
        });

        totalUsd += stxUsd;

        // SIP-010 tokens
        for (const t of parsedTokens) {
          const price = prices[t.coingeckoId!]?.usd ?? 0;
          const usd = Number(t.balance) * price;

          result.push({
            name: t.name,
            symbol: t.symbol,
            balance: t.balance,
            cost: price.toString(),
            balanceUsd: usd.toFixed(2),
          });

          totalUsd += usd;
        }
      }

      // BTC
      if (btcAddress) {
        const btcBalance = await fetchBtcBalance(btcAddress);
        const prices = await fetchTokenPrices(['bitcoin']);
        const btcPrice = prices.bitcoin?.usd ?? 0;
        const usd = Number(btcBalance) * btcPrice;

        result.push({
          name: 'Bitcoin',
          symbol: 'BTC',
          balance: btcBalance,
          cost: btcPrice.toString(),
          balanceUsd: usd.toFixed(2),
          diff: calculatePriceDiff(priceHistory?.btc).data,
        });

        totalUsd += usd;
      }

      setTokens(result);
      setWalletBalance(totalUsd.toFixed(2));
    } catch (e) {
      setTokenError(e instanceof Error ? e.message : 'Unknown error');
      setWalletBalance('0.00');
    } finally {
      setTokenLoading(false);
    }
  };

  return {
    tokens,
    walletBalance,
    tokenError,
    tokenLoading,
    fetchTokensCosts,
  };
}
