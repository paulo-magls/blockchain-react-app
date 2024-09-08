import classes from './App.module.css';
import { BlockChain } from "./models/Blockchain";
import { Block } from './models/Block';
import { useState, useEffect } from "react";

function App() {
  const [difficulty, setDifficulty] = useState('');
  const [quantity, setQuantity] = useState('');
  const [chain, setChain] = useState<{ block: Block; minedHash: string; mineTime: number }[]>([]);

  // Adicionando estado para controlar mineração
  const [isMining, setIsMining] = useState(false);

  // Efeito para rolar o body até o fim sempre que novos blocos forem adicionados
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [chain]); // Executa o efeito sempre que a cadeia de blocos for atualizada

  const handleCreation = async () => {
    setChain([]);

    // Simula um pequeno delay para melhor visualização
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Inicia o estado de mineração
    setIsMining(true);

    const blockchain = new BlockChain(+difficulty || 4);
    const blockNumber = +quantity || 10;

    for (let i = 1; i <= blockNumber; i++) {
      const block = blockchain.createBlock(`Bloco ${i}`);
      const mineInfo = blockchain.mineBlock(block);
      blockchain.pushBlock(mineInfo.minedBlock);

      setChain((prevChain) => [
        ...prevChain, 
        { block: mineInfo.minedBlock, minedHash: mineInfo.minedHash, mineTime: mineInfo.mineTime }
      ]);

      // Simula um pequeno delay para melhor visualização
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    // Finaliza o estado de mineração
    setIsMining(false);
  };

  return (
    <div className={classes.app}>
      <div className={classes.block}>
        <h1>Blockchain Generator</h1>

        <p>
          <label htmlFor="difficulty">Dificuldade de Mineração: </label>
          <input
            id="difficulty"
            type="number"
            value={difficulty}
            placeholder="Por padrão é 4"
            onChange={(e) => setDifficulty(e.target.value)}
            disabled={isMining} // Desabilita durante mineração
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
            disabled={isMining} // Desabilita durante mineração
          />
        </p>

        <p>
          <button onClick={handleCreation} disabled={isMining}>
            {isMining ? 'Minerando...' : 'Gerar Blockchain'}
          </button>
        </p>
      </div>

      {chain.map(({ block, minedHash, mineTime }, index) => (
        <>
          <div key={index} className={classes.block}>
            <h2>Header</h2>
            <p>Nonce: {block.header.nonce}</p>
            <p>Hash: {block.header.blockHash}</p>
            <hr />
            <h2>Payload</h2>
            <p>Bloco #{block.payload.sequence}</p>
            <p>Timestamp: {block.payload.timestamp}</p>
            <p>Informação: {block.payload.data}</p>
            <p>Hash Anterior: {block.payload.previousHash}</p>
          </div>
          
          <div className={classes.mining_time}>
            <p>Bloco #{block.payload.sequence} minerado em {mineTime} segundos.</p>
            <p>Hash de Mineração: {minedHash}</p>
          </div>
        </>
      ))}
    </div>
  );
}

export default App;