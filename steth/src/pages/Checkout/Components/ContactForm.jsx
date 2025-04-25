const ContactForm = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    })
  }

  // Initialize data if not provided
  const formData = {
    email: data?.email || "",
    marketingConsent: data?.marketingConsent || false,
    ...data
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div></div>
        <a href="#" className="text-sm text-gray-700 underline">
          Log in
        </a>
      </div>

      <div className="mb-4">
        <div className="border border-gray-300 overflow-hidden focus-within:border-gray-500">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-3 outline-none bg-white"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">Enter a valid email</p>
      </div>

      <div className="flex items-start gap-2 mb-4">
        <input 
          type="checkbox" 
          id="marketing" 
          className="mt-1"
          checked={formData.marketingConsent}
          onChange={(e) => handleChange('marketingConsent', e.target.checked)}
        />
        <label htmlFor="marketing" className="text-sm">
          Yes, I would like to receive emails from FIGS about products, updates, and exclusive offers and promotions.
          You can unsubscribe at any time.
        </label>
      </div>
    </div>
  )
}

export default ContactForm
