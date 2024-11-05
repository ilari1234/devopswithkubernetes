const { connect, StringCodec } = require('nats')
const axios = require('axios')

const nats_url = process.env.NATS_URL || 'nats://my-nats.nats.svc.cluster.local:4222'
const webhook_url = process.env.WEBHOOK_URL

async function startSubscriber() {
  const nc = await connect({ servers: nats_url })
  console.log('Connected to NATS server')

  const sc = StringCodec()
  const topic = 'addTodo.topic'
  const queueGroup = 'addTodo.queueGroup'
  const subscription = nc.subscribe(topic, { queue: queueGroup })

  for await (const message of subscription) {
    const receivedMessage = sc.decode(message.data)
    console.log(`Received message on ${topic}:`, receivedMessage)

    try {
      const response = await axios.post(webhook_url, { 'content': receivedMessage })
      console.log('Webhook response:', response.data)
    } catch (error) {
      console.error('Error sending message to webhook:', error.response.data)
    }
  }
}

startSubscriber().catch((error) => {
  console.error('Error connecting to NATS:', error)
})