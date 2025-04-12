import TableListViewItem from './TableListViewItem';

interface TableListViewProps {
    items: object[];
}

const TableListView: React.FC<TableListViewProps> = ({
    items
}) => {

    return (
        <table>
            <thead>
                {items.length > 0 ? Object.keys(items[0]).map((key, index) => <th key={index}>{key}</th>) : null}
            </thead>
            <tbody>
                {items.map((item, index) => <TableListViewItem key={index} item={item} />)}
            </tbody>
        </table>
    )
}

export default TableListView;
