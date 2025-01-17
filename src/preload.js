const { contextBridge, ipcRenderer } = require('electron')
const {createRoot} = require('react-dom/client')

contextBridge.exposeInMainWorld('electronAPI', {
  setSheetRow: (option) => ipcRenderer.send('set-sheet-row', option),
  setBatchNumber: (batchNumber) => ipcRenderer.send('set-batch-number', batchNumber),
  setNumberOfRolls: (rolls) => ipcRenderer.send('set-rolls', rolls),
  setNumberOfLabels: (labels) => ipcRenderer.send('set-labels', labels),
  previewPDF: () => ipcRenderer.invoke('preview-pdf'),
  generatePDF: () => ipcRenderer.invoke('generate-pdf'),
  onUpdateLabels: (callback) => ipcRenderer.on('update-labels', (_event, value) => callback(value))





  // we can also expose variables, not just functions
})