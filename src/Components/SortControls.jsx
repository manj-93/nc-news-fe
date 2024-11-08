import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowUpDown } from 'lucide-react';

const SortControls = ({ onSortChange }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sort, setSort] = useState(searchParams.get('sort_by') || 'created_at');
    const [order, setOrder] = useState(searchParams.get('order') || 'desc');
  
    const handleSortChange = (event) => {
      const newSort = event.target.value;
      setSort(newSort);
      setSearchParams({ sort_by: newSort, order });
      onSortChange({ sort_by: newSort, order });
    };
  
    const toggleOrder = () => {
      const newOrder = order === 'asc' ? 'desc' : 'asc';
      setOrder(newOrder);
      setSearchParams({ sort_by: sort, order: newOrder });
      onSortChange({ sort_by: sort, order: newOrder });
    };
  
    return (
      <div className="sort-controls">
        <select 
          value={sort} 
          onChange={handleSortChange}
          className="sort-select"
        >
          <option value="created_at">Date</option>
          <option value="votes">Votes</option>
        </select>
        <button 
          onClick={toggleOrder} 
          className="order-toggle"
          aria-label={`Sort ${order === 'asc' ? 'descending' : 'ascending'}`}
        >
          <ArrowUpDown size={20} />
        </button>
      </div>
    );
  };

export default SortControls;
