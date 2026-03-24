import emailjs from '@emailjs/browser'
import { useState } from 'react'
import './sendOrder.scss'

const SERVICE_ID = "service_vdrnqgz";
const TEMPLATE_ID = "template_m0wmzqt";

const SendOrder = ({ items, onSuccess, onError }) => {
  const [customerName, setCustomerName] = useState('')
  const [sending, setSending] = useState(false)
  const [nameError, setNameError] = useState(false)

  const handleSend = () => {
    if (customerName.trim() === '') {
      setNameError(true)
      return
    }

    setSending(true)

    const formattedOrderString = items
      .map(i => `${i.name} x${i.quantity}`)
      .join('\n')

    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          customer_name: customerName,
          order_items: formattedOrderString,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setSending(false)
        onSuccess()
      })
      .catch(() => {
        setSending(false)
        onError()
      })
  }

  return (
    <div className="send-order">
      <input
        type="text"
        placeholder="Your name"
        value={customerName}
        onChange={e => {
          setCustomerName(e.target.value)
          setNameError(false)
        }}
        className={`send-order__input${nameError ? ' send-order__input--error' : ''}`}
      />
      {nameError && (
        <p className="send-order__error">Please enter your name before sending.</p>
      )}
      <button
        className="send-order__btn"
        onClick={handleSend}
        disabled={sending}
      >
        {sending ? 'Sending...' : 'Send Order'}
      </button>
    </div>
  )
}

export default SendOrder
