const { connect, StringCodec } = require('nats')

const nats_url = process.env.NATS_URL || 'nats://my-nats.nats.svc.cluster.local:4222'

async function startSubscriber() {
  try {
    const nc = await connect({ servers: nats_url })
    console.log('Connected to NATS server')  
  } catch (error) {
    console.error('Failed to connect to NATS:', error)
  }
  
  const sc = StringCodec()
  const topic = 'addTodo.topic'
  const subscription = nc.subscribe(topic)
  
  for await (const message of subscription) {
    const receivedMessage = sc.decode(message.data)
    console.log(`Received message on ${topic}:`, receivedMessage)
  }
  
  await new Promise(() => {})
}
  
startSubscriber()