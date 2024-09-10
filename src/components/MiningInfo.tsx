import React from 'react';
import classes from './MiningInfo.module.css';

interface MiningInfoProps {
  sequence: number;
  mineTime: number;
  minedHash: string;
}

const MiningInfo: React.FC<MiningInfoProps> = ({ sequence, mineTime, minedHash }) => {
  return (
    <div className={classes.mining_info}>
      <p>Bloco #{sequence} minerado em {mineTime} segundo(s).</p>
      <p>Hash Minerado: {minedHash}</p>
    </div>
  );
};

export default MiningInfo;
