
<template>
    <div class="tiptap-example">
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
        
      ]
    };
  };
  </script>
  
  <style scoped>
  .tiptap-example {
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