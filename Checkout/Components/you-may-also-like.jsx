const YouMayAlsoLike = () => {
  return (
    <div>
      <h3 className="font-medium mb-4">You May Also Like</h3>
      <div className="border border-gray-200 rounded p-4 mb-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-16 bg-gray-100 rounded flex items-center justify-center">
            <div className="w-6 h-10 bg-gray-300 rounded"></div>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium">Grey FIGS® Lanyard</h4>
            <p className="text-xs text-gray-500">Grey</p>
          </div>
          <span className="text-sm font-medium">$16.00</span>
        </div>
        <button className="w-full border border-gray-300 rounded py-2 mt-4 text-sm font-medium">ADD TO ORDER</button>
      </div>
    </div>
  )
}

export default YouMayAlsoLike
