
interface TableListViewItemProps {
    item: object
}

const TableListViewItem: React.FC<TableListViewItemProps> = ({
    item
}) => {

    const formatValue = (value: unknown): string => {
        // Already a Date instance
        if (value instanceof Date) {
          return value.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
        }
      
        // ISO‑ish string → Date
        if (typeof value === 'string') {
          const ms = Date.parse(value);
          if (!Number.isNaN(ms)) {
            return new Date(ms).toLocaleString(undefined, { dateStyle: 'medium'});
          }
        }

        // Boolean
        if (typeof value === 'boolean') {
          return value ? 'True' : 'False'; // could be 'Yes'/'No' or '1'/'0', but not sure what I want to do here
        }
      
        // Fallback: plain string
        return String(value);
      };

    return (
        <tr>
            {Object.values(item).map((key, index) => <td key={index}>{formatValue(key)}</td>)}
        </tr>
    )
}

export default TableListViewItem;
