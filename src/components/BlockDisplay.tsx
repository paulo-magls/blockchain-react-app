import React from 'react';
import classes from './BlockDisplay.module.css';
import { Block } from '../models/Block';

interface BlockDisplayProps {
  block: Block;
}

const BlockDisplay: React.FC<BlockDisplayProps> = ({ block }) => {
  return (
    <div className={classes.block}>
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
  );
};

export default BlockDisplay;
