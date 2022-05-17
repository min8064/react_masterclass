import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0,0,0,0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: row;
  color:#fff;
  span:first-child {
    font-size: 15px;
    font-weight: 400;
    text-transform: uppercase;
    margin-right: 10px;
  }
`;

interface PriceProps {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: string;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Price({ coinId }: PriceProps) {
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );

  return (
    <>
      <Overview>
      <OverviewItem>
        <span>Price:</span>
        <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
      </OverviewItem>
      </Overview>
      <Overview>
        <OverviewItem>
          <span>percent_change_1h:</span>
          <span>{tickersData?.quotes.USD.percent_change_1h.toFixed(3)}</span>
        </OverviewItem>
      </Overview>
      <Overview>
        <OverviewItem>
          <span>percent_change_1y:</span>
          <span>{tickersData?.quotes.USD.percent_change_1y.toFixed(3)}</span>
        </OverviewItem>
      </Overview>
      <Overview>
        <OverviewItem>
          <span>ath_price:</span>
          <span>{tickersData?.quotes.USD.ath_price.toFixed(3)}</span>
        </OverviewItem>
      </Overview>
      <Overview>
        <OverviewItem>
          <span>percent_from_price_ath:</span>
          <span>{tickersData?.quotes.USD.percent_from_price_ath.toFixed(3)}</span>
        </OverviewItem>
      </Overview>
    </> 
  );
}

export default Price;