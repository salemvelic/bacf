<template>
  <div class="relative pl-8">
    <div class="flex items-start gap-2">
      <div class="w-4 h-4 rounded-full" :class="avatarColor"></div>
      <div>
        <div class="bg-white rounded p-3 shadow-sm">
          <p class="font-semibold">{{ comment.author.name }}</p>
          <p class="text-gray-600">{{ comment.text }}</p>
        </div>
        <div class="text-xs text-gray-400 mt-1">
          {{ time }}
          <button @click="showReply = !showReply" class="ml-2 text-blue-600">
            Reply
            <span v-if="childComments.length > 0"> ({{ childComments.length }})</span>
          </button>
        </div>
        
        <div v-if="showReply" class="mt-2 flex gap-2">
          <input v-model="replyText" class="flex-1 p-1 rounded border" placeholder="Type your reply..." />
          <button @click="submitReply" class="bg-gray-300 px-2 py-1 rounded">Send</button>
        </div>
        
        <div class="ml-6 mt-4 space-y-4">
          <CommentItem
            v-for="child in childComments"
            :key="child.id"
            :comment="child"
            @add-reply="(parentId: string, replyText: string) => $emit('add-reply', parentId, replyText)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCommentsStore } from '@/stores/comments'
import type { Comment } from '@/types/comment'
import { PropType } from 'vue';

// eslint-disable-next-line
const props = defineProps({
  comment: {
    type: Object as PropType<Comment>,
    required: true,
  },
})
// eslint-disable-next-line
const emit = defineEmits(['add-reply'])

const commentsStore = useCommentsStore()

const showReply = ref(false)
const replyText = ref('')

const childComments = computed(() => commentsStore.getChildComments(props.comment.id))

const submitReply = () => {
  if (!replyText.value.trim()) return

  emit('add-reply', props.comment.id, replyText.value)
  replyText.value = ''
  showReply.value = false
}

const time = computed(() => {
  return new Date(props.comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
})

const avatarColor = computed(() => {
  const colors = ['bg-red-600', 'bg-green-500', 'bg-yellow-400', 'bg-blue-400']
  const idx = props.comment.author.name.length % colors.length
  return colors[idx]
})
</script>