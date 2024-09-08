export interface Block {
    header: {
      nonce: number
      blockHash: string
    }
    payload: {
      sequence: number
      timestamp: number
      data: string
      previousHash: string
    }
  }