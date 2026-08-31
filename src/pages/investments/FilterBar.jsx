import { useState } from 'react'
import { Search, Filter, LayoutGrid, List } from 'lucide-react'
import SearchInput from "../../inputs/SearchInput"
import DropdownInput from "../../inputs/DropdownInput"


const FilterBar = ({
  searchPlaceholder = 'Search investments...',
  statusItems = ['All Status', 'Ongoing', 'Closed'],
  typeItems = ['All Types', 'Real Estate', 'Agriculture'],
  onSearchChange = () => {},
  onStatusChange = () => {},
  onTypeChange = () => {},
  onFilterClick = () => {},
  onViewChange = () => {},
}) => {
  const [view, setView] = useState('grid') // 'grid' | 'list'

  const handleViewChange = (mode) => {
    setView(mode)
    onViewChange(mode)
  }

  return (
    <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between w-full gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl">
      {/* Left: search + filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full xl:w-auto">
        <div className="w-full sm:w-[240px]">
          <SearchInput
            icon={Search}
            placeholder={searchPlaceholder}
            width="100%"
            height="40px"
            onChange={onSearchChange}
          />
        </div>
        <div className="flex gap-3">
          <div className="w-full sm:w-[130px]">
            <DropdownInput
              items={statusItems}
              placeholder="All Status"
              width="100%"
              height="40px"
              onChange={onStatusChange}
            />
          </div>
          <div className="w-full sm:w-[130px]">
            <DropdownInput
              items={typeItems}
              placeholder="All Types"
              width="100%"
              height="40px"
              onChange={onTypeChange}
            />
          </div>
        </div>
      </div>

      {/* Right: filter + view toggle */}
      <div className="flex items-center justify-between xl:justify-start gap-4">
        <button
          onClick={onFilterClick}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Filter size={18} />
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleViewChange('grid')}
            className={view === 'grid' ? 'text-gray-700' : 'text-gray-400 hover:text-gray-600'}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => handleViewChange('list')}
            className={view === 'list' ? 'text-gray-700' : 'text-gray-400 hover:text-gray-600'}
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterBar