
interface TableListViewItemProps {
    item: object;
}

const TableListViewItem: React.FC<TableListViewItemProps> = ({
    item
}) => {

    return (
        <tr>
            {Object.values(item).map((key, index) => <td key={index}>{key}</td>)}
        </tr>
    )
}

export default TableListViewItem;
