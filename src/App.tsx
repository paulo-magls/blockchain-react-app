import React, { useState, useEffect } from 'react';
import classes from './App.module.css';
import { BlockChain } from "./models/Blockchain";
import { Block } from './models/Block';
import BlockchainControls from './components/BlockchainControls';
import BlockDisplay from './components/BlockDisplay';
import MiningInfo from './components/MiningInfo';

type ChainItem = {
  block: Block;
  minedHash: string;
  mineTime: number;
};

function App() {
  const [difficulty, setDifficulty] = useState('');
  const [quantity, setQuantity] = useState('');
  const [chain, setChain] = useState<ChainItem[]>([]);
  const [isMining, setIsMining] = useState(false);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [chain]);

  const handleCreation = async () => {
    setChain([]);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsMining(true);

    const validatedDifficulty = +difficulty < 1 ? 0 : +difficulty;
    const validatedQuantity = +quantity < 1 ? 0 : +quantity;

    const blockchain = new BlockChain(validatedDifficulty || 4);
    const blockNumber = validatedQuantity || 10;

    for (let i = 1; i <= blockNumber; i++) {
      const block = blockchain.createBlock(`Bloco ${i}`);
      const mineInfo = blockchain.mineBlock(block);
      blockchain.pushBlock(mineInfo.minedBlock);

      setChain((prevChain) => [
        ...prevChain,
        { block: mineInfo.minedBlock, minedHash: mineInfo.minedHash, mineTime: mineInfo.mineTime }
      ]);

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setIsMining(false);
  };

  return (
    <div className={classes.app}>
      <BlockchainControls
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        quantity={quantity}
        setQuantity={setQuantity}
        isMining={isMining}
        handleCreation={handleCreation}
      />

      {chain.map(({ block, minedHash, mineTime }, index) => (
        <React.Fragment key={index}>
          <BlockDisplay block={block} />
          <MiningInfo sequence={block.payload.sequence} mineTime={mineTime} minedHash={minedHash} />
        </React.Fragment>
      ))}
    </div>
  );
}

export default App;
