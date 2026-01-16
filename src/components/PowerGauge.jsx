import { motion } from "framer-motion"

function PowerGauge({ current = 0, total = 12 }) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-wider text-gray-300">
        <span>Power Level</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-white/10">
        <motion.div
          className="h-2 rounded-full bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  )
}

export default PowerGauge
