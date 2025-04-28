<template>
  <div class="min-h-screen bg-blue-700 flex items-center justify-center p-4">
    <div class="flex flex-col bg-gray-100 w-full max-w-3xl rounded-lg shadow-md p-6 space-y-4 overflow-y-auto h-[80vh]">
      <div class="text-center text-sm text-gray-500 mb-6">
        {{ today }}
      </div>
      <div class="flex-1 overflow-auto">
        <div v-for="comment in rootComments" :key="comment.id" class="space-y-4">
          <CommentItem :comment="comment" :comments="comments" @add-reply="addReply" />
        </div>
      </div>

      <div class="mt-6 flex gap-2">
        <input v-model="newComment" class="flex-1 p-2 rounded border" placeholder="...type something" />
        <button @click="addComment" class="bg-gray-300 px-4 py-2 rounded">Send</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCommentsStore } from '@/stores/comments'
import CommentItem from './components/CommentItem.vue'

const commentsStore = useCommentsStore()
const newComment = ref('')

const today = new Date().toLocaleDateString('en-GB', {
  weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric'
})

const rootComments = computed(() => commentsStore.rootComments)

const addComment = () => {
  commentsStore.addComment(newComment.value)
  newComment.value = ''
}

const addReply = (parentId: string, replyText: string) => {
  commentsStore.addReply(parentId, replyText)
}
</script>
