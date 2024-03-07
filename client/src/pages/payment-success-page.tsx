const PaymentSuccessPage = () => {
  return (
    <div className="container">
      <h1>Payment Successful</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          console.log(
            new Date(
              `${e.currentTarget.date.value}T${e.currentTarget.time.value}:00`,
            ).toLocaleString('de-DE'),
          )
        }}
      >
        <input type="date" name="date" id="date" className="border" />
        <input type="time" name="time" id="time" className="border" />
        <button>dwd</button>
      </form>
    </div>
  )
}

export default PaymentSuccessPage
