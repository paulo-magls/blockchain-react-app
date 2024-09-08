import React from 'react';
import classes from './BlockchainControls.module.css';

interface BlockchainControlsProps {
    difficulty: string;
    setDifficulty: (value: string) => void;
    quantity: string;
    setQuantity: (value: string) => void;
    isMining: boolean;
    handleCreation: () => void;
}

const BlockchainControls: React.FC<BlockchainControlsProps> = ({ 
  difficulty, 
  setDifficulty, 
  quantity, 
  setQuantity, 
  isMining, 
  handleCreation 
}) => {
  return (
    <div className={classes.blockchain_controls}>
      <h1>Blockchain Generator</h1>

      <p>
        <label htmlFor="difficulty">Dificuldade de Mineração: </label>
        <input
          id="difficulty"
          type="number"
          value={difficulty}
          placeholder="Por padrão é 4"
          onChange={(e) => setDifficulty(e.target.value)}
          disabled={isMining}
        />
      </p>

      <p>
        <label htmlFor="quantity">Quantidade de Blocos: </label>
        <input
          id="quantity"
          type="number"
          value={quantity}
          placeholder="Por padrão é 10"
          onChange={(e) => setQuantity(e.target.value)}
          disabled={isMining}
        />
      </p>

      <p>
        <button onClick={handleCreation} disabled={isMining}>
          {isMining ? 'Minerando...' : 'Gerar Blockchain'}
        </button>
      </p>
    </div>
  );
};

export default BlockchainControls;