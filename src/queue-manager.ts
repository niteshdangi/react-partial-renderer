/* eslint-disable max-params */

interface IBatch {
  fn: (() => void)[]
  status: 'COM' | 'INP'
}

class QueueManager {
  limit = 25

  isDev = false

  queue: string[] = []

  completedQueue: string[] = []

  batchQueue: Record<string, IBatch> = {}

  canAdd() {
    this.removeCompletedFromQueue()
    return this.queue.length - this.completedQueue.length < this.limit
  }

  getBatchQueue(batchId: string) {
    return this.batchQueue?.[batchId]
  }

  createNewBatch(id: string, callback: () => void, delay: number, batchId: string) {
    if (!this.canAdd()) {
      if (this.isDev) throw new Error('Queue limit reached.')
      else {
        callback?.()
        return 0
      }
    } else {
      this.batchQueue[batchId] = {
        status: 'INP',
        fn: [callback],
      }
      this.queue.push(id)
      return setTimeout(() => {
        this.batchQueue[batchId].status = 'COM'
        this.getBatchQueue(batchId)?.fn?.map?.((func) => func())
        this.remove(id)
        setTimeout(() => {
          delete this.batchQueue[batchId]
        }, 0)
      }, delay)
    }
  }

  add(id: string, callback: () => void, delay: number, batchId?: string) {
    if (batchId) {
      const newBatchId = `${batchId}-${delay}`
      if (this.batchQueue?.[newBatchId]?.status === 'INP') {
        this.batchQueue[newBatchId].fn.push(callback)
        return 0
      }
      if (this.batchQueue?.[newBatchId]?.status === 'COM') {
        callback?.()
        return 0
      }
      return this.createNewBatch(id, callback, delay, newBatchId)
    }
    if (!this.canAdd()) {
      if (this.isDev) throw new Error('Queue limit reached.')
      else {
        callback?.()
        return 0
      }
    } else {
      this.queue.push(id)
      return setTimeout(() => {
        callback?.()
        this.remove(id)
      }, delay)
    }
  }

  remove(id: string) {
    const index = this.queue.indexOf(id)
    if (index > -1) {
      this.completedQueue.push(id)
      this.queue.splice(index, 1)
    }
  }

  removeCompletedFromQueue() {
    if (this.completedQueue.length === this.queue.length) {
      this.queue = []
      this.completedQueue = []
    }
  }

  setIsDev(isDev: boolean) {
    this.isDev = isDev
  }

  setLimit(limit: number) {
    this.limit = limit
  }
}

const queueManager = new QueueManager()
export default queueManager

export const setQueueLimit = (limit: number) => {
  queueManager.setLimit(limit)
}

export const setDevMode = (isDev: boolean) => {
  queueManager.setIsDev(isDev)
}
