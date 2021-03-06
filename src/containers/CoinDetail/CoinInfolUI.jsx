import React, { useState, useEffect } from 'react';
import numeral from 'numeral';
import styled from 'styled-components';

const CoinInfo = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: repeat(1, 150px);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 25px;

  @media screen and (max-width: 600px) {
    grid-gap: 5px;
  }
`;

const CoinImg = styled.img`
  width: 130px;
  height: 130px;
  object-fit: contain;
  object-position: center;

  @media screen and (max-width: 455px) {
    width: 100px;
    height: 100px;
  }
`;

const CoinText = styled.span`
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--primary-font-color);
  @media screen and (max-width: 600px) {
    font-size: 1.4rem;
    margin: 5px;
  }
`;

const CoinSecondaryText = styled.span`
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--secondary-font-color);
  @media screen and (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const CoinTendencyText = styled.span`
  font-size: 1.7rem;
  font-weight: bold;
  margin: 10px;
  color: ${props =>
    props.tendency
      ? 'var(--negative-tendency-red)'
      : 'var(--positive-tendency-green)'};
  @media screen and (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const CoinDetailSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  @media screen and (max-width: 975px) {
    align-items: start;
  }

  @media screen and (max-width: 455px) {
    justify-content: space-between;
  }
`;

const CoinInfoUI = ({ name, average, symbol = '', high, low, change }) => {
  const [image, setImage] = useState('');
  average = numeral(average).format('$ 0.000a');
  high = numeral(high).format('0.000a');
  low = numeral(low).format('0.000a');
  change = numeral(change / 100).format('% 0.0000');

  useEffect(() => {
    setImage(
      `https://static.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`
    );
  }, [symbol]);

  return (
    <CoinInfo>
      <CoinDetailSection>
        <CoinImg src={image} />
        <CoinText>
          {name} ({symbol})
        </CoinText>
      </CoinDetailSection>

      <CoinDetailSection>
        <CoinText>
          {' '}
          <CoinSecondaryText>High</CoinSecondaryText> {high}
        </CoinText>

        <CoinText>
          {' '}
          <CoinSecondaryText>Low</CoinSecondaryText> {low}
        </CoinText>
      </CoinDetailSection>

      <CoinDetailSection>
        <CoinText>
          {' '}
          <CoinSecondaryText>Average</CoinSecondaryText> {average}
        </CoinText>
        <CoinTendencyText tendency={change.includes('-')}>
          {' '}
          <CoinSecondaryText>Change</CoinSecondaryText> {change}
        </CoinTendencyText>
      </CoinDetailSection>
    </CoinInfo>
  );
};

export { CoinInfoUI };
