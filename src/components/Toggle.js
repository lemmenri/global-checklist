import { useState } from 'react'
import { Switch } from '@headlessui/react'

export default function Toggle({ name, label, onToggle, checked = false }) {
  const [enabled, setEnabled] = useState(checked)

  const handleChange = () => {
    setEnabled(!enabled);
    onToggle();
  }

  return (
    <Switch.Group>
      <div className='flex space-x-2 items-center'>

        <Switch
          id={name}
          checked={enabled}
          onChange={handleChange}
          className={`${enabled ? 'bg-primary' : 'bg-light'
            } relative inline-flex h-4 w-9 items-center rounded-full border border-dark`}
        >
          <span className="sr-only">{label}</span>
          <span
            className={`${enabled ? 'translate-x-5' : 'translate-x-0'
              } inline-block h-4 w-4 transform rounded-full bg-light transition border border-dark`}
          />
        </Switch>
        <Switch.Label className={"hover:cursor-pointer"}>{label}</Switch.Label>
      </div>
    </Switch.Group>
  )
}