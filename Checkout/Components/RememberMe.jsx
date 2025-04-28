import { Lock, PhoneCall } from "lucide-react"
import PhoneInput from "./PhoneInput"

const RememberMe = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    })
  }

  const handlePhoneChange = (phoneData) => {
    handleChange('phone', phoneData)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <input 
          type="checkbox" 
          id="save-info" 
          className="mt-1"
          checked={data.saveInfo}
          onChange={(e) => handleChange('saveInfo', e.target.checked)}
        />
        <label htmlFor="save-info" className="text-sm">
          Save my information for a faster checkout with a Shop account
        </label>
      </div>

      {/* Phone Input */}
      <div className="border border-gray-300 rounded overflow-hidden bg-white">
        <PhoneInput 
          data={data.phone}
          onChange={handlePhoneChange}
        />
      </div>

      <div className="flex items-center text-xs text-gray-500">
        <Lock size={12} className="mr-1" />
        <span>Secure and encrypted</span>
        <span className="ml-auto text-[#5a31f4]">shop</span>
      </div>
    </div>
  )
}

export default RememberMe
