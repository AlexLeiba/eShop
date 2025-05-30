import { TABLE_TRANSACTIONS_COLUMNS } from '../../lib/consts';
import type { TransactionsType } from '../../lib/types';
import Spacer from '../ui/Spacer';
import { WidgetCard } from '../ui/WidgetCard';
import './DashboardPage.scss';

type Props = {
  transactionData: TransactionsType[];
};
export function LatestTransactions({ transactionData }: Props) {
  return (
    <WidgetCard>
      <h4>Latest Transactions</h4>
      <Spacer size={12} />

      <table className='table-container'>
        <thead className='table-head'>
          <tr>
            {TABLE_TRANSACTIONS_COLUMNS.map((column) => {
              return (
                <th key={column.key}>
                  <p>{column.title}</p>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className='table-body'>
          {transactionData?.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.products[0].title}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td>{item.quantity}</td>
                {item.status === 'PAID' ? (
                  <td style={{ color: 'green' }}>{item.status}</td>
                ) : (
                  <td style={{ color: 'red' }}>{item.status}</td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </WidgetCard>
  );
}
