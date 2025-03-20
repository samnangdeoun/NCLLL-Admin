<!-- TiptapExample.vue -->
<template>
    <div class="tiptap-example">
      <h2>TipTap Rich Text Editor</h2>
      
      <div class="editor-container">
        <TiptapEditor
          v-model="editorContent"
          :editable="isEditable"
          @editor-update="handleEditorUpdate"
          @editor-ready="handleEditorReady"
        />
      </div>
      
      <div class="controls">
        <button @click="isEditable = !isEditable">
          {{ isEditable ? 'Set Read-Only' : 'Enable Editing' }}
        </button>
        <button @click="resetContent">Reset Content</button>
        <button @click="showOutput = !showOutput">
          {{ showOutput ? 'Hide' : 'Show' }} Output
        </button>
      </div>
      
      <div v-if="showOutput" class="output">
        <h3>Editor Output</h3>
        <div class="output-tabs">
          <button 
            :class="{ active: activeTab === 'html' }"
            @click="activeTab = 'html'"
          >
            HTML
          </button>
          <button 
            :class="{ active: activeTab === 'json' }"
            @click="activeTab = 'json'"
          >
            JSON
          </button>
          <button 
            :class="{ active: activeTab === 'text' }"
            @click="activeTab = 'text'"
          >
            Text
          </button>
        </div>
        
        <div class="output-content">
          <pre v-if="activeTab === 'html'">{{ editorOutput.html }}</pre>
          <pre v-else-if="activeTab === 'json'">{{ JSON.stringify(editorOutput.json, null, 2) }}</pre>
          <pre v-else-if="activeTab === 'text'">{{ editorOutput.text }}</pre>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import TiptapEditor from '../../components/tiptap/TextEditor.vue';
  
  // Editor content
  const editorContent = ref({
    type: 'doc',
    content: [
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: 'TipTap Editor Example' }]
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'This is a fully-featured rich text editor using ' },
          { type: 'text', marks: [{ type: 'bold' }], text: 'TipTap' },
          { type: 'text', text: ' for Vue 3.' }
        ]
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Try out all the features like ' },
          { type: 'text', marks: [{ type: 'italic' }], text: 'formatting' },
          { type: 'text', text: ', ' },
          { type: 'text', marks: [{ type: 'highlight', attrs: { color: '#ffcc00' } }], text: 'highlighting' },
          { type: 'text', text: ', links, tables, and more!' }
        ]
      }
    ]
  });
  
  // Control variables
  const isEditable = ref(true);
  const showOutput = ref(false);
  const activeTab = ref('html');
  
  // Editor output
  const editorOutput = ref({
    html: '',
    text: '',
    json: {}
  });
  
  // Methods
  const handleEditorUpdate = (output) => {
    editorOutput.value = output;
  };
  
  const handleEditorReady = (editor) => {
    console.log('Editor is ready!', editor);
  };
  
  const resetContent = () => {
    editorContent.value = {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 1 },
          content: [{ type: 'text', text: 'TipTap Editor Example' }]
        },
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Content has been reset!' }]
        }
      ]
    };
  };
  </script>
  
  <style scoped>
  .tiptap-example {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h2 {
    margin-bottom: 20px;
  }
  
  .editor-container {
    margin-bottom: 20px;
  }
  
  .controls {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .controls button {
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .controls button:hover {
    background-color: #3e8e41;
  }
  
  .output {
    margin-top: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .output h3 {
    padding: 10px;
    margin: 0;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
  }
  
  .output-tabs {
    display: flex;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
  }
  
  .output-tabs button {
    padding: 8px 16px;
    background: none;
    border: none;
    cursor: pointer;
    border-right: 1px solid #ddd;
  }
  
  .output-tabs button.active {
    background-color: white;
    font-weight: bold;
  }
  
  .output-content {
    padding: 16px;
    background-color: white;
    overflow: auto;
    max-height: 300px;
  }
  
  pre {
    margin: 0;
    white-space: pre-wrap;
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
  }
  </style>