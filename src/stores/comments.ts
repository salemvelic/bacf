import { defineStore } from 'pinia'
import data from '@/example.json'
import type { Comment } from '@/types/comment'

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    comments: [...(data.data.comments as Comment[])],
  }),
  getters: {
    rootComments: (state) => state.comments.filter(c => !c.parent_id),
    getChildComments: (state) => (parentId: string) =>
      state.comments.filter(c => c.parent_id === parentId),
  },
  actions: {
    addComment(text: string) {
      if (!text.trim()) return
      this.comments.push({
        id: Date.now().toString(),
        parent_id: null,
        author: {
          name: 'You',
          picture: 'img/you.png'
        },
        text,
        timestamp: Date.now()
      })
    },
    addReply(parentId: string, text: string) {
      if (!text.trim()) return
      this.comments.push({
        id: Date.now().toString(),
        parent_id: parentId,
        author: {
          name: 'You',
          picture: 'img/you.png'
        },
        text,
        timestamp: Date.now()
      })
    }
  }
})
