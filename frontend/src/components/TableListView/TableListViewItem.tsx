
interface TableListViewItemProps {
    item: object;
}

const TableListViewItem: React.FC<TableListViewItemProps> = ({
    item
}) => {

    return (
        <tr>
            {Object.keys(item).map((key, index) => <tr key={index}>{key}</tr>)}
        </tr>
    )
}

export default TableListViewItem;
