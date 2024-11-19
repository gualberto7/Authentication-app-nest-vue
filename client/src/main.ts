import './assets/main.css'
import Card from './core/components/Card.vue'
import Button from './core/components/Button.vue'
import TextField from './core/form/TextField.vue'
import Checkbox from './core/form/Checkbox.vue'
import Alert from './core/components/Alert.vue'
import Modal from './core/components/Modal.vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Global component registration
app.component('Card', Card)
app.component('Button', Button)
app.component('TextField', TextField)
app.component('Checkbox', Checkbox)
app.component('Alert', Alert)
app.component('Modal', Modal)

app.mount('#app')
