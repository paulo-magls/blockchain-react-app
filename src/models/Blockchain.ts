import { hash, isHashProofed } from '../utils/helpers'
import { Block } from './Block'

export class BlockChain {
  #chain: Block[] = []
  private powPrefix = '0'

  constructor (private readonly difficulty: number = 4) {
    this.#chain.push(this.createGenesisBlock())
  }

  private createGenesisBlock () {
    const payload = {
      sequence: 0,
      timestamp: +new Date(),
      data: 'Genesis Block',
      previousHash: ''
    }
    return {
      header: {
        nonce: 0,
        blockHash: hash(JSON.stringify(payload))
      },
      payload
    }
  }

  private get lastBlock (): Block {
    return this.#chain[this.#chain.length - 1] as Block;
  }

  get chain () {
    return this.#chain
  }

  private getPreviousBlockHash () {
    return this.lastBlock.header.blockHash
  }

  createBlock (data: string) {
    const newBlock = {
      sequence: this.lastBlock.payload.sequence + 1,
      timestamp: +new Date(),
      data,
      previousHash: this.getPreviousBlockHash()
    }

    return newBlock
  }

  mineBlock (block: Block['payload']) {
    let nonce = 0
    const startTime = +new Date()

    while (true) {
      const blockHash = hash(JSON.stringify(block))
      const proofingHash = hash(blockHash + nonce)

      if (isHashProofed({
        hash: proofingHash,
        difficulty: this.difficulty,
        prefix: this.powPrefix
      })) {
        const endTime = +new Date()
        const shortHash = blockHash.slice(0, 12)
        const mineTime = (endTime - startTime) / 1000

        return {
          minedBlock: { payload: { ...block }, header: { nonce, blockHash } },
          minedHash: proofingHash,
          shortHash,
          mineTime
        }
      }
      nonce++
    }
  }

  verifyBlock (block: Block) {
    if (block.payload.previousHash !== this.getPreviousBlockHash()) {
      console.error(`Bloco inválido #${block.payload.sequence}: O hash do bloco anterior é "${this.getPreviousBlockHash().slice(0, 12)}" não "${block.payload.previousHash.slice(0, 12)}".`)
      return
    }

    if (!isHashProofed({
      hash: hash(hash(JSON.stringify(block.payload)) + block.header.nonce),
      difficulty: this.difficulty,
      prefix: this.powPrefix
    })) {
      console.error(`Bloco inválido #${block.payload.sequence}: O hash não é a prova, nonce ${block.header.nonce} não é válido.`)
      return
    }

    return true
  }

  pushBlock (block: Block) {
    if (this.verifyBlock(block)) this.#chain.push(block)
    return this.#chain
  }
}
