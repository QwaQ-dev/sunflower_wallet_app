export type TokenConfig = {
    key: string;
    name: string;
    symbol: string;
    decimals: number;
    coingeckoId?: string;
}

export const TOKEN_REGISTRY: Record<string, TokenConfig> = {
  STX: {
    key: 'STX',
    name: 'Stacks',
    symbol: 'STX',
    decimals: 6,
    coingeckoId: 'blockstack',
  },

  'SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.ststx-token::ststx': {
    key: 'SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.ststx-token::ststx',
    name: 'Stacked STX',
    symbol: 'stSTX',
    decimals: 6,
    coingeckoId: 'ststx',
  },
  'SPN5AKG35QZSK2M8GAMR4AFX45659RJHDW353HSG.usdh-token-v1::usdh"': {
    key: 'SPN5AKG35QZSK2M8GAMR4AFX45659RJHDW353HSG.usdh-token-v1::usdh',
    name: 'USDh',
    symbol: 'USDh',
    decimals: 6,
    coingeckoId: 'usdh',
  },
  'SP3Y2ZSH8P7D50B0VBTSX11S7XSG24M1VB9YFQA4K.token-aeusdc::aeUSDC': {
    key: 'SP3Y2ZSH8P7D50B0VBTSX11S7XSG24M1VB9YFQA4K.token-aeusdc::aeUSDC',
    name: 'aeUSDC',
    symbol: 'aeUSDC',
    decimals: 6,
    coingeckoId: 'aeUSDC',
  },
  'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token::sbtc-token': {
    key: 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token::sbtc-token',
    name: 'sBTC',
    symbol: 'sBTC',
    decimals: 6,
    coingeckoId: 'sBTC',
  },
}